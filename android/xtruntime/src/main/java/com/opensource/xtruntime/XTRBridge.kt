package com.opensource.xtruntime

import android.content.pm.PackageManager
import android.os.Handler
import android.util.Log
import com.eclipsesource.v8.Releasable
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONObject

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRBridge(val appContext: android.content.Context, val bridgeScript: String? = null, val completionBlock: (() -> Unit)? = null, val failureBlock: ((e: Exception) -> Unit)? = null) {

    companion object {

        fun createWithAssets(appContext: android.content.Context, assetsName: String, completionBlock: (() -> Unit)? = null): XTRBridge {
            val bridge = XTRBridge(appContext, null, completionBlock)
            bridge.xtrSourceURL = "file:///android_asset/$assetsName"
            return bridge
        }

        fun createWithSourceURL(appContext: android.content.Context, sourceURL: String?, completionBlock: (() -> Unit)? = null, failureBlock: ((e: Exception) -> Unit)? = null): XTRBridge {
            val bridge = XTRBridge(appContext, null, completionBlock, failureBlock)
            bridge.xtrSourceURL = sourceURL
            return bridge
        }

    }

    val xtrContext: XTRContext = XTRContext(Thread.currentThread(), appContext)
    val xtrBreakpoint: XTRBreakpoint
    var xtrAssets: JSONObject? = null
        private set
//    var xtrApplication: XTRApplication.InnerObject? = null
    var xtrSourceURL: String? = null
        set(value) {
            field = value
            loadScript()
        }

    init {
        xtrContext.xtrBridge = this
        xtrBreakpoint = XTRBreakpoint(this)
        loadComponents()
        loadRuntime()
        loadPlugins()
    }

    private fun loadComponents() {
        val components: List<XTRComponentExport> = listOf(
                XTRImage.Companion,
                XTRApplication.Companion,
                XTRApplicationDelegate.Companion
        )
        components.forEach {
            val obj = it.exports(xtrContext)
            xtrContext.v8Runtime.add(it.name, obj)
            obj.release()
        }
    }

    private fun loadPlugins() {
        val applicationInfo = appContext.packageManager.getApplicationInfo(appContext.packageName, PackageManager.GET_META_DATA)
        applicationInfo.metaData.keySet().forEach { pluginName ->
            if (pluginName.startsWith("XTPlugin.")) {
                applicationInfo.metaData.getString(pluginName)?.let {
                    try {
                        val clazz = Class.forName(it)
                        clazz.getDeclaredConstructor(XTRContext::class.java).newInstance(xtrContext)
                    } catch (e: Exception) {}
                }
            }
        }
    }

    private fun loadRuntime() {
        xtrContext.evaluateScript("let XT = {};")
        xtrContext.appContext.assets.open("xt.android.min.js")?.let {
            val byteArray = ByteArray(it.available())
            it.read(byteArray)
            String(byteArray)?.let { xtrContext.evaluateScript(it) }
            it.close()
        }
    }

    fun loadScript() {
        val handler = Handler()
        xtrContext.evaluateScript("let XTRAppRef = null;")
        xtrSourceURL?.let { sourceURL ->
            if (sourceURL.startsWith("file://")) {
                if (sourceURL.startsWith("file:///android_asset/")) {
                    sourceURL.replace("file:///android_asset/", "").let {
                        try {
                            this.loadAssets()
                            val inputStream = appContext.assets.open(it)
                            val byteArray = ByteArray(inputStream.available())
                            inputStream.read(byteArray)
                            inputStream.close()
                            val script = String(byteArray)
                            xtrContext.evaluateScript(script)
                            xtrContext.evaluateScript("XTRAppRef")?.let {
                                (it as? Releasable)?.release()
                            }
                            handler.post {
                                completionBlock?.invoke()
                            }
                        } catch (e: java.lang.Exception) { handler.post { failureBlock?.invoke(e) };  e.printStackTrace() }
                    }
                }
            }
            else if (sourceURL.startsWith("http://") || sourceURL.startsWith("https://")) {
                Thread(Thread.currentThread().threadGroup, {
                    try {
                        loadAssets()
                        val req = Request.Builder().url(sourceURL).method("GET", null).build()
                        val res = OkHttpClient().newCall(req).execute()
                        val script = res.body()?.string() ?: return@Thread
                        handler.post {
                            xtrContext.evaluateScript(script)
                            xtrContext.evaluateScript("XTRAppRef")?.let {
                                (it as? Releasable)?.release()
                            }
                            completionBlock?.invoke()
                        }
                    } catch (e: Exception) { handler.post { failureBlock?.invoke(e) }; e.printStackTrace() }
                }, "XTREval").start()
            }
            else {
                Log.w("XTRBridge", "Unknown sourceURL type >>> $sourceURL")
            }
            return
        }
    }

    private fun loadAssets() {
        xtrSourceURL?.let { sourceURL ->
            if (sourceURL.startsWith("file://")) {
                if (sourceURL.startsWith("file:///android_asset/")) {
                    sourceURL.replace("file:///android_asset/", "").replace(".min.js", ".xtassets").let {
                        try {
                            val inputStream = appContext.assets.open(it)
                            val byteArray = ByteArray(inputStream.available())
                            inputStream.read(byteArray)
                            inputStream.close()
                            this.xtrAssets = JSONObject(String(byteArray))
                        } catch (e: Exception) {}
                    }
                }
            }
        }
    }

}
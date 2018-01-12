package com.opensource.xtruntime

import android.content.pm.PackageManager
import android.os.Handler
import android.util.Log
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONObject
import java.lang.ref.WeakReference

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRBridge(val appContext: android.content.Context, val completionBlock: ((bridge: XTRBridge) -> Unit)? = null, val failureBlock: ((e: Exception) -> Unit)? = null) {

    companion object {

        fun createWithAssets(appContext: android.content.Context, assetsName: String, completionBlock: ((bridge: XTRBridge) -> Unit)? = null): XTRBridge {
            val bridge = XTRBridge(appContext, completionBlock)
            bridge.sourceURL = "file:///android_asset/$assetsName"
            return bridge
        }

        fun createWithSourceURL(appContext: android.content.Context, sourceURL: String?, completionBlock: ((bridge: XTRBridge) -> Unit)? = null, failureBlock: ((e: Exception) -> Unit)? = null): XTRBridge {
            val bridge = XTRBridge(appContext, completionBlock, failureBlock)
            bridge.sourceURL = sourceURL
            return bridge
        }

    }

    var sourceURL: String? = null
        set(value) {
            field = value
            loadScript()
        }

    val xtrContext: XTRContext = XTRContext(appContext)

    val breakpoint: XTRBreakpoint

    var bundleAssets: JSONObject? = null
        private set

    var keyWindow: XTRWindow? = null

    var registeredComponents: Map<String, XTRComponentExport> = mapOf()

    init {
        xtrContext.bridge = WeakReference(this)
        breakpoint = XTRBreakpoint(this)
        loadComponents()
        loadRuntime()
        loadPlugins()
    }

    private fun loadComponents() {
        val components: List<XTRComponentExport> = listOf(
                XTRImage.JSExports(xtrContext),
                XTRApplication.JSExports(xtrContext),
                XTRApplicationDelegate.JSExports(xtrContext),
                XTRView.JSExports(xtrContext),
                XTRWindow.JSExports(xtrContext),
                XTRViewController.JSExports(xtrContext),
                XTRButton.JSExports(xtrContext),
                XTRImageView.JSExports(xtrContext),
                XTRLabel.JSExports(xtrContext),
                XTRCanvasView.JSExports(xtrContext),
                XTRTextField.JSExports(xtrContext),
                XTRTextView.JSExports(xtrContext),
                XTRDevice.JSExports(xtrContext),
                XTRScreen.JSExports(xtrContext),
                XTRNavigationController.JSExports(xtrContext)
        )
        val registeredComponents: MutableMap<String, XTRComponentExport> = mutableMapOf()
        components.forEach {
            val obj = it.exports()
            xtrContext.runtime.add(it.name, obj)
            obj.release()
            registeredComponents.put(it.name, it)
        }
        this.registeredComponents = registeredComponents.toMap()
    }

    private fun loadRuntime() {
        xtrContext.evaluateScript("let XT = {}; let objectRefs = {};")
        xtrContext.appContext.assets.open("xt.android.min.js")?.let {
            val byteArray = ByteArray(it.available())
            it.read(byteArray)
            String(byteArray)?.let { xtrContext.evaluateScript(it) }
            it.close()
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

    fun loadScript() {
        val handler = Handler()
        xtrContext.evaluateScript("let XTRAppRef = null;")
        sourceURL?.let { sourceURL ->
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
                            handler.post {
                                completionBlock?.invoke(this)
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
                            completionBlock?.invoke(this)
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
        sourceURL?.let { sourceURL ->
            if (sourceURL.startsWith("file://")) {
                if (sourceURL.startsWith("file:///android_asset/")) {
                    sourceURL.replace("file:///android_asset/", "").replace(".min.js", ".xtassets").let {
                        try {
                            val inputStream = appContext.assets.open(it)
                            val byteArray = ByteArray(inputStream.available())
                            inputStream.read(byteArray)
                            inputStream.close()
                            this.bundleAssets = JSONObject(String(byteArray))
                        } catch (e: Exception) {}
                    }
                }
            }
        }
    }

}
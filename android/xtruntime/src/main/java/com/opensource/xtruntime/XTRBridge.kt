package com.opensource.xtruntime

import android.content.pm.PackageManager
import android.os.Handler
import com.eclipsesource.v8.Releasable
import com.eclipsesource.v8.V8Object
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONObject

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRBridge(val appContext: android.content.Context, val bridgeScript: String? = null, val completionBlock: (() -> Unit)? = null) {

    companion object {

        var globalBridgeScript: String? = null
        var globalBridgeStackSize: Long = 1024 * 128

        fun setGlobalBridgeScriptWithAssets(appContext: android.content.Context, assetsName: String) {
            try {
                appContext.assets.open(assetsName)?.let { inputStream ->
                    val byteArray = ByteArray(inputStream.available())
                    inputStream.read(byteArray)
                    inputStream.close()
                    globalBridgeScript = String(byteArray)
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }

        fun createWithSourceURL(appContext: android.content.Context, sourceURL: String?, completionBlock: (() -> Unit)? = null): XTRBridge {
            val bridge = XTRBridge(appContext, null, completionBlock)
            bridge.xtrSourceURL = sourceURL
            return bridge
        }

    }

    val xtrContext: XTRContext = XTRContext(Thread.currentThread(), appContext)
    val xtrBreakpoint: XTRBreakpoint
    var xtrApplication: XTRApplication.InnerObject? = null
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
        loadScript()
    }

    private fun loadComponents() {
        val components: List<XTRComponent> = listOf(
                XTRApplicationDelegate(),
                XTRApplication(),
                XTRWindow(),
                XTRView(),
                XTRViewController(),
                XTRNavigationController(),
                XTRImageView(),
                XTRImage(),
                XTRLabel(),
                XTRButton(),
                XTRScrollView(),
                XTRTextField(),
                XTRTextView(),
                XTRCanvasView(),
                XTRCustomView(),
                XTRScreen(),
                XTRDevice()
        )
        components.forEach { component ->
            component.xtrContext = xtrContext
            component.v8Object()?.let {
                xtrContext.v8Runtime.add(component.name, it)
                it.release()
            }
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
        xtrContext.evaluateScript("let XTRAppRef = undefined;")
        xtrSourceURL?.let { sourceURL ->
            Thread(Thread.currentThread().threadGroup, {
                try {
                    val req = Request.Builder().url(sourceURL).method("GET", null).build()
                    val res = OkHttpClient().newCall(req).execute()
                    val script = res.body()?.string() ?: return@Thread
                    handler.post {
                        xtrContext.evaluateScript(script)
                        xtrContext.evaluateScript("XTRAppRef")?.let {
                            xtrApplication = XTRUtils.toApplication(it)
                            (it as? Releasable)?.release()
                        }
                        completionBlock?.invoke()
                    }
                } catch (e: Exception) { e.printStackTrace() }
            }, "XTREval", globalBridgeStackSize).start()
            return
        }
        (globalBridgeScript ?: bridgeScript)?.let { script ->
            xtrContext.evaluateScript(script)
            xtrContext.evaluateScript("XTRAppRef")?.let {
                xtrApplication = XTRUtils.toApplication(it)
                (it as? Releasable)?.release()
            }
            handler.post {
                completionBlock?.invoke()
            }
            return
        }
    }

}
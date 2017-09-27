package com.opensource.xtruntime

import android.os.Handler
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONObject
import org.mozilla.javascript.Context
import org.mozilla.javascript.ScriptableObject

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
    var xtrPluginInstances: List<Any> = listOf()

    init {
        xtrContext.xtrBridge = this
        xtrBreakpoint = XTRBreakpoint(this)
        loadComponents()
        loadPlugins()
        loadScript()
    }

    private fun loadComponents() {
        val components: List<XTRComponent> = listOf(
                XTRApplicationDelegate(),
                XTRApplication(),
                XTRWindow(),
                XTRTestComponent(),
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
                XTRCustomView()
        )
        components.forEach { component ->
            component.xtrContext = xtrContext
            ScriptableObject.putProperty(xtrContext.scope, component.name, Context.javaToJS(component, xtrContext.scope))
        }
    }

    private fun loadPlugins() {
        val pluginInstances: MutableList<Any> = mutableListOf()
        try {
            appContext.assets.list("").forEach {
                if (it.endsWith(".xtplugin.json")) {
                    try {
                        appContext.assets.open(it)?.let {
                            val bytes = ByteArray(it.available())
                            it.read(bytes)
                            it.close()
                            JSONObject(String(bytes))?.optString("main")?.let { clazzName ->
                                val clazz = Class.forName(clazzName)
                                val instance = clazz.getDeclaredConstructor(android.content.Context::class.java, Context::class.java, ScriptableObject::class.java).newInstance(appContext, xtrContext.jsContext, xtrContext.scope)
                                pluginInstances.add(instance)
                            }
                        }
                    } catch (e: Exception) {
                        System.out.println("Load Plugin Failure >>> " + it)
                    }
                }
            }
        } catch (e: Exception) {}
        this.xtrPluginInstances = pluginInstances.toList()
    }

    fun loadScript() {
        xtrSourceURL?.let { sourceURL ->
            val handler = Handler()
            Thread(Thread.currentThread().threadGroup, {
                try {
                    val req = Request.Builder().url(sourceURL).method("GET", null).build()
                    val res = OkHttpClient().newCall(req).execute()
                    val script = res.body()?.string() ?: return@Thread
                    val childJSContext = Context.enter()
                    childJSContext.optimizationLevel = -1
                    childJSContext.evaluateString(xtrContext.scope, script, "app.js", 1, null)
                    xtrApplication = XTRUtils.toApplication(xtrContext.scope.get("XTRAppRef"))
                    handler.post {
                        completionBlock?.invoke()
                    }
                } catch (e: Exception) { e.printStackTrace() }
            }, "XTREval", globalBridgeStackSize).start()
            return
        }
        (globalBridgeScript ?: bridgeScript)?.let { script ->
            val handler = Handler()
            Thread(Thread.currentThread().threadGroup, {
                val childJSContext = Context.enter()
                childJSContext.optimizationLevel = -1
                childJSContext.evaluateString(xtrContext.scope, script, "app.js", 1, null)
                xtrApplication = XTRUtils.toApplication(xtrContext.scope.get("XTRAppRef"))
                handler.post {
                    completionBlock?.invoke()
                }
            }, "XTREval", globalBridgeStackSize).start()
            return
        }
    }

}
package com.opensource.xtruntime

import android.os.Handler
import org.mozilla.javascript.Context
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRBridge(appContext: android.content.Context, bridgeScript: String? = null, val completionBlock: (() -> Unit)? = null) {

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

    }

    private val xtrContext: XTRContext = XTRContext(Thread.currentThread(), appContext)
    var xtrApplication: XTRApplication.InnerObject? = null

    init {
        attachComponents()
        val handler = Handler()
        Thread(Thread.currentThread().threadGroup, {
            val childJSContext = Context.enter()
            childJSContext.optimizationLevel = -1
            childJSContext.evaluateString(xtrContext.scope, globalBridgeScript ?: bridgeScript, "app.js", 1, null)
            xtrApplication = XTRUtils.toApplication(xtrContext.scope.get("XTRAppRef"))
            handler.post {
                completionBlock?.invoke()
            }
        }, "XTREval", globalBridgeStackSize).start()
    }

    private fun attachComponents() {
        val components: List<XTRComponent> = listOf(
                XTRApplicationDelegate(),
                XTRApplication(),
                XTRWindow(),
                XTRTestComponent(),
                XTRView()
        )
        components.forEach { component ->
            component.xtrContext = xtrContext
            ScriptableObject.putProperty(xtrContext.scope, component.name, Context.javaToJS(component, xtrContext.scope))
        }
    }

}
package com.opensource.xtruntime

import org.mozilla.javascript.Context
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRBridge(val appContext: android.content.Context, bridgeScript: String? = null) {

    companion object {

        var globalBridgeScript: String? = null

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

    val xtrContext: XTRContext = XTRContext(Thread.currentThread(), appContext)
    var xtrApplication: XTRApplication.InnerObject? = null

    init {
        XTRPolyfill.attachPolyfill(xtrContext)
        attachComponents()
        xtrContext.evaluateScript(globalBridgeScript ?: bridgeScript ?: "")
        xtrApplication = XTRUtils.toApplication(xtrContext.scope.get("XTRAppRef"))
    }

    private fun attachComponents() {
        val components: List<XTRComponent> = listOf(
                XTRApplicationDelegate(),
                XTRApplication(),
                XTRWindow(),
                XTRTestComponent()
        )
        components.forEach { component ->
            component.xtrContext = xtrContext
            ScriptableObject.putProperty(xtrContext.scope, component.name, Context.javaToJS(component, xtrContext.scope))
        }
    }

}
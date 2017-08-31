package com.opensource.xtruntime

import org.mozilla.javascript.Context
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRBridge {

    companion object {

        var globalBridgeScript: String? = null

        fun setGlobalBridgeScriptWithAssets(context: android.content.Context, assetsName: String) {
            try {
                context.assets.open(assetsName)?.let { inputStream ->
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

    val context: XTRContext = XTRContext(Thread.currentThread())

    init {
        XTRPolyfill.attachPolyfill(context)
        globalBridgeScript?.let {
            attachComponents()
            context.evaluateScript(it)
        }
    }

    private fun attachComponents() {
        val components: List<XTRComponent> = listOf(
                XTRApplicationDelegate.shared,
                XTRApplication(),
                XTRWindow(),
                XTRTestComponent()
        )
        components.forEach { component ->
            component.context = context
            ScriptableObject.putProperty(context.scope, component.name, Context.javaToJS(component, context.scope))
        }
    }

}
package com.opensource.xtruntime

import org.mozilla.javascript.Function
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRUtils {

    companion object {

        fun toWindow(target: Any?): XTRWindow.InnerObject? {
            return (target as? ScriptableObject)?.get("nativeObject") as? XTRWindow.InnerObject
        }

        fun toApplication(target: Any?): XTRApplication.InnerObject? {
            return (target as? ScriptableObject)?.get("nativeObject") as? XTRApplication.InnerObject
        }

        fun toApplicationDelegate(target: Any?): XTRApplicationDelegate.InnerObject? {
            return (target as? ScriptableObject)?.get("nativeObject") as? XTRApplicationDelegate.InnerObject
        }

        fun fromObject(context: XTRContext, target: Any): ScriptableObject? {
            ((context.scope.get("window") as? ScriptableObject)?.get("XTRObjCreater") as? ScriptableObject)?.let { creater ->
                (creater.get("create") as? Function)?.let {
                    return it.call(context.jsContext, context.scope, creater, arrayOf(target)) as? ScriptableObject
                }
            }
            return null
        }

    }

}
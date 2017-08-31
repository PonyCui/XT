package com.opensource.xtruntime

import org.mozilla.javascript.Context
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRPolyfill {

    companion object {

        fun attachPolyfill(context: XTRContext) {
            attachConsoleLog(context)
        }

        private fun attachConsoleLog(context: XTRContext) {
            ScriptableObject.putProperty(context.scope, "console", Context.javaToJS(Console(), context.scope))
        }

    }

    class Console {

        fun log(value: Any) {
            System.out.println("[XTR.Console] >>> " + value)
        }

    }

}
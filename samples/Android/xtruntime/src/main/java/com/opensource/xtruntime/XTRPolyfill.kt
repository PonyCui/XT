package com.opensource.xtruntime

import org.mozilla.javascript.Context
import org.mozilla.javascript.Function
import org.mozilla.javascript.ScriptableObject
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRPolyfill {

    companion object {

        fun attachPolyfill(context: XTRContext) {
            ScriptableObject.putProperty(context.scope, "Polyfill", Context.javaToJS(Polyfill(context), context.scope))
            attachTimeout(context)
            attachConsole(context)
        }

        private fun attachTimeout(context: XTRContext) {
            context.jsContext.evaluateString(context.scope, "var setTimeout = function(callback, ms) { return Polyfill.setTimeout(callback, ms) }", "polyfill.setTimeout.js", 1, null)
            context.jsContext.evaluateString(context.scope, "var clearTimeout = function(handler) { Polyfill.clearTimeout(handler) }", "polyfill.clearTimeout.js", 1, null)
        }

        private fun attachConsole(context: XTRContext) {
            context.jsContext.evaluateString(context.scope, "var console = {log: function(value){ Polyfill.consoleLog(value) }};", "polyfill.console.js", 1, null)
        }

    }

    class Polyfill(val context: XTRContext) {

        companion object {
            val timerStack: MutableMap<String, Boolean> = mutableMapOf()
        }

        fun clearTimeout(handler: Any?) {
            (handler as? String)?.let {
                timerStack.remove(handler)
            }
        }

        fun setTimeout(callback: Any?, ms: Any?): String? {
            val cb = (callback as? Function) ?: return null
            val timeoutHandler = UUID.randomUUID().toString()
            Timer().schedule(object: TimerTask() {
                override fun run() {
                    if (timerStack[timeoutHandler] == true) {
                        context.callWithArguments(cb, arrayOf())
                    }
                }
            }, ((ms as? Double) ?: 0.0).toLong())
            timerStack[timeoutHandler] = true
            return timeoutHandler
        }

        fun consoleLog(value: Any?) {
            System.out.println("[XTR.Console] >>> " + value)
        }

    }

}
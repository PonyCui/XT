package com.opensource.xtruntime

import android.view.Choreographer
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
            attachInterval(context)
            attachConsole(context)
            attachRAF(context)
        }

        private fun attachTimeout(context: XTRContext) {
            context.jsContext.evaluateString(context.scope, "var setTimeout = function(callback, ms) { return Polyfill.setTimeout(callback, ms) }; window.setTimeout = setTimeout;", "polyfill.setTimeout.js", 1, null)
            context.jsContext.evaluateString(context.scope, "var clearTimeout = function(handler) { Polyfill.clearTimeout(handler) }; window.clearTimeout = clearTimeout;", "polyfill.clearTimeout.js", 1, null)
        }

        private fun attachInterval(context: XTRContext) {
            context.jsContext.evaluateString(context.scope, "var setInterval = function(callback, ms) { return Polyfill.setInterval(callback, ms) }; window.setInterval = setInterval;", "polyfill.setInterval.js", 1, null)
            context.jsContext.evaluateString(context.scope, "var clearInterval = function(handler) { Polyfill.clearInterval(handler) }; window.clearInterval = clearInterval;", "polyfill.clearInterval.js", 1, null)
        }

        private fun attachConsole(context: XTRContext) {
            context.jsContext.evaluateString(context.scope, "var console = {log: function(value){ Polyfill.consoleLog(value) }}; window.console = console;", "polyfill.console.js", 1, null)
        }

        private fun attachRAF(context: XTRContext) {
            context.jsContext.evaluateString(context.scope, "var requestAnimationFrame = function(callback) { return Polyfill.requestAnimationFrame(callback) }; window.requestAnimationFrame = requestAnimationFrame;", "polyfill.RAF.js", 1, null)
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

        fun clearInterval(handler: Any?) {
            (handler as? String)?.let {
                timerStack.remove(handler)
            }
        }

        fun setInterval(callback: Any?, ms: Any?): String? {
            val cb = (callback as? Function) ?: return null
            val intervalHandler = UUID.randomUUID().toString()
            Timer().schedule(object: TimerTask() {
                override fun run() {
                    if (timerStack[intervalHandler] == true) {
                        context.callWithArguments(cb, arrayOf())
                    }
                }
            }, ((ms as? Double) ?: 0.0).toLong(), ((ms as? Double) ?: 0.0).toLong())
            timerStack[intervalHandler] = true
            return intervalHandler
        }

        fun consoleLog(value: Any?) {
            System.out.println("[XTR.Console] >>> " + value)
        }

        fun requestAnimationFrame(callback: Any?) {
            Choreographer.getInstance().postFrameCallback {
                (callback as? Function)?.let {
                    context.callWithArguments(it, arrayOf())
                }
            }
        }

    }

}
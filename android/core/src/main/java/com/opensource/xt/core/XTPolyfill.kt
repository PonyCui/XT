package com.opensource.xt.core

import android.os.Build
import android.os.Handler
import android.view.Choreographer
import com.eclipsesource.v8.Releasable
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Function
import com.eclipsesource.v8.V8Object
import java.util.*
import kotlin.concurrent.timerTask

/**
 * Created by cuiminghui on 2017/10/12.
 */
class XTPolyfill {

    companion object {

        private val implementation = PolyfillImplementation()
        var exceptionHandler: ((e: Exception) -> Unit)? = null
        var consoleMessageHandler: ((message: String) -> Unit)? = null

        fun addPolyfills(runtime: V8) {
            val scope = V8Object(runtime)
            runtime.add("_PolyfillImplementation", scope)
            runtime.executeVoidScript("if (typeof window === 'undefined') {var window = {};}")
            attachTimeout(runtime, scope)
            attachInterval(runtime, scope)
            attachImmediate(runtime, scope)
            attachRAF(runtime, scope)
            scope.release()
            val console = V8Object(runtime)
            runtime.add("console", console)
            attachConsole(runtime, console)
            console.release()
        }

        private fun attachTimeout(runtime: V8, scope: V8Object) {
            scope.registerJavaMethod(implementation, "setTimeout", "setTimeout", arrayOf(V8Function::class.java, Int::class.java))
            scope.registerJavaMethod(implementation, "clearTimeout", "clearTimeout", arrayOf(String::class.java))
            runtime.executeVoidScript("let setTimeout = function(callback, ms) { return _PolyfillImplementation.setTimeout(callback, ms) }; window.setTimeout = setTimeout;")
            runtime.executeVoidScript("let clearTimeout = function(handler) { if (typeof handler !== 'string') { return ; }; _PolyfillImplementation.clearTimeout(handler) }; window.clearTimeout = clearTimeout;")
        }

        private fun attachInterval(runtime: V8, scope: V8Object) {
            scope.registerJavaMethod(implementation, "setInterval", "setInterval", arrayOf(V8Function::class.java, Int::class.java))
            scope.registerJavaMethod(implementation, "clearInterval", "clearInterval", arrayOf(String::class.java))
            runtime.executeVoidScript("let setInterval = function(callback, ms) { return _PolyfillImplementation.setInterval(callback, ms) }; window.setInterval = setInterval;")
            runtime.executeVoidScript("let clearInterval = function(handler) { if (typeof handler !== 'string') { return ; }; _PolyfillImplementation.clearInterval(handler) }; window.clearInterval = clearInterval;")
        }

        private fun attachImmediate(runtime: V8, scope: V8Object) {
            runtime.executeVoidScript("let setImmediate = function(callback) { return _PolyfillImplementation.setTimeout(callback, 0) }; window.setTimeout = setTimeout;")
            runtime.executeVoidScript("let clearImmediate = function(handler) { if (typeof handler !== 'string') { return ; }; _PolyfillImplementation.clearTimeout(handler) }; window.clearTimeout = clearTimeout;")
        }

        private fun attachRAF(runtime: V8, scope: V8Object) {
            scope.registerJavaMethod(implementation, "requestAnimationFrame", "requestAnimationFrame", arrayOf(V8Function::class.java))
            scope.registerJavaMethod(implementation, "clearAnimationFrame", "clearAnimationFrame", arrayOf(String::class.java))
            runtime.executeVoidScript("var requestAnimationFrame = function(callback) { return _PolyfillImplementation.requestAnimationFrame(callback) }; window.requestAnimationFrame = requestAnimationFrame;")
            runtime.executeVoidScript("var clearAnimationFrame = function(handler) { if (typeof handler !== 'string') { return ; }; return _PolyfillImplementation.clearAnimationFrame(handler) }; window.clearAnimationFrame = clearAnimationFrame;")
        }

        private fun attachConsole(runtime: V8, scope: V8Object) {
            scope.registerJavaMethod({ p1, p2 ->
                (0 until p2.length())?.forEach {
                    p2.get(it)?.let {
                        consoleMessageHandler?.invoke("[XT,LOG] >>>" + it)
                        (it as? Releasable)?.release()
                    }
                }
                p1.release()
            }, "log")
            scope.registerJavaMethod({ p1, p2 ->
                (0 until p2.length())?.forEach {
                    p2.get(it)?.let {
                        consoleMessageHandler?.invoke("[XT,ERROR] >>>" + it)
                        (it as? Releasable)?.release()
                    }
                }
                p1.release()
            }, "error")
            scope.registerJavaMethod({ p1, p2 ->
                (0 until p2.length())?.forEach {
                    p2.get(it)?.let {
                        consoleMessageHandler?.invoke("[XT,INFO] >>>" + it)
                        (it as? Releasable)?.release()
                    }
                }
                p1.release()
            }, "info")
        }

    }

    class PolyfillImplementation {

        companion object {
            val timerStack: MutableMap<String, Boolean> = mutableMapOf()
        }

        val sharedTimer = Timer()
        val sharedHandler = Handler()

        fun clearTimeout(handler: String) {
            timerStack.remove(handler)
        }

        fun setTimeout(callback: V8Function, ms: Int): String {
            val callback = callback.twin()
            val timeoutHandler = UUID.randomUUID().toString()
            sharedTimer.schedule(object: TimerTask() {
                override fun run() {
                    sharedHandler.post {
                        if (callback.isReleased || callback.runtime.isReleased) { return@post }
                        if (timerStack[timeoutHandler] == true) {
                            try {
                                callback?.call(null, null)
                            } catch (e: Exception) {
                                exceptionHandler?.invoke(e)
                            }
                        }
                        callback.release()
                    }
                }
            }, ms.toLong())
            timerStack[timeoutHandler] = true
            return timeoutHandler
        }

        fun clearInterval(handler: String) {
            timerStack.remove(handler)
        }

        fun setInterval(callback: V8Function, ms: Int): String {
            val callback = callback.twin()
            val intervalHandler = UUID.randomUUID().toString()
            sharedTimer.schedule(object: TimerTask() {
                override fun run() {
                    sharedHandler.post {
                        if (callback.isReleased || callback.runtime.isReleased) { return@post }
                        if (timerStack[intervalHandler] == true) {
                            try {
                                callback?.call(null, null)
                            } catch (e: Exception) {
                                exceptionHandler?.invoke(e)
                            }
                        }
                        else {
                            callback.release()
                        }
                    }
                }
            }, ms.toLong(), ms.toLong())
            timerStack[intervalHandler] = true
            return intervalHandler
        }

        fun requestAnimationFrame(callback: V8Function): String  {
            val callback = callback.twin()
            val animationFrameHandler = UUID.randomUUID().toString()
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                Choreographer.getInstance().postFrameCallback {
                    sharedHandler.post {
                        if (callback.isReleased || callback.runtime.isReleased) { return@post }
                        if (timerStack[animationFrameHandler] == true) {
                            callback?.call(null, null)
                        }
                        callback.release()
                    }
                }
            }
            else {
                sharedTimer.schedule(timerTask {
                    sharedHandler.post {
                        if (timerStack[animationFrameHandler] == true) {
                            callback?.call(null, null)
                        }
                        callback.release()
                    }
                }, 16)
            }
            timerStack[animationFrameHandler] = true
            return animationFrameHandler
        }

        fun clearAnimationFrame(handler: String) {
            timerStack.remove(handler)
        }

    }

}
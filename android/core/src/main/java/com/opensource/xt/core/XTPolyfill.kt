package com.opensource.xt.core

import android.os.Build
import android.os.Handler
import android.view.Choreographer
import com.eclipsesource.v8.*
import java.util.*
import kotlin.concurrent.timerTask

/**
 * Created by cuiminghui on 2017/10/12.
 */
class XTPolyfill {

    companion object {

        val timerStack: MutableMap<String, Boolean> = mutableMapOf()
        var exceptionHandler: ((e: Exception) -> Unit)? = null
        var consoleMessageHandler: ((message: String) -> Unit)? = null
        val sharedTimer = Timer()
        val sharedHandler = Handler()

        fun addPolyfills(runtime: V8) {
            attachTimeout(runtime)
            attachInterval(runtime)
            attachImmediate(runtime)
            attachRAF(runtime)
            val console = V8Object(runtime)
            runtime.add("console", console)
            attachConsole(runtime, console)
            XTContext.release(console)
        }

        private fun attachTimeout(runtime: V8) {
            runtime.registerJavaMethod(this, "setTimeout", "setTimeout", arrayOf(V8Function::class.java, Int::class.java))
            runtime.registerJavaMethod(this, "clearTimeout", "clearTimeout", arrayOf(Object::class.java))
        }

        private fun attachInterval(runtime: V8) {
            runtime.registerJavaMethod(this, "setInterval", "setInterval", arrayOf(V8Function::class.java, Int::class.java))
            runtime.registerJavaMethod(this, "clearInterval", "clearInterval", arrayOf(Object::class.java))
        }

        private fun attachImmediate(runtime: V8) {
            runtime.registerJavaMethod(this, "setImmediate", "setImmediate", arrayOf(V8Function::class.java))
            runtime.registerJavaMethod(this, "clearImmediate", "clearImmediate", arrayOf(Object::class.java))
        }

        private fun attachRAF(runtime: V8) {
            runtime.registerJavaMethod(this, "requestAnimationFrame", "requestAnimationFrame", arrayOf(V8Function::class.java))
            runtime.registerJavaMethod(this, "clearAnimationFrame", "clearAnimationFrame", arrayOf(Object::class.java))
        }

        private fun attachConsole(runtime: V8, scope: V8Object) {
            scope.registerJavaMethod({ p1, p2 ->
                (0 until p2.length())?.forEach {
                    p2.get(it)?.let {
                        consoleMessageHandler?.invoke("[XT,LOG] >>>" + it)
                        (it as? Releasable)?.release()
                    }
                }
                XTContext.release(p1)
            }, "log")
            scope.registerJavaMethod({ p1, p2 ->
                (0 until p2.length())?.forEach {
                    p2.get(it)?.let {
                        consoleMessageHandler?.invoke("[XT,ERROR] >>>" + it)
                        (it as? Releasable)?.release()
                    }
                }
                XTContext.release(p1)
            }, "error")
            scope.registerJavaMethod({ p1, p2 ->
                (0 until p2.length())?.forEach {
                    p2.get(it)?.let {
                        consoleMessageHandler?.invoke("[XT,INFO] >>>" + it)
                        (it as? Releasable)?.release()
                    }
                }
                XTContext.release(p1)
            }, "info")
        }

        fun clearTimeout(handler: Object) {
            (handler as? String)?.let {
                timerStack.remove(it)
            }
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
                        XTContext.release(callback)
                    }
                }
            }, ms.toLong())
            timerStack[timeoutHandler] = true
            return timeoutHandler
        }

        fun clearInterval(handler: Object) {
            (handler as? String)?.let {
                timerStack.remove(it)
            }
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
                            XTContext.release(callback)
                        }
                    }
                }
            }, ms.toLong(), ms.toLong())
            timerStack[intervalHandler] = true
            return intervalHandler
        }

        fun clearImmediate(handler: Object) {
            clearTimeout(handler)
        }

        fun setImmediate(callback: V8Function): String {
            return setTimeout(callback, 0)
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
                        XTContext.release(callback)
                    }
                }
            }
            else {
                sharedTimer.schedule(timerTask {
                    sharedHandler.post {
                        if (timerStack[animationFrameHandler] == true) {
                            callback?.call(null, null)
                        }
                        XTContext.release(callback)
                    }
                }, 16)
            }
            timerStack[animationFrameHandler] = true
            return animationFrameHandler
        }

        fun clearAnimationFrame(handler: Object) {
            (handler as? String)?.let {
                timerStack.remove(it)
            }
        }

    }

}
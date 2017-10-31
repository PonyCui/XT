package com.opensource.xtruntime

import android.os.Handler
import com.eclipsesource.v8.*
import com.opensource.xtpolyfill.XTPolyfill
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRContext(private val thread: Thread, val appContext: android.content.Context) {

    var xtrBridge: XTRBridge? = null
    val v8Runtime: V8 = V8.createV8Runtime()
    val sharedTimer = Timer()
    private val handler = Handler()
    private val v8Releasable: MutableList<Releasable> = mutableListOf()

    init {
        XTPolyfill.addPolyfills(v8Runtime)
        XTPolyfill.exceptionHandler = {
            handleException(it)
        }
        XTPolyfill.consoleMessageHandler = {
            handleConsoleMessage(it)
        }
    }

    fun handleException(e: Exception) {
        e.printStackTrace()
    }

    fun handleConsoleMessage(message: String) {
        System.out.println(message)
    }

    fun autoRelease(releasable: V8Object): V8Object {
        v8Releasable.add(releasable)
        return releasable
    }

    fun release() {
        sharedTimer.cancel()
        v8Releasable.forEach { it.release() }
        try {
            v8Runtime.release(true)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun evaluateScript(script: String): Any? {
        if (v8Runtime.isReleased) { return null }
        return try {
            return v8Runtime.executeScript(script)
        } catch (e: Exception) {
            handleException(e)
            return null
        }
    }

    fun invokeMethod(scriptObject: V8Object?, method: String, arguments: List<Any>?, asyncResult: ((value: Any?) -> Unit)? = null): Any? {
        if (v8Runtime.isReleased) { return null }
        if (scriptObject == null) {
            return V8.getUndefined()
        }
        try {
            if (Thread.currentThread() != thread) {
                handler.post {
                    invokeMethod(scriptObject, method, arguments, asyncResult)
                }
            }
            else {
                val params = if (arguments == null || arguments.isEmpty()) null else XTRUtils.fromObject(this, arguments) as? V8Array
                val returnValue = scriptObject.executeFunction(method, params)
                params?.release()
                asyncResult?.invoke(returnValue)
                return returnValue
            }
        } catch (e: Exception) {
            handleException(e)
        }
        return null
    }

    fun callWithArguments(func: V8Function, arguments: List<Any>?, asyncResult: ((value: Any?) -> Unit)? = null): Any? {
        if (v8Runtime.isReleased) { return null }
        return try {
            if (Thread.currentThread() != thread) {
                handler.post {
                    callWithArguments(func, arguments, asyncResult)
                }
                null
            }
            else {
                val params = if (arguments == null || arguments.isEmpty()) null else XTRUtils.fromObject(this, arguments) as? V8Array
                val returnValue = func.call(null, params)
                params?.release()
                asyncResult?.invoke(returnValue)
                returnValue
            }
        } catch (e: Exception) {
            handleException(e)
            null
        }
    }

}
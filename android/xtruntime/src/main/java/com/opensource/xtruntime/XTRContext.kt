package com.opensource.xtruntime

import android.os.Handler
import com.eclipsesource.v8.*
import com.opensource.xtmem.XTMemoryManager
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
        XTMemoryManager.attachContext(v8Runtime)
        XTPolyfill.addPolyfills(v8Runtime)
        XTPolyfill.exceptionHandler = {
            handleException(it)
        }
        XTPolyfill.consoleMessageHandler = {
            handleConsoleMessage(it)
        }
    }

    fun handleException(e: Exception) {
        System.out.println("XT,ERROR >>> " + e.message)
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
            v8Runtime.executeScript(script)
        } catch (e: Exception) {
            handleException(e)
            null
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

    companion object {

        fun callWithArgument(func: V8Value?, argument: Any?): Any? {
            (func as? V8Function)?.takeIf { !it.runtime.isReleased }?.let {
                try {
                    var args: V8Array? = null
                    argument?.let { argument ->
                        val v8Array = V8Array(it.runtime)
                        (argument as? Int)?.let { v8Array.push(it) }
                        (argument as? String)?.let { v8Array.push(it) }
                        (argument as? V8Value)?.let { v8Array.push(it) }
                        (argument as? Double)?.let { v8Array.push(it) }
                        (argument as? Boolean)?.let { v8Array.push(it) }
                        args = v8Array
                    }
                    val result = it.call(null, args)
                    args?.release()
                    return result
                } catch (e: Exception) { e.printStackTrace() }
            }
            return null
        }

    }

}
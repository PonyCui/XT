package com.opensource.xtruntime

import android.os.Handler
import com.eclipsesource.v8.*
import com.opensource.xtmem.XTMemoryManager
import com.opensource.xtpolyfill.XTPolyfill
import java.lang.ref.WeakReference
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRContext(val appContext: android.content.Context) {

    var bridge: WeakReference<XTRBridge>? = null
    val runtime: V8 = V8.createV8Runtime()
    val sharedTimer = Timer()

    init {
        XTMemoryManager.attachContext(runtime)
        XTPolyfill.addPolyfills(runtime)
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

    fun release() {
        sharedTimer.cancel()
        try {
            runtime.release(true)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun evaluateScript(script: String): Any? {
        if (runtime.isReleased) { return null }
        return try {
            runtime.executeScript(script)
        } catch (e: Exception) {
            handleException(e)
            null
        }
    }

    companion object {

        fun invokeMethod(scriptObject: V8Object?, method: String, arguments: List<Any>? = null): Any? {
            scriptObject?.takeIf { !it.isUndefined && !it.runtime.isReleased }?.let {
                try {
                    var args: V8Array? = null
                    arguments?.let { arguments ->
                        val v8Array = V8Array(it.runtime)
                        arguments.forEach { argument ->
                            (argument as? Int)?.let { v8Array.push(it) }
                            (argument as? Long)?.let { v8Array.push(it.toInt()) }
                            (argument as? String)?.let { v8Array.push(it) }
                            (argument as? V8Value)?.let { v8Array.push(it) }
                            (argument as? Double)?.let { v8Array.push(it) }
                            (argument as? Boolean)?.let { v8Array.push(it) }
                        }
                        args = v8Array
                    }
                    val result = it.executeFunction(method, args)
                    args?.release()
                    return result
                } catch (e: Exception) { e.printStackTrace() }
            }
            return null
        }

        fun callWithArgument(func: V8Value?, argument: Any? = null): Any? {
            return this.callWithArguments(func, if (argument != null) kotlin.collections.listOf(argument) else null)
        }

        fun callWithArguments(func: V8Value?, arguments: List<Any>? = null): Any? {
            (func as? V8Function)?.takeIf { !it.runtime.isReleased }?.let {
                try {
                    var args: V8Array? = null
                    arguments?.let { arguments ->
                        val v8Array = V8Array(it.runtime)
                        arguments.forEach { argument ->
                            (argument as? Int)?.let { v8Array.push(it) }
                            (argument as? String)?.let { v8Array.push(it) }
                            (argument as? V8Value)?.let { v8Array.push(it) }
                            (argument as? Double)?.let { v8Array.push(it) }
                            (argument as? Boolean)?.let { v8Array.push(it) }
                        }
                        args = v8Array
                    }
                    val result = it.call(null, args)
                    args?.release()
                    return result
                } catch (e: Exception) { e.printStackTrace() }
            }
            return null
        }

        fun release(vararg v8Objects: V8Object) {
            v8Objects.forEach { if (!it.isUndefined && !it.runtime.isReleased) { it.release() } }
        }

    }

}
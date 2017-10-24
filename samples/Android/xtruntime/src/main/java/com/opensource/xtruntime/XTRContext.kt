package com.opensource.xtruntime

import android.os.Handler
import com.eclipsesource.v8.*
import com.opensource.xtpolyfill.XTPolyfill
import org.mozilla.javascript.*
import org.mozilla.javascript.Function

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRContext(private val thread: Thread, val appContext: android.content.Context) {

    var xtrBridge: XTRBridge? = null
    val v8Runtime = V8.createV8Runtime()
    val handler = Handler()

    init {
        XTPolyfill.addPolyfills(v8Runtime)
//        XTPolyfill.exceptionHandler = {
//            handleException(it)
//        }
    }

    fun handleException(e: Exception) {

    }

    fun handleConsoleMessage(message: String) {

    }

    fun evaluateScript(script: String): Any? {
        return try {
            return v8Runtime.executeScript(script)
        } catch (e: Exception) {
            handleException(e)
            return null
        }
    }

    fun invokeMethod(scriptObject: V8Object?, method: String, arguments: Array<Any>, asyncResult: ((value: Any?) -> Unit)? = null): Any? {
        if (scriptObject == null) {
            return Undefined.instance
        }
        try {
            if (Thread.currentThread() != thread) {
                handler.post {
                    val v8Args = V8Array(v8Runtime)
                    arguments.forEach {
                        //todo
                    }
                    val returnValue = scriptObject.executeFunction(method, v8Args)
                    v8Args.release()
                    asyncResult?.invoke(returnValue)
                }
            }
            else {
                val v8Args = V8Array(v8Runtime)
                arguments.forEach {
                    //todo
                }
                val returnValue = scriptObject.executeFunction(method, v8Args)
                asyncResult?.invoke(returnValue)
                v8Args.release()
                return returnValue
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return null
    }

    fun callWithArguments(func: V8Function, arguments: Array<Any>, asyncResult: ((value: Any?) -> Unit)? = null): Any? {
        return try {
            if (Thread.currentThread() != thread) {
                handler.post {
                    val v8Args = V8Array(v8Runtime)
                    arguments.forEach {
                        //todo
                    }
                    val returnValue = func.call(null, v8Args)
                    v8Args.release()
                    asyncResult?.invoke(returnValue)
                }
                null
            }
            else {
                val v8Args = V8Array(v8Runtime)
                arguments.forEach {
                    //todo
                }
                val returnValue = func.call(null, v8Args)
                v8Args.release()
                returnValue
            }
        } catch (e: Exception) {
            null
        }
    }

}
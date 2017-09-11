package com.opensource.xtruntime

import android.os.Handler
import org.mozilla.javascript.Context
import org.mozilla.javascript.Function
import org.mozilla.javascript.Scriptable
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRContext(private val thread: Thread, val appContext: android.content.Context) {

    var jsContext: Context = Context.enter()
    val scope = jsContext.initStandardObjects()!!
    val handler = Handler()

    init {
        jsContext.optimizationLevel = -1
        jsContext.evaluateString(scope, "var window = {isAndroid: true}; var document = {}; var XTRAppRef = undefined", "define.js", 1, null)
        XTRPolyfill.attachPolyfill(this)
    }

    fun resetJSContext() {
        jsContext = Context.enter()
        jsContext.optimizationLevel = -1
    }

    fun evaluateScript(script: String): Any? {
        return try {
            jsContext.evaluateString(scope, script, "app.js", 1, null)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun invokeMethod(scriptObject: ScriptableObject?, method: String, arguments: Array<Any>, asyncResult: ((value: Any?) -> Unit)? = null): Any? {
        if (scriptObject == null) {
            return null
        }
        try {
            if (Thread.currentThread() != thread) {
                handler.post {
                    val returnValue = ScriptableObject.callMethod(jsContext, scriptObject, method, arguments)
                    asyncResult?.invoke(returnValue)
                }
            }
            else {
                return ScriptableObject.callMethod(jsContext, scriptObject, method, arguments)
            }
        } catch (e: Exception) {}
        return null
    }

    fun callWithArguments(func: Function, arguments: Array<Any>, asyncResult: ((value: Any?) -> Unit)? = null): Any? {
        return try {
            if (Thread.currentThread() != thread) {
                handler.post {
                    val returnValue = func.call(jsContext, func.parentScope ?: scope, func.parentScope ?: scope, arguments)
                    asyncResult?.invoke(returnValue)
                }
                null
            }
            else {
                func.call(jsContext, func.parentScope ?: scope, func.parentScope ?: scope, arguments)
            }
        } catch (e: Exception) {
            null
        }
    }

}
package com.opensource.xtruntime

import org.mozilla.javascript.Context
import org.mozilla.javascript.Function
import org.mozilla.javascript.Scriptable
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRContext(private val thread: Thread, val appContext: android.content.Context) {

    val jsContext: Context = Context.enter()
    val scope = jsContext.initStandardObjects()!!

    init {
        jsContext.optimizationLevel = -1
    }

    fun evaluateScript(script: String): Any? {
        return try {
            jsContext.evaluateString(scope, "var window = {}; var XTRAppRef = undefined", "define.js", 1, null)
            jsContext.evaluateString(scope, script, "app.js", 1, null)
        } catch (e: Exception) {
            null
        }
    }

    fun invokeMethod(scriptObject: ScriptableObject?, method: String, arguments: Array<Any>, asyncResult: ((value: Any?) -> Unit)? = null): Any? {
        if (scriptObject == null) {
            return null
        }
        try {
            if (Thread.currentThread() != thread) {
                thread.run {
                    asyncResult?.invoke(ScriptableObject.callMethod(jsContext, scriptObject, method, arguments))
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
                thread.run {
                    asyncResult?.invoke(func.call(jsContext, func.parentScope ?: scope, func.parentScope ?: scope, arguments))
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
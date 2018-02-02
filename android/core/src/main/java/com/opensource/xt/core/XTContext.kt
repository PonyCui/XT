package com.opensource.xt.core

import android.os.Handler
import com.eclipsesource.v8.*
import java.lang.ref.WeakReference
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */
open class XTContext(val appContext: android.content.Context, val attachingContext: XTContext? = null) {

    val runtime: V8 = attachingContext?.runtime ?: V8.createV8Runtime()
    val sharedTimer = Timer()
    val sharedHandler = Handler()
    private var childContexts: MutableList<XTContext> = mutableListOf()
    private var isGlobalVariableDidSetup = false

    init {
        setup()
        Handler().post {
            attachingContext?.childContexts?.add(this)
        }
    }

    open protected fun setup() {
        attachingContext?.let { return }
        if (!isGlobalVariableDidSetup) {
            this.evaluateScript("let objectRefs = {}; let window = {}; let global = window;")
            XTMemoryManager.attachContext(runtime)
            XTPolyfill.addPolyfills(runtime)
            XTPolyfill.exceptionHandler = {
                handleException(it)
                XTDebug.sharedDebugger.sendLog("[XT,Error] >>>" + it.message)
            }
            XTPolyfill.consoleMessageHandler = {
                handleConsoleMessage(it)
                XTDebug.sharedDebugger.sendLog(it)
            }
            this.loadCoreComponents()
            this.loadCoreScript()
            isGlobalVariableDidSetup = true
        }
    }

    lateinit open var _registeredComponents: MutableMap<String, XTComponentExport>

    var registeredComponents: Map<String, XTComponentExport> = mapOf()
        get() { return this._registeredComponents.toMap() }

    fun addComponent(exportInstance: XTComponentExport, globalName: String?) {
        val obj = exportInstance.exports()
        this.runtime.add(globalName ?: exportInstance.name, obj)
        obj.release()
        _registeredComponents.put(globalName ?: exportInstance.name, exportInstance)
    }

    private fun loadCoreComponents() {
        _registeredComponents = mutableMapOf()
        val components: List<XTComponentExport> = listOf(
                XTClassLoader.JSExports(this),
                XTDebug.JSExports(this)
        )
        components.forEach {
            val obj = it.exports()
            this.runtime.add(it.name, obj)
            obj.release()
            _registeredComponents.put(it.name, it)
        }
    }

    private fun loadCoreScript() {
        this.appContext.assets.open("xt.core.android.min.js")?.let {
            val byteArray = ByteArray(it.available())
            it.read(byteArray)
            String(byteArray).let { this.evaluateScript(it) }
            it.close()
        }
    }

    fun handleException(e: Exception) {
        System.out.println("XT,ERROR >>> " + e.message)
        e.printStackTrace()
    }

    fun handleConsoleMessage(message: String) {
        System.out.println(message)
    }

    open fun release() {
        sharedTimer.cancel()
        try {
            runtime.release(true)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    open fun evaluateScript(script: String): Any? {
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
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
            return null
        }

        fun callWithArgument(func: V8Value?, argument: Any? = null): Any? {
            return callWithArguments(func, if (argument != null) listOf(argument) else null)
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
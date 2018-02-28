package com.opensource.xt.foundation

import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Function
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTContext
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager
import okhttp3.Call
import okhttp3.Callback
import okhttp3.Response
import java.io.IOException

/**
 * Created by cuiminghui on 2018/1/30.
 */
class XTFURLSessionTask(val context: XTContext, val callable: Call, val callback: V8Function) {

    fun resume() {
        callable.enqueue(object: Callback {

            override fun onFailure(call: Call?, e: IOException?) {
                context.takeIf { !it.runtime.isReleased }?.let {
                    context.sharedHandler.post {
                        XTContext.callWithArguments(callback, listOf(V8.getUndefined(), V8.getUndefined(), e?.message ?: "Unknown error."))
                    }
                }
            }

            override fun onResponse(call: Call?, response: Response?) {
                context.takeIf { !it.runtime.isReleased }?.let {
                    val resBytes = response?.body()?.bytes()
                    context.sharedHandler.post {
                        var dataRef: String? = null
                        resBytes?.let {
                            XTFData(it).let {
                                val managedObject = XTManagedObject(it)
                                XTMemoryManager.add(managedObject)
                                dataRef = managedObject.objectUUID
                            }
                        }
                        var resRef: String? = null
                        response?.let {
                            XTFURLResponse(it)?.let {
                                val managedObject = XTManagedObject(it)
                                XTMemoryManager.add(managedObject)
                                resRef = managedObject.objectUUID
                            }
                        }
                        XTContext.callWithArguments(callback, listOf(dataRef ?: V8.getUndefined(), resRef ?: V8.getUndefined()))
                    }
                }
            }
        })
    }

    fun cancel() {
        XTContext.release(callback)
    }

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTFURLSessionTask"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "resume", "resume", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "cancel", "cancel", arrayOf(String::class.java))
            return exports
        }

        fun resume(objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTFURLSessionTask)?.resume()
        }

        fun cancel(objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTFURLSessionTask)?.cancel()
        }

    }
}
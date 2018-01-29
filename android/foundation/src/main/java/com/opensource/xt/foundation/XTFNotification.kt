package com.opensource.xt.foundation

import android.os.Handler
import android.os.Looper
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTContext
import java.lang.ref.WeakReference
import java.util.*

/**
 * Created by cuiminghui on 2018/1/28.
 */
class XTFNotification {

    companion object {

        val observers: MutableMap<String, Observer> = mutableMapOf()

        fun postNotification(name: String, obj: Object, userInfo: Map<String, Any>) {
            observers.keys.filter { it == name }.mapNotNull { return@mapNotNull observers[it] }.forEach {
                it.threadHandler.post {
                    
                }
            }
        }

    }

    class Observer(val name: String, val context: WeakReference<XTContext>) {

        val handler: String = UUID.randomUUID().toString()
        val threadHandler = Handler()

    }

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTFNotification"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "addObserver", "addObserver", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "removeObserver", "removeObserver", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "postNotification", "postNotification", arrayOf(String::class.java, Object::class.java, Object::class.java))
            return exports
        }

        fun addObserver(name: String): String {
            val observer = Observer(name, WeakReference(context))
            XTFNotification.observers.put(observer.handler, observer)
            return observer.handler
        }

    }

}
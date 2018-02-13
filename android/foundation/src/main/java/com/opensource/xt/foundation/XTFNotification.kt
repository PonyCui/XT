package com.opensource.xt.foundation

import android.os.Handler
import android.os.Looper
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.utils.V8ObjectUtils
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

        fun postNotification(name: String, obj: Object, userInfo: Map<String?, Any?>) {
            observers.values.filter { it.name == name }.forEach { observer ->
                observer.context?.get()?.let {
                    it.sharedHandler.post {
                        (it.evaluateScript("window.XTFNotificationCenter.default") as? V8Object)?.let {
                            val userInfoV8Object = V8ObjectUtils.toV8Object(it.runtime, userInfo)
                            XTContext.invokeMethod(it, "onNotification", listOf(name, obj, userInfoV8Object))
                            XTContext.release(userInfoV8Object)
                        }
                    }
                }
            }
        }

    }

    class Observer(val name: String, val context: WeakReference<XTContext>) {

        val handler: String = UUID.randomUUID().toString()

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

        fun removeObserver(handler: String) {
            XTFNotification.observers.remove(handler)
        }

        fun postNotification(name: String, obj: Object, userInfo: Object) {
            val userInfoObject: Map<String?, Any?> = (userInfo as? V8Object)?.let {
                return@let V8ObjectUtils.toMap(it).toMap()
            } ?: mapOf<String?, Any?>()
            XTFNotification.postNotification(name, obj, userInfoObject)
        }

    }

}
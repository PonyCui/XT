package com.opensource.xt.core

import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.utils.V8ObjectUtils

/**
 * Created by cuiminghui on 2018/3/12.
 */
class XTExtObject(val xtrContext: XTContext): XTComponentInstance {

    override var objectUUID: String? = null

    var innerObject: Any? = null

    internal var options: XTExtOptions<Any>? = null

    var invoker: (methodName: String, arguments: List<Any>) -> Object? = { methodName, arguments ->
        scriptObject()?.let {
            val returnValue = XTContext.invokeMethod(it, methodName, arguments)
            XTContext.release(it)
            return@let returnValue as? Object
        } ?: null
    }

    fun scriptObject(): V8Object? {
        return xtrContext.evaluateScript("objectRefs['$objectUUID']") as? V8Object
    }

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTExtObject"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_getValue", "xtr_getValue", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_setValue", "xtr_setValue", arrayOf(Object::class.java, String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_callMethod", "xtr_callMethod", arrayOf(String::class.java, V8Array::class.java, String::class.java))
            return exports
        }

        fun create(clazz: String): String {
            val obj = XTExtObject(context)
            registeredClasses[clazz]?.let { item ->
                obj.innerObject = (item.options?.doInit(context, obj.invoker)) ?: kotlin.run {
                    return@run try {
                        item.clazz.getDeclaredConstructor().newInstance()
                    } catch (e: Exception) { null }
                } ?: kotlin.run {
                    return@run try {
                        item.clazz.getDeclaredConstructor(XTContext::class.java).newInstance(context)
                    } catch (e: Exception) { null }
                }
                obj.options = item.options
            }
            val managedObject = XTManagedObject(obj)
            obj.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_getValue(propKey: String, objectRef: String): Object? {
            (XTMemoryManager.find(objectRef) as? XTExtObject)?.let { obj ->
                val innerObject = obj.innerObject ?: return@let
                return obj.options?.doGetValue(propKey, innerObject) ?: kotlin.run {
                    return try {
                        val declaredField = innerObject::class.java.getDeclaredField(propKey)
                        declaredField.isAccessible = true
                        declaredField.get(innerObject) as? Object
                    } catch (e: Exception) {
                        null
                    }
                }
            }
            return null
        }

        fun xtr_setValue(value: Object, propKey: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTExtObject)?.let { obj ->
                val innerObject = obj.innerObject ?: return@let
                obj.options?.doSetValue(value, propKey, innerObject) ?: kotlin.run {
                    try {
                        val declaredField = innerObject::class.java.getDeclaredField(propKey)
                        declaredField.isAccessible = true
                        declaredField.set(innerObject, value)
                    } catch (e: Exception) {
                        println(true)
                    }
                }
            }
        }

        fun xtr_callMethod(methodName: String, args: V8Array, objectRef: String): Object? {
            (XTMemoryManager.find(objectRef) as? XTExtObject)?.let { obj ->
                val innerObject = obj.innerObject ?: return@let
                return obj.options?.doCall(methodName, V8ObjectUtils.toList(args).mapNotNull { it }, innerObject)
            }
            return null
        }

    }

    interface XTExtOptions<T> {

        fun doInit(context: XTContext, invoker:(methodName: String, arguments: List<Any>) -> Object?): Any
        fun doGetValue(propKey: String, obj: T): Object?
        fun doSetValue(value: Object, propKey: String, obj: T)
        fun doCall(methodName: String, arguments: List<Any>, obj: T): Object?

    }

    internal class XTExtEntity<T>(val clazz: Class<T>,
                                  val options: XTExtOptions<T>?)

    companion object {

        internal val registeredClasses: MutableMap<String, XTExtEntity<Any>> = mutableMapOf()

        fun <T> registerClass(clazz: Class<T>,
                              options: XTExtOptions<T>?) {
            val extItem = XTExtEntity(clazz, options)
            registeredClasses.put(clazz.simpleName, extItem as XTExtEntity<Any>)
        }

    }

}
package com.opensource.xt.core

import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.utils.V8ObjectUtils

/**
 * Created by cuiminghui on 2018/3/12.
 */
class XTExtObject(val xtrContext: XTContext): XTComponentInstance {

    open class Implementation {

        internal var invoker: ((methodName: String, arguments: List<Any>) -> Any?)? = null
        open fun initWithContext(xtrContext: XTContext) { }
        open fun onGetValue(prop: String): Any? { throw Exception("Not Implemented") }
        open fun onSetValue(prop: String, value: Any): Any? { throw Exception("Not Implemented") }
        open fun onCallMethod(methodName: String, arguments: List<Any>): Any? { throw Exception("Not Implemented") }
        fun invokeMethod(methodName: String, arguments: List<Any>): Any? {
            return invoker?.invoke(methodName, arguments)
        }

    }

    override var objectUUID: String? = null

    var innerObject: Implementation? = null

    var invoker: (methodName: String, arguments: List<Any>) -> Any? = { methodName, arguments ->
        scriptObject()?.let {
            val returnValue = XTContext.invokeMethod(it, methodName, arguments)
            XTContext.release(it)
            return@let returnValue
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
            try {
                val IMP = Class.forName("com.opensource.ext.implementations." + clazz) as Class<Implementation>
                val instance = IMP.getDeclaredConstructor().newInstance()
                instance.invoker = obj.invoker
                instance.initWithContext(context)
                obj.innerObject = instance
            } catch (e: Exception) { e.printStackTrace() }
            val managedObject = XTManagedObject(obj)
            obj.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_getValue(propKey: String, objectRef: String): Any? {
            (XTMemoryManager.find(objectRef) as? XTExtObject)?.let { obj ->
                val innerObject = obj.innerObject ?: return@let
                return try {
                    innerObject.onGetValue(propKey)
                } catch (e: Exception) {
                    if (e.message == "Not Implemented") {
                        return try {
                            val declaredField = innerObject::class.java.getDeclaredField(propKey)
                            declaredField.isAccessible = true
                            declaredField.get(innerObject)
                        } catch (e: Exception) { null }
                    }
                    else { null }
                }
            }
            return null
        }

        fun xtr_setValue(value: Object, propKey: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTExtObject)?.let { obj ->
                val innerObject = obj.innerObject ?: return@let
                try {
                    innerObject.onSetValue(propKey, value)
                } catch (e: Exception) {
                    if (e.message == "Not Implemented") {
                        try {
                            val declaredField = innerObject::class.java.getDeclaredField(propKey)
                            declaredField.isAccessible = true
                            declaredField.set(innerObject, value)
                        } catch (e: Exception) { }
                    }
                }
            }
        }

        fun xtr_callMethod(methodName: String, args: V8Array, objectRef: String): Any? {
            (XTMemoryManager.find(objectRef) as? XTExtObject)?.let { obj ->
                val innerObject = obj.innerObject ?: return@let
                val argsList = V8ObjectUtils.toList(args).mapNotNull { it }
                try {
                    return innerObject.onCallMethod(methodName, argsList)
                } catch (e: Exception) {
                    if (e.message == "Not Implemented") {
                        try {
                            if (argsList.count() == 0) {
                                return innerObject::class.java.getDeclaredMethod(methodName).invoke(innerObject)
                            }
                            else if (argsList.count() == 1) {
                                return innerObject::class.java.getDeclaredMethod(methodName, argsList[0]::class.java).invoke(innerObject, argsList[0])
                            }
                            else if (argsList.count() == 2) {
                                return innerObject::class.java.getDeclaredMethod(methodName, argsList[0]::class.java, argsList[1]::class.java).invoke(innerObject, argsList[0], argsList[1])
                            }
                            else if (argsList.count() == 3) {
                                return innerObject::class.java.getDeclaredMethod(methodName, argsList[0]::class.java, argsList[1]::class.java, argsList[2]::class.java).invoke(innerObject, argsList[0], argsList[1], argsList[2])
                            }
                            else if (argsList.count() == 4) {
                                return innerObject::class.java.getDeclaredMethod(methodName, argsList[0]::class.java, argsList[1]::class.java, argsList[2]::class.java, argsList[3]::class.java).invoke(innerObject, argsList[0], argsList[1], argsList[2], argsList[3])
                            }
                            else if (argsList.count() == 5) {
                                return innerObject::class.java.getDeclaredMethod(methodName, argsList[0]::class.java, argsList[1]::class.java, argsList[2]::class.java, argsList[3]::class.java, argsList[4]::class.java).invoke(innerObject, argsList[0], argsList[1], argsList[2], argsList[3], argsList[4])
                            }
                        } catch (e: Exception) {}
                    }
                }
            }
            return null
        }

    }

}
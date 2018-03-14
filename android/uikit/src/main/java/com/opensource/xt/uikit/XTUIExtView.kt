package com.opensource.xt.uikit

import android.content.Context
import android.util.AttributeSet
import android.view.View
import android.view.ViewGroup
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.utils.V8ObjectUtils
import com.opensource.xt.core.XTComponentInstance
import com.opensource.xt.core.XTContext
import com.opensource.xt.core.XTMemoryManager

/**
 * Created by cuiminghui on 2018/3/13.
 */
class XTUIExtView @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTComponentInstance  {

    interface Implementation {

        var extView: XTUIExtView?
        fun onGetValue(prop: String): Any? { throw Exception("Not Implemented") }
        fun onSetValue(prop: String, value: Any): Any? { throw Exception("Not Implemented") }
        fun onCallMethod(methodName: String, arguments: List<Any>): Any? { throw Exception("Not Implemented") }

    }

    var innerView: View? = null
        set(value) {
            field = value
            value?.let {
                addView(it, ViewGroup.LayoutParams(this.width, this.height))
            }
        }

    fun invokeMethod(methodName: String, arguments: List<Any>): Any? {
        return scriptObject()?.let {
            val returnValue = XTContext.invokeMethod(it, methodName, arguments)
            XTContext.release(it)
            return@let returnValue as? Object
        } ?: null
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        if (changed) {
            innerView?.let {
                val params = it.layoutParams
                params.width = this.width
                params.height = this.width
                it.layoutParams = params
            }
        }
    }

    class JSExports(context: XTUIContext): XTUIView.JSExports(context) {

        override val name: String = "_XTUIExtView"

        override val viewClass: Class<XTUIView> = XTUIExtView::class.java as Class<XTUIView>

        override fun exports(): V8Object {
            val exports = super.exports()
            exports.registerJavaMethod(this, "xtr_initWithViewClass", "xtr_initWithViewClass", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_getValue", "xtr_getValue", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_setValue", "xtr_setValue", arrayOf(Object::class.java, String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_callMethod", "xtr_callMethod", arrayOf(String::class.java, V8Array::class.java, String::class.java))
            return exports
        }

        fun xtr_initWithViewClass(viewClass: String, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUIExtView ?: return
            try {
                val IMP = Class.forName("com.opensource.ext.implementations." + viewClass) as Class<View>
                val instance = IMP.getDeclaredConstructor(Context::class.java).newInstance(context.appContext)
                (instance as? Implementation)?.extView = view
                view.innerView = instance
            } catch (e: Exception) { e.printStackTrace() }
        }

        fun xtr_getValue(propKey: String, objectRef: String): Any? {
            (XTMemoryManager.find(objectRef) as? XTUIExtView)?.let { obj ->
                val innerObject = obj.innerView ?: return@let
                return (innerObject as? Implementation)?.onGetValue(propKey) ?: kotlin.run {
                    return try {
                        val declaredField = innerObject::class.java.getDeclaredMethod("get" + propKey.substring(0, 1).toUpperCase() + propKey.substring(1))
                        declaredField.invoke(innerObject)
                        try {
                            val declaredField = innerObject::class.java.getDeclaredField(propKey)
                            declaredField.isAccessible = true
                            declaredField.get(innerObject) as? Object
                        } catch (e: Exception) { null }
                    } catch (e: Exception) { null }
                }
            }
            return null
        }

        fun xtr_setValue(value: Object, propKey: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIExtView)?.let { obj ->
                val innerObject = obj.innerView ?: return@let
                (innerObject as? Implementation)?.onSetValue(propKey, value) ?: kotlin.run {
                    try {
                        val declaredField = innerObject::class.java.getDeclaredMethod("set" + propKey.substring(0, 1).toUpperCase() + propKey.substring(1), value::class.java)
                        declaredField.invoke(innerObject, value)
                    } catch (e: Exception) {
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
            (XTMemoryManager.find(objectRef) as? XTUIExtView)?.let { obj ->
                val innerObject = obj.innerView ?: return@let
                val argsList = V8ObjectUtils.toList(args).mapNotNull { it }
                return (innerObject as? Implementation)?.onCallMethod(methodName, argsList) ?: kotlin.run {
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
                    } catch (e: Exception) {
                        null
                    }
                    null
                }
            }
            return null
        }

    }

}
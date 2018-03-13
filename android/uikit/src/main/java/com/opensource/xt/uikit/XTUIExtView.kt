package com.opensource.xt.uikit

import android.content.Context
import android.graphics.Color
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

    var innerView: View? = null
        set(value) {
            field = value
            value?.let {
                addView(it, ViewGroup.LayoutParams(this.width, this.height))
            }
        }

    var options: XTUIExtOptions<Any>? = null

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
            registeredClasses[viewClass]?.let {
                view.options = it.options
                if (view.innerView != null) { return@let }
                (view.options?.doInit(context) as? View)?.let {
                    view.innerView = it
                } ?: kotlin.run {
                    if (View::class.java.isAssignableFrom(it.clazz)) {
                        try {
                            view.innerView = it.clazz.getDeclaredConstructor(XTUIContext::class.java).newInstance(context) as? View
                            return@let
                        } catch (e: Exception) { }
                        try {
                            view.innerView = it.clazz.getDeclaredConstructor(Context::class.java).newInstance(context.appContext) as? View
                            return@let
                        } catch (e: Exception) { }
                    }
                }
            }
        }

        fun xtr_getValue(propKey: String, objectRef: String): Object? {
            (XTMemoryManager.find(objectRef) as? XTUIExtView)?.let { obj ->
                val innerObject = obj.innerView ?: return@let
                return obj?.options?.doGetValue(propKey, innerObject) ?: kotlin.run {
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
            (XTMemoryManager.find(objectRef) as? XTUIExtView)?.let { obj ->
                val innerObject = obj.innerView ?: return@let
                obj?.options?.doSetValue(value, propKey, innerObject) ?: kotlin.run {
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
            (XTMemoryManager.find(objectRef) as? XTUIExtView)?.let { obj ->
                val innerObject = obj.innerView ?: return@let
                return obj?.options?.doCall(methodName, V8ObjectUtils.toList(args).mapNotNull { it }, innerObject)
            }
            return null
        }

    }

    interface XTUIExtOptions<T> {

        fun doInit(context: XTUIContext): T
        fun doGetValue(propKey: String, obj: T): Object?
        fun doSetValue(value: Object, propKey: String, obj: T): Unit
        fun doCall(methodName: String, arguments: List<Any>, obj: T): Object?

    }

    internal class XTUIExtEntity<T>(val clazz: Class<T>,
                                    val options: XTUIExtOptions<T>?)

    companion object {

        internal val registeredClasses: MutableMap<String, XTUIExtEntity<Any>> = mutableMapOf()

        fun <T> registerClass(clazz: Class<T>,
                              options: XTUIExtOptions<T>?) {
            val extItem = XTUIExtEntity(clazz, options)
            registeredClasses.put(clazz.simpleName, extItem as XTUIExtEntity<Any>)
        }

    }

}
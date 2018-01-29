package com.opensource.xt.uikit

import android.content.Context
import android.util.AttributeSet
import android.view.View
import android.view.ViewGroup
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xt.core.*

/**
 * Created by cuiminghui on 2017/9/27.
 */

class XTUICustomView @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTComponentInstance {

    interface Protocol {
        fun getProps(): Map<String, Any>
        fun setProps(value: Map<String, Any>)
        fun onMessage(message: V8Object, customView: XTUICustomView): Any?
    }

    var innerView: View? = null
    var innerViewLayoutParams: ViewGroup.LayoutParams = LayoutParams(0, 0)

    private fun setClassName(className: String) {
        classMapping[className]?.let {
            Class.forName(it)?.let { clazz ->
                if (View::class.java.isAssignableFrom(clazz)) {
                    innerView = clazz.getDeclaredConstructor(Context::class.java).newInstance(context) as View
                    addView(innerView, innerViewLayoutParams)
                }
            }
        }
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        if (changed) {
            innerViewLayoutParams.width = this.width
            innerViewLayoutParams.height = this.height
            innerView?.requestLayout()
        }
    }

    fun emitMessage(message: Any?): Any? {
        scriptObject()?.let {
            return XTContext.invokeMethod(it, "handleMessage", listOf(message ?: V8.getUndefined()))
        }
        return null
    }

    class JSExports(val context: XTUIContext): XTComponentExport() {

        override val name: String = "_XTUICustomView"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_setClassName", "xtr_setClassName", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_handleMessage", "xtr_handleMessage", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_props", "xtr_props", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setProps", "xtr_setProps", arrayOf(V8Object::class.java, String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTUICustomView(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_setClassName(className: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUICustomView)?.let {
                it.setClassName(className)
            }
        }

        fun xtr_handleMessage(message: V8Object, objectRef: String): Any? {
            (XTMemoryManager.find(objectRef) as? XTUICustomView)?.let { view ->
                (view.innerView as? XTUICustomView.Protocol)?.let {
                    return it.onMessage(message, view)
                }
            }

            return V8.getUndefined()
        }

        fun xtr_props(objectRef: String): V8Value {
            (XTMemoryManager.find(objectRef) as? XTUICustomView)?.let { view ->
                (view.innerView as? XTUICustomView.Protocol)?.let {
                    return XTUIUtils.fromMap(it.getProps(), context.runtime)
                }
            }
            return V8.getUndefined()
        }

        fun xtr_setProps(props: V8Object, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUICustomView)?.let { view ->
                (view.innerView as? XTUICustomView.Protocol)?.let { innerView ->
                    XTUIUtils.toMap(props)?.let {
                        innerView.setProps(it)
                    }
                }
            }
        }

    }

    companion object {

        internal var classMapping: Map<String, String> = mapOf()

        fun registerClass(viewClass: String, className: String) {
            var mutable = classMapping.toMutableMap()
            mutable.put(className, viewClass)
            classMapping = mutable.toMap()
        }

    }

}
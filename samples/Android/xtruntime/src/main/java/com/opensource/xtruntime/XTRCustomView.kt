package com.opensource.xtruntime

import android.content.Context
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value

interface XTRCustomViewProtocol {
    fun getProps(): Map<String, Any>
    fun setProps(value: Map<String, Any>)
    fun onMessage(message: V8Object, customView: XTRCustomView.InnerObject): Any?
}

/**
 * Created by cuiminghui on 2017/9/27.
 */
class XTRCustomView: XTRComponent()  {

    override val name: String = "XTRCustomView"

    override fun v8Object(): V8Object? {
        XTRImage.runtime = xtrContext.v8Runtime
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "createScriptObject", "createScriptObject", arrayOf(String::class.java, V8Object::class.java, V8Object::class.java))
        return v8Object
    }

    companion object {

        internal var classMapping: Map<String, String> = mapOf()

        fun registerClass(viewClass: String, className: String) {
            var mutable = classMapping.toMutableMap()
            mutable.put(className, viewClass)
            classMapping = mutable.toMap()
        }

    }

    fun createScriptObject(className: String, rect: V8Object, scriptObject: V8Object): V8Object {
        val view = InnerObject(className, xtrContext.autoRelease(scriptObject.twin()), xtrContext)
        XTRUtils.toRect(rect)?.let {
            view.frame = it
        }
        return view.requestV8Object(xtrContext.v8Runtime)
    }

    class InnerObject(className: String, scriptObject: V8Object, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        var innerView: View? = null
        var innerViewLayoutParams: ViewGroup.LayoutParams = LayoutParams(0, 0)

        init {
            classMapping[className]?.let {
                Class.forName(it)?.let { clazz ->
                    if (View::class.java.isAssignableFrom(clazz)) {
                        innerView = clazz.getDeclaredConstructor(Context::class.java).newInstance(context) as View
                        addView(innerView, innerViewLayoutParams)
                    }
                }
            }
        }

        override fun requestV8Object(runtime: V8): V8Object {
            val v8Object = super<XTRView.InnerObject>.requestV8Object(runtime)
            v8Object.registerJavaMethod(this, "xtr_handleMessage", "xtr_handleMessage", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_props", "xtr_props", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setProps", "xtr_setProps", arrayOf(V8Object::class.java))
            return v8Object
        }

        override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
            super.onLayout(changed, left, top, right, bottom)
            if (changed) {
                innerViewLayoutParams.width = this.width
                innerViewLayoutParams.height = this.height
                innerView?.requestLayout()
            }
        }

        fun xtr_handleMessage(message: V8Object): Any? {
            (innerView as? XTRCustomViewProtocol)?.let {
                return XTRUtils.fromObject(xtrContext, it.onMessage(message, this))
            }
            return V8.getUndefined()
        }

        fun emitMessage(message: Any?): Any? {
            return xtrContext.invokeMethod(scriptObject, "handleMessage", listOf(message ?: V8.getUndefined()))
        }

        fun xtr_props(): V8Value {
            (innerView as? XTRCustomViewProtocol)?.let {
                it.getProps()?.let {
                    return XTRUtils.fromObject(xtrContext, it) as? V8Value ?: V8.getUndefined()
                }
            }
            return V8.getUndefined()
        }

        fun xtr_setProps(props: V8Object) {
            (innerView as? XTRCustomViewProtocol)?.let { innerView ->
                XTRUtils.toMap(props)?.let {
                    innerView.setProps(it)
                }
            }
        }

        override fun dispatchTouchEvent(ev: MotionEvent?): Boolean {
            if (userInteractionEnabled) {
                return super.dispatchTouchEvent(ev)
            }
            return false
        }

    }

}
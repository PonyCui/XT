package com.opensource.xtruntime

import android.content.Context
import android.content.res.TypedArray
import android.view.View
import android.view.ViewGroup
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import org.mozilla.javascript.ScriptableObject
import org.mozilla.javascript.Undefined
import java.lang.reflect.Type

interface XTRCustomViewProtocol {
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
        val view = InnerObject(className, scriptObject, xtrContext)
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
            v8Object.registerJavaMethod(this, "handleMessage", "handleMessage", arrayOf(V8Object::class.java))
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

        fun handleMessage(message: V8Object): Any? {
            (innerView as? XTRCustomViewProtocol)?.let {
                return XTRUtils.fromObject(xtrContext, it.onMessage(message, this))
            }
            return Undefined.instance
        }

        fun emitMessage(message: Any?): Any? {
            return xtrContext.invokeMethod(scriptObject, "handleMessage", arrayOf(XTRUtils.fromObject(xtrContext, message) ?: Undefined.instance))
        }

    }

}
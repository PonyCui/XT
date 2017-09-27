package com.opensource.xtruntime

import android.content.Context
import android.content.res.TypedArray
import android.view.View
import android.view.ViewGroup
import org.mozilla.javascript.ScriptableObject
import org.mozilla.javascript.Undefined
import java.lang.reflect.Type

interface XTRCustomViewProtocol {
    fun onMessage(message: Any?, customView: XTRCustomView.InnerObject): Any?
}

/**
 * Created by cuiminghui on 2017/9/27.
 */
class XTRCustomView: XTRComponent()  {

    override val name: String = "XTRCustomView"

    companion object {

        internal var classMapping: Map<String, String> = mapOf()

        fun registerClass(viewClass: String, className: String) {
            var mutable = classMapping.toMutableMap()
            mutable.put(className, viewClass)
            classMapping = mutable.toMap()
        }

    }

    fun createScriptObject(className: String, rect: Any, scriptObject: Any): InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            val view = InnerObject(className, it, xtrContext)
            XTRUtils.toRect(rect)?.let {
                view.frame = it
            }
            return view
        }
        return null
    }

    class InnerObject(className: String, scriptObject: ScriptableObject, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

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

        override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
            super.onLayout(changed, left, top, right, bottom)
            if (changed) {
                innerViewLayoutParams.width = this.width
                innerViewLayoutParams.height = this.height
                innerView?.requestLayout()
            }
        }

        fun handleMessage(message: Any?): Any? {
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
package com.opensource.xt.uikit

import android.graphics.Color
import android.graphics.PorterDuff
import android.util.AttributeSet
import android.view.View
import android.widget.ProgressBar
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager

/**
 * Created by cuiminghui on 2018/1/23.
 */
class XTUIActivityIndicatorView @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTUIComponentInstance {

    private var animating = false
        set(value) {
            field = value
            innerView?.visibility = if (value) View.VISIBLE else View.GONE
        }

    private var innerView = ProgressBar(context, null, android.R.attr.progressBarStyleSmall)
    private var layoutParams = LayoutParams((24.0 * resources.displayMetrics.density).toInt(), (24.0 * resources.displayMetrics.density).toInt())

    private var style = 0
        set(value) {
            field = value
            if (value == 0) {
                layoutParams.width = (24.0 * resources.displayMetrics.density).toInt()
                layoutParams.height = (24.0 * resources.displayMetrics.density).toInt()
            }
            else if (value == 1) {
                layoutParams.width = (66.0 * resources.displayMetrics.density).toInt()
                layoutParams.height = (66.0 * resources.displayMetrics.density).toInt()
            }
            resetLayout()
            resetColor()
        }

    init {
        innerView.visibility = View.GONE
        innerView.isIndeterminate = true
        addView(innerView, layoutParams)
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        if (changed) {
            resetLayout()
        }
    }

    private fun resetLayout() {
        innerView.x = ((this.width - innerView.width) / 2.0).toFloat()
        innerView.y = ((this.height - innerView.height) / 2.0).toFloat()
    }

    override fun tintColorDidChange() {
        super.tintColorDidChange()
        resetColor()
    }

    private fun resetColor() {
        innerView.indeterminateDrawable.setColorFilter(this.tintColor?.intColor() ?: Color.BLACK, PorterDuff.Mode.MULTIPLY)
    }

    class JSExports(val context: XTUIContext): XTUIComponentExport() {

        override val name: String = "_XTUIActivityIndicatorView"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_style", "xtr_style", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setStyle", "xtr_setStyle", arrayOf(Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_animating", "xtr_animating", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_startAnimating", "xtr_startAnimating", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_stopAnimating", "xtr_stopAnimating", arrayOf(String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTUIActivityIndicatorView(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_style(objectRef: String): Int {
            (XTMemoryManager.find(objectRef) as? XTUIActivityIndicatorView)?.let {
                return it.style
            }
            return 0
        }

        fun xtr_setStyle(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIActivityIndicatorView)?.let {
                it.style = value
            }
        }

        fun xtr_animating(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? XTUIActivityIndicatorView)?.animating ?: false
        }

        fun xtr_startAnimating(objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIActivityIndicatorView)?.animating = true
        }

        fun xtr_stopAnimating(objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIActivityIndicatorView)?.animating = false
        }

    }

}
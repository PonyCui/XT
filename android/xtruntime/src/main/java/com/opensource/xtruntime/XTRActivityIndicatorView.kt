package com.opensource.xtruntime

import android.graphics.Color
import android.graphics.PorterDuff
import android.util.AttributeSet
import android.view.View
import android.widget.ProgressBar
import android.widget.SeekBar
import com.eclipsesource.v8.V8Object
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager

/**
 * Created by cuiminghui on 2018/1/23.
 */
class XTRActivityIndicatorView @JvmOverloads constructor(
        xtrContext: XTRContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTRView(xtrContext, attrs, defStyleAttr), XTRComponentInstance {

    private var animating = false
        set(value) {
            field = value
            innerView?.visibility = if (value) View.VISIBLE else View.GONE
        }

    private var innerView = ProgressBar(context)

    private var style = 0
        set(value) {
            field = value
            removeView(innerView)
            innerView = ProgressBar(context, null, if (value == 1) android.R.attr.progressBarStyleLarge else android.R.attr.progressBarStyleSmall)
            innerView.visibility = if (animating) View.VISIBLE else View.GONE
            innerView.isIndeterminate = true
            addView(innerView, LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT))
            resetLayout()
            resetColor()
        }

    init {
        innerView.visibility = View.GONE
        innerView.isIndeterminate = true
        addView(innerView, LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT))
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

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRActivityIndicatorView"

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
            val view = XTRActivityIndicatorView(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_style(objectRef: String): Int {
            (XTMemoryManager.find(objectRef) as? XTRActivityIndicatorView)?.let {
                return it.style
            }
            return 0
        }

        fun xtr_setStyle(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRActivityIndicatorView)?.let {
                it.style = value
            }
        }

        fun xtr_animating(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? XTRActivityIndicatorView)?.animating ?: false
        }

        fun xtr_startAnimating(objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRActivityIndicatorView)?.animating = true
        }

        fun xtr_stopAnimating(objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRActivityIndicatorView)?.animating = false
        }

    }

}
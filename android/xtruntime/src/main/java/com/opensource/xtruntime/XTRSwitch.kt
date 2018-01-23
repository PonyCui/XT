package com.opensource.xtruntime

import android.graphics.Color
import android.graphics.PorterDuff
import android.util.AttributeSet
import android.widget.Switch
import com.eclipsesource.v8.V8Object
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager


/**
 * Created by cuiminghui on 2018/1/23.
 */
class XTRSwitch @JvmOverloads constructor(
        xtrContext: XTRContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTRView(xtrContext, attrs, defStyleAttr), XTRComponentInstance {

    private val innerView = Switch(context)

    init {
        resetColor()
        innerView.setOnCheckedChangeListener { buttonView, isChecked ->
            resetColor()
            scriptObject()?.let {
                XTRContext.invokeMethod(it, "handleValueChanged")
                it.release()
            }
        }
        addView(innerView, LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT))
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        if (changed) {
            innerView.x = (((right - left) - innerView.width) / 2.0).toFloat()
            innerView.y = (((bottom - top) - innerView.height) / 2.0).toFloat()
        }
    }

    override fun tintColorDidChange() {
        super.tintColorDidChange()
        this.resetColor()
    }

    fun resetColor() {
        if (innerView.isChecked) {
            innerView.thumbDrawable.setColorFilter(this.tintColor?.intColor() ?: Color.BLACK, PorterDuff.Mode.MULTIPLY)
        }
        else {
            innerView.thumbDrawable.setColorFilter(Color.TRANSPARENT, PorterDuff.Mode.DST_OVER)
        }
    }

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRSwitch"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_on", "xtr_on", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setOn", "xtr_setOn", arrayOf(Boolean::class.java, Boolean::class.java, String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTRSwitch(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_on(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? XTRSwitch)?.innerView?.isChecked ?: false
        }

        fun xtr_setOn(value: Boolean, animated: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRSwitch)?.innerView?.isChecked = value
        }

    }

}
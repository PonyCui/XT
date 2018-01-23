package com.opensource.xtruntime

import android.graphics.Color
import android.graphics.PorterDuff
import android.graphics.drawable.ColorDrawable
import android.util.AttributeSet
import android.widget.SeekBar
import android.widget.Switch
import com.eclipsesource.v8.V8Object
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager


/**
 * Created by cuiminghui on 2018/1/23.
 */
class XTRSlider @JvmOverloads constructor(
        xtrContext: XTRContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTRView(xtrContext, attrs, defStyleAttr), XTRComponentInstance {

    private val innerView = SeekBar(context)
    private val innerViewLayoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT)

    init {
        resetColor()
        innerView.max = 100
        innerView.setOnSeekBarChangeListener(object: SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
                scriptObject()?.let {
                    XTRContext.invokeMethod(it, "handleValueChanged")
                    it.release()
                }
            }
            override fun onStartTrackingTouch(seekBar: SeekBar?) {}
            override fun onStopTrackingTouch(seekBar: SeekBar?) {}
        })
        addView(innerView, innerViewLayoutParams)
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        if (changed) {
            innerViewLayoutParams.width = right - left
            innerView.y = (((bottom - top) - innerView.height) / 2.0).toFloat()
        }
    }

    override fun tintColorDidChange() {
        super.tintColorDidChange()
        this.resetColor()
    }

    fun resetColor() {
        innerView.thumb.setColorFilter(this.tintColor?.intColor() ?: Color.BLACK, PorterDuff.Mode.SRC_ATOP)
        innerView.progressDrawable.setColorFilter(this.tintColor?.intColor() ?: Color.BLACK, PorterDuff.Mode.SRC_ATOP)
    }

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRSlider"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_value", "xtr_value", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setValue", "xtr_setValue", arrayOf(Double::class.java, Boolean::class.java, String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTRSlider(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_value(objectRef: String): Double {
            return ((XTMemoryManager.find(objectRef) as? XTRSlider)?.innerView?.progress?.toDouble() ?: 0.0) / 100.0
        }

        fun xtr_setValue(value: Double, animated: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRSlider)?.innerView?.progress = (value * 100.0).toInt()
        }

    }

}
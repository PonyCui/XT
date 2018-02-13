package com.opensource.xt.uikit

import android.graphics.Color
import android.graphics.PorterDuff
import android.util.AttributeSet
import android.widget.SeekBar
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.*


/**
 * Created by cuiminghui on 2018/1/23.
 */
class XTUISlider @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTComponentInstance {

    private val innerView = SeekBar(context)
    private val innerViewLayoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT)

    init {
        resetColor()
        innerView.max = 100
        innerView.setOnSeekBarChangeListener(object: SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
                scriptObject()?.let {
                    XTContext.invokeMethod(it, "handleValueChanged")
                    XTContext.release(it)
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
            innerView.requestLayout()
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

    class JSExports(context: XTUIContext): XTUIView.JSExports(context) {

        override val name: String = "_XTUISlider"

        override val viewClass: Class<XTUIView> = XTUISlider::class.java as Class<XTUIView>

        override fun exports(): V8Object {
            val exports = super.exports()
            exports.registerJavaMethod(this, "xtr_value", "xtr_value", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setValue", "xtr_setValue", arrayOf(Double::class.java, Boolean::class.java, String::class.java))
            return exports
        }

        fun xtr_value(objectRef: String): Double {
            return ((XTMemoryManager.find(objectRef) as? XTUISlider)?.innerView?.progress?.toDouble() ?: 0.0) / 100.0
        }

        fun xtr_setValue(value: Double, animated: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUISlider)?.innerView?.progress = (value * 100.0).toInt()
        }

    }

}
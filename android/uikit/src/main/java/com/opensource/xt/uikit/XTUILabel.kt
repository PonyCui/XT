package com.opensource.xt.uikit

import android.graphics.Color
import android.graphics.Rect
import android.os.Build
import android.os.Handler
import android.text.TextUtils
import android.util.AttributeSet
import android.view.Gravity
import android.view.View
import android.view.View.OnLayoutChangeListener
import android.view.ViewGroup
import android.widget.TextView
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTComponentInstance
import kotlin.concurrent.timerTask

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTUILabel @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTComponentInstance {

    val textView: TextView = TextView(context)
    val listener: OnLayoutChangeListener = OnLayoutChangeListener { _, _, _, _, _, _, _, _, _ -> resetTextViewPosition() }

    init {
        userInteractionEnabled = false
        textView.setTextColor(Color.BLACK)
        textView.textSize = 14f
        if (android.os.Build.VERSION.SDK_INT >= 16) {
            textView.maxLines = 1
        }
        addView(textView, ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        textView.removeOnLayoutChangeListener(listener)
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        textView.addOnLayoutChangeListener(listener)
    }

    private fun resetTextLines() {
        if (android.os.Build.VERSION.SDK_INT >= 16) {
            if (numberOfLines <= 0) {
                textView.maxLines = Int.MAX_VALUE
            }
            else {
                textView.maxLines = numberOfLines
            }
        }
    }

    private fun resetTextViewPosition() {
        var tWidth = textView.width
        var tHeight = textView.height
        if (numberOfLines != 1 && textView.height > this.height) {
            textView.y = 0.0f
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                var found = false
                (0 until textView.lineCount).forEach {
                    if (found) {
                        return@forEach
                    }
                    val r = Rect()
                    textView.getLineBounds(it, r)
                    if (r.bottom > this.height) {
                        textView.visibility = View.GONE
                        val handler = Handler()
                        xtrContext.sharedTimer.schedule(timerTask {
                            handler.post {
                                textView.maxLines = it
                                textView.visibility = View.VISIBLE
                            }
                        }, 0)
                        tWidth = r.width()
                        tHeight = r.top
                        found = true
                    }
                }
            }
        }
        else {
            textView.visibility = View.VISIBLE
        }
        when(mTextAlignment) {
            0 -> textView.x = 0.0f
            1 -> textView.x = ((this.width - tWidth) / 2.0).toFloat()
            2 -> textView.x = (this.width - tWidth).toFloat()
        }
        textView.y = Math.max(0.0f, ((this.height - tHeight) / 2.0).toFloat())
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        if (changed) {
            textView.maxWidth = right - left
            resetTextLines()
            resetTextViewPosition()
        }
    }

    var mFont: XTUIFont = XTUIFont(14.0, "400", "normal", "")
        set(value) {
            field = value
            textView.textSize = value.pointSize.toFloat()
            textView.typeface = value.typeface
            resetTextLines()
        }

    var numberOfLines = 1
        set(value) {
            field = value
            resetTextLines()
        }


    var mTextAlignment = 0
        set(value) {
            field = value
            when (value) {
                0 -> {
                    textView.gravity = Gravity.LEFT
                }
                1 -> {
                    textView.gravity = Gravity.CENTER_HORIZONTAL
                }
                2 -> {
                    textView.gravity = Gravity.RIGHT
                }
            }
            resetTextLines()
            resetTextViewPosition()
        }

    var lineSpace = 0.0
        set(value) {
            field = value
            textView.setLineSpacing(value.toFloat() * resources.displayMetrics.density, 1.0f)
            resetTextLines()
        }

    var lineBreakMode = 0
        set(value) {
            field = value
            if (value == 4) {
                textView.ellipsize = TextUtils.TruncateAt.END
            }
            else {
                textView.ellipsize = null
            }
        }

    override fun intrinsicContentSize(width: Double): XTUISize? {
        val oldMaxWidth = this.textView.maxWidth
        this.textView.maxWidth = (width * this.resources.displayMetrics.density).toInt()
        this.textView.measure(
                MeasureSpec.makeMeasureSpec((width * this.resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST),
                MeasureSpec.makeMeasureSpec((Double.MAX_VALUE * this.resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST)
        )
        this.textView.maxWidth = oldMaxWidth
        return XTUISize(Math.ceil(this.textView.measuredWidth.toDouble() / this.resources.displayMetrics.density), Math.ceil(this.textView.measuredHeight.toDouble() / this.resources.displayMetrics.density))
    }

    class JSExports(context: XTUIContext): XTUIView.JSExports(context) {

        override val name: String = "_XTUILabel"

        override val viewClass: Class<XTUIView> = XTUILabel::class.java as Class<XTUIView>

        override fun exports(): V8Object {
            val exports = super.exports()
            exports.registerJavaMethod(this, "xtr_text", "xtr_text", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setText", "xtr_setText", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_font", "xtr_font", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setFont", "xtr_setFont", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_textColor", "xtr_textColor", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setTextColor", "xtr_setTextColor", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_numberOfLines", "xtr_numberOfLines", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setNumberOfLines", "xtr_setNumberOfLines", arrayOf(Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_textAlignment", "xtr_textAlignment", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setTextAlignment", "xtr_setTextAlignment", arrayOf(Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_lineSpace", "xtr_lineSpace", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setLineSpace", "xtr_setLineSpace", arrayOf(Double::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_lineBreakMode", "xtr_lineBreakMode", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setLineBreakMode", "xtr_setLineBreakMode", arrayOf(Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_textRectForBounds", "xtr_textRectForBounds", arrayOf(V8Object::class.java, String::class.java))
            return exports
        }

        fun xtr_text(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTUILabel)?.textView?.text?.substring(0) ?: ""
        }

        fun xtr_setText(value: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUILabel)?.let {
                it.textView.text = value
                it.resetTextLines()
            }
        }

        fun xtr_font(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUILabel)?.mFont?.objectUUID ?: null
        }

        fun xtr_setFont(fontRef: String, objectRef: String) {
            val font = XTMemoryManager.find(fontRef) as? XTUIFont ?: return
            (XTMemoryManager.find(objectRef) as? XTUILabel)?.mFont = font
        }

        fun xtr_textColor(objectRef: String): V8Value {
            return XTUIUtils.fromIntColor((XTMemoryManager.find(objectRef) as? XTUILabel)?.textView?.currentTextColor ?: Color.BLACK, context.runtime)
        }

        fun xtr_setTextColor(value: V8Object, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUILabel)?.let {
                it.textView.setTextColor(XTUIUtils.toColor(value)?.intColor() ?: 0)
            }
        }

        fun xtr_numberOfLines(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTUILabel)?.numberOfLines ?: 0
        }

        fun xtr_setNumberOfLines(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUILabel)?.let {
                it.numberOfLines = value
            }
        }

        fun xtr_textAlignment(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTUILabel)?.mTextAlignment ?: 0
        }

        fun xtr_setTextAlignment(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUILabel)?.let {
                it.mTextAlignment = value
            }
        }

        fun xtr_lineSpace(objectRef: String): Double {
            return (XTMemoryManager.find(objectRef) as? XTUILabel)?.lineSpace ?: 0.0
        }

        fun xtr_setLineSpace(value: Double, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUILabel)?.let {
                it.lineSpace = value
            }
        }

        fun xtr_lineBreakMode(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTUILabel)?.lineBreakMode ?: 0
        }

        fun xtr_setLineBreakMode(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUILabel)?.let {
                it.lineBreakMode = value
            }
        }

        fun xtr_textRectForBounds(value: V8Object, objectRef: String): V8Value {
            val view = (XTMemoryManager.find(objectRef) as? XTUILabel) ?: return V8.getUndefined()
            XTUIUtils.toRect(value)?.let {
                view.textView.measure(
                        MeasureSpec.makeMeasureSpec((it.width * view.resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST),
                        MeasureSpec.makeMeasureSpec((it.height * view.resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST)
                )
            }
            return XTUIUtils.fromRect(XTUIRect(0.0, 0.0, view.textView.measuredWidth.toDouble() / view.resources.displayMetrics.density, view.textView.measuredHeight.toDouble() / view.resources.displayMetrics.density), context.runtime)
        }

    }

}
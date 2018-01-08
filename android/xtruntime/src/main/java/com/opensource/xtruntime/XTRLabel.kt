package com.opensource.xtruntime

import android.graphics.Color
import android.graphics.Rect
import android.graphics.Typeface
import android.os.Build
import android.os.Handler
import android.text.TextUtils
import android.view.Gravity
import android.view.View
import android.view.View.OnLayoutChangeListener
import android.view.ViewGroup
import android.widget.TextView
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import java.util.*
import kotlin.concurrent.timerTask

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTRLabel: XTRComponent() {

    override val name: String = "XTRLabel"

    override fun v8Object(): V8Object? {
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "createScriptObject", "createScriptObject", arrayOf(V8Object::class.java, V8Object::class.java))
        return v8Object
    }

    fun createScriptObject(rect: V8Object, scriptObject: V8Object): V8Object {
        val view = InnerObject(xtrContext.autoRelease(scriptObject.twin()), xtrContext)
        XTRUtils.toRect(rect)?.let {
            view.frame = it
        }
        return view.requestV8Object(xtrContext.v8Runtime)
    }

    class InnerObject(scriptObject: V8Object, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        val textView: TextView = TextView(xtrContext.appContext)
        val listener: OnLayoutChangeListener = OnLayoutChangeListener { _, _, _, _, _, _, _, _, _ -> resetTextViewPosition() }

        init {
            textView.setTextColor(Color.BLACK)
            textView.textSize = 14f
            if (android.os.Build.VERSION.SDK_INT >= 16) {
                textView.maxLines = 1
            }
            addView(textView, ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
        }

        override fun requestV8Object(runtime: V8): V8Object {
            val v8Object = super<XTRView.InnerObject>.requestV8Object(runtime)
            v8Object.registerJavaMethod(this, "xtr_text", "xtr_text", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setText", "xtr_setText", arrayOf(String::class.java))
            v8Object.registerJavaMethod(this, "xtr_font", "xtr_font", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setFont", "xtr_setFont", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_textColor", "xtr_textColor", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setTextColor", "xtr_setTextColor", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_numberOfLines", "xtr_numberOfLines", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setNumberOfLines", "xtr_setNumberOfLines", arrayOf(Int::class.java))
            v8Object.registerJavaMethod(this, "xtr_textAlignment", "xtr_textAlignment", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setTextAlignment", "xtr_setTextAlignment", arrayOf(Int::class.java))
            v8Object.registerJavaMethod(this, "xtr_lineSpace", "xtr_lineSpace", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setLineSpace", "xtr_setLineSpace", arrayOf(Double::class.java))
            v8Object.registerJavaMethod(this, "xtr_lineBreakMode", "xtr_lineBreakMode", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setLineBreakMode", "xtr_setLineBreakMode", arrayOf(Int::class.java))
            v8Object.registerJavaMethod(this, "xtr_textRectForBounds", "xtr_textRectForBounds", arrayOf(V8Object::class.java))
            return v8Object
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
            when(xtrTextAlignment) {
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

        fun xtr_text(): String? {
            return textView.text.substring(0)
        }

        fun xtr_setText(value: String) {
            textView.text = value
            resetTextLines()
        }

        private var xtrFont: XTRFont = XTRFont(14.0, null)
            set(value) {
                field = value
                textView.textSize = value.pointSize.toFloat()
                var typefaceStyle = Typeface.NORMAL
                if (value.fontWeight == "700" && value.fontStyle == "italic") {
                    typefaceStyle = Typeface.BOLD_ITALIC
                }
                else if (value.fontWeight == "700") {
                    typefaceStyle = Typeface.BOLD
                }
                else if (value.fontStyle == "italic") {
                    typefaceStyle = Typeface.ITALIC
                }
                textView.typeface = Typeface.create(value.familyName, typefaceStyle)
                resetTextLines()
            }

        fun xtr_font(): V8Value {
            return XTRUtils.fromObject(xtrContext, this.xtrFont) as? V8Object ?: V8.getUndefined()
        }

        fun xtr_setFont(value: V8Object) {
            XTRUtils.toFont(value)?.let {
                xtrFont = it
            }
        }

        fun xtr_textColor(): V8Value {
            return XTRUtils.fromObject(xtrContext, XTRUtils.fromIntColor(textView.currentTextColor)) as? V8Object ?: V8.getUndefined()
        }

        fun xtr_setTextColor(value: V8Object) {
            XTRUtils.toColor(value)?.let {
                textView.setTextColor(it.intColor())
            }
        }

        fun xtr_setTextColor(value: XTRColor) {
            XTRUtils.toColor(value)?.let {
                textView.setTextColor(it.intColor())
            }
        }

        private var numberOfLines = 1
            set(value) {
                field = value
                resetTextLines()
            }

        fun xtr_numberOfLines(): Int {
            return numberOfLines
        }

        fun xtr_setNumberOfLines(value: Int) {
            numberOfLines = value
        }

        private var xtrTextAlignment = 0
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

        fun xtr_textAlignment(): Int {
            return xtrTextAlignment
        }

        fun xtr_setTextAlignment(value: Int) {
            xtrTextAlignment = value
        }

        private var lineSpace = 0.0
            set(value) {
                field = value
                textView.setLineSpacing(value.toFloat() * resources.displayMetrics.density, 1.0f)
                resetTextLines()
            }

        fun xtr_lineSpace(): Double {
            return lineSpace
        }

        fun xtr_setLineSpace(value: Double) {
            lineSpace = value
        }

        private var lineBreakMode = 0
            set(value) {
                field = value
                if (value == 4) {
                    textView.ellipsize = TextUtils.TruncateAt.END
                }
                else {
                    textView.ellipsize = null
                }
            }

        fun xtr_lineBreakMode(): Int {
            return lineBreakMode
        }

        fun xtr_setLineBreakMode(value: Int) {
            lineBreakMode = value
        }

        fun xtr_textRectForBounds(value: V8Object): V8Value {
            XTRUtils.toRect(value)?.let {
                textView.measure(
                        MeasureSpec.makeMeasureSpec((it.width * resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST),
                        MeasureSpec.makeMeasureSpec((it.height * resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST)
                )
            }
            return XTRUtils.fromObject(xtrContext, XTRRect(0.0, 0.0, textView.measuredWidth.toDouble() / resources.displayMetrics.density, textView.measuredHeight.toDouble() / resources.displayMetrics.density)) as? V8Object ?: V8.getUndefined()
        }

        fun xtr_textRectForBounds(value: XTRRect): XTRRect {
            XTRUtils.toRect(value)?.let {
                textView.measure(
                        MeasureSpec.makeMeasureSpec((it.width * resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST),
                        MeasureSpec.makeMeasureSpec((it.height * resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST)
                )
            }
            return XTRRect(0.0, 0.0, textView.measuredWidth.toDouble() / resources.displayMetrics.density, textView.measuredHeight.toDouble() / resources.displayMetrics.density)
        }

        override fun xtr_intrinsicContentSize(width: Double): V8Value {
            val textBounds = xtr_textRectForBounds(XTRRect(0.0, 0.0, width, Double.MAX_VALUE))
            return XTRUtils.fromObject(xtrContext, XTRSize(Math.ceil(textBounds.width), Math.ceil(textBounds.height))) as? V8Object ?: V8.getUndefined()
        }

    }

}
package com.opensource.xtruntime

import android.graphics.Color
import android.graphics.Rect
import android.graphics.Typeface
import android.os.Build
import android.os.Handler
import android.text.TextUtils
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import org.mozilla.javascript.ScriptableObject
import java.util.*
import kotlin.concurrent.timerTask

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTRLabel: XTRComponent() {

    override val name: String = "XTRLabel"

    fun createScriptObject(rect: Any, scriptObject: Any): XTRLabel.InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            return XTRLabel.InnerObject(it, xtrContext)
        }
        return null
    }

    class InnerObject(scriptObject: ScriptableObject, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()
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
            if (textView.height > this.height) {
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
                            Timer().schedule(timerTask {
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
            }
        }

        fun xtr_text(): String? {
            return textView.text.substring(0)
        }

        fun xtr_setText(value: Any?) {
            (value as? String)?.let {
                textView.text = it
                resetTextLines()
            }
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

        fun xtr_font(): XTRFont {
            return this.xtrFont
        }

        fun xtr_setFont(value: Any?) {
            XTRUtils.toFont(value)?.let {
                xtrFont = it
            }
        }

        fun xtr_textColor(): XTRColor {
            return XTRUtils.fromIntColor(textView.currentTextColor)
        }

        fun xtr_setTextColor(value: Any?) {
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

        fun xtr_setNumberOfLines(value: Any?) {
            (value as? Double)?.let {
                numberOfLines = it.toInt()
            }
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

        fun xtr_setTextAlignment(value: Any?) {
            (value as? Double)?.let {
                xtrTextAlignment = it.toInt()
            }
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

        fun xtr_setLineSpace(value: Any?) {
            (value as? Double)?.let {
                lineSpace = it
            }
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

        fun xtr_setLineBreakMode(value: Any?) {
            (value as? Double)?.let {
                lineBreakMode = it.toInt()
            }
        }

        fun xtr_textRectForBounds(value: Any?): XTRRect {
            XTRUtils.toRect(value)?.let {
                textView.measure(
                        MeasureSpec.makeMeasureSpec((it.width * resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST),
                        MeasureSpec.makeMeasureSpec((it.height * resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST)
                )
            }
            return XTRRect(0.0, 0.0, textView.measuredWidth.toDouble() / resources.displayMetrics.density, textView.measuredHeight.toDouble() / resources.displayMetrics.density)
        }

        override fun xtr_intrinsicContentSize(width: Any?): XTRSize? {
            val textBounds = xtr_textRectForBounds(XTRRect(0.0, 0.0, (width as? Double) ?: 0.0, Double.MAX_VALUE))
            return XTRSize(Math.ceil(textBounds.width), Math.ceil(textBounds.height))
        }

    }

}
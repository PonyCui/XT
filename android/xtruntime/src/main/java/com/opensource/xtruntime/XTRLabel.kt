package com.opensource.xtruntime

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
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager
import kotlin.concurrent.timerTask

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTRLabel @JvmOverloads constructor(
        xtrContext: XTRContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTRView(xtrContext, attrs, defStyleAttr), XTRComponentInstance {

    val textView: TextView = TextView(context)
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

    var mFont: XTRFont = XTRFont(14.0, "400", "normal", "")
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

    override fun intrinsicContentSize(width: Double): XTRSize? {
        this.textView.measure(
                MeasureSpec.makeMeasureSpec((width * this.resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST),
                MeasureSpec.makeMeasureSpec((Double.MAX_VALUE * this.resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST)
        )
        return XTRSize(this.textView.measuredWidth.toDouble() / this.resources.displayMetrics.density, this.textView.measuredHeight.toDouble() / this.resources.displayMetrics.density)
    }

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRLabel"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
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

        fun create(): String {
            val view = XTRLabel(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_text(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTRLabel)?.textView?.text?.substring(0) ?: ""
        }

        fun xtr_setText(value: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRLabel)?.let {
                it.textView.text = value
                it.resetTextLines()
            }
        }

        fun xtr_font(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTRLabel)?.mFont?.objectUUID ?: null
        }

        fun xtr_setFont(fontRef: String, objectRef: String) {
            val font = XTMemoryManager.find(fontRef) as? XTRFont ?: return
            (XTMemoryManager.find(objectRef) as? XTRLabel)?.mFont = font
        }

        fun xtr_textColor(objectRef: String): V8Value {
            return XTRUtils.fromIntColor((XTMemoryManager.find(objectRef) as? XTRLabel)?.textView?.currentTextColor ?: Color.BLACK, context.runtime)
        }

        fun xtr_setTextColor(value: V8Object, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRLabel)?.let {
                it.textView.setTextColor(XTRUtils.toColor(value)?.intColor() ?: 0)
            }
        }

        fun xtr_numberOfLines(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTRLabel)?.numberOfLines ?: 0
        }

        fun xtr_setNumberOfLines(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRLabel)?.let {
                it.numberOfLines = value
            }
        }

        fun xtr_textAlignment(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTRLabel)?.mTextAlignment ?: 0
        }

        fun xtr_setTextAlignment(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRLabel)?.let {
                it.mTextAlignment = value
            }
        }

        fun xtr_lineSpace(objectRef: String): Double {
            return (XTMemoryManager.find(objectRef) as? XTRLabel)?.lineSpace ?: 0.0
        }

        fun xtr_setLineSpace(value: Double, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRLabel)?.let {
                it.lineSpace = value
            }
        }

        fun xtr_lineBreakMode(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTRLabel)?.lineBreakMode ?: 0
        }

        fun xtr_setLineBreakMode(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRLabel)?.let {
                it.lineBreakMode = value
            }
        }

        fun xtr_textRectForBounds(value: V8Object, objectRef: String): V8Value {
            val view = (XTMemoryManager.find(objectRef) as? XTRLabel) ?: return V8.getUndefined()
            XTRUtils.toRect(value)?.let {
                view.textView.measure(
                        MeasureSpec.makeMeasureSpec((it.width * view.resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST),
                        MeasureSpec.makeMeasureSpec((it.height * view.resources.displayMetrics.density).toInt(), MeasureSpec.AT_MOST)
                )
            }
            return XTRUtils.fromRect(XTRRect(0.0, 0.0, view.textView.measuredWidth.toDouble() / view.resources.displayMetrics.density, view.textView.measuredHeight.toDouble() / view.resources.displayMetrics.density), context.runtime)
        }

    }

}
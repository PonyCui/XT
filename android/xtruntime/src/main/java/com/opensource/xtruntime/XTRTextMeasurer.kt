package com.opensource.xtruntime

import android.graphics.Typeface
import android.view.View
import android.widget.TextView
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value

/**
 * Created by cuiminghui on 2017/11/15.
 */
class XTRTextMeasurer: XTRComponent() {

    override val name: String = "XTRTextMeasurer"
    lateinit var measureTextView: TextView

    override fun v8Object(): V8Object? {
        measureTextView = TextView(xtrContext.appContext)
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "measureText", "measureText", arrayOf(String::class.java, V8Object::class.java))
        return v8Object
    }

    fun measureText(text: String, params: V8Object): V8Value {
        val numberOfLines = (params.get("numberOfLines") as? Int) ?: ((params.get("numberOfLines") as? Double) ?: 1.0).toInt()
        if (android.os.Build.VERSION.SDK_INT >= 16) {
            if (numberOfLines <= 0) {
                measureTextView.maxLines = Int.MAX_VALUE
            }
            else {
                measureTextView.maxLines = numberOfLines
            }
        }
        val fontObject = params.get("font") as? V8Object
        val font = XTRUtils.toFont(fontObject)
        fontObject?.release()
        font?.let {
            measureTextView.textSize = it.pointSize.toFloat()
            var typefaceStyle = Typeface.NORMAL
            if (it.fontWeight == "700" && it.fontStyle == "italic") {
                typefaceStyle = Typeface.BOLD_ITALIC
            }
            else if (it.fontWeight == "700") {
                typefaceStyle = Typeface.BOLD
            }
            else if (it.fontStyle == "italic") {
                typefaceStyle = Typeface.ITALIC
            }
            measureTextView.typeface = Typeface.create(it.familyName, typefaceStyle)
        }
        val lineSpace = (params.get("lineSpace") as? Double) ?: (params.get("lineSpace") as? Int)?.toDouble() ?: 0.0
        measureTextView.setLineSpacing(lineSpace.toFloat() * xtrContext.appContext.resources.displayMetrics.density, 1.0f)
        measureTextView.text = text
        val rectObject = params.get("inRect") as? V8Object
        XTRUtils.toRect(rectObject)?.let {
            rectObject?.release()
            measureTextView.measure(
                    View.MeasureSpec.makeMeasureSpec((it.width * xtrContext.appContext.resources.displayMetrics.density).toInt(), View.MeasureSpec.AT_MOST),
                    View.MeasureSpec.makeMeasureSpec((it.height * xtrContext.appContext.resources.displayMetrics.density).toInt(), View.MeasureSpec.AT_MOST)
            )
            val bounds = XTRRect(0.0, 0.0, measureTextView.measuredWidth.toDouble() / xtrContext.appContext.resources.displayMetrics.density, measureTextView.measuredHeight.toDouble() / xtrContext.appContext.resources.displayMetrics.density)
            return XTRUtils.fromRect(bounds, xtrContext.v8Runtime)
        }
        return V8.getUndefined()
    }

}
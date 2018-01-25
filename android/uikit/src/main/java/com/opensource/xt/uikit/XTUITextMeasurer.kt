package com.opensource.xt.uikit

import android.view.View
import android.widget.TextView
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xt.core.XTMemoryManager

/**
 * Created by cuiminghui on 2017/11/15.
 */
class XTUITextMeasurer {

    class JSExports(val context: XTUIContext): XTUIComponentExport() {

        override val name: String = "_XTUITextMeasurer"

        var measureTextView: TextView = TextView(context.appContext)

        override fun exports(): V8Object {
            val v8Object = V8Object(context.runtime)
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
            val fontRef = params.get("font") as? String ?: return V8.getUndefined()
            val font = XTMemoryManager.find(fontRef) as? XTUIFont ?: return V8.getUndefined()
            measureTextView.textSize = font.pointSize.toFloat()
            measureTextView.typeface = font.typeface
            val lineSpace = (params.get("lineSpace") as? Double) ?: (params.get("lineSpace") as? Int)?.toDouble() ?: 0.0
            measureTextView.setLineSpacing(lineSpace.toFloat() * context.appContext.resources.displayMetrics.density, 1.0f)
            measureTextView.text = text
            val rectObject = params.get("inRect") as? V8Object
            XTUIUtils.toRect(rectObject)?.let {
                rectObject?.release()
                measureTextView.measure(
                        View.MeasureSpec.makeMeasureSpec((it.width * context.appContext.resources.displayMetrics.density).toInt(), View.MeasureSpec.AT_MOST),
                        View.MeasureSpec.makeMeasureSpec((it.height * context.appContext.resources.displayMetrics.density).toInt(), View.MeasureSpec.AT_MOST)
                )
                val bounds = XTUIRect(0.0, 0.0, measureTextView.measuredWidth.toDouble() / context.appContext.resources.displayMetrics.density, measureTextView.measuredHeight.toDouble() / context.appContext.resources.displayMetrics.density)
                return XTUIUtils.fromRect(bounds, context.runtime)
            }
            return V8.getUndefined()
        }

    }

}
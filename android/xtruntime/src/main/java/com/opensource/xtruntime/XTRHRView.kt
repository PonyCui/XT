package com.opensource.xtruntime

import android.graphics.Canvas
import android.graphics.Paint
import android.util.AttributeSet
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager

/**
 * Created by cuiminghui on 2018/1/12.
 */
class XTRHRView @JvmOverloads constructor(
        xtrContext: XTRContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTRView(xtrContext, attrs, defStyleAttr), XTRComponentInstance {

    var position: Int = 2
        set(value) {
            field = value
            invalidate()
        }

    var color: XTRColor = XTRColor(0.0, 0.0, 0.0, 0.0)
        set(value) {
            field = value
            invalidate()
        }

    var sharedPaint = Paint()

    override fun requestLayout() {
        super.requestLayout()
        invalidate()
    }

    override fun drawContent(canvas: Canvas?) {
        super.drawContent(canvas)
        val canvas = canvas ?: return
        sharedPaint.reset()
        sharedPaint.color = this.color.intColor()
        sharedPaint.style = Paint.Style.STROKE
        sharedPaint.strokeWidth = 1.0f
        when (this.position) {
            0, 1, 2 -> {
                var yPosition = 0.0
                when (this.position) {
                    0 -> yPosition = 0.0
                    1 -> yPosition = resources.displayMetrics.density.toDouble() / 2.0 - 0.5
                    2 -> yPosition = resources.displayMetrics.density.toDouble() - 1.0
                }
                canvas.drawLine(0.0f, yPosition.toFloat(), canvas.width.toFloat(), yPosition.toFloat(), sharedPaint)
            }
            3, 4, 5 -> {
                var xPosition = 0.0
                when (this.position) {
                    0 -> xPosition = 0.0
                    1 -> xPosition = resources.displayMetrics.density.toDouble() / 2.0 - 0.5
                    2 -> xPosition = resources.displayMetrics.density.toDouble() - 1.0
                }
                canvas.drawLine(xPosition.toFloat(), 0f, xPosition.toFloat(), canvas.height.toFloat(), sharedPaint)
            }
        }
    }

    override fun layoutSubviews() {
        super.layoutSubviews()

//        System.out.println("xt," + this.frame?.width)

    }

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRHRView"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_position", "xtr_position", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setPosition", "xtr_setPosition", arrayOf(Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_color", "xtr_color", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setColor", "xtr_setColor", arrayOf(V8Object::class.java, String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTRHRView(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_position(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTRHRView)?.position ?: 0
        }

        fun xtr_setPosition(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRHRView)?.position = value
        }

        fun xtr_color(objectRef: String): V8Value {
            return (XTMemoryManager.find(objectRef) as? XTRHRView)?.let {
                return@let XTRUtils.fromColor(it.color, context.runtime)
            } ?: XTRUtils.fromColor(XTRColor(0.0, 0.0, 0.0, 0.0), context.runtime)
        }

        fun xtr_setColor(value: V8Object, objectRef: String) {
            XTRUtils.toColor(value)?.let { color ->
                (XTMemoryManager.find(objectRef) as? XTRHRView)?.let {
                    it.color = color
                }
            }
        }

    }

}
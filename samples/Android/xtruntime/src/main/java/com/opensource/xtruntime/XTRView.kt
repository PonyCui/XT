package com.opensource.xtruntime

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Matrix
import android.graphics.Rect
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import org.mozilla.javascript.NativeArray
import org.mozilla.javascript.ScriptableObject
import java.util.*

/**
 * Created by cuiminghui on 2017/9/1.
 */
class XTRView: XTRComponent() {

    override val name: String = "XTRView"

    fun createScriptObject(rect: Any, scriptObject: Any): XTRView.InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            return InnerObject(it, xtrContext)
        }
        return null
    }

    @Suppress("CanBeParameter", "unused")
    open class InnerObject(val scriptObject: ScriptableObject, protected val xtrContext: XTRContext): FrameLayout(xtrContext.appContext), XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()

        init {
            clipChildren = false
        }

        // Mark: View Geometry

        override fun setClipChildren(clipChildren: Boolean) {
            super.setClipChildren(clipChildren)
            invalidate()
        }

        protected var frame: XTRRect? = null
            set(value) {
                field = value
                invalidate()
            }

        fun xtr_frame(): XTRRect {
            return this.frame ?: XTRRect(0.0, 0.0, 0.0, 0.0)
        }

        fun xtr_setFrame(value: Any?) {
            XTRUtils.toRect(value)?.let {
                frame = it
            }
        }

        override fun onDraw(canvas: Canvas?) {
            super.onDraw(canvas)
        }

        override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
            super.onMeasure(widthMeasureSpec, heightMeasureSpec)
            frame?.let {
                val scale = resources.displayMetrics.density
                x = (it.x * scale).toFloat()
                y = (it.y * scale).toFloat()
                setMeasuredDimension((it.width * scale).toInt(), (it.height * scale).toInt())
            }
        }

        // Mark: View Rendering

        protected var backgroundColor: XTRColor? = null
            set(value) { field = value; setBackgroundColor(value?.intColor() ?: Color.TRANSPARENT) }

        fun xtr_backgroundColor(): XTRColor? {
            return this.backgroundColor
        }

        fun xtr_setBackgroundColor(value: Any?) {
            this.backgroundColor = XTRUtils.toColor(value)
        }

        fun xtr_hidden(): Boolean {
            return this.visibility == View.GONE
        }

        fun xtr_setHidden(value: Boolean) {
            this.visibility = if (value) View.GONE else View.VISIBLE
        }

        protected var opaque = false

        fun xtr_opaque(): Boolean {
            return opaque
        }

        fun xtr_setOpaque(value: Boolean) {
            this.opaque = value
        }

        override fun isOpaque(): Boolean {
            return opaque
        }

        // Mark: View Layer-Back Rendering

        protected var cornerRadius: Double = 0.0 // todo maskView.
            set(value) {
                field = value
                invalidate()
            }

        // Mark: View Hierarchy

        fun xtr_superview(): ScriptableObject? {
            (parent as? XTRView.InnerObject)?.let {
                return XTRUtils.fromObject(xtrContext, it)
            }
            return null
        }

        fun xtr_subviews(): NativeArray {
            return NativeArray((0 until childCount).map {
                (getChildAt(it) as? XTRView.InnerObject)?.let {
                    return@map XTRUtils.fromObject(xtrContext, it)
                }
            }.toTypedArray())
        }

        fun xtr_window(): ScriptableObject? {
            var current = parent
            while (current != null) {
                (current as? XTRWindow.InnerObject)?.let {
                    return XTRUtils.fromObject(xtrContext, it)
                }
                current = current.parent
            }
            return null
        }

        fun xtr_removeFromSuperview() {
            (parent as? ViewGroup)?.removeView(this)
        }

        fun xtr_insertSubviewAtIndex(subview: Any?, atIndex: Int) {
            XTRUtils.toView(subview)?.let { subview ->
                addView(subview, atIndex, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
            }
        }

        fun xtr_exchangeSubviewAtIndex(index1: Int, index2: Int) {
            if (index1 > index2) {
                val view1 = getChildAt(index1)
                val view2 = getChildAt(index2)
                removeViewAt(index1)
                removeViewAt(index2)
                addView(view1, index2)
                addView(view2, index1)
            }
            else if (index1 < index2) {
                val view1 = getChildAt(index1)
                val view2 = getChildAt(index2)
                removeViewAt(index2)
                removeViewAt(index1)
                addView(view2, index1)
                addView(view1, index2)
            }
        }

        fun xtr_addSubview(view: Any?) {
            XTRUtils.toView(view)?.let {
                addView(it, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
            }
        }

        fun xtr_insertSubviewBelow(view: Any?, siblingSubview: Any?) {
            XTRUtils.toView(siblingSubview)?.let {
                indexOfChild(it)?.let {
                    if (it >= 0) {
                        xtr_insertSubviewAtIndex(view, it)
                    }
                }
            }
        }

        fun xtr_insertSubviewAbove(view: Any?, siblingSubview: Any?) {
            XTRUtils.toView(siblingSubview)?.let {
                indexOfChild(it)?.let {
                    if (it >= 0){
                        xtr_insertSubviewAtIndex(view, it + 1)
                    }
                }
            }
        }

        fun xtr_bringSubviewToFront(subview: Any?) {
            XTRUtils.toView(subview)?.let {
                bringChildToFront(it)
            }
        }

        fun xtr_sendSubviewToBack(subview: Any?) {
            XTRUtils.toView(subview)?.let {
                removeView(it)
                addView(it, 0, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
            }
        }

    }

}
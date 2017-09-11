package com.opensource.xtruntime

import android.graphics.Color
import android.view.MotionEvent
import android.view.ViewGroup
import android.widget.ScrollView
import org.mozilla.javascript.NativeArray
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTRScrollView: XTRComponent() {

    override val name: String = "XTRScrollView"

    fun createScriptObject(rect: Any, scriptObject: Any): XTRView.InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            val view = InnerObject(XTRUtils.toView(it.get("innerView")) as XTRView.InnerObject, it, xtrContext)
            XTRUtils.toRect(rect)?.let {
                view.frame = it
            }
            return view
        }
        return null
    }

    class InnerObject(val innerView: XTRView.InnerObject, scriptObject: ScriptableObject, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        init {
            this.xtr_setUserInteractionEnabled(true)
            this.innerView.xtr_setUserInteractionEnabled(true)
            this.xtr_addSubview(this.innerView)
        }

        fun xtr_contentOffset(): XTRPoint {
            return XTRPoint(
                    (this.innerView.scrollX.toFloat() / resources.displayMetrics.density).toDouble(),
                    (this.innerView.scrollY.toFloat() / resources.displayMetrics.density).toDouble()
            )
        }

        fun xtr_setContentOffset(value: Any?) {
            XTRUtils.toPoint(value)?.let {
                this.innerView.scrollX = (it.x * resources.displayMetrics.density).toInt()
                this.innerView.scrollY = (it.y * resources.displayMetrics.density).toInt()
                this.innerView.requestLayout()
            }
        }

        fun xtr_disableChildrenInteractive(value: Any?) {
            (value as? Boolean)?.let {
                this.innerView.xtr_setUserInteractionEnabled(!it)
            }
        }

        override fun onTouchEvent(event: MotionEvent?): Boolean {
            event?.let { event ->
                val touches = NativeArray((0 until event.pointerCount)?.map {
                    return@map XTRPoint(
                            (event.getX(it) / resources.displayMetrics.density).toDouble(),
                            (event.getY(it) / resources.displayMetrics.density).toDouble()
                    )
                }.toTypedArray())
                when {
                    event.action == MotionEvent.ACTION_DOWN -> {
                        xtrContext.invokeMethod(scriptObject, "handleTouchStart", arrayOf(touches, System.currentTimeMillis()))
                    }
                    event.action == MotionEvent.ACTION_MOVE -> {
                        xtrContext.invokeMethod(scriptObject, "handleTouchMove", arrayOf(touches, System.currentTimeMillis()))
                    }
                    event.action == MotionEvent.ACTION_UP -> {
                        xtrContext.invokeMethod(scriptObject, "handleTouchEnd", arrayOf(touches, System.currentTimeMillis()))
                    }
                    else -> { }
                }
            }
            return true
        }

        private var stealingFirstPoint: XTRPoint = XTRPoint(0.0, 0.0)
        private var stolen = false
        private var stolenStarted = false

        override fun stealingTouch(event: MotionEvent?, offset: XTRPoint): Boolean {
            event?.let { event ->
                if (event.action == MotionEvent.ACTION_DOWN) {
                    stealingFirstPoint = XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                    stolenStarted = false
                    stolen = false
                    return false
                }
                else if (event.action == MotionEvent.ACTION_MOVE) {
                    val curPoint = XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                    if (Math.abs(curPoint.x - stealingFirstPoint.x) > 8.0 || Math.abs(curPoint.y - stealingFirstPoint.y) > 8.0) {
                        stolen = true
                    }
                }
                if (stolen) {
                    val touches = NativeArray((0 until event.pointerCount)?.map {
                        return@map XTRPoint(
                                (event.getX(it) / resources.displayMetrics.density).toDouble() + offset.x,
                                (event.getY(it) / resources.displayMetrics.density).toDouble() + offset.y
                        )
                    }.toTypedArray())
                    if (!stolenStarted) {
                        xtrContext.invokeMethod(scriptObject, "handleTouchStart", arrayOf(touches, System.currentTimeMillis(), true))
                        stolenStarted = true
                    }
                    else if (event.action == MotionEvent.ACTION_MOVE) {
                        xtrContext.invokeMethod(scriptObject, "handleTouchMove", arrayOf(touches, System.currentTimeMillis(), true))
                    }
                    else if (event.action == MotionEvent.ACTION_UP) {
                        xtrContext.invokeMethod(scriptObject, "handleTouchEnd", arrayOf(touches, System.currentTimeMillis(), true))
                        stolenStarted = false
                        stolen = false
                    }
                    return true
                }
            }
            return false
        }

    }

}
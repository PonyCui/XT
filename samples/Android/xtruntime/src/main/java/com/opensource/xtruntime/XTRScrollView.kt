package com.opensource.xtruntime

import android.view.MotionEvent
import org.mozilla.javascript.NativeArray
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTRScrollView: XTRComponent() {

    companion object {
        internal var trackingScrollView: XTRScrollView.InnerObject? = null
        internal var deceleratingScrollView: XTRScrollView.InnerObject? = null
    }

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

        private var contentSize: XTRSize = XTRSize(0.0, 0.0)

        fun xtr_setContentSize(value: Any?) {
            XTRUtils.toSize(value)?.let { contentSize = it }
        }

        private var bounce: Boolean = true

        fun xtr_setBounce(value: Any?) {
            (value as? Boolean)?.let { bounce = it }
        }

        private var alwaysBounceVertical: Boolean = false

        fun xtr_setAlwaysBounceVertical(value: Any?) {
            (value as? Boolean)?.let { alwaysBounceVertical = it }
        }

        private var alwaysBounceHorizontal: Boolean = false

        fun xtr_setAlwaysBounceHorizontal(value: Any?) {
            (value as? Boolean)?.let { alwaysBounceHorizontal = it }
        }

        fun xtr_disableChildrenInteractive(value: Any?) {
            (value as? Boolean)?.let {
                this.innerView.xtr_setUserInteractionEnabled(!it)
            }
        }

        fun xtr_markAsDecelarating(value: Any?) {
            (value as? Boolean)?.let {
                if (it) { XTRScrollView.deceleratingScrollView = this }
                else { XTRScrollView.deceleratingScrollView = null }
            }
        }

        private var tracking = false

        override fun onTouchEvent(event: MotionEvent?): Boolean {
            val event = event ?: return false
            if (!tracking) {
                var currentParent: XTRView.InnerObject? = parent as? XTRView.InnerObject
                var currentOffset = XTRPoint(frame?.x ?: 0.0 - scrollX / resources.displayMetrics.density, frame?.y ?: 0.0 - scrollY / resources.displayMetrics.density)
                while (currentParent != null) {
                    if (currentParent.stealingTouch(event, currentOffset)) {
                        if (tracking) {
                            tracking = false
                            xtrContext.invokeMethod(scriptObject, "handleTouchCancel", arrayOf())
                        }
                        return true
                    }
                    currentOffset = XTRPoint(
                            currentOffset.x + (currentParent.frame?.x ?: 0.0) - currentParent.scrollX / resources.displayMetrics.density,
                            currentOffset.y + (currentParent.frame?.y ?: 0.0) - currentParent.scrollY / resources.displayMetrics.density
                    )
                    currentParent = currentParent.parent as? XTRView.InnerObject
                }
            }
            if (shouldTracking(event)) {
                handleScrollEvent(event, XTRPoint(0.0, 0.0))
            }
            return true
        }

        private var touchFirstPoint: XTRPoint = XTRPoint(0.0, 0.0)

        private var stolen = false

        private var isHorizonScrollable: Boolean = false
            get() {
                return contentSize.width > this.bounds.width || (bounce && alwaysBounceHorizontal)
            }

        private var isVerticalScrollable: Boolean = false
            get() {
                return contentSize.height > this.bounds.height || (bounce && alwaysBounceVertical)
            }

        override fun stealingTouch(event: MotionEvent?, offset: XTRPoint): Boolean {
            val event = event ?: return false
            if (event.action == MotionEvent.ACTION_DOWN) {
                XTRScrollView.trackingScrollView = null
            }
            if (XTRScrollView.trackingScrollView != null && XTRScrollView.trackingScrollView != this) {
                return false
            }
            if (XTRScrollView.trackingScrollView == this || XTRScrollView.deceleratingScrollView == this) {
                handleScrollEvent(event, offset)
                return true
            }
            else {
                if (event.action == MotionEvent.ACTION_DOWN) {
                    touchFirstPoint = XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                    stolen = false
                    return false
                }
                else if (event.action == MotionEvent.ACTION_MOVE) {
                    val curPoint = XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                    if (isHorizonScrollable && Math.abs(curPoint.x - touchFirstPoint.x) > 16.0) {
                        stolen = true
                    }
                    if (isVerticalScrollable && Math.abs(curPoint.y - touchFirstPoint.y) > 16.0) {
                        stolen = true
                    }
                }
                if (stolen) {
                    handleScrollEvent(event, offset)
                    return true
                }
            }
            return false
        }

        private fun shouldTracking(event: MotionEvent): Boolean {
            return if (tracking || XTRScrollView.deceleratingScrollView == this) {
                true
            } else {
                val curPoint = XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                if (isHorizonScrollable && Math.abs(curPoint.x - touchFirstPoint.x) > 16.0) {
                    true
                } else isVerticalScrollable && Math.abs(curPoint.y - touchFirstPoint.y) > 16.0
            }
        }

        private fun handleScrollEvent(event: MotionEvent, offset: XTRPoint) {
            val touches = NativeArray((0 until event.pointerCount)?.map {
                return@map XTRPoint(
                        (event.getX(it) / resources.displayMetrics.density).toDouble() + offset.x,
                        (event.getY(it) / resources.displayMetrics.density).toDouble() + offset.y
                )
            }.toTypedArray())
            if (!tracking) {
                xtrContext.invokeMethod(scriptObject, "handleTouchStart", arrayOf(touches, System.currentTimeMillis(), true))
                XTRScrollView.trackingScrollView = this
                tracking = true
            }
            else if (event.action == MotionEvent.ACTION_MOVE) {
                xtrContext.invokeMethod(scriptObject, "handleTouchMove", arrayOf(touches, System.currentTimeMillis(), true))
            }
            else if (event.action == MotionEvent.ACTION_UP) {
                xtrContext.invokeMethod(scriptObject, "handleTouchEnd", arrayOf(touches, System.currentTimeMillis(), true))
                stolen = false
                tracking = false
            }
        }

    }

}
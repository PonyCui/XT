package com.opensource.xtruntime

import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTRScrollView: XTRComponent() {

    companion object {
        internal var trackingScrollView: XTRScrollView.InnerObject? = null
        internal var deceleratingScrollView: XTRScrollView.InnerObject? = null
    }

    override val name: String = "XTRScrollView"

    override fun v8Object(): V8Object? {
        XTRImage.runtime = xtrContext.v8Runtime
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "createScriptObject", "createScriptObject", arrayOf(V8Object::class.java, V8Object::class.java))
        return v8Object
    }

    fun createScriptObject(rect: V8Object, scriptObject: V8Object): V8Object {
        val view = InnerObject(XTRUtils.toView(scriptObject.get("innerView")) as XTRView.InnerObject, scriptObject.twin(), xtrContext)
        XTRUtils.toRect(rect)?.let {
            view.frame = it
        }
        return view.requestV8Object(xtrContext.v8Runtime)
    }

    class InnerObject(val innerView: XTRView.InnerObject, scriptObject: V8Object, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        init {
            this.xtr_setUserInteractionEnabled(true)
            this.innerView.xtr_setUserInteractionEnabled(true)
            this.xtr_addSubview(this.innerView)
        }

        override fun requestV8Object(runtime: V8): V8Object {
            val v8Object = super<XTRView.InnerObject>.requestV8Object(runtime)
            v8Object.registerJavaMethod(this, "xtr_contentOffset", "xtr_contentOffset", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setContentOffset", "xtr_setContentOffset", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_setContentSize", "xtr_setContentSize", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_setBounce", "xtr_setBounce", arrayOf(Boolean::class.java))
            v8Object.registerJavaMethod(this, "xtr_setAlwaysBounceVertical", "xtr_setAlwaysBounceVertical", arrayOf(Boolean::class.java))
            v8Object.registerJavaMethod(this, "xtr_setAlwaysBounceHorizontal", "xtr_setAlwaysBounceHorizontal", arrayOf(Boolean::class.java))
            v8Object.registerJavaMethod(this, "xtr_disableChildrenInteractive", "xtr_disableChildrenInteractive", arrayOf(Boolean::class.java))
            v8Object.registerJavaMethod(this, "xtr_markAsDecelarating", "xtr_markAsDecelarating", arrayOf(Boolean::class.java))
            return v8Object
        }

        fun xtr_contentOffset(): XTRPoint {
            return XTRPoint(
                    (this.innerView.scrollX.toFloat() / resources.displayMetrics.density).toDouble(),
                    (this.innerView.scrollY.toFloat() / resources.displayMetrics.density).toDouble()
            )
        }

        fun xtr_setContentOffset(value: V8Object) {
            XTRUtils.toPoint(value)?.let {
                this.innerView.scrollX = (it.x * resources.displayMetrics.density).toInt()
                this.innerView.scrollY = (it.y * resources.displayMetrics.density).toInt()
                this.innerView.requestLayout()
            }
        }

        private var contentSize: XTRSize = XTRSize(0.0, 0.0)

        fun xtr_setContentSize(value: V8Object) {
            XTRUtils.toSize(value)?.let { contentSize = it }
        }

        private var bounce: Boolean = true

        fun xtr_setBounce(value: Boolean) {
            bounce = value
        }

        private var alwaysBounceVertical: Boolean = false

        fun xtr_setAlwaysBounceVertical(value: Boolean) {
            alwaysBounceVertical = value
        }

        private var alwaysBounceHorizontal: Boolean = false

        fun xtr_setAlwaysBounceHorizontal(value: Boolean) {
            alwaysBounceHorizontal = value
        }

        fun xtr_disableChildrenInteractive(value: Boolean) {
            this.innerView.xtr_setUserInteractionEnabled(!value)
        }

        fun xtr_markAsDecelarating(value: Boolean) {
            if (value) { XTRScrollView.deceleratingScrollView = this }
            else { XTRScrollView.deceleratingScrollView = null }
        }

//        private var tracking = false
//
//        override fun onTouchEvent(event: MotionEvent?): Boolean {
//            val event = event ?: return false
//            if (!tracking) {
//                var currentParent: XTRView.InnerObject? = parent as? XTRView.InnerObject
//                var currentOffset = XTRPoint(frame?.x ?: 0.0 - scrollX / resources.displayMetrics.density, frame?.y ?: 0.0 - scrollY / resources.displayMetrics.density)
//                while (currentParent != null) {
//                    if (currentParent.stealingTouch(event, currentOffset)) {
//                        if (tracking) {
//                            tracking = false
//                            xtrContext.invokeMethod(scriptObject, "handleTouchCancel", arrayOf())
//                        }
//                        return true
//                    }
//                    currentOffset = XTRPoint(
//                            currentOffset.x + (currentParent.frame?.x ?: 0.0) - currentParent.scrollX / resources.displayMetrics.density,
//                            currentOffset.y + (currentParent.frame?.y ?: 0.0) - currentParent.scrollY / resources.displayMetrics.density
//                    )
//                    currentParent = currentParent.parent as? XTRView.InnerObject
//                }
//            }
//            if (shouldTracking(event)) {
//                handleScrollEvent(event, XTRPoint(0.0, 0.0))
//            }
//            return true
//        }
//
//        private var touchFirstPoint: XTRPoint = XTRPoint(0.0, 0.0)
//
//        private var stolen = false
//
//        private var isHorizonScrollable: Boolean = false
//            get() {
//                return contentSize.width > this.bounds.width || (bounce && alwaysBounceHorizontal)
//            }
//
//        private var isVerticalScrollable: Boolean = false
//            get() {
//                return contentSize.height > this.bounds.height || (bounce && alwaysBounceVertical)
//            }
//
//        override fun stealingTouch(event: MotionEvent?, offset: XTRPoint): Boolean {
//            val event = event ?: return false
//            if (event.action == MotionEvent.ACTION_DOWN) {
//                XTRScrollView.trackingScrollView = null
//            }
//            if (XTRScrollView.trackingScrollView != null && XTRScrollView.trackingScrollView != this) {
//                return false
//            }
//            if (XTRScrollView.trackingScrollView == this || XTRScrollView.deceleratingScrollView == this) {
//                handleScrollEvent(event, offset)
//                return true
//            }
//            else {
//                if (event.action == MotionEvent.ACTION_DOWN) {
//                    touchFirstPoint = XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
//                    stolen = false
//                    return false
//                }
//                else if (event.action == MotionEvent.ACTION_MOVE) {
//                    val curPoint = XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
//                    if (isHorizonScrollable && Math.abs(curPoint.x - touchFirstPoint.x) > 16.0) {
//                        stolen = true
//                    }
//                    if (isVerticalScrollable && Math.abs(curPoint.y - touchFirstPoint.y) > 16.0) {
//                        stolen = true
//                    }
//                }
//                if (stolen) {
//                    handleScrollEvent(event, offset)
//                    return true
//                }
//            }
//            return false
//        }
//
//        private fun shouldTracking(event: MotionEvent): Boolean {
//            return if (tracking || XTRScrollView.deceleratingScrollView == this) {
//                true
//            } else {
//                val curPoint = XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
//                if (isHorizonScrollable && Math.abs(curPoint.x - touchFirstPoint.x) > 16.0) {
//                    true
//                } else isVerticalScrollable && Math.abs(curPoint.y - touchFirstPoint.y) > 16.0
//            }
//        }
//
//        private fun handleScrollEvent(event: MotionEvent, offset: XTRPoint) {
//            val touches = NativeArray((0 until event.pointerCount)?.map {
//                return@map XTRPoint(
//                        (event.getX(it) / resources.displayMetrics.density).toDouble() + offset.x,
//                        (event.getY(it) / resources.displayMetrics.density).toDouble() + offset.y
//                )
//            }.toTypedArray())
//            if (!tracking) {
//                xtrContext.invokeMethod(scriptObject, "handleTouchStart", arrayOf(touches, System.currentTimeMillis(), true))
//                XTRScrollView.trackingScrollView = this
//                tracking = true
//            }
//            else if (event.action == MotionEvent.ACTION_MOVE) {
//                xtrContext.invokeMethod(scriptObject, "handleTouchMove", arrayOf(touches, System.currentTimeMillis(), true))
//            }
//            else if (event.action == MotionEvent.ACTION_UP) {
//                xtrContext.invokeMethod(scriptObject, "handleTouchEnd", arrayOf(touches, System.currentTimeMillis(), true))
//                stolen = false
//                tracking = false
//            }
//        }

    }

}
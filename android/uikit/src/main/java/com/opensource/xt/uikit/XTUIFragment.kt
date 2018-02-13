package com.opensource.xt.uikit

import android.app.Fragment
import android.content.Context
import android.os.Build
import android.os.Bundle
import android.util.AttributeSet
import android.view.*
import android.widget.FrameLayout
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTContext
import java.lang.ref.WeakReference

/**
 * Created by cuiminghui on 2018/1/9.
 */

open class XTUIFragment: Fragment() {

    companion object {

        private var velocityTracker = VelocityTracker.obtain()

    }

    var rootView: RootView? = null

    open var view: XTUIView? = null

    open var navigationBar: XTUINavigationBar? = null
        set(value) {
            field = value
            resetContents()
        }

    var navigationBarHidden = true
        set(value) {
            field = value
            resetContents()
        }

    override fun onCreateView(inflater: LayoutInflater?, container: ViewGroup?, savedInstanceState: Bundle?): View {
        this.rootView = RootView(inflater?.context as Context)
        return this.rootView as View
    }

    override fun onViewCreated(rootView: View?, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        resetContents()
    }

    fun resetContents() {
        val rootView = this.rootView ?: return
        val navigationHidden = this.navigationBarHidden || this.navigationBar == null
        rootView.removeAllViews()
        this.view?.let { rootView.removeView(it) }
        this.navigationBar?.let {
            rootView.removeView(it)
            activity?.window?.let { window ->
                it.window = WeakReference(window)
            }
        }
        this.view?.let { innerView ->
            rootView.view = WeakReference(innerView)
            rootView.addView(innerView, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
            rootView.topLayoutLength = 0.0
        } ?: kotlin.run { rootView.view = null }
        this.navigationBar?.takeIf { !navigationHidden }?.let { navigationBar ->
            rootView.navigationBar = WeakReference(navigationBar)
            rootView.addView(navigationBar, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
            rootView.topLayoutLength = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) 48.0 else 68.0
        } ?: kotlin.run { rootView.navigationBar = null }
        rootView.resetLayout()
    }

    class RootView @JvmOverloads constructor(
            context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
    ) : FrameLayout(context, attrs, defStyleAttr) {

        var topLayoutLength = 0.0
            set(value) {
                field = value
                resetLayout()
            }

        var bottomLayoutLength = 0.0
            set(value) {
                field = value
                resetLayout()
            }

        var view: WeakReference<XTUIView>? = null
        var navigationBar: WeakReference<XTUINavigationBar>? = null

        override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
            super.onLayout(changed, left, top, right, bottom)
            if (changed) {
                resetLayout()
            }
        }

        fun resetLayout() {
            navigationBar?.get()?.let {
                it.frame = XTUIRect(0.0, 0.0, (this.width / resources.displayMetrics.density).toDouble(), this.topLayoutLength)
            }
            view?.get()?.let {
                it.frame = XTUIRect(0.0, this.topLayoutLength, (this.width / resources.displayMetrics.density).toDouble(), (this.height / resources.displayMetrics.density).toDouble() - this.topLayoutLength - this.bottomLayoutLength)
            }
        }

        private var currentTouchScriptObject: V8Object? = null
        private var currentTouchAdjustingY = 0.0

        override fun onTouchEvent(event: MotionEvent?): Boolean {
            val xtrContext = view?.get()?.xtrContext ?: return false
            velocityTracker.addMovement(event)
            when (event?.actionMasked) {
                MotionEvent.ACTION_DOWN -> {
                    if (event.y / resources.displayMetrics.density < this.topLayoutLength && navigationBar != null) {
                        currentTouchScriptObject = navigationBar?.get()?.scriptObject()
                        currentTouchAdjustingY = 0.0
                    }
                    else {
                        currentTouchScriptObject = view?.get()?.scriptObject()
                        currentTouchAdjustingY = this.topLayoutLength
                    }
                    val pid = event.getPointerId(0).toString()
                    val timestamp = System.nanoTime() / 1000000
                    val point = XTUIUtils.fromPoint(XTUIPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density - currentTouchAdjustingY)), xtrContext.runtime)
                    currentTouchScriptObject?.takeIf { !it.isReleased }?.let {
                        XTContext.invokeMethod(it, "handlePointerDown", listOf(pid, timestamp, point))
                    }
                    XTContext.release(point)
                }
                MotionEvent.ACTION_MOVE -> {
                    velocityTracker.computeCurrentVelocity(1000)
                    val timestamp = System.nanoTime() / 1000000
                    val points = V8Object(xtrContext.runtime)
                    (0 until event.pointerCount).forEach { pointerID ->
                        val point = XTUIPoint((event.getX(pointerID) / resources.displayMetrics.density).toDouble(), (event.getY(pointerID) / resources.displayMetrics.density - currentTouchAdjustingY))

                        (XTUIUtils.fromPoint(point, xtrContext.runtime) as? V8Object)?.let {
                            points.add(pointerID.toString(), it)
                            XTContext.release(it)
                        }
                    }
                    val velocities = V8Object(xtrContext.runtime)
                    (0 until event.pointerCount).forEach { pointerID ->
                        val velocity = XTUIPoint(velocityTracker.getXVelocity(pointerID).toDouble(), velocityTracker.getYVelocity(pointerID).toDouble())
                        (XTUIUtils.fromPoint(velocity, xtrContext.runtime) as? V8Object)?.let {
                            velocities.add(pointerID.toString(), it)
                            XTContext.release(it)
                        }
                    }
                    currentTouchScriptObject?.takeIf { !it.isReleased }?.let {
                        XTContext.invokeMethod(it, "handlePointersMove", listOf(timestamp, points, velocities))
                    }
                    XTContext.release(velocities)
                    XTContext.release(points)
                }
                MotionEvent.ACTION_UP -> {
                    velocityTracker.computeCurrentVelocity(1000)
                    val pid = event.getPointerId(0).toString()
                    val timestamp = System.nanoTime() / 1000000
                    val point = XTUIUtils.fromPoint(XTUIPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density - currentTouchAdjustingY)), xtrContext.runtime)
                    val velocity = XTUIUtils.fromPoint(XTUIPoint(velocityTracker.getXVelocity(event.actionIndex).toDouble(), velocityTracker.getYVelocity(event.actionIndex).toDouble()), xtrContext.runtime)
                    currentTouchScriptObject?.takeIf { !it.isReleased }?.let {
                        XTContext.invokeMethod(it, "handlePointerUp", listOf(pid, timestamp, point, velocity))
                        XTContext.release(it)
                    }
                    XTContext.release(point)
                    XTContext.release(velocity)
                    velocityTracker.clear()
                }
                MotionEvent.ACTION_CANCEL -> {
                    velocityTracker.clear()
                }
            }
            return true
        }

    }

}
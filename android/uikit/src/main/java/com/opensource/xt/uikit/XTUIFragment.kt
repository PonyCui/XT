package com.opensource.xt.uikit

import android.app.Fragment
import android.content.Context
import android.content.res.Configuration
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.os.Build
import android.os.Bundle
import android.util.AttributeSet
import android.view.*
import android.widget.FrameLayout
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTContext
import java.lang.ref.WeakReference
import android.util.DisplayMetrics



/**
 * Created by cuiminghui on 2018/1/9.
 */

open class XTUIFragment: Fragment() {

    enum class Orientation {
        Portrait,
        LandScape,
    }

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

    internal var noStatusBar = false
    internal var noSoftButtonBar = false
    internal var layoutOptions: List<Int>? = null
        set(value) {
            field = value
            rootView?.layoutOptions = value
            rootView?.invalidate()
        }

    internal var currentOrientation = Orientation.Portrait
        set(value) {
            field = value
            rootView?.currentOrientation = value
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

    override fun onDestroyView() {
        super.onDestroyView()
        val rootView = this.rootView ?: return
        this.view?.let { innerView ->
            rootView.removeView(innerView)
            rootView.view = null
        }
        this.navigationBar?.let { navigationBar ->
            rootView.removeView(navigationBar)
            rootView.navigationBar = null
        }
    }

    fun resetContents() {
        val rootView = this.rootView ?: return
        rootView.layoutOptions = this.layoutOptions
        rootView.currentOrientation = this.currentOrientation
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
            rootView.bottomLayoutLength = getSoftButtonsBarHeight()
        } ?: kotlin.run { rootView.view = null }
        this.navigationBar?.takeIf { !navigationHidden }?.let { navigationBar ->
            rootView.navigationBar = WeakReference(navigationBar)
            rootView.addView(navigationBar, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
            rootView.topLayoutLength = 48.0 + getStatusBarHeight()
            rootView.bottomLayoutLength = getSoftButtonsBarHeight()
        } ?: kotlin.run { rootView.navigationBar = null }
        rootView.resetLayout()
    }

    fun getStatusBarHeight(): Double {
        if (currentOrientation == Orientation.LandScape) {
            return 0.0
        }
        if ((activity.window.attributes.flags and WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS) == 0) {
            return 0.0
        }
        if (noStatusBar) {
            return 0.0
        }
        var result = 0
        val resourceId = resources.getIdentifier("status_bar_height", "dimen", "android")
        if (resourceId > 0) {
            result = resources.getDimensionPixelSize(resourceId)
        }
        return (result / resources.displayMetrics.density).toDouble()
    }

    fun getSoftButtonsBarHeight(): Double {
        if ((activity.window.attributes.flags and WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS) == 0) {
            return 0.0
        }
        if (noSoftButtonBar) {
            return 0.0
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            val metrics = DisplayMetrics()
            activity?.let {
                if (it.resources.configuration.orientation == Configuration.ORIENTATION_PORTRAIT) {
                    it.windowManager.defaultDisplay.getMetrics(metrics)
                    val usableHeight = metrics.heightPixels
                    it.windowManager.defaultDisplay.getRealMetrics(metrics)
                    val realHeight = metrics.heightPixels
                    return if (realHeight > usableHeight)
                        ((realHeight - usableHeight) / resources.displayMetrics.density).toDouble()
                    else
                        0.0
                }
                else if (it.resources.configuration.orientation == Configuration.ORIENTATION_LANDSCAPE) {
                    it.windowManager.defaultDisplay.getMetrics(metrics)
                    val usableHeight = metrics.widthPixels
                    it.windowManager.defaultDisplay.getRealMetrics(metrics)
                    val realHeight = metrics.widthPixels
                    return if (realHeight > usableHeight)
                        ((realHeight - usableHeight) / resources.displayMetrics.density).toDouble()
                    else
                        0.0
                }
            }
        }
        return 0.0
    }

    class RootView @JvmOverloads constructor(
            context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
    ) : FrameLayout(context, attrs, defStyleAttr) {

        init {
            setWillNotDraw(false)
        }

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

        var layoutOptions: List<Int>? = null
        var view: WeakReference<XTUIView>? = null
        var navigationBar: WeakReference<XTUINavigationBar>? = null
        var currentOrientation: Orientation = Orientation.Portrait

        override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
            super.onLayout(changed, left, top, right, bottom)
            if (changed) {
                resetLayout()
            }
        }

        fun resetLayout() {
            when (currentOrientation) {
                Orientation.LandScape -> {
                    navigationBar?.get()?.let {
                        it.frame = XTUIRect(0.0, 0.0, (this.width / resources.displayMetrics.density - this.bottomLayoutLength), this.topLayoutLength)
                    }
                    view?.get()?.let {
                        it.frame = XTUIRect(0.0, this.topLayoutLength, (this.width / resources.displayMetrics.density - this.bottomLayoutLength), (this.height / resources.displayMetrics.density - this.topLayoutLength))
                    }
                }
                else -> {
                    navigationBar?.get()?.let {
                        it.frame = XTUIRect(0.0, 0.0, (this.width / resources.displayMetrics.density).toDouble(), this.topLayoutLength)
                    }
                    view?.get()?.let {
                        it.frame = XTUIRect(0.0, this.topLayoutLength, (this.width / resources.displayMetrics.density).toDouble(), (this.height / resources.displayMetrics.density).toDouble() - this.topLayoutLength - this.bottomLayoutLength)
                    }
                }
            }
        }

        private var currentTouchScriptObject: V8Object? = null
        private var currentTouchAdjustingY = 0.0

        override fun onTouchEvent(event: MotionEvent?): Boolean {
            val xtrContext = view?.get()?.xtrContext ?: return false
            velocityTracker.addMovement(event)
            if (event?.actionMasked == MotionEvent.ACTION_POINTER_DOWN) {
                if (event.y / resources.displayMetrics.density < this.topLayoutLength && navigationBar != null) {
                    currentTouchScriptObject = navigationBar?.get()?.scriptObject()
                    currentTouchAdjustingY = 0.0
                }
                else {
                    currentTouchScriptObject = view?.get()?.scriptObject()
                    currentTouchAdjustingY = this.topLayoutLength
                }
                val pid = event.actionIndex.toString()
                val timestamp = System.nanoTime() / 1000000
                val point = XTUIUtils.fromPoint(XTUIPoint((event.getX(event.actionIndex) / resources.displayMetrics.density).toDouble(), (event.getY(event.actionIndex)/ resources.displayMetrics.density - currentTouchAdjustingY)), xtrContext.runtime)
                currentTouchScriptObject?.takeIf { !it.isReleased }?.let {
                    XTContext.invokeMethod(it, "handlePointerDown", listOf(pid, timestamp, point))
                }
                XTContext.release(point)
            }
            else if (event?.actionMasked == MotionEvent.ACTION_DOWN) {
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
            else if (event?.actionMasked == MotionEvent.ACTION_MOVE) {
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
            else if (event?.actionMasked == MotionEvent.ACTION_POINTER_UP) {
                val pid = event.actionIndex.toString()
                val timestamp = System.nanoTime() / 1000000
                val point = XTUIUtils.fromPoint(XTUIPoint((event.getX(event.actionIndex) / resources.displayMetrics.density).toDouble(), (event.getY(event.actionIndex)/ resources.displayMetrics.density - currentTouchAdjustingY)), xtrContext.runtime)
                val velocity = XTUIUtils.fromPoint(XTUIPoint(velocityTracker.getXVelocity(event.actionIndex).toDouble(), velocityTracker.getYVelocity(event.actionIndex).toDouble()), xtrContext.runtime)
                currentTouchScriptObject?.takeIf { !it.isReleased }?.let {
                    XTContext.invokeMethod(it, "handlePointerUp", listOf(pid, timestamp, point, velocity))
                }
                XTContext.release(point)
                XTContext.release(velocity)
            }
            else if (event?.actionMasked == MotionEvent.ACTION_UP) {
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
            else if (event?.actionMasked == MotionEvent.ACTION_CANCEL) {
                velocityTracker.clear()
            }
            return true
        }

        val softKeyButtonsPaint = Paint()

        override fun draw(canvas: Canvas?) {
            super.draw(canvas)
            when (currentOrientation) {
                Orientation.LandScape -> {
                    if (this.bottomLayoutLength > 0) {
                        canvas?.let { canvas ->
                            if (this.layoutOptions?.contains(1) === true) {
                                softKeyButtonsPaint.reset()
                                softKeyButtonsPaint.color = Color.GRAY
                                softKeyButtonsPaint.style = Paint.Style.STROKE
                                softKeyButtonsPaint.strokeWidth = 1.0f
                                canvas.drawLine((canvas.width - this.bottomLayoutLength * resources.displayMetrics.density).toFloat(), 0f, (canvas.width - this.bottomLayoutLength * resources.displayMetrics.density).toFloat(), canvas.height.toFloat(), softKeyButtonsPaint)
                            }
                            else {
                                softKeyButtonsPaint.reset()
                                softKeyButtonsPaint.color = Color.BLACK
                                canvas.drawRect((canvas.width - this.bottomLayoutLength * resources.displayMetrics.density).toFloat(), 0f, canvas.width.toFloat(), canvas.height.toFloat(), softKeyButtonsPaint)
                            }
                        }
                    }
                }
                else -> {
                    if (this.bottomLayoutLength > 0) {
                        canvas?.let { canvas ->
                            if (this.layoutOptions?.contains(1) === true) {
                                softKeyButtonsPaint.reset()
                                softKeyButtonsPaint.color = Color.GRAY
                                softKeyButtonsPaint.style = Paint.Style.STROKE
                                softKeyButtonsPaint.strokeWidth = 1.0f
                                canvas.drawLine(0f, (canvas.height - this.bottomLayoutLength * resources.displayMetrics.density).toFloat(), canvas.width.toFloat(), (canvas.height - this.bottomLayoutLength * resources.displayMetrics.density).toFloat(), softKeyButtonsPaint)
                            }
                            else {
                                softKeyButtonsPaint.reset()
                                softKeyButtonsPaint.color = Color.BLACK
                                canvas.drawRect(0f, (canvas.height - this.bottomLayoutLength * resources.displayMetrics.density).toFloat(), canvas.width.toFloat(), canvas.height.toFloat(), softKeyButtonsPaint)
                            }
                        }
                    }
                }
            }
        }

    }

}
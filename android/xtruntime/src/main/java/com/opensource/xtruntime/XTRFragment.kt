package com.opensource.xtruntime

import android.app.Fragment
import android.content.Context
import android.graphics.Color
import android.os.Bundle
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import com.eclipsesource.v8.V8Object
import java.lang.ref.WeakReference

/**
 * Created by cuiminghui on 2018/1/9.
 */
open class XTRFragment: Fragment() {

    open var view: XTRView? = null

    override fun onCreateView(inflater: LayoutInflater?, container: ViewGroup?, savedInstanceState: Bundle?): View {
        return RootView(inflater?.context as Context)
    }

    override fun onViewCreated(rootView: View?, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        this.view?.let { innerView ->
            (rootView as? RootView)?.let {
                it.view = WeakReference(innerView)
                it.addView(innerView, ViewGroup.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT))
            }
        }
    }

    class RootView @JvmOverloads constructor(
            context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
    ) : FrameLayout(context, attrs, defStyleAttr) {

        var view: WeakReference<XTRView>? = null

        override fun onTouchEvent(event: MotionEvent?): Boolean {
            val xtrContext = view?.get()?.xtrContext ?: return false
            when (event?.actionMasked) {
                MotionEvent.ACTION_DOWN -> {
                    val pid = event.getPointerId(0).toString()
                    val timestamp = System.nanoTime() / 1000000
                    val point = XTRUtils.fromPoint(XTRPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density).toDouble()), xtrContext.runtime)
                    view?.get()?.scriptObject()?.let {
                        XTRContext.invokeMethod(it, "handlePointerDown", listOf(pid, timestamp, point))
                        it.release()
                    }
                }
                MotionEvent.ACTION_MOVE -> {
                    val timestamp = System.nanoTime() / 1000000
                    val points = V8Object(xtrContext.runtime)
                    (0 until event.pointerCount).forEach { pointerID ->
                        val point = XTRPoint((event.getX(pointerID) / resources.displayMetrics.density).toDouble(), (event.getY(pointerID) / resources.displayMetrics.density).toDouble())
                        (XTRUtils.fromPoint(point, xtrContext.runtime) as? V8Object)?.let {
                            points.add(pointerID.toString(), it)
                            it.release()
                        }
                    }
                    view?.get()?.scriptObject()?.let {
                        XTRContext.invokeMethod(it, "handlePointersMove", listOf(timestamp, points))
                        it.release()
                    }
                    points.release()
                }
                MotionEvent.ACTION_UP -> {
                    val pid = event.getPointerId(0).toString()
                    val timestamp = System.nanoTime() / 1000000
                    val point = XTRUtils.fromPoint(XTRPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density).toDouble()), xtrContext.runtime)
                    view?.get()?.scriptObject()?.let {
                        XTRContext.invokeMethod(it, "handlePointerUp", listOf(pid, timestamp, point))
                        it.release()
                    }
                }
    //                MotionEvent.ACTION_POINTER_DOWN -> {
    //                    val pointerID = event.actionIndex
    //                    val pid = event.getPointerId(pointerID).toString()
    //                    val timestamp = System.nanoTime() / 1000000
    //                    val point = XTRPoint((event.getX(pointerID) / resources.displayMetrics.density).toDouble(), (event.getY(pointerID) / resources.displayMetrics.density).toDouble())
    //                    xtrContext.invokeMethod(scriptObject, "handlePointerDown", listOf(pid, timestamp, point))
    //                }
    //                MotionEvent.ACTION_POINTER_UP -> {
    //                    val pointerID = event.actionIndex
    //                    val pid = event.getPointerId(pointerID).toString()
    //                    val timestamp = System.nanoTime() / 1000000
    //                    val point = XTRPoint((event.getX(pointerID) / resources.displayMetrics.density).toDouble(), (event.getY(pointerID) / resources.displayMetrics.density).toDouble())
    //                    xtrContext.invokeMethod(scriptObject, "handlePointerUp", listOf(pid, timestamp, point))
    //                }
            }
            return true
        }

    }

}
package com.opensource.xtruntime

import android.content.Context
import android.graphics.Color
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import org.mozilla.javascript.ScriptableObject
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRWindow: XTRComponent() {

    override val name: String = "XTRWindow"

    fun createScriptObject(rect: Any, scriptObject: Any): InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            return InnerObject(it, xtrContext)
        }
        return null
    }

    companion object {

        var firstResponder: Any? = null

    }

    class InnerObject(scriptObject: ScriptableObject, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()
        internal var appDelegate: XTRApplicationDelegate.InnerObject? = null

        init {
            xtr_setUserInteractionEnabled(true)
        }

        internal var rootViewController: XTRViewController.InnerObject? = null
            set(value) {
                field?.let {
                    it.view?.xtr_removeFromSuperview()
                }
                field = value
                field?.let {
                    this.xtr_addSubview(it.view)
                    it.view?.frame = this.bounds
                }
            }

        fun xtr_rootViewController(): Any? {
            return XTRUtils.fromObject(xtrContext, rootViewController)
        }

        fun xtr_setRootViewController(value: Any?) {
            XTRUtils.toViewController(value)?.let {
                rootViewController = it
            }
        }

        fun xtr_makeKeyAndVisible() {
            appDelegate?.windowMakeKeyAndVisibleRunnable?.invoke()
        }

        fun xtr_keyboardWillShow(height: Int) {
            xtrContext.invokeMethod(scriptObject, "handleKeyboardShow", arrayOf(
                    XTRRect(0.0, 0.0, this.bounds.width, height.toDouble() / resources.displayMetrics.density),
                    0.15
            ))
        }

        fun xtr_keyboardWillHide() {
            xtrContext.invokeMethod(scriptObject, "handleKeyboardHide", arrayOf(
                    0.0
            ))
            firstResponder?.let {
                (it as? XTRTextField.InnerObject)?.xtr_blur()
                (it as? XTRTextView.InnerObject)?.xtr_blur()
            }
        }

        fun xtr_orientationChanged() {
            xtrContext.invokeMethod(scriptObject, "handleOrientationChange", arrayOf())
        }

        fun xtr_setStatusBarHidden(hidden: Boolean) {
            this.systemUiVisibility = if (hidden) View.SYSTEM_UI_FLAG_FULLSCREEN else 0
        }

        fun xtr_endEditing() {
            firstResponder?.let {
                (it as? XTRTextField.InnerObject)?.xtr_blur()
                (it as? XTRTextView.InnerObject)?.xtr_blur()
            }
        }

        override fun layoutSubviews() {
            super.layoutSubviews()
            rootViewController?.view?.frame = this.bounds
        }

        override fun onTouchEvent(event: MotionEvent?): Boolean {
            when (event?.actionMasked) {
                MotionEvent.ACTION_DOWN -> {
                    val pid = event.getPointerId(0).toString()
                    val timestamp = System.nanoTime() / 1000000
                    val point = XTRPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density).toDouble())
                    xtrContext.invokeMethod(scriptObject, "handlePointerDown", arrayOf(pid, timestamp, point))
                }
                MotionEvent.ACTION_MOVE -> {
                    val pid = event.getPointerId(0).toString()
                    val timestamp = System.nanoTime() / 1000000
                    val point = XTRPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density).toDouble())
                    xtrContext.invokeMethod(scriptObject, "handlePointerMove", arrayOf(pid, timestamp, point))
                }
                MotionEvent.ACTION_UP -> {
                    val pid = event.getPointerId(0).toString()
                    val timestamp = System.nanoTime() / 1000000
                    val point = XTRPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density).toDouble())
                    xtrContext.invokeMethod(scriptObject, "handlePointerUp", arrayOf(pid, timestamp, point))
                }
                MotionEvent.ACTION_POINTER_DOWN -> {
//                    val timestamp = System.nanoTime() / 1000000
//                    val pid = event.getPointerId(0)
//                    System.out.println("xxxxx" + pid)
                }
            }
            return true
        }

    }

}
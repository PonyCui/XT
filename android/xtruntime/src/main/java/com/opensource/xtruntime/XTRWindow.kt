package com.opensource.xtruntime

import android.content.Context
import android.util.AttributeSet
import android.view.MotionEvent
import android.view.View
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRWindow @JvmOverloads constructor(
        context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTRView(context, attrs, defStyleAttr), XTRComponentInstance {
    
    var subWindows: List<XTRWindow> = listOf()

//    internal var rootViewController: XTRViewController.InnerObject? = null
//        set(value) {
//            field?.let {
//                it.view?.xtr_removeFromSuperview()
//            }
//            field = value
//            field?.let {
//                it.view?.let {
//                    this.xtr_addSubview(it)
//                    it.frame = this.bounds
//                }
//            }
//        }


    fun keyboardWillShow(height: Int) {
//        xtrContext.invokeMethod(scriptObject, "handleKeyboardShow", listOf(
//                XTRRect(0.0, 0.0, this.bounds.width, height.toDouble() / resources.displayMetrics.density),
//                0.15
//        ))
    }

    fun keyboardWillHide() {
//        xtrContext.invokeMethod(scriptObject, "handleKeyboardHide", listOf(
//                0.0
//        ))
//        firstResponder?.let {
//            (it as? XTRTextField.InnerObject)?.xtr_blur()
//            (it as? XTRTextView.InnerObject)?.xtr_blur()
//        }
    }

    fun orientationChanged() {
//        xtrContext.invokeMethod(scriptObject, "handleOrientationChange", null)
    }

    override fun layoutSubviews() {
        super.layoutSubviews()
//        rootViewController?.view?.frame = this.bounds
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        if (frame?.width == 0.0 || frame?.height == 0.0) {
            frame = null
        }
        super.onMeasure(widthMeasureSpec, heightMeasureSpec)
    }

    override fun onTouchEvent(event: MotionEvent?): Boolean {
//        when (event?.actionMasked) {
//            MotionEvent.ACTION_DOWN -> {
//                val pid = event.getPointerId(0).toString()
//                val timestamp = System.nanoTime() / 1000000
//                val point = XTRPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density).toDouble())
//                xtrContext.invokeMethod(scriptObject, "handlePointerDown", listOf(pid, timestamp, point))
//            }
//            MotionEvent.ACTION_MOVE -> {
//                val timestamp = System.nanoTime() / 1000000
//                val points = V8Object(xtrContext.v8Runtime)
//                (0 until event.pointerCount).forEach { pointerID ->
//                    val point = XTRPoint((event.getX(pointerID) / resources.displayMetrics.density).toDouble(), (event.getY(pointerID) / resources.displayMetrics.density).toDouble())
//                    (XTRUtils.fromObject(xtrContext, point) as? V8Object)?.let {
//                        points.add(pointerID.toString(), it)
//                        it.release()
//                    }
//                }
//                xtrContext.invokeMethod(scriptObject, "handlePointersMove", listOf(timestamp, points))
//                points.release()
//            }
//            MotionEvent.ACTION_UP -> {
//                val pid = event.getPointerId(0).toString()
//                val timestamp = System.nanoTime() / 1000000
//                val point = XTRPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density).toDouble())
//                xtrContext.invokeMethod(scriptObject, "handlePointerUp", listOf(pid, timestamp, point))
//            }
////                MotionEvent.ACTION_POINTER_DOWN -> {
////                    val pointerID = event.actionIndex
////                    val pid = event.getPointerId(pointerID).toString()
////                    val timestamp = System.nanoTime() / 1000000
////                    val point = XTRPoint((event.getX(pointerID) / resources.displayMetrics.density).toDouble(), (event.getY(pointerID) / resources.displayMetrics.density).toDouble())
////                    xtrContext.invokeMethod(scriptObject, "handlePointerDown", listOf(pid, timestamp, point))
////                }
////                MotionEvent.ACTION_POINTER_UP -> {
////                    val pointerID = event.actionIndex
////                    val pid = event.getPointerId(pointerID).toString()
////                    val timestamp = System.nanoTime() / 1000000
////                    val point = XTRPoint((event.getX(pointerID) / resources.displayMetrics.density).toDouble(), (event.getY(pointerID) / resources.displayMetrics.density).toDouble())
////                    xtrContext.invokeMethod(scriptObject, "handlePointerUp", listOf(pid, timestamp, point))
////                }
//        }
        return true
    }

    companion object: XTRComponentExport() {

        override val name: String = "XTRWindow"

        override fun exports(context: XTRContext): V8Object {
            val exports = V8Object(context.v8Runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_rootViewController", "xtr_rootViewController", arrayOf())
            exports.registerJavaMethod(this, "xtr_setRootViewController", "xtr_setRootViewController", arrayOf(V8Object::class.java))
            exports.registerJavaMethod(this, "xtr_makeKeyAndVisible", "xtr_makeKeyAndVisible", arrayOf())
            exports.registerJavaMethod(this, "xtr_setStatusBarHidden", "xtr_setStatusBarHidden", arrayOf(Boolean::class.java))
            exports.registerJavaMethod(this, "xtr_endEditing", "xtr_endEditing", arrayOf())
            return exports
        }

        fun create(): String {
            val view = XTRWindow(XTRView.context.appContext)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }


        fun xtr_rootViewController(): Any? {
            return null
//            return XTRUtils.fromObject(xtrContext, rootViewController)
        }

        fun xtr_setRootViewController(value: V8Object) {
//            XTRUtils.toViewController(value)?.let {
//                rootViewController = it
//            }
        }

        fun xtr_makeKeyAndVisible() {
//            appDelegate?.windowMakeKeyAndVisibleRunnable?.invoke()
        }

        fun xtr_setStatusBarHidden(hidden: Boolean) {
//            this.systemUiVisibility = if (hidden) View.SYSTEM_UI_FLAG_FULLSCREEN else 0
        }

        fun xtr_endEditing() {
//            firstResponder?.let {
//                (it as? XTRTextField.InnerObject)?.xtr_blur()
//                (it as? XTRTextView.InnerObject)?.xtr_blur()
//            }
        }

        var firstResponder: Any? = null

    }

}
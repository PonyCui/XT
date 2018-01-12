package com.opensource.xtruntime

import android.content.Context
import android.util.AttributeSet
import android.view.MotionEvent
import com.eclipsesource.v8.V8Object
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager
import java.lang.ref.WeakReference

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRWindow @JvmOverloads constructor(
        xtrContext: XTRContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTRView(xtrContext, attrs, defStyleAttr), XTRComponentInstance {

    var rootViewController: XTRViewController? = null

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

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRWindow"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_rootViewController", "xtr_rootViewController", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setRootViewController", "xtr_setRootViewController", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_makeKeyAndVisible", "xtr_makeKeyAndVisible", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setStatusBarHidden", "xtr_setStatusBarHidden", arrayOf(Boolean::class.java))
            exports.registerJavaMethod(this, "xtr_endEditing", "xtr_endEditing", arrayOf())
            return exports
        }

        fun create(): String {
            val view = XTRWindow(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_rootViewController(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTRWindow)?.rootViewController?.objectUUID
        }

        fun xtr_setRootViewController(viewControllerRef: String, objectRef: String) {
            val viewController = XTMemoryManager.find(viewControllerRef) as? XTRViewController ?: return
            (XTMemoryManager.find(objectRef) as? XTRWindow)?.rootViewController = viewController
        }

        fun xtr_makeKeyAndVisible(objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRWindow)?.let {
                context.bridge?.get()?.keyWindow = it
            }
        }

        fun xtr_setStatusBarHidden(hidden: Boolean) {
//            this.systemUiVisibility = if (hidden) View.SYSTEM_UI_FLAG_FULLSCREEN else 0
        }

        fun xtr_endEditing() {
//            firstResponder?.let {
//                (it as? XTRTextField)?.xtr_blur()
//                (it as? XTRTextView)?.xtr_blur()
//            }
        }

    }

    companion object {

        var firstResponder: Any? = null

    }

}
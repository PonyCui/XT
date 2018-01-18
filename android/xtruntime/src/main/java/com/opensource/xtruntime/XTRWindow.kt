package com.opensource.xtruntime

import android.util.AttributeSet
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager

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
            exports.registerJavaMethod(this, "xtr_bounds", "xtr_bounds", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_rootViewController", "xtr_rootViewController", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setRootViewController", "xtr_setRootViewController", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_makeKeyAndVisible", "xtr_makeKeyAndVisible", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setStatusBarHidden", "xtr_setStatusBarHidden", arrayOf(Boolean::class.java))
            exports.registerJavaMethod(this, "xtr_firstResponder", "xtr_firstResponder", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_endEditing", "xtr_endEditing", arrayOf(String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTRWindow(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_bounds(objectRef: String): V8Value {
            return (XTMemoryManager.find(objectRef) as? XTRWindow)?.rootViewController?.requestFragment()?.rootView?.let {
                return XTRUtils.fromRect(
                        XTRRect(
                                0.0,
                                0.0,
                                it.width.toDouble() / it.resources.displayMetrics.density.toDouble(),
                                it.height.toDouble() / it.resources.displayMetrics.density.toDouble()
                                ), context.runtime
                )
            } ?: XTRUtils.fromRect(XTRRect(0.0,0.0,0.0,0.0), context.runtime)
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

        fun xtr_endEditing(objectRef: String) {
            firstResponder?.let {
                (it as? XTRTextField)?.onBlur(true)
                (it as? XTRTextView)?.onBlur(true)
            }
        }

        fun xtr_firstResponder(objectRef: String): String? {
            return (firstResponder as? XTRView)?.objectUUID
        }

    }

    companion object {

        var firstResponder: Any? = null
            set(value) {
                field = value
                (field as? XTRView)?.let {
                    it.xtrContext.bridge?.get()?.keyWindow?.let {
                        it.rootViewController?.let {
                            it.handleKeyboardHeightChanged()
                            it.childViewControllers?.forEach {
                                it.handleKeyboardHeightChanged()
                            }
                        }
                    }
                }
            }

    }

}
package com.opensource.xt.uikit

import android.util.AttributeSet
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTComponentInstance

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTUIWindow @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTComponentInstance {

    var rootViewController: XTUIViewController? = null

    class JSExports(val context: XTUIContext): XTComponentExport() {

        override val name: String = "_XTUIWindow"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_bounds", "xtr_bounds", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_rootViewController", "xtr_rootViewController", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setRootViewController", "xtr_setRootViewController", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_makeKeyAndVisible", "xtr_makeKeyAndVisible", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_firstResponder", "xtr_firstResponder", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_endEditing", "xtr_endEditing", arrayOf(String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTUIWindow(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_bounds(objectRef: String): V8Value {
            return (XTMemoryManager.find(objectRef) as? XTUIWindow)?.rootViewController?.requestFragment()?.rootView?.let {
                return XTUIUtils.fromRect(
                        XTUIRect(
                                0.0,
                                0.0,
                                it.width.toDouble() / it.resources.displayMetrics.density.toDouble(),
                                it.height.toDouble() / it.resources.displayMetrics.density.toDouble()
                                ), context.runtime
                )
            } ?: XTUIUtils.fromRect(XTUIRect(0.0,0.0,0.0,0.0), context.runtime)
        }

        fun xtr_rootViewController(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUIWindow)?.rootViewController?.objectUUID
        }

        fun xtr_setRootViewController(viewControllerRef: String, objectRef: String) {
            val viewController = XTMemoryManager.find(viewControllerRef) as? XTUIViewController ?: return
            (XTMemoryManager.find(objectRef) as? XTUIWindow)?.rootViewController = viewController
        }

        fun xtr_makeKeyAndVisible(objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIWindow)?.let {
                context?.application?.delegate?.window = it
            }
        }

        fun xtr_endEditing(objectRef: String) {
            firstResponder?.let {
                (it as? XTUITextField)?.onBlur(true)
                (it as? XTUITextView)?.onBlur(true)
            }
        }

        fun xtr_firstResponder(objectRef: String): String? {
            return (firstResponder as? XTUIView)?.objectUUID
        }

    }

    companion object {

        var firstResponder: Any? = null
            set(value) {
                field = value
                (field as? XTUIView)?.let {
                    it.xtrContext?.application?.delegate?.window?.let {
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
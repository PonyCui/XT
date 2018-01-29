package com.opensource.xt.uikit

import android.content.Intent
import android.os.Bundle
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager
import com.opensource.xt.core.XTComponentExport
import java.lang.ref.WeakReference

/**
 * Created by cuiminghui on 2017/9/6.
 */
class XTUINavigationController: XTUIViewController() {

    override fun requestFragment(): XTUIViewController {
        return childViewControllers.firstOrNull() ?: this
    }

    class JSExports(val context: XTUIContext): XTComponentExport() {

        override val name: String = "_XTUINavigationController"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_setRootViewController", "xtr_setRootViewController", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_pushViewController", "xtr_pushViewController", arrayOf(String::class.java, Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_popViewController", "xtr_popViewController", arrayOf(Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_popToViewController", "xtr_popToViewController", arrayOf(String::class.java, Boolean::class.java, String::class.java))
            return exports
        }

        fun create(): String {
            val viewController = XTUINavigationController()
            viewController.xtrContext = context
            val managedObject = XTManagedObject(viewController)
            viewController.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_setRootViewController(viewControllerRef: String, objectRef: String) {
            val viewController = XTMemoryManager.find(viewControllerRef) as? XTUIViewController ?: return
            (XTMemoryManager.find(objectRef) as? XTUINavigationController)?.let {
                viewController.parentViewController = WeakReference(it)
                it.childViewControllers = listOf(viewController)
            }
        }

        fun xtr_pushViewController(viewControllerRef: String, animated: Boolean, objectRef: String) {
            val viewController = XTMemoryManager.find(viewControllerRef) as? XTUIViewController ?: return
            (XTMemoryManager.find(objectRef) as? XTUINavigationController)?.let { navigationController ->
                viewController.parentViewController = WeakReference(navigationController)
                navigationController.childViewControllers.toMutableList()?.let {
                    it.add(viewController)
                    navigationController.childViewControllers = it.toList()
                    val intent = Intent(context.appContext, NextActivity::class.java)
                    if (!animated) {
                        intent.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION)
                    }
                    intent.putExtra("ChildViewControllerObjectUUID", viewControllerRef)
                    context.appContext.startActivity(intent)
                }
            }
        }

        fun xtr_popViewController(animated: Boolean, objectRef: String): String? {
            (XTMemoryManager.find(objectRef) as? XTUINavigationController)?.let { navigationController ->
                if (navigationController.childViewControllers.count() > 1) {
                    val targetViewController = navigationController.childViewControllers.last()
                    navigationController.childViewControllers = navigationController.childViewControllers.filter { it != targetViewController }
                    targetViewController.requestFragment().activity?.let {
                        if (!animated) {
                            (it as? NextActivity)?.finishWithAnimation = true
                        }
                        it.finish()
                    }
                    return targetViewController.objectUUID
                }
            }
            return null
        }

        fun xtr_popToViewController(viewControllerRef: String, animated: Boolean, objectRef: String): V8Array {
            val viewController = XTMemoryManager.find(viewControllerRef) as? XTUIViewController ?: return V8Array(context.runtime)
            val returnValue = V8Array(context.runtime)
            (XTMemoryManager.find(objectRef) as? XTUINavigationController)?.let { navigationController ->
                navigationController.childViewControllers.indexOf(viewController).takeIf { it >= 0 }?.let { targetIndex ->
                    val targetViewControllers = navigationController.childViewControllers.filterIndexed { index, _ -> index > targetIndex }
                    navigationController.childViewControllers = navigationController.childViewControllers.filterIndexed { index, _ -> index <= targetIndex }
                    targetViewControllers.forEach {
                        returnValue.push(it.objectUUID ?: "")
                    }
                    targetViewControllers.forEach {
                        it.requestFragment().activity?.let {
                            if (!animated) {
                                (it as? NextActivity)?.finishWithAnimation = true
                            }
                            it.finish()
                        }
                    }
                }
            }
            return returnValue
        }

    }

    class NextActivity: XTUIActivity() {

        var viewController: XTUIViewController? = null
        var finishWithAnimation = false

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            intent?.getStringExtra("ChildViewControllerObjectUUID")?.let {
                this.viewController = XTMemoryManager.find(it) as? XTUIViewController
            }
            this.viewController?.setContentView(this)
        }

        override fun onPause() {
            if (finishWithAnimation) {
                this.overridePendingTransition(0, 0)
            }
            super.onPause()
        }

    }

}
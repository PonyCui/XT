package com.opensource.xtruntime

import android.app.Fragment
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Object
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager
import java.lang.ref.WeakReference

/**
 * Created by cuiminghui on 2017/9/5.
 */
open class XTRViewController: XTRFragment(), XTRComponentInstance {

    override var objectUUID: String? = null
    lateinit var xtrContext: XTRContext

    override var view: XTRView? = null
        set(value) {
            if (field != null) { return }
            if (value == null) { return }
            field = value
            value.viewDelegate = WeakReference(this)
        }

    var parentViewController: WeakReference<XTRViewController>? = null
        internal set

    var childViewControllers: List<XTRViewController> = listOf()
        internal set

    fun scriptObject(): V8Object? {
        return xtrContext.evaluateScript("objectRefs['$objectUUID']") as? V8Object
    }

    open fun requestFragment(): Fragment {
        return this
    }

    open fun viewDidLoad() {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "viewDidLoad")
            it.release()
        }
    }

    open fun viewWillAppear() {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "viewWillAppear")
            it.release()
        }
    }

    open fun viewDidAppear() {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "viewDidAppear")
            it.release()
        }
    }

    open fun viewWillDisappear() {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "viewWillDisappear")
            it.release()
        }
    }

    open fun viewDidDisappear() {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "viewDidDisappear")
            it.release()
        }
    }

    open fun viewWillLayoutSubviews() {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "viewWillLayoutSubviews")
            it.release()
        }
    }

    open fun viewDidLayoutSubviews() {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "viewDidLayoutSubviews")
            it.release()
        }
    }

    fun willMoveToParentViewController(parent: XTRViewController?) {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "_willMoveToParentViewController", listOf(
                    parent?.objectUUID ?: V8.getUndefined()
            ))
        }
    }

    fun didMoveToParentViewController(parent: XTRViewController?) {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "_didMoveToParentViewController", listOf(
                    parent?.objectUUID ?: V8.getUndefined()
            ))
        }
    }

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRViewController"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_view", "xtr_view", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setView", "xtr_setView", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_parentViewController", "xtr_parentViewController", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_childViewControllers", "xtr_childViewControllers", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_addChildViewController", "xtr_addChildViewController", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_removeFromParentViewController", "xtr_removeFromParentViewController", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_navigationController", "xtr_navigationController", arrayOf(String::class.java))
            return exports
        }

        fun create(): String {
            val viewController = XTRViewController()
            viewController.xtrContext = context
            val managedObject = XTManagedObject(viewController)
            viewController.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_view(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTRViewController)?.view?.objectUUID
        }

        fun xtr_setView(viewRef: String, objectRef: String) {
            val view = XTMemoryManager.find(viewRef) as? XTRView ?: return
            val viewController = XTMemoryManager.find(objectRef) as? XTRViewController ?: return
            viewController.view = view
            viewController.viewDidLoad()
        }

        fun xtr_parentViewController(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTRViewController)?.parentViewController?.get()?.objectUUID
        }

        fun xtr_childViewControllers(objectRef: String): V8Array? {
            return (XTMemoryManager.find(objectRef) as? XTRViewController)?.let {
                val v8Array = V8Array(context.runtime)
                it.childViewControllers.mapNotNull { it ->
                    return@mapNotNull it.objectUUID
                }.forEach { v8Array.push(it) }
                return@let v8Array
            }
        }

        fun xtr_addChildViewController(childControllerRef: String, objectRef: String) {
            val childController = XTMemoryManager.find(childControllerRef) as? XTRViewController ?: return
            (XTMemoryManager.find(objectRef) as? XTRViewController)?.let {
                if (childController.parentViewController == null) {
                    childController.willMoveToParentViewController(it)
                    it.childViewControllers.toMutableList()?.let { mutable ->
                        mutable.add(childController)
                        childController.parentViewController = WeakReference(it)
                        it.childViewControllers = mutable.toList()
                    }
                    childController.didMoveToParentViewController(it)
                }
            }
        }

        fun xtr_removeFromParentViewController(objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRViewController)?.let {
                it.parentViewController?.let { parentViewController ->
                    it.willMoveToParentViewController(null)
                    parentViewController.get()?.childViewControllers?.toMutableList()?.let { mutable ->
                        mutable.remove(it)
                        parentViewController.get()?.childViewControllers = mutable.toList()
                    }
                    it.didMoveToParentViewController(null)
                }
                it.parentViewController = null
            }
        }

        fun xtr_navigationController(objectRef: String): String? {
            (XTMemoryManager.find(objectRef) as? XTRViewController)?.let {
                var currentParentViewController = it.parentViewController?.get()
                while (currentParentViewController != null) {
                    if (currentParentViewController is XTRNavigationController) {
                        return currentParentViewController.objectUUID
                    }
                    currentParentViewController = currentParentViewController.parentViewController?.get()
                }
            }
            return null
        }

    }

}
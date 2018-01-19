package com.opensource.xtruntime

import android.app.Activity
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Object
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager
import com.opensource.xtruntime.libraries.keyboard.KeyboardHeightObserver
import com.opensource.xtruntime.libraries.keyboard.KeyboardHeightProvider
import java.lang.ref.WeakReference

/**
 * Created by cuiminghui on 2017/9/5.
 */
open class XTRViewController: XTRFragment(), XTRComponentInstance, KeyboardHeightObserver {

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

    fun setContentView(activity: Activity) {
        XTRScreen.resetScreenInfo(activity)
        this.requestFragment().let {
            val transaction = activity.fragmentManager.beginTransaction()
            transaction.replace(android.R.id.content, it)
            transaction.commit()
            it.setupKeyboardHeightProvider(activity)
        }
    }

    fun scriptObject(): V8Object? {
        return xtrContext.evaluateScript("objectRefs['$objectUUID']") as? V8Object
    }

    open fun requestFragment(): XTRViewController {
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

    private var keyboardHeightProvider: KeyboardHeightProvider? = null

    private fun setupKeyboardHeightProvider(activity: Activity) {
        keyboardHeightProvider = KeyboardHeightProvider(activity)
        activity.findViewById(android.R.id.content).rootView?.post {
            keyboardHeightProvider?.start()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        keyboardHeightProvider?.close()
    }

    override fun onPause() {
        super.onPause()
        keyboardHeightProvider?.setKeyboardHeightObserver(null)
    }

    override fun onResume() {
        super.onResume()
        keyboardHeightProvider?.setKeyboardHeightObserver(this)
    }

    override fun onKeyboardHeightChanged(height: Int, orientation: Int) {
        this.lastKeyboardHeight = height
        handleKeyboardHeightChanged(height)
    }

    var lastKeyboardHeight = 0

    fun handleKeyboardHeightChanged(height: Int = this.lastKeyboardHeight) {
        scriptObject()?.let {
            if (height > 0) {
                XTRContext.invokeMethod(it, "keyboardWillShow", listOf(
                        XTRUtils.fromRect(XTRRect(
                                0.0,
                                0.0,
                                this.view?.bounds?.width ?: 0.0,
                                height.toDouble() / resources.displayMetrics.density), xtrContext.runtime), 0.25))
            }
            else {
                XTRContext.invokeMethod(it, "keyboardWillHide", listOf(0.25))
            }
            it.release()
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
            exports.registerJavaMethod(this, "xtr_navigationBar", "xtr_navigationBar", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setNavigationBar", "xtr_setNavigationBar", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_showNavigationBar", "xtr_showNavigationBar", arrayOf(Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_hideNavigationBar", "xtr_hideNavigationBar", arrayOf(Boolean::class.java, String::class.java))
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
            view.post {
                viewController.viewDidLoad()
            }
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

        fun xtr_navigationBar(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTRViewController)?.requestFragment()?.navigationBar?.objectUUID
        }

        fun xtr_setNavigationBar(navigationBarRef: String, objectRef: String) {
            val navigationBar = XTMemoryManager.find(navigationBarRef) as? XTRNavigationBar ?: return
            (XTMemoryManager.find(objectRef) as? XTRViewController)?.requestFragment()?.navigationBar = navigationBar
        }

        fun xtr_showNavigationBar(value: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRViewController)?.requestFragment()?.navigationBarHidden = false
        }

        fun xtr_hideNavigationBar(value: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRViewController)?.requestFragment()?.navigationBarHidden = true
        }

    }

}
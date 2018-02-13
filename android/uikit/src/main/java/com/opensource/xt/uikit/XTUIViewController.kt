package com.opensource.xt.uikit

import android.app.Activity
import android.app.Fragment
import android.graphics.Color
import android.os.Handler
import android.view.View
import android.view.ViewGroup
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.*
import com.opensource.xt.uikit.libraries.keyboard.KeyboardHeightObserver
import com.opensource.xt.uikit.libraries.keyboard.KeyboardHeightProvider
import java.lang.ref.WeakReference

/**
 * Created by cuiminghui on 2017/9/5.
 */
open class XTUIViewController: XTUIFragment(), XTComponentInstance, KeyboardHeightObserver {

    override var objectUUID: String? = null
    lateinit var xtrContext: XTUIContext

    override var view: XTUIView? = null
        set(value) {
            if (field != null) { return }
            if (value == null) { return }
            field = value
            value.viewDelegate = WeakReference(this)
        }

    var parentViewController: WeakReference<XTUIViewController>? = null
        internal set

    var childViewControllers: List<XTUIViewController> = listOf()
        internal set

    open fun setContentView(activity: Activity) {
        XTUIScreen.resetScreenInfo(activity)
        this.requestFragment().let {
            val transaction = activity.fragmentManager.beginTransaction()
            transaction.replace(android.R.id.content, it)
            transaction.commit()
            it.setupKeyboardHeightProvider(activity)
        }
    }

    open fun attachFragment(activity: Activity, fragmentID: Int) {
        XTUIScreen.resetScreenInfo(activity)
        this.requestFragment().let {
            val transaction = activity.fragmentManager.beginTransaction()
            transaction.replace(fragmentID, it)
            transaction.commit()
            it.setupKeyboardHeightProvider(activity)
        }
    }

    fun scriptObject(): V8Object? {
        return xtrContext.evaluateScript("objectRefs['$objectUUID']") as? V8Object
    }

    open fun requestFragment(): XTUIViewController {
        return this
    }

    open fun viewDidLoad() {
        scriptObject()?.let {
            XTContext.invokeMethod(it, "viewDidLoad")
            XTContext.release(it)
        }
    }

    open fun viewWillAppear() {
        scriptObject()?.let {
            XTContext.invokeMethod(it, "viewWillAppear")
            XTContext.release(it)
        }
    }

    open fun viewDidAppear() {
        scriptObject()?.let {
            XTContext.invokeMethod(it, "viewDidAppear")
            XTContext.release(it)
        }
    }

    open fun viewWillDisappear() {
        scriptObject()?.let {
            XTContext.invokeMethod(it, "viewWillDisappear")
            XTContext.release(it)
        }
    }

    open fun viewDidDisappear() {
        scriptObject()?.let {
            XTContext.invokeMethod(it, "viewDidDisappear")
            XTContext.release(it)
        }
    }

    open fun viewWillLayoutSubviews() {
        scriptObject()?.let {
            XTContext.invokeMethod(it, "viewWillLayoutSubviews")
            XTContext.release(it)
        }
    }

    open fun viewDidLayoutSubviews() {
        scriptObject()?.let {
            XTContext.invokeMethod(it, "viewDidLayoutSubviews")
            XTContext.release(it)
        }
    }

    fun willMoveToParentViewController(parent: XTUIViewController?) {
        scriptObject()?.let {
            XTContext.invokeMethod(it, "_willMoveToParentViewController", listOf(
                    parent?.objectUUID ?: V8.getUndefined()
            ))
        }
    }

    fun didMoveToParentViewController(parent: XTUIViewController?) {
        scriptObject()?.let {
            XTContext.invokeMethod(it, "_didMoveToParentViewController", listOf(
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
                XTContext.invokeMethod(it, "keyboardWillShow", listOf(
                        XTUIUtils.fromRect(XTUIRect(
                                0.0,
                                0.0,
                                this.view?.bounds?.width ?: 0.0,
                                height.toDouble() / resources.displayMetrics.density), xtrContext.runtime), 0.25))
            }
            else {
                XTContext.invokeMethod(it, "keyboardWillHide", listOf(0.25))
            }
            XTContext.release(it)
        }
    }

    class JSExports(val context: XTUIContext): XTComponentExport() {

        override val name: String = "_XTUIViewController"

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
            exports.registerJavaMethod(this, "xtr_showBackButton", "xtr_showBackButton", arrayOf(String::class.java))
            return exports
        }

        fun create(): String {
            val viewController = XTUIViewController()
            viewController.xtrContext = context
            val managedObject = XTManagedObject(viewController)
            viewController.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_view(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUIViewController)?.view?.objectUUID
        }

        fun xtr_setView(viewRef: String, objectRef: String) {
            val view = XTMemoryManager.find(viewRef) as? XTUIView ?: return
            val viewController = XTMemoryManager.find(objectRef) as? XTUIViewController ?: return
            viewController.view = view
            view.post {
                viewController.viewDidLoad()
            }
        }

        fun xtr_parentViewController(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUIViewController)?.parentViewController?.get()?.objectUUID
        }

        fun xtr_childViewControllers(objectRef: String): V8Array? {
            return (XTMemoryManager.find(objectRef) as? XTUIViewController)?.let {
                val v8Array = V8Array(context.runtime)
                it.childViewControllers.mapNotNull { it ->
                    return@mapNotNull it.objectUUID
                }.forEach { v8Array.push(it) }
                return@let v8Array
            }
        }

        fun xtr_addChildViewController(childControllerRef: String, objectRef: String) {
            val childController = XTMemoryManager.find(childControllerRef) as? XTUIViewController ?: return
            (XTMemoryManager.find(objectRef) as? XTUIViewController)?.let {
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
            (XTMemoryManager.find(objectRef) as? XTUIViewController)?.let {
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
            (XTMemoryManager.find(objectRef) as? XTUIViewController)?.let {
                var currentParentViewController = it.parentViewController?.get()
                while (currentParentViewController != null) {
                    if (currentParentViewController is XTUINavigationController) {
                        return currentParentViewController.objectUUID
                    }
                    currentParentViewController = currentParentViewController.parentViewController?.get()
                }
            }
            return null
        }

        fun xtr_navigationBar(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUIViewController)?.requestFragment()?.navigationBar?.objectUUID
        }

        fun xtr_setNavigationBar(navigationBarRef: String, objectRef: String) {
            val navigationBar = XTMemoryManager.find(navigationBarRef) as? XTUINavigationBar ?: return
            (XTMemoryManager.find(objectRef) as? XTUIViewController)?.requestFragment()?.navigationBar = navigationBar
        }

        fun xtr_showNavigationBar(value: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIViewController)?.requestFragment()?.navigationBarHidden = false
        }

        fun xtr_hideNavigationBar(value: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIViewController)?.requestFragment()?.navigationBarHidden = true
        }

        fun xtr_showBackButton(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? XTUIViewController)?.activity?.intent?.getBooleanExtra("XTUIShowBackButton", false) ?: false
        }

    }

}
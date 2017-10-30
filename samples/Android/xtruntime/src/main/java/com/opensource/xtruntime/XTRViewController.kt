package com.opensource.xtruntime

import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Object
import java.util.*

/**
 * Created by cuiminghui on 2017/9/5.
 */
open class XTRViewController: XTRComponent() {

    override val name: String = "XTRViewController"

    override fun v8Object(): V8Object? {
        XTRImage.runtime = xtrContext.v8Runtime
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "createScriptObject", "createScriptObject", arrayOf(V8Object::class.java))
        return v8Object
    }

    fun createScriptObject(scriptObject: V8Object): V8Object {
        return InnerObject(xtrContext.autoRelease(scriptObject.twin()), xtrContext).requestV8Object(xtrContext.v8Runtime)
    }

    open class InnerObject(override var scriptObject: V8Object?, protected val xtrContext: XTRContext): XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()

        override fun requestV8Object(runtime: V8): V8Object {
            val v8Object = super.requestV8Object(runtime)
            v8Object.registerJavaMethod(this, "xtr_view", "xtr_view", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setView", "xtr_setView", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_parentViewController", "xtr_parentViewController", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_childViewControllers", "xtr_childViewControllers", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_addChildViewController", "xtr_addChildViewController", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_removeFromParentViewController", "xtr_removeFromParentViewController", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_navigationController", "xtr_navigationController", arrayOf())
            return v8Object
        }

        var view: XTRView.InnerObject? = null
            set(value) {
                field?.let {
                    it.viewDelegate = null
                }
                field = value
                field?.let {
                    it.viewDelegate = this
                }
            }

        fun xtr_view(): Any? {
            view?.let {
                return XTRUtils.fromObject(xtrContext, it)
            }
            return V8.getUndefined()
        }

        fun xtr_setView(value: V8Object) {
            (XTRUtils.toView(value) as? XTRView.InnerObject)?.let {
                this.view = it
                viewDidLoad()
            }
        }

        var parentViewController: XTRViewController.InnerObject? = null
            protected set

        var childViewControllers: List<XTRViewController.InnerObject> = listOf()
            protected set

        fun xtr_parentViewController(): Any? {
            return XTRUtils.fromObject(xtrContext, parentViewController)
        }

        fun xtr_childViewControllers(): V8Array? {
            return XTRUtils.fromObject(xtrContext, childViewControllers) as? V8Array
        }

        fun xtr_addChildViewController(childController: V8Object) {
            XTRUtils.toViewController(childController)?.let { childController ->
                if (childController.parentViewController == null) {
                    childController.willMoveToParentViewController(this)
                    childViewControllers.toMutableList()?.let {
                        it.add(childController)
                        childController.parentViewController = this
                        childViewControllers = it.toList()
                    }
                    childController.didMoveToParentViewController(this)
                }
            }
        }

        fun xtr_addChildViewController(childController: XTRViewController.InnerObject) {
            if (childController.parentViewController == null) {
                childController.willMoveToParentViewController(this)
                childViewControllers.toMutableList()?.let {
                    it.add(childController)
                    childController.parentViewController = this
                    childViewControllers = it.toList()
                }
                childController.didMoveToParentViewController(this)
            }
        }

        fun xtr_removeFromParentViewController() {
            parentViewController?.let { parentViewController ->
                willMoveToParentViewController(null)
                parentViewController.childViewControllers.toMutableList()?.let {
                    it.remove(this)
                    parentViewController.childViewControllers = it.toList()
                }
                didMoveToParentViewController(null)
            }
            parentViewController = null
        }

        fun xtr_navigationController(): Any? {
            var current: XTRViewController.InnerObject? = this
            while (current != null) {
                (current as? XTRNavigationController.InnerObject)?.let {
                    return XTRUtils.fromObject(xtrContext, it)
                }
                current = current.parentViewController
            }
            return V8.getUndefined()
        }

        fun willMoveToParentViewController(parent: XTRViewController.InnerObject?) {
            parent?.let {
                xtrContext.invokeMethod(scriptObject, "willMoveToParentViewController", listOf(it))
                return
            }
            xtrContext.invokeMethod(scriptObject, "willMoveToParentViewController", null)
        }

        fun didMoveToParentViewController(parent: XTRViewController.InnerObject?) {
            parent?.let {
                xtrContext.invokeMethod(scriptObject, "didMoveToParentViewController", listOf(it))
                return
            }
            xtrContext.invokeMethod(scriptObject, "didMoveToParentViewController", null)
        }

        open fun viewDidLoad() {
            xtrContext.invokeMethod(scriptObject, "viewDidLoad", null)
        }

        open fun viewWillAppear() {
            xtrContext.invokeMethod(scriptObject, "viewWillAppear", null)
        }

        open fun viewDidAppear() {
            xtrContext.invokeMethod(scriptObject, "viewDidAppear", null)
        }

        open fun viewWillDisappear() {
            xtrContext.invokeMethod(scriptObject, "viewWillDisappear", null)
        }

        open fun viewDidDisappear() {
            xtrContext.invokeMethod(scriptObject, "viewDidDisappear", null)
        }

        open fun viewWillLayoutSubviews() {
            xtrContext.invokeMethod(scriptObject, "viewWillLayoutSubviews", null)
        }

        open fun viewDidLayoutSubviews() {
            xtrContext.invokeMethod(scriptObject, "viewDidLayoutSubviews", null)
        }

    }

}
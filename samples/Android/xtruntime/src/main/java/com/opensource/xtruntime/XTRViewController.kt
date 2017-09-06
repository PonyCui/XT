package com.opensource.xtruntime

import org.mozilla.javascript.NativeArray
import org.mozilla.javascript.ScriptableObject
import java.util.*

/**
 * Created by cuiminghui on 2017/9/5.
 */
open class XTRViewController: XTRComponent() {

    override val name: String = "XTRViewController"

    fun createScriptObject(scriptObject: Any): XTRViewController.InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            return XTRViewController.InnerObject(it, xtrContext)
        }
        return null
    }

    open class InnerObject(val scriptObject: ScriptableObject, protected val xtrContext: XTRContext): XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()

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

        fun xtr_view(): ScriptableObject? {
            view?.let {
                return XTRUtils.fromObject(xtrContext, it)
            }
            return null
        }

        fun xtr_setView(value: Any) {
            (XTRUtils.toView(value) as? XTRView.InnerObject)?.let {
                this.view = it
                viewDidLoad()
            }
        }

        var parentViewController: XTRViewController.InnerObject? = null
            protected set

        var childViewControllers: List<XTRViewController.InnerObject> = listOf()
            protected set

        fun xtr_parentViewController(): ScriptableObject? {
            return XTRUtils.fromObject(xtrContext, parentViewController)
        }

        fun xtr_childViewControllers(): NativeArray {
            return NativeArray(childViewControllers.mapNotNull { return@mapNotNull XTRUtils.fromObject(xtrContext, it) }.toTypedArray())
        }

        fun xtr_addChildViewController(childController: Any?) {
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

        fun xtr_navigationController(): ScriptableObject? {
            var current: XTRViewController.InnerObject? = this
            while (current != null) {
                (current as? XTRNavigationController.InnerObject)?.let {
                    return XTRUtils.fromObject(xtrContext, it)
                }
                current = current.parentViewController
            }
            return null
        }

        fun willMoveToParentViewController(parent: XTRViewController.InnerObject?) {
            parent?.let {
                XTRUtils.fromObject(xtrContext, it)?.let {
                    xtrContext.invokeMethod(scriptObject, "willMoveToParentViewController", arrayOf(it))
                    return
                }
            }
            xtrContext.invokeMethod(scriptObject, "willMoveToParentViewController", arrayOf())
        }

        fun didMoveToParentViewController(parent: XTRViewController.InnerObject?) {
            parent?.let {
                XTRUtils.fromObject(xtrContext, it)?.let {
                    xtrContext.invokeMethod(scriptObject, "didMoveToParentViewController", arrayOf(it))
                    return
                }
            }
            xtrContext.invokeMethod(scriptObject, "didMoveToParentViewController", arrayOf())
        }

        open fun viewDidLoad() {
            xtrContext.invokeMethod(scriptObject, "viewDidLoad", arrayOf())
        }

        open fun viewWillAppear() {
            xtrContext.invokeMethod(scriptObject, "viewWillAppear", arrayOf())
        }

        open fun viewDidAppear() {
            xtrContext.invokeMethod(scriptObject, "viewDidAppear", arrayOf())
        }

        open fun viewWillDisappear() {
            xtrContext.invokeMethod(scriptObject, "viewWillDisappear", arrayOf())
        }

        open fun viewDidDisappear() {
            xtrContext.invokeMethod(scriptObject, "viewDidDisappear", arrayOf())
        }

        open fun viewWillLayoutSubviews() {
            xtrContext.invokeMethod(scriptObject, "viewWillLayoutSubviews", arrayOf())
        }

        open fun viewDidLayoutSubviews() {
            xtrContext.invokeMethod(scriptObject, "viewDidLayoutSubviews", arrayOf())
        }

    }

}
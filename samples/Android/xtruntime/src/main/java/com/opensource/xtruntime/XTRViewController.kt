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

        fun xtr_view(): ScriptableObject? {
            view?.let {
                return XTRUtils.fromObject(xtrContext, it)
            }
            return null
        }

        fun xtr_setView(value: Any) {
            (XTRUtils.toView(value) as? XTRView.InnerObject)?.let {
                this.view = it
                xtrContext.invokeMethod(scriptObject, "viewDidLoad", arrayOf())
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
                    childViewControllers.toMutableList()?.let {
                        it.add(childController)
                        childController.parentViewController = this
                        childViewControllers = it.toList()
                    }
                }
            }
        }

        fun xtr_removeFromParentViewController() {
            parentViewController?.let { parentViewController ->
                parentViewController.childViewControllers.toMutableList()?.let {
                    it.remove(this)
                    parentViewController.childViewControllers = it.toList()
                }
            }
            parentViewController = null
        }

    }

}
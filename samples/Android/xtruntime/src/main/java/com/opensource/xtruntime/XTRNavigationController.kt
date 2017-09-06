package com.opensource.xtruntime

import android.graphics.Color
import android.view.View
import org.mozilla.javascript.NativeArray
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/9/6.
 */
class XTRNavigationController: XTRComponent() {

    override val name: String = "XTRNavigationController"

    fun createScriptObject(scriptObject: Any): XTRNavigationController.InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            return XTRNavigationController.InnerObject(it, xtrContext)
        }
        return null
    }

    open class InnerObject(scriptObject: ScriptableObject, xtrContext: XTRContext): XTRViewController.InnerObject(scriptObject, xtrContext) {

        private var isAnimating = false

        fun xtr_setViewControllersAnimated(viewControllers: Any?, animated: Any?) {
            childViewControllers.forEach {
                it.xtr_removeFromParentViewController()
                it.view?.xtr_removeFromSuperview()
            }
            (viewControllers as? NativeArray)?.let { it ->
                val vcs = it.mapNotNull { return@mapNotNull XTRUtils.toViewController(it) }
                vcs.forEach {
                    if (it.parentViewController == null) {
                        xtr_addChildViewController(it)
                        this.view?.xtr_addSubview(it.view)
                        it.view?.frame = this.view?.bounds
                    }
                }
            }
        }

        fun xtr_pushViewController(viewController: Any?, animated: Any?) {
            if (isAnimating) {
                return
            }
            isAnimating = true
            val isAnimated = animated as? Boolean ?: true
            val toViewController = XTRUtils.toViewController(viewController) ?: return
            xtr_addChildViewController(toViewController)
            this.view?.xtr_addSubview(toViewController.view)
            toViewController.view?.frame = this.view?.bounds
            if (isAnimated) {
                toViewController.view?.xtr_setFrame(this.view?.bounds?.let {
                    return@let XTRRect(it.width, it.y, it.width, it.height)
                })
                XTRView().animationWithBouncinessAndSpeed(1.0, 16.0, { -> Unit
                    toViewController.view?.xtr_setFrame(this.view?.bounds)
                }, {
                    isAnimating = false
                })
            }
            else {
                isAnimating = false
            }
        }

        fun xtr_popViewController(animated: Any?) {
            if (isAnimating) {
                return
            }
            isAnimating = true
            val isAnimated = animated as? Boolean ?: true
            childViewControllers?.takeIf { it.size > 1 }?.lastOrNull()?.let { fromViewController ->
                if (isAnimated) {
                    XTRView().animationWithBouncinessAndSpeed(1.0, 16.0, { -> Unit
                        fromViewController.view?.xtr_setFrame(this.view?.bounds?.let {
                            return@let XTRRect(it.width, it.y, it.width, it.height)
                        })
                    }, {
                        fromViewController.xtr_removeFromParentViewController()
                        fromViewController.view?.xtr_removeFromSuperview()
                        isAnimating = false
                    })
                }
                else {
                    fromViewController.xtr_removeFromParentViewController()
                    fromViewController.view?.xtr_removeFromSuperview()
                    isAnimating = false
                }
            }
        }

        fun xtr_popToViewController(viewController: Any?, animated: Any?): NativeArray {
            return NativeArray(arrayOf())
        }

        fun xtr_popToRootViewController(animated: Any?): NativeArray {
            return NativeArray(arrayOf())
        }

        override fun viewWillLayoutSubviews() {
            super.viewWillLayoutSubviews()
            childViewControllers?.forEach {
                it.view?.frame = this.view?.bounds
            }
        }

    }

}
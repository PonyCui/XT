package com.opensource.xtruntime

import android.graphics.Color
import android.view.View
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import org.mozilla.javascript.NativeArray
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/9/6.
 */
class XTRNavigationController: XTRComponent() {

    override val name: String = "XTRNavigationController"

    override fun v8Object(): V8Object? {
        XTRImage.runtime = xtrContext.v8Runtime
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "createScriptObject", "createScriptObject", arrayOf(V8Object::class.java))
        return v8Object
    }

    fun createScriptObject(scriptObject: V8Object): V8Object {
        return XTRNavigationController.InnerObject(scriptObject, xtrContext).requestV8Object(xtrContext.v8Runtime)
    }

    open class InnerObject(scriptObject: V8Object, xtrContext: XTRContext): XTRViewController.InnerObject(scriptObject, xtrContext) {

        private var isAnimating = false

        override fun requestV8Object(runtime: V8): V8Object {
            val v8Object = super.requestV8Object(runtime)
            v8Object.registerJavaMethod(this, "xtr_setViewControllersAnimated", "xtr_setViewControllersAnimated", arrayOf(V8Object::class.java, Boolean::class.java))
            v8Object.registerJavaMethod(this, "xtr_pushViewController", "xtr_pushViewController", arrayOf(V8Object::class.java, Boolean::class.java))
            v8Object.registerJavaMethod(this, "xtr_popViewController", "xtr_popViewController", arrayOf(Boolean::class.java))
            v8Object.registerJavaMethod(this, "xtr_popToViewController", "xtr_popToViewController", arrayOf(V8Object::class.java, Boolean::class.java))
            v8Object.registerJavaMethod(this, "xtr_popToRootViewController", "xtr_popToRootViewController", arrayOf(Boolean::class.java))
            return v8Object
        }

        fun xtr_setViewControllersAnimated(viewControllers: V8Object, animated: Boolean) {
            childViewControllers.forEach {
                it.xtr_removeFromParentViewController()
                it.view?.xtr_removeFromSuperview()
            }
            (viewControllers as? NativeArray)?.let { it ->
                val vcs = it.mapNotNull { return@mapNotNull XTRUtils.toViewController(it) }
                vcs.forEach {
                    if (it.parentViewController == null) {
                        xtr_addChildViewController(it)
                        it.view?.let {
                            this.view?.xtr_addSubview(it)
                        }
                        it.view?.frame = this.view?.bounds
                    }
                }
            }
        }

        fun xtr_pushViewController(viewController: V8Object, animated: Boolean) {
            if (isAnimating) {
                return
            }
            isAnimating = true
            val isAnimated = animated as? Boolean ?: true
            val toViewController = XTRUtils.toViewController(viewController) ?: return
            xtr_addChildViewController(toViewController)
            toViewController.view?.let { this.view?.xtr_addSubview(it) }

            toViewController.view?.frame = this.view?.bounds
            if (isAnimated) {
                toViewController.view?.xtr_setFrame(this.view?.bounds?.let {
                    return@let XTRRect(it.width, it.y, it.width, it.height)
                } ?: XTRRect(0.0, 0.0, 0.0, 0.0))
                XTRView().animationWithBouncinessAndSpeed(1.0, 24.0, {
                    toViewController.view?.xtr_setFrame(this.view?.bounds ?: XTRRect(0.0, 0.0, 0.0, 0.0))
                }, {
                    isAnimating = false
                })
            }
            else {
                isAnimating = false
            }
        }

        fun xtr_popViewController(animated: Boolean) {
            if (isAnimating) {
                return
            }
            isAnimating = true
            val isAnimated = animated as? Boolean ?: true
            childViewControllers?.takeIf { it.size > 1 }?.lastOrNull()?.let { fromViewController ->
                if (isAnimated) {
                    XTRView().animationWithBouncinessAndSpeed(1.0, 24.0, { -> Unit
                        fromViewController.view?.xtr_setFrame(this.view?.bounds?.let {
                            return@let XTRRect(it.width, it.y, it.width, it.height)
                        } ?: XTRRect(0.0, 0.0, 0.0, 0.0))
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

        fun xtr_popToViewController(viewController: V8Object, animated: Boolean): NativeArray {
            if (isAnimating) {
                return NativeArray(arrayOf())
            }
            isAnimating = true
            val isAnimated = animated as? Boolean ?: true
            val toViewController = XTRUtils.toViewController(viewController) ?: return NativeArray(arrayOf())
            val targetViewControllers: MutableList<XTRViewController.InnerObject> = mutableListOf()
            var found = false
            childViewControllers?.forEach {
                if (it == toViewController) {
                    found = true
                }
                else if (found) {
                    targetViewControllers.add(it)
                }
            }
            if (isAnimated && targetViewControllers.size > 0) {
                targetViewControllers?.forEach {
                    if (it == targetViewControllers.lastOrNull()) { return@forEach }
                    it.xtr_removeFromParentViewController()
                    it.view?.xtr_removeFromSuperview()
                }
                targetViewControllers.lastOrNull()?.let { fromViewController ->
                    XTRView().animationWithBouncinessAndSpeed(1.0, 16.0, { -> Unit
                        fromViewController.view?.xtr_setFrame(this.view?.bounds?.let {
                            return@let XTRRect(it.width, it.y, it.width, it.height)
                        } ?: XTRRect(0.0, 0.0, 0.0, 0.0))
                    }, {
                        fromViewController.xtr_removeFromParentViewController()
                        fromViewController.view?.xtr_removeFromSuperview()
                        isAnimating = false
                    })
                }
            }
            else {
                targetViewControllers?.forEach {
                    it.xtr_removeFromParentViewController()
                    it.view?.xtr_removeFromSuperview()
                }
                isAnimating = false
            }
            return NativeArray(targetViewControllers.map { return@map XTRUtils.fromObject(xtrContext, it) }.toTypedArray())
        }

        fun xtr_popToViewController(viewController: XTRViewController.InnerObject?, animated: Boolean): NativeArray {
            if (isAnimating) {
                return NativeArray(arrayOf())
            }
            isAnimating = true
            val isAnimated = animated as? Boolean ?: true
            val toViewController = XTRUtils.toViewController(viewController) ?: return NativeArray(arrayOf())
            val targetViewControllers: MutableList<XTRViewController.InnerObject> = mutableListOf()
            var found = false
            childViewControllers?.forEach {
                if (it == toViewController) {
                    found = true
                }
                else if (found) {
                    targetViewControllers.add(it)
                }
            }
            if (isAnimated && targetViewControllers.size > 0) {
                targetViewControllers?.forEach {
                    if (it == targetViewControllers.lastOrNull()) { return@forEach }
                    it.xtr_removeFromParentViewController()
                    it.view?.xtr_removeFromSuperview()
                }
                targetViewControllers.lastOrNull()?.let { fromViewController ->
                    XTRView().animationWithBouncinessAndSpeed(1.0, 16.0, { -> Unit
                        fromViewController.view?.xtr_setFrame(this.view?.bounds?.let {
                            return@let XTRRect(it.width, it.y, it.width, it.height)
                        } ?: XTRRect(0.0, 0.0, 0.0, 0.0))
                    }, {
                        fromViewController.xtr_removeFromParentViewController()
                        fromViewController.view?.xtr_removeFromSuperview()
                        isAnimating = false
                    })
                }
            }
            else {
                targetViewControllers?.forEach {
                    it.xtr_removeFromParentViewController()
                    it.view?.xtr_removeFromSuperview()
                }
                isAnimating = false
            }
            return NativeArray(targetViewControllers.map { return@map XTRUtils.fromObject(xtrContext, it) }.toTypedArray())
        }

        fun xtr_popToRootViewController(animated: Boolean): NativeArray {
            return this.xtr_popToViewController(childViewControllers.firstOrNull(), animated)
        }

        override fun viewWillLayoutSubviews() {
            super.viewWillLayoutSubviews()
            childViewControllers?.forEach {
                it.view?.frame = this.view?.bounds
            }
        }

    }

}
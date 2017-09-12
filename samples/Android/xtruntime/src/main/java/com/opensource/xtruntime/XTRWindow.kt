package com.opensource.xtruntime

import android.content.Context
import android.graphics.Color
import android.view.ViewGroup
import android.widget.FrameLayout
import org.mozilla.javascript.ScriptableObject
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRWindow: XTRComponent() {

    override val name: String = "XTRWindow"

    fun createScriptObject(rect: Any, scriptObject: Any): InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            return InnerObject(it, xtrContext)
        }
        return null
    }

    class InnerObject(scriptObject: ScriptableObject, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()
        internal var appDelegate: XTRApplicationDelegate.InnerObject? = null

        init {
            xtr_setUserInteractionEnabled(true)
        }

        internal var rootViewController: XTRViewController.InnerObject? = null
            set(value) {
                field?.let {
                    it.view?.xtr_removeFromSuperview()
                }
                field = value
                field?.let {
                    this.xtr_addSubview(it.view)
                    it.view?.frame = this.bounds
                }
            }

        fun xtr_rootViewController(): Any? {
            return XTRUtils.fromObject(xtrContext, rootViewController)
        }

        fun xtr_setRootViewController(value: Any?) {
            XTRUtils.toViewController(value)?.let {
                rootViewController = it
            }
        }

        fun xtr_makeKeyAndVisible() {
            appDelegate?.windowMakeKeyAndVisibleRunnable?.invoke()
        }

        override fun layoutSubviews() {
            super.layoutSubviews()
            rootViewController?.view?.frame = this.bounds
        }

    }

}
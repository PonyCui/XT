package com.opensource.xtruntime

import android.view.ViewGroup
import android.widget.FrameLayout
import org.mozilla.javascript.ScriptableObject
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */


class XTRApplicationDelegate: XTRComponent() {

    override val name: String = "XTRApplicationDelegate"

    fun create(scriptObject: Any): InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            return InnerObject(it, xtrContext)
        }
        return null
    }

    class InnerObject(private val scriptObject: ScriptableObject, private val xtrContext: XTRContext): XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()
        var window: XTRWindow.InnerObject? = null
        var windowMakeKeyAndVisibleRunnable: (() -> Unit)? = null

        fun applicationDidFinishLaunchingWithOptions() {
            xtrContext.invokeMethod(this.scriptObject, "applicationDidFinishLaunchingWithOptions", arrayOf("", ""))
        }

        fun xtr_window(): ScriptableObject? {
            this.window?.let { window ->
                return XTRUtils.fromObject(xtrContext, window)
            }
            return null
        }

        fun xtr_setWindow(value: Any) {
            this.window = XTRUtils.toWindow(value)
            this.window?.appDelegate = this
        }

    }

}
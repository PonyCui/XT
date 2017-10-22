package com.opensource.xtruntime

import android.view.ViewGroup
import android.widget.FrameLayout
import com.eclipsesource.v8.V8Object
import org.mozilla.javascript.ScriptableObject
import org.mozilla.javascript.Undefined
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */


class XTRApplicationDelegate: XTRComponent() {

    override val name: String = "XTRApplicationDelegate"

    fun create(scriptObject: V8Object): InnerObject {
        return InnerObject(scriptObject, xtrContext)
    }

    class InnerObject(private val scriptObject: V8Object, private val xtrContext: XTRContext): XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()
        var window: XTRWindow.InnerObject? = null
        var windowMakeKeyAndVisibleRunnable: (() -> Unit)? = null

        fun applicationDidFinishLaunchingWithOptions() {
            xtrContext.invokeMethod(this.scriptObject, "applicationDidFinishLaunchingWithOptions", arrayOf("", ""))
        }

        fun xtr_window(): Any? {
            this.window?.let { window ->
                return XTRUtils.fromObject(xtrContext, window)
            }
            return Undefined.instance
        }

        fun xtr_setWindow(value: Any) {
            this.window = XTRUtils.toWindow(value)
            this.window?.appDelegate = this
        }

    }

}
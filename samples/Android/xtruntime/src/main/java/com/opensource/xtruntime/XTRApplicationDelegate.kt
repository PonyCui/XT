package com.opensource.xtruntime

import android.app.Application
import org.mozilla.javascript.Context
import org.mozilla.javascript.ScriptableObject
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */


class XTRApplicationDelegate: XTRComponent(), XTRObject {

    override val objectUUID: String = UUID.randomUUID().toString()

    companion object {
        val shared = XTRApplicationDelegate()
    }

    override val name: String = "XTRApplicationDelegate"
    var scriptObject: ScriptableObject? = null
    var window: XTRWindow.InnerObject? = null

    fun attachDelegate(scriptObject: Any) {
        this.scriptObject = scriptObject as? ScriptableObject
    }

    fun applicationDidFinishLaunchingWithOptions() {
        this.context?.invokeMethod(this.scriptObject, "resetNativeObject", arrayOf(Context.javaToJS(this, this.context?.scope)))
        this.context?.invokeMethod(this.scriptObject, "applicationDidFinishLaunchingWithOptions", arrayOf("", ""))
    }

    fun xtr_window(): ScriptableObject? {
        context?.let { context ->
            this.window?.let { window ->
                return XTRUtils.fromObject(context, window)
            }
        }
        return null
    }

    fun xtr_setWindow(value: Any) {
        this.window = XTRUtils.toWindow(value)
    }

}
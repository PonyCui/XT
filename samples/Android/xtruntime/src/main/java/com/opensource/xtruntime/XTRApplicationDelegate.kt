package com.opensource.xtruntime

import android.app.Application
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/8/31.
 */


class XTRApplicationDelegate: XTRComponent() {

    companion object {
        val shared = XTRApplicationDelegate()
    }

    override val name: String = "XTRApplicationDelegate"
    var scriptObject: ScriptableObject? = null

    fun attachDelegate(scriptObject: Any) {
        this.scriptObject = scriptObject as? ScriptableObject
    }

    fun applicationDidFinishLaunchingWithOptions() {
        this.context?.invokeMethod(this.scriptObject, "applicationDidFinishLaunchingWithOptions", arrayOf("", ""))
    }

}
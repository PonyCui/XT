package com.opensource.xtruntime

import org.mozilla.javascript.ScriptableObject
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRWindow: XTRComponent() {

    override val name: String = "XTRWindow"

    fun createScriptObject(rect: Any, scriptObject: Any): InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            return InnerObject(it)
        }
        return null
    }

    inner class InnerObject(val scriptObject: ScriptableObject): XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()

    }

}
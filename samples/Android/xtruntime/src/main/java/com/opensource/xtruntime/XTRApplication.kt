package com.opensource.xtruntime

import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRApplication: XTRComponent() {

    override val name: String = "XTRApplication"

    fun create(scriptObject: Any): InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            return InnerObject(it)
        }
        return null
    }

    inner class InnerObject(val scriptObject: ScriptableObject) {

    }

}
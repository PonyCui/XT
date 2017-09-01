package com.opensource.xtruntime

import org.mozilla.javascript.ScriptableObject
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRApplication: XTRComponent() {

    override val name: String = "XTRApplication"

    fun create(scriptObject: Any): InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            return InnerObject(it, xtrContext)
        }
        return null
    }

    class InnerObject(val scriptObject: ScriptableObject, val xtrContext: XTRContext): XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()

        var delegate: XTRApplicationDelegate.InnerObject? = null

        fun xtr_setDelegate(value: Any?) {
            XTRUtils.toApplicationDelegate(value)?.let {
                this.delegate = it
            }
        }

    }

}
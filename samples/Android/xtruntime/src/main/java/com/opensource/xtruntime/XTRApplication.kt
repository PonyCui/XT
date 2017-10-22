package com.opensource.xtruntime

import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
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

        override fun requestV8Object(runtime: V8): V8Object {
            val v8Object = super.requestV8Object(runtime)
            v8Object.registerJavaMethod(this, "xtr_setDelegate", "xtr_setDelegate", arrayOf(V8Object::class.java))
            return v8Object
        }

        fun xtr_setDelegate(value: V8Object) {
            XTRUtils.toApplicationDelegate(value)?.let {
                this.delegate = it
            }
        }

    }

}
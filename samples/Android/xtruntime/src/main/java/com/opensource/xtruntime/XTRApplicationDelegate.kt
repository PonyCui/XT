package com.opensource.xtruntime

import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */


class XTRApplicationDelegate: XTRComponent() {

    override val name: String = "XTRApplicationDelegate"

    override fun v8Object(): V8Object? {
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "create", "create", arrayOf(V8Object::class.java))
        return v8Object
    }

    fun create(scriptObject: V8Object): V8Object {
        return InnerObject(xtrContext.autoRelease(scriptObject.twin()), xtrContext).requestV8Object(xtrContext.v8Runtime)
    }

    class InnerObject(override var scriptObject: V8Object?, private val xtrContext: XTRContext): XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()
        var window: XTRWindow.InnerObject? = null
        var windowMakeKeyAndVisibleRunnable: (() -> Unit)? = null

        fun applicationDidFinishLaunchingWithOptions() {
            xtrContext.invokeMethod(this.scriptObject, "applicationDidFinishLaunchingWithOptions", listOf("", ""))
        }

        override fun requestV8Object(runtime: V8): V8Object {
            val v8Object = super.requestV8Object(runtime)
            v8Object.registerJavaMethod(this, "xtr_window", "xtr_window", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setWindow", "xtr_setWindow", arrayOf(V8Object::class.java))
            return v8Object
        }

        fun xtr_window(): V8Value {
            this.window?.let { window ->
                return XTRUtils.fromObject(xtrContext, window) as? V8Value ?: V8.getUndefined()
            }
            return V8.getUndefined()
        }

        fun xtr_setWindow(value: V8Object) {
            this.window = XTRUtils.toWindow(value)
            this.window?.appDelegate = this
        }

    }

}
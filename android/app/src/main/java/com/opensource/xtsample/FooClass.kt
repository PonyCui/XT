package com.opensource.xtsample

import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTContext

/**
 * Created by cuiminghui on 2018/1/27.
 */
class FooClass(val context: XTContext): XTComponentExport() {

    override val name: String = "Foo"

    override fun exports(): V8Object {
        val exports = V8Object(context.runtime)
        exports.registerJavaMethod(this, "sayHello", "sayHello", arrayOf())
        return exports
    }

    fun sayHello(): String {
        return "Hello, World!"
    }

}
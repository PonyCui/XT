package com.opensource.xtsample

import android.content.Context
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTComponentInstance
import com.opensource.xt.core.XTContext
import com.opensource.xt.core.XTExtObject

/**
 * Created by cuiminghui on 2018/1/27.
 */
class FooClass(val context: XTContext): XTComponentExport() {

    override val name: String = "FooClass"

    override fun exports(): V8Object {
        val exports = V8Object(context.runtime)
        exports.registerJavaMethod(this, "sayHello", "sayHello", arrayOf())
        return exports
    }

    var fooValue: String = ""

    fun sayHello(): String {
        return "Hello, World!"
    }

    fun callYamiedie(roleA: String, roleB: String): String {
        return "$roleB said: '$roleA Yamiedie'."
    }

    companion object {

        fun register() {
            XTExtObject.registerClass(FooClass::class.java, object : XTExtObject.XTExtOptions<FooClass> {

                override fun doInit(context: XTContext): Any {
                    return FooClass(context)
                }

                override fun doGetValue(propKey: String, obj: FooClass): Object? {
                    if (propKey == "fooValue") {
                        return obj.fooValue as? Object
                    }
                    return null
                }

                override fun doSetValue(value: Object, propKey: String, obj: FooClass) {
                    if (propKey == "fooValue") {
                        (value as? String)?.let { obj.fooValue = it }
                    }
                }

                override fun doCall(methodName: String, arguments: List<Any>, obj: FooClass): Object? {
                    if (methodName == "callYamiedie" && arguments.count() >= 2) {
                        val roleA = arguments[0] as? String ?: return null
                        val roleB = arguments[1] as? String ?: return null
                        return obj.callYamiedie(roleA, roleB) as? Object
                    }
                    return null
                }

            })
        }

    }

}
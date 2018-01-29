package com.opensource.xt.core

import com.eclipsesource.v8.V8Object

/**
 * Created by cuiminghui on 2018/1/27.
 */
class XTClassLoader {

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTClassLoader"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "loadClass", "loadClass", arrayOf(String::class.java, String::class.java))
            return exports
        }

        fun loadClass(className: String, globalName: String): Boolean {
            try {
                val constructor = Class.forName(className).getDeclaredConstructor(XTContext::class.java)
                (constructor.newInstance(context) as? XTComponentExport)?.let {
                    context.addComponent(it, globalName)
                    return true
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
            return false
        }

    }

}
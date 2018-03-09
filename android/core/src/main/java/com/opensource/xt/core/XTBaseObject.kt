package com.opensource.xt.core

import com.eclipsesource.v8.V8Object

/**
 * Created by cuiminghui on 2018/3/8.
 */
class XTBaseObject: XTComponentInstance {

    override var objectUUID: String? = null

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTBaseObject"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            return exports
        }

        fun create(): String {
            val data = XTBaseObject()
            val managedObject = XTManagedObject(data)
            data.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

    }

}
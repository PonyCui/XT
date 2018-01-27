package com.opensource.xt.uikit

import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTComponentInstance

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTUIApplication : XTComponentInstance {

    override var objectUUID: String? = null

    var delegate: XTUIApplicationDelegate? = null

    class JSExports(val context: XTUIContext): XTComponentExport() {

        override val name: String = "_XTUIApplication"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf(String::class.java))
            return exports
        }

        fun create(delegateRef: String): String {
            val application = XTUIApplication()
            application.delegate = XTMemoryManager.find(delegateRef) as? XTUIApplicationDelegate
            context.application = application
            val managedObject = XTManagedObject(application)
            application.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

    }

}
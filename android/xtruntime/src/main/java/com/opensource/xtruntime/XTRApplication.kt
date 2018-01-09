package com.opensource.xtruntime

import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Function
import com.eclipsesource.v8.V8Object
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRApplication: XTRComponentInstance {

    override var objectUUID: String? = null

    companion object: XTRComponentExport() {

        override val name: String = "XTRApplication"

        override fun exports(context: XTRContext): V8Object {
            val exports = V8Object(context.v8Runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            return exports
        }

        fun create(): String {
            val application = XTRApplication()
            val managedObject = XTManagedObject(application)
            application.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            XTMemoryManager.retain(managedObject.objectUUID)
            return managedObject.objectUUID
        }

    }

}
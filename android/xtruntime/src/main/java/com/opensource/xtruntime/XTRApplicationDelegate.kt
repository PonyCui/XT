package com.opensource.xtruntime

import com.eclipsesource.v8.V8Object
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager

/**
 * Created by cuiminghui on 2017/8/31.
 */


class XTRApplicationDelegate: XTRComponentInstance {

    override var objectUUID: String? = null

    companion object: XTRComponentExport() {

        override val name: String = "XTRApplicationDelegate"

        override fun exports(context: XTRContext): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            return exports
        }

        fun create(): String {
            val application = XTRApplicationDelegate()
            val managedObject = XTManagedObject(application)
            application.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            XTMemoryManager.retain(managedObject.objectUUID)
            return managedObject.objectUUID
        }

    }

    fun applicationDidFinishLaunchingWithOptions() {
//        xtrContext.invokeMethod(this.scriptObject, "applicationDidFinishLaunchingWithOptions", listOf("", ""))
    }

}
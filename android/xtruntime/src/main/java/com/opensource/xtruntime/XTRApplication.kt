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
class XTRApplication: XTRComponentInstance() {

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

    class InnerObject(override var scriptObject: V8Object?, val xtrContext: XTRContext): XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()

        var delegate: XTRApplicationDelegate.InnerObject? = null

        override fun requestV8Object(runtime: V8): V8Object {
            val v8Object = super.requestV8Object(runtime)
//            v8Object.registerJavaMethod(this, "xtr_setDelegate", "xtr_setDelegate", arrayOf(V8Object::class.java))
            return v8Object
        }

//        fun xtr_setDelegate(value: V8Object) {
//            XTRUtils.toApplicationDelegate(value)?.let {
//                this.delegate = it
//            }
//        }

    }

}
package com.opensource.xtruntime

import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import java.util.*

/**
 * Created by cuiminghui on 2017/9/1.
 */
interface XTRObject {

    companion object {

        var tmpNativeObject: XTRObject? = null

        fun requestNativeObject(scriptObject: V8Object): XTRObject? {
            return try {
                tmpNativeObject = null
                (scriptObject.get("nativeObject") as? V8Object)?.executeVoidFunction("xtr_decodeObject", null)
                tmpNativeObject
            } catch (e: Exception) {
                null
            }
        }

    }

    val objectUUID: String

    fun requestV8Object(runtime: V8): V8Object {
        val v8Object = V8Object(runtime)
        v8Object.registerJavaMethod(this, "xtr_decodeObject", "xtr_decodeObject", arrayOf())
        v8Object.add("objectUUID", objectUUID)
        return v8Object
    }

    fun xtr_decodeObject() {
        tmpNativeObject = this
    }

}
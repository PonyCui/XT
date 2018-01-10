package com.opensource.xtruntime

import android.os.Build
import com.eclipsesource.v8.V8Object

/**
 * Created by cuiminghui on 2017/9/28.
 */
enum class DeviceOrientation {
    Unknown,
    Portrait,
    PortraitUpsideDown,
    LandscapeLeft,
    LandscapeRight,
    FaceUp,
    FaceDown,
}

class XTRDevice: XTRComponent() {

    companion object {
        internal var current: InnerObject? = null
    }

    override val name: String = "XTRDevice"

    override fun v8Object(): V8Object? {
        val v8Object = V8Object(xtrContext.runtime)
        v8Object.registerJavaMethod(this, "xtr_current", "xtr_current", arrayOf())
        return v8Object
    }

    fun xtr_current(): V8Object {
        if (current == null) {
            current = InnerObject(xtrContext)
        }
        val v8Object = V8Object(xtrContext.runtime)
        v8Object.registerJavaMethod(current, "xtr_name", "xtr_name", arrayOf())
        v8Object.registerJavaMethod(current, "xtr_systemName", "xtr_systemName", arrayOf())
        v8Object.registerJavaMethod(current, "xtr_systemVersion", "xtr_systemVersion", arrayOf())
        v8Object.registerJavaMethod(current, "xtr_xtRuntimeVersion", "xtr_xtRuntimeVersion", arrayOf())
        v8Object.registerJavaMethod(current, "xtr_model", "xtr_model", arrayOf())
        v8Object.registerJavaMethod(current, "xtr_orientation", "xtr_orientation", arrayOf())
        return v8Object
    }

    class InnerObject(val xtrContext: XTRContext) {

        fun xtr_name(): String {
            return Build.BRAND
        }

        fun xtr_systemName(): String {
            return "Android"
        }

        fun xtr_systemVersion(): String {
            return Build.VERSION.SDK_INT.toString()
        }

        fun xtr_xtRuntimeVersion(): String {
            return XTRuntime.version
        }

        fun xtr_model(): String {
            return Build.MODEL
        }

        internal var orientation = DeviceOrientation.Unknown

        fun xtr_orientation(): Int {
            return orientation.ordinal
        }

    }

}
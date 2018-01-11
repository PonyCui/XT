package com.opensource.xtruntime

import android.os.Build
import com.eclipsesource.v8.V8Object

/**
 * Created by cuiminghui on 2017/9/28.
 */


class XTRDevice {

    enum class DeviceOrientation {
        Unknown,
        Portrait,
        PortraitUpsideDown,
        LandscapeLeft,
        LandscapeRight,
        FaceUp,
        FaceDown,
    }

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRDevice"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "xtr_deviceName", "xtr_deviceName", arrayOf())
            exports.registerJavaMethod(this, "xtr_systemName", "xtr_systemName", arrayOf())
            exports.registerJavaMethod(this, "xtr_systemVersion", "xtr_systemVersion", arrayOf())
            exports.registerJavaMethod(this, "xtr_xtRuntimeVersion", "xtr_xtRuntimeVersion", arrayOf())
            exports.registerJavaMethod(this, "xtr_model", "xtr_model", arrayOf())
            exports.registerJavaMethod(this, "xtr_orientation", "xtr_orientation", arrayOf())
            return exports
        }

        fun xtr_deviceName(): String {
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

        fun xtr_orientation(): Int {
            return orientation.ordinal
        }

    }

    companion object {
        internal var orientation = DeviceOrientation.Unknown
    }

}
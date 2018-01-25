package com.opensource.xt.uikit

import android.os.Build
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTCore

/**
 * Created by cuiminghui on 2017/9/28.
 */


class XTUIDevice {

    enum class DeviceOrientation {
        Unknown,
        Portrait,
        PortraitUpsideDown,
        LandscapeLeft,
        LandscapeRight,
        FaceUp,
        FaceDown,
    }

    class JSExports(val context: XTUIContext): XTUIComponentExport() {

        override val name: String = "_XTUIDevice"

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
            return XTCore.version
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
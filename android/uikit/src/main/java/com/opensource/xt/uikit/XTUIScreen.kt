package com.opensource.xt.uikit

import android.app.Activity
import android.util.DisplayMetrics
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTComponentExport

/**
 * Created by cuiminghui on 2017/10/27.
 */
class XTUIScreen {

    class JSExports(val context: XTUIContext): XTComponentExport() {

        override val name: String = "_XTUIScreen"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "xtr_mainScreen", "xtr_mainScreen", arrayOf())

            return exports
        }

        fun xtr_mainScreen(): V8Object {
            val v8Object = V8Object(context.runtime)
            v8Object.add("width", displayMetrics.widthPixels.toDouble() / displayMetrics.density.toDouble())
            v8Object.add("height", displayMetrics.heightPixels.toDouble() / displayMetrics.density.toDouble())
            v8Object.add("scale", displayMetrics.density.toDouble())
            return v8Object
        }

    }

    companion object {

        var displayMetrics = DisplayMetrics()

        fun resetScreenInfo(activity: Activity) {
            activity.windowManager.defaultDisplay.getMetrics(displayMetrics)
        }

    }

}
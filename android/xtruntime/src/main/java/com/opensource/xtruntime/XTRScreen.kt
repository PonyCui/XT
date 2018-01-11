package com.opensource.xtruntime

import android.app.Activity
import android.util.DisplayMetrics
import com.eclipsesource.v8.V8Object

/**
 * Created by cuiminghui on 2017/10/27.
 */
class XTRScreen {

    companion object : XTRComponentExport() {

        override val name: String = "XTRScreen"

        override fun exports(context: XTRContext): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "xtr_mainScreen", "xtr_mainScreen", arrayOf())

            return exports
        }

        var displayMetrics = DisplayMetrics()

        fun resetScreenInfo(activity: Activity) {
            activity.windowManager.defaultDisplay.getMetrics(displayMetrics)
        }

        fun xtr_mainScreen(): V8Object {
            val v8Object = V8Object(XTRView.context.runtime)
            v8Object.add("width", displayMetrics.widthPixels.toDouble() / displayMetrics.density.toDouble())
            v8Object.add("height", displayMetrics.heightPixels.toDouble() / displayMetrics.density.toDouble())
            v8Object.add("scale", displayMetrics.density.toDouble())
            return v8Object
        }

    }

}
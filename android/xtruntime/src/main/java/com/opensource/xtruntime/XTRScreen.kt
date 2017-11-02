package com.opensource.xtruntime

import android.app.Activity
import android.util.DisplayMetrics
import com.eclipsesource.v8.V8Object

/**
 * Created by cuiminghui on 2017/10/27.
 */
class XTRScreen: XTRComponent() {

    companion object {

        var displayMetrics = DisplayMetrics()

        fun resetScreenInfo(activity: Activity) {
            activity.windowManager.defaultDisplay.getMetrics(displayMetrics)
        }

    }

    override val name: String = "XTRScreen"

    override fun v8Object(): V8Object? {
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "xtr_mainScreen", "xtr_mainScreen", arrayOf())
        return v8Object
    }

    fun xtr_mainScreen(): V8Object {
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.add("width", displayMetrics.widthPixels.toDouble() / displayMetrics.density.toDouble())
        v8Object.add("height", displayMetrics.heightPixels.toDouble() / displayMetrics.density.toDouble())
        v8Object.add("scale", displayMetrics.density.toDouble())
        return v8Object
    }

}
package com.opensource.xtruntime

import android.graphics.Color
import android.os.Bundle
import android.support.v4.graphics.ColorUtils
import android.view.View
import org.mozilla.javascript.Function
import org.mozilla.javascript.NativeArray
import org.mozilla.javascript.NativeObject
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRUtils {

    companion object {

        fun toColor(target: Any?): XTRColor? {
            (target as? ScriptableObject)?.let {
                val r = it.get("r") as? Double ?: return null
                val g = it.get("g") as? Double ?: return null
                val b = it.get("b") as? Double ?: return null
                val a = it.get("a") as? Double ?: return null
                return XTRColor(r, g, b, a)
            }
            return null
        }

        fun fromIntColor(value: Int): XTRColor {
            return XTRColor(Color.red(value).toDouble() / 255.0, Color.green(value).toDouble() / 255.0, Color.blue(value).toDouble() / 255.0, Color.alpha(value).toDouble() / 255.0)
        }

        fun toRect(target: Any?): XTRRect? {
            (target as? ScriptableObject)?.let {
                val x = it.get("x") as? Double ?: return null
                val y = it.get("y") as? Double ?: return null
                val width = it.get("width") as? Double ?: return null
                val height = it.get("height") as? Double ?: return null
                return XTRRect(x, y, width, height)
            }
            return null
        }

        fun toView(target: Any?): View? {
            return (target as? ScriptableObject)?.get("nativeObject") as? View
        }

        fun toWindow(target: Any?): XTRWindow.InnerObject? {
            return (target as? ScriptableObject)?.get("nativeObject") as? XTRWindow.InnerObject
        }

        fun toApplication(target: Any?): XTRApplication.InnerObject? {
            return (target as? ScriptableObject)?.get("nativeObject") as? XTRApplication.InnerObject
        }

        fun toApplicationDelegate(target: Any?): XTRApplicationDelegate.InnerObject? {
            return (target as? ScriptableObject)?.get("nativeObject") as? XTRApplicationDelegate.InnerObject
        }

        fun fromObject(context: XTRContext, target: Any): ScriptableObject? {
            ((context.scope.get("window") as? ScriptableObject)?.get("XTRObjCreater") as? ScriptableObject)?.let { creater ->
                (creater.get("create") as? Function)?.let {
                    return it.call(context.jsContext, context.scope, creater, arrayOf(target)) as? ScriptableObject
                }
            }
            return null
        }

    }

}
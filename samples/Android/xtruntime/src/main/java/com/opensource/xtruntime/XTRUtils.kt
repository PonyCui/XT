package com.opensource.xtruntime

import android.graphics.Color
import android.view.View
import org.mozilla.javascript.Function
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRUtils {

    companion object {

        fun toColor(target: Any?): XTRColor? {
            (target as? XTRColor)?.let { return it }
            (target as? ScriptableObject)?.let {
                val r = it.get("r") as? Double ?: return null
                val g = it.get("g") as? Double ?: return null
                val b = it.get("b") as? Double ?: return null
                val a = it.get("a") as? Double ?: return null
                return XTRColor(r, g, b, a)
            }
            return null
        }

        fun fromIntColor(target: Int): XTRColor {
            (target as? XTRColor)?.let { return it }
            return XTRColor(Color.red(target).toDouble() / 255.0, Color.green(target).toDouble() / 255.0, Color.blue(target).toDouble() / 255.0, Color.alpha(target).toDouble() / 255.0)
        }

        fun toRect(target: Any?): XTRRect? {
            (target as? XTRRect)?.let { return it }
            (target as? ScriptableObject)?.let {
                val x = it.get("x") as? Double ?: return null
                val y = it.get("y") as? Double ?: return null
                val width = it.get("width") as? Double ?: return null
                val height = it.get("height") as? Double ?: return null
                return XTRRect(x, y, width, height)
            }
            return null
        }

        fun toPoint(target: Any?): XTRPoint? {
            (target as? XTRPoint)?.let { return it }
            (target as? ScriptableObject)?.let {
                val x = it.get("x") as? Double ?: return null
                val y = it.get("y") as? Double ?: return null
                return XTRPoint(x, y)
            }
            return null
        }

        fun toSize(target: Any?): XTRSize? {
            (target as? XTRSize)?.let { return it }
            (target as? ScriptableObject)?.let {
                val width = it.get("width") as? Double ?: return null
                val height = it.get("height") as? Double ?: return null
                return XTRSize(width, height)
            }
            return null
        }

        fun toFont(target: Any?): XTRFont? {
            (target as? XTRFont)?.let { return it }
            (target as? ScriptableObject)?.let {
                return XTRFont(
                        it.get("pointSize") as? Double ?: 14.0,
                        it.get("familyName") as? String,
                        it.get("fontWeight") as? String ?: "400",
                        it.get("fontStyle") as? String ?: "normal"
                )
            }
            return null
        }

        fun toView(target: Any?): View? {
            (target as? View)?.let { return it }
            return (target as? ScriptableObject)?.get("nativeObject") as? View
        }

        fun toWindow(target: Any?): XTRWindow.InnerObject? {
            (target as? XTRWindow.InnerObject)?.let { return it }
            return (target as? ScriptableObject)?.get("nativeObject") as? XTRWindow.InnerObject
        }

        fun toViewController(target: Any?): XTRViewController.InnerObject? {
            (target as? XTRViewController.InnerObject)?.let { return it }
            return (target as? ScriptableObject)?.get("nativeObject") as? XTRViewController.InnerObject
        }

        fun toApplication(target: Any?): XTRApplication.InnerObject? {
            (target as? XTRApplication.InnerObject)?.let { return it }
            return (target as? ScriptableObject)?.get("nativeObject") as? XTRApplication.InnerObject
        }

        fun toApplicationDelegate(target: Any?): XTRApplicationDelegate.InnerObject? {
            (target as? XTRApplicationDelegate.InnerObject)?.let { return it }
            return (target as? ScriptableObject)?.get("nativeObject") as? XTRApplicationDelegate.InnerObject
        }

        fun toImage(target: Any?): XTRImage.InnerObject? {
            (target as? XTRImage.InnerObject)?.let { return it }
            return (target as? ScriptableObject)?.get("nativeObject") as? XTRImage.InnerObject
        }

        fun fromObject(context: XTRContext, target: Any?): Any? {
            if (target == null) {
                return null
            }
            ((context.scope.get("window") as? ScriptableObject)?.get("XTRObjCreater") as? ScriptableObject)?.let { creater ->
                (creater.get("create") as? Function)?.let {
                    return it.call(context.jsContext, context.scope, creater, arrayOf(target)) as? ScriptableObject
                }
            }
            return null
        }

    }

}
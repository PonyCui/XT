package com.opensource.xtruntime

import android.graphics.Color
import android.graphics.Matrix
import android.view.View
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Function
import com.eclipsesource.v8.V8Object
import org.mozilla.javascript.Function
import org.mozilla.javascript.ScriptableObject
import org.mozilla.javascript.Undefined

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRUtils {

    companion object {

        fun toColor(target: Any?): XTRColor? {
            (target as? XTRColor)?.let { return it }
            (target as? V8Object)?.let {
                val r = it.get("r") as? Double ?: return null
                val g = it.get("g") as? Double ?: return null
                val b = it.get("b") as? Double ?: return null
                val a = it.get("a") as? Double ?: return null
                return XTRColor(r, g, b, a)
            }
            return null
        }

        fun fromIntColor(target: Int): XTRColor {
            return XTRColor(Color.red(target).toDouble() / 255.0, Color.green(target).toDouble() / 255.0, Color.blue(target).toDouble() / 255.0, Color.alpha(target).toDouble() / 255.0)
        }

        fun toRect(target: Any?): XTRRect? {
            (target as? XTRRect)?.let { return it }
            (target as? V8Object)?.let {
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
            (target as? V8Object)?.let {
                val x = it.get("x") as? Double ?: return null
                val y = it.get("y") as? Double ?: return null
                return XTRPoint(x, y)
            }
            return null
        }

        fun toTransform(target: Any?): XTRMatrix? {
            (target as? XTRMatrix)?.let { return it }
            (target as? V8Object)?.let {
                val a = it.get("a") as? Double ?: return null
                val b = it.get("b") as? Double ?: return null
                val c = it.get("c") as? Double ?: return null
                val d = it.get("d") as? Double ?: return null
                val tx = it.get("tx") as? Double ?: return null
                val ty = it.get("ty") as? Double ?: return null
                return XTRMatrix(a, b, c, d, tx, ty)
            }
            return null
        }

        fun toSize(target: Any?): XTRSize? {
            (target as? XTRSize)?.let { return it }
            (target as? V8Object)?.let {
                val width = it.get("width") as? Double ?: return null
                val height = it.get("height") as? Double ?: return null
                return XTRSize(width, height)
            }
            return null
        }

        fun toFont(target: Any?): XTRFont? {
            (target as? XTRFont)?.let { return it }
            (target as? V8Object)?.let {
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
            (target as? V8Object)?.let {
                return XTRObject.requestNativeObject(it) as? View
            }
            return null
        }

        fun toWindow(target: Any?): XTRWindow.InnerObject? {
            (target as? XTRWindow.InnerObject)?.let { return it }
            (target as? V8Object)?.let {
                return XTRObject.requestNativeObject(it) as? XTRWindow.InnerObject
            }
            return null
        }

        fun toViewController(target: Any?): XTRViewController.InnerObject? {
            (target as? XTRViewController.InnerObject)?.let { return it }
            (target as? V8Object)?.let {
                return XTRObject.requestNativeObject(it) as? XTRViewController.InnerObject
            }
            return null
        }

        fun toApplication(target: Any?): XTRApplication.InnerObject? {
            (target as? XTRApplication.InnerObject)?.let { return it }
            (target as? V8Object)?.let {
                return XTRObject.requestNativeObject(it) as? XTRApplication.InnerObject
            }
            return null
        }

        fun toApplicationDelegate(target: Any?): XTRApplicationDelegate.InnerObject? {
            (target as? XTRApplicationDelegate.InnerObject)?.let { return it }
            (target as? V8Object)?.let {
                return XTRObject.requestNativeObject(it) as? XTRApplicationDelegate.InnerObject
            }
            return null
        }

        fun toImage(target: Any?): XTRImage.InnerObject? {
            (target as? XTRImage.InnerObject)?.let { return it }
            (target as? V8Object)?.let {
                return XTRObject.requestNativeObject(it) as? XTRImage.InnerObject
            }
            return null
        }

        fun fromObject(context: XTRContext, target: Any?): Any? {
            if (target == null) {
                return context.v8Runtime.executeObjectScript("undefined")
            }
            (target as? V8Object)?.let { target ->
                ((context.v8Runtime.get("XTRObjCreater") as? V8Object)?.get("create") as? V8Function)?.let {
                    val params = V8Array(context.v8Runtime)
                    params.push(target)
                    val value = it.call(null, params)
                    params.release()
                    (value as? V8Object)?.let {
                        return it
                    }
                }
            }
            return target
        }

    }

}
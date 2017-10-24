package com.opensource.xtruntime

import android.graphics.Color
import android.graphics.Matrix
import android.view.View
import com.eclipsesource.v8.*
import org.mozilla.javascript.Function
import org.mozilla.javascript.ScriptableObject
import org.mozilla.javascript.Undefined
import java.nio.ByteBuffer

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRUtils {

    companion object {

        fun toColor(target: Any?): XTRColor? {
            (target as? XTRColor)?.let { return it }
            (target as? V8Object)?.let {
                val r = (it.get("r") as? Int)?.toDouble() ?: it.get("r") as? Double ?: return null
                val g = (it.get("g") as? Int)?.toDouble() ?: it.get("g") as? Double ?: return null
                val b = (it.get("b") as? Int)?.toDouble() ?: it.get("b") as? Double ?: return null
                val a = (it.get("a") as? Int)?.toDouble() ?: it.get("a") as? Double ?: return null
                return XTRColor(r, g, b, a)
            }
            return null
        }

        fun fromColor(target: XTRColor, runtime: V8): V8Object {
            val v8Object = V8Object(runtime)
            v8Object.add("r", target.r)
            v8Object.add("g", target.g)
            v8Object.add("b", target.b)
            v8Object.add("a", target.a)
            return v8Object
        }

        fun fromIntColor(target: Int): XTRColor {
            return XTRColor(Color.red(target).toDouble() / 255.0, Color.green(target).toDouble() / 255.0, Color.blue(target).toDouble() / 255.0, Color.alpha(target).toDouble() / 255.0)
        }

        fun toRect(target: Any?): XTRRect? {
            (target as? XTRRect)?.let { return it }
            (target as? V8Object)?.let {
                val x = (it.get("x") as? Int)?.toDouble() ?: it.get("x") as? Double ?: return null
                val y = (it.get("y") as? Int)?.toDouble() ?: it.get("y") as? Double ?: return null
                val width = (it.get("width") as? Int)?.toDouble() ?: it.get("width") as? Double ?: return null
                val height = (it.get("height") as? Int)?.toDouble() ?: it.get("height") as? Double ?: return null
                return XTRRect(x, y, width, height)
            }
            return null
        }

        fun fromRect(target: XTRRect, runtime: V8): V8Object {
            val v8Object = V8Object(runtime)
            v8Object.add("x", target.x)
            v8Object.add("y", target.y)
            v8Object.add("width", target.width)
            v8Object.add("height", target.height)
            return v8Object
        }

        fun toPoint(target: Any?): XTRPoint? {
            (target as? XTRPoint)?.let { return it }
            (target as? V8Object)?.let {
                val x = (it.get("x") as? Int)?.toDouble() ?: it.get("x") as? Double ?: return null
                val y = (it.get("y") as? Int)?.toDouble() ?: it.get("y") as? Double ?: return null
                return XTRPoint(x, y)
            }
            return null
        }

        fun fromPoint(target: XTRPoint, runtime: V8): V8Object {
            val v8Object = V8Object(runtime)
            v8Object.add("x", target.x)
            v8Object.add("y", target.y)
            return v8Object
        }

        fun toTransform(target: Any?): XTRMatrix? {
            (target as? XTRMatrix)?.let { return it }
            (target as? V8Object)?.let {
                val a = (it.get("a") as? Int)?.toDouble() ?: it.get("a") as? Double ?: return null
                val b = (it.get("b") as? Int)?.toDouble() ?: it.get("b") as? Double ?: return null
                val c = (it.get("c") as? Int)?.toDouble() ?: it.get("c") as? Double ?: return null
                val d = (it.get("d") as? Int)?.toDouble() ?: it.get("d") as? Double ?: return null
                val tx = (it.get("tx") as? Int)?.toDouble() ?: it.get("tx") as? Double ?: return null
                val ty = (it.get("ty") as? Int)?.toDouble() ?: it.get("ty") as? Double ?: return null
                return XTRMatrix(a, b, c, d, tx, ty)
            }
            return null
        }

        fun fromTransform(target: XTRMatrix, runtime: V8): V8Object {
            val v8Object = V8Object(runtime)
            v8Object.add("a", target.a)
            v8Object.add("b", target.b)
            v8Object.add("c", target.c)
            v8Object.add("d", target.d)
            v8Object.add("tx", target.tx)
            v8Object.add("ty", target.ty)
            return v8Object
        }

        fun toSize(target: Any?): XTRSize? {
            (target as? XTRSize)?.let { return it }
            (target as? V8Object)?.let {
                val width = (it.get("width") as? Int)?.toDouble() ?: it.get("width") as? Double ?: return null
                val height = (it.get("height") as? Int)?.toDouble() ?: it.get("height") as? Double ?: return null
                return XTRSize(width, height)
            }
            return null
        }

        fun fromSize(target: XTRSize, runtime: V8): V8Object {
            val v8Object = V8Object(runtime)
            v8Object.add("width", target.width)
            v8Object.add("height", target.height)
            return v8Object
        }

        fun toFont(target: Any?): XTRFont? {
            (target as? XTRFont)?.let { return it }
            (target as? V8Object)?.let {
                return XTRFont(
                        (it.get("pointSize") as? Int)?.toDouble() ?: it.get("pointSize") as? Double ?: 14.0,
                        it.get("familyName") as? String,
                        it.get("fontWeight") as? String ?: "400",
                        it.get("fontStyle") as? String ?: "normal"
                )
            }
            return null
        }

        fun fromFont(target: XTRFont, runtime: V8): V8Object {
            val v8Object = V8Object(runtime)
            v8Object.add("pointSize", target.pointSize)
            v8Object.add("familyName", target.familyName)
            v8Object.add("fontWeight", target.fontWeight)
            v8Object.add("fontStyle", target.fontStyle)
            return v8Object
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

        fun fromArray(target: Any?): List<Any>? {
            (target as? V8Array)?.let { arr ->
                return (0 until arr.length()).map { return@map arr.get(it) }
            }
            return null
        }

        fun fromObject(context: XTRContext, target: Any?): Any? {
            if (target == null) {
                return V8.getUndefined()
            }
            (target as? ByteArray)?.let { return it }
            (target as? Boolean)?.let { return it }
            (target as? Short)?.let { return it.toInt() }
            (target as? Int)?.let { return it }
            (target as? Long)?.let { return it.toInt() }
            (target as? Float)?.let { return it.toDouble() }
            (target as? Double)?.let { return it }
            (target as? String)?.let { return it }
            (target as? XTRColor)?.let { return fromColor(it, context.v8Runtime) }
            (target as? XTRRect)?.let { return fromRect(it, context.v8Runtime) }
            (target as? XTRPoint)?.let { return fromPoint(it, context.v8Runtime) }
            (target as? XTRMatrix)?.let { return fromTransform(it, context.v8Runtime) }
            (target as? XTRSize)?.let { return fromSize(it, context.v8Runtime) }
            (target as? XTRFont)?.let { return fromFont(it, context.v8Runtime) }
            (target as? List<Any>)?.let {
                val v8Array = V8Array(context.v8Runtime)
                it.forEach {
                    val item = fromObject(context, it)
                    (item as? Boolean)?.let { v8Array.push(it) }
                    (item as? Int)?.let { v8Array.push(it) }
                    (item as? Double)?.let { v8Array.push(it) }
                    (item as? String)?.let { v8Array.push(it) }
                    (item as? V8Value)?.let { v8Array.push(it) }
                }
                return v8Array
            }
            (target as? XTRObject)?.let { target ->
                (((context.v8Runtime.get("window") as? V8Object)?.get("XTRObjCreater") as? V8Object)?.get("create") as? V8Function)?.let {
                    val params = V8Array(context.v8Runtime)
                    params.push(target.requestV8Object(context.v8Runtime))
                    (it.call(((context.v8Runtime.get("window") as? V8Object)?.get("XTRObjCreater") as? V8Object), params) as? V8Object)?.let { return it }
                }
            }
            return V8.getUndefined()
        }

    }

}
package com.opensource.xtruntime

import android.graphics.Color
import com.eclipsesource.v8.*

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

        fun fromIntColor(target: Int, runtime: V8): V8Object {
            return fromColor(fromIntColor(target), runtime)
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

        fun fromFont(target: XTRFont, runtime: V8): V8Object {
            val v8Object = V8Object(runtime)
            v8Object.add("pointSize", target.pointSize)
            v8Object.add("familyName", target.familyName)
            v8Object.add("fontWeight", target.fontWeight)
            v8Object.add("fontStyle", target.fontStyle)
            return v8Object
        }

        fun fromArray(target: Any?): List<Any>? {
            (target as? V8Array)?.let { arr ->
                return (0 until arr.length()).map { return@map arr.get(it) }
            }
            return null
        }

        fun toMap(target: Any?): Map<String, Any>? {
            (target as? V8Object)?.let {
                val map = HashMap<String, Any>()
                it.keys.forEach { key ->
                    map.put(key, it[key])
                }
                return map.toMap()
            }
            return null
        }

        fun fromMap(target: Map<String, Any>, runtime: V8): V8Object {
            val v8Object = V8Object(runtime)
            target.entries.forEach { entry ->
                (entry.value as? Int)?.let { v8Object.add(entry.key, it) }
                (entry.value as? String)?.let { v8Object.add(entry.key, it) }
                (entry.value as? V8Value)?.let { v8Object.add(entry.key, it) }
                (entry.value as? Double)?.let { v8Object.add(entry.key, it) }
                (entry.value as? Boolean)?.let { v8Object.add(entry.key, it) }
            }
            return v8Object
        }

    }

}
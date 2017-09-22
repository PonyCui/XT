package com.opensource.xtruntime

import android.graphics.Color
import android.graphics.Matrix

/**
 * Created by cuiminghui on 2017/9/1.
 */

class XTRColor(val r: Double, val g: Double, val b: Double, val a: Double) {

    fun intColor(): Int {
        return Color.argb((a * 255).toInt(), (r * 255).toInt(), (g * 255).toInt(), (b * 255).toInt())
    }

    override fun toString(): String {
        return "XTRColor, r = $r, g = $g, b = $b, a = $a"
    }

}

class XTRRect(val x: Double, val y: Double, val width: Double, val height: Double) {

    override fun toString(): String {
        return "XTRRect, x: $x, y: $y, width: $width, height: $height"
    }

}

class XTRPoint(val x: Double, val y: Double) {

    override fun toString(): String {
        return "XTRPoint, x: $x, y: $y"
    }

}

class XTRSize(val width: Double, val height: Double) {

    override fun toString(): String {
        return "XTRPoint, width: $width, height: $height"
    }

}

class XTRFont(val pointSize: Double, val familyName: String?, val fontWeight: String = "400", val fontStyle: String = "normal")

class XTRMatrix(val a: Double, val b: Double, val c: Double, val d: Double, val tx: Double, val ty: Double) {

    override fun toString(): String {
        return "XTRMatrix, a: $a, b: $b, c: $c, d: $d, tx: $tx, ty: $ty"
    }

    fun toNativeMatrix(): Matrix {
        val matrix = Matrix()
        val arr = FloatArray(9)
        arr[0] = a.toFloat()
        arr[1] = c.toFloat()
        arr[2] = tx.toFloat()
        arr[3] = b.toFloat()
        arr[4] = d.toFloat()
        arr[5] = ty.toFloat()
        arr[6] = 0.0.toFloat()
        arr[7] = 0.0.toFloat()
        arr[8] = 1.0.toFloat()
        matrix.setValues(arr)
        return matrix
    }

}
package com.opensource.xtruntime

import android.graphics.Color

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
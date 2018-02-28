package com.opensource.xt.uikit

import android.graphics.Color
import android.graphics.Matrix

/**
 * Created by cuiminghui on 2017/9/1.
 */

class XTUIColor(val r: Double, val g: Double, val b: Double, val a: Double) {

    fun intColor(): Int {
        return Color.argb((a * 255).toInt(), (r * 255).toInt(), (g * 255).toInt(), (b * 255).toInt())
    }

    override fun toString(): String {
        return "XTUIColor, r = $r, g = $g, b = $b, a = $a"
    }

}

class XTUIRect(val x: Double, val y: Double, val width: Double, val height: Double) {

    override fun toString(): String {
        return "XTUIRect, x: $x, y: $y, width: $width, height: $height"
    }

    override fun equals(other: Any?): Boolean {
        (other as? XTUIRect)?.let {
            return this.x == it.x && this.y == it.y && this.width == it.width && this.height == it.height
        }
        return false
    }

}

class XTUIPoint(val x: Double, val y: Double) {

    override fun toString(): String {
        return "XTUIPoint, x: $x, y: $y"
    }

}

class XTUISize(val width: Double, val height: Double) {

    override fun toString(): String {
        return "XTUIPoint, width: $width, height: $height"
    }

}

class XTUIInsets(val top: Double, val left: Double, val bottom: Double, val right: Double) {

    override fun toString(): String {
        return "XTUIPoint, top: $top, left: $left, bottom: $bottom, right: $right"
    }

}

//class XTUIFont(val pointSize: Double, val familyName: String?, val fontWeight: String = "400", val fontStyle: String = "normal")

class XTUIMatrixOriginal(val scale: XTUIPoint, val degree: Double, val translate: XTUIPoint)

class XTUIMatrix(val a: Double, val b: Double, val c: Double, val d: Double, val tx: Double, val ty: Double) {

    override fun toString(): String {
        return "XTUIMatrix, a: $a, b: $b, c: $c, d: $d, tx: $tx, ty: $ty"
    }

    companion object {

        fun fromNativeMatrix(matrix: Matrix): XTUIMatrix {
            val arr = FloatArray(9)
            matrix.getValues(arr)
            return XTUIMatrix(arr[0].toDouble(), arr[3].toDouble(), arr[1].toDouble(), arr[4].toDouble(), arr[2].toDouble(), arr[5].toDouble())
        }

    }

    fun isIdentity(): Boolean {
        return a == 1.0 && b == 0.0 && c == 0.0 && d == 1.0 && tx == 0.0 && ty == 0.0
    }

    fun setScale(x: Double? = null, y: Double? = null): XTUIMatrix {
        val nativeMatrix = Matrix()
        val unMatrix = this.unMatrix()
        nativeMatrix.postRotate(unMatrix.degree.toFloat())
        nativeMatrix.postScale((x ?: unMatrix.scale.x).toFloat(), (y ?: unMatrix.scale.y).toFloat())
        nativeMatrix.postTranslate(unMatrix.translate.x.toFloat(), unMatrix.translate.y.toFloat())
        return XTUIMatrix.fromNativeMatrix(nativeMatrix)
    }

    fun setRotate(degree: Double): XTUIMatrix {
        val nativeMatrix = Matrix()
        val unMatrix = this.unMatrix()
        nativeMatrix.postRotate(degree.toFloat())
        nativeMatrix.postScale(unMatrix.scale.x.toFloat(), unMatrix.scale.y.toFloat())
        nativeMatrix.postTranslate(unMatrix.translate.x.toFloat(), unMatrix.translate.y.toFloat())
        return XTUIMatrix.fromNativeMatrix(nativeMatrix)
    }

    fun setTranslate(x: Double? = null, y: Double? = null): XTUIMatrix {
        val nativeMatrix = Matrix()
        val unMatrix = this.unMatrix()
        nativeMatrix.postRotate(unMatrix.degree.toFloat())
        nativeMatrix.postScale(unMatrix.scale.x.toFloat(), unMatrix.scale.y.toFloat())
        nativeMatrix.postTranslate((x ?: unMatrix.translate.x).toFloat(), (y ?: unMatrix.translate.y).toFloat())
        return XTUIMatrix.fromNativeMatrix(nativeMatrix)
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

    fun toNativeMatrix(scale: Float): Matrix {
        val matrix = Matrix()
        val arr = FloatArray(9)
        arr[0] = a.toFloat()
        arr[1] = c.toFloat()
        arr[2] = tx.toFloat() * scale
        arr[3] = b.toFloat()
        arr[4] = d.toFloat()
        arr[5] = ty.toFloat() * scale
        arr[6] = 0.0.toFloat()
        arr[7] = 0.0.toFloat()
        arr[8] = 1.0.toFloat()
        matrix.setValues(arr)
        return matrix
    }

    fun unMatrix(): XTUIMatrixOriginal {
        var A = a
        var B = b
        var C = c
        var D = d
        if (A * D == B * C) {
            return XTUIMatrixOriginal(XTUIPoint(1.0, 1.0), 0.0, XTUIPoint(0.0, 0.0))
        }
        // step (3)
        var scaleX = Math.sqrt(A * A + B * B)
        A /= scaleX
        B /= scaleX
        // step (4)
        var skew = A * C + B * D
        C -= A * skew
        D -= B * skew
        // step (5)
        var scaleY = Math.sqrt(C * C + D * D)
        C /= scaleY
        D /= scaleY
        skew /= scaleY
        // step (6)
        if ( A * D < B * C ) {
            A = -A
            B = -B
            skew = -skew
            scaleX = -scaleX
        }
        return XTUIMatrixOriginal(XTUIPoint(scaleX, scaleY), Math.atan2(B, A) / (Math.PI / 180), XTUIPoint(tx, ty))
    }


}
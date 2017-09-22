package com.opensource.xtruntime

import android.graphics.*
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/9/22.
 */
class XTRCanvasView: XTRComponent() {

    override val name: String = "XTRCanvasView"

    fun createScriptObject(rect: Any, scriptObject: Any): InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            val view = InnerObject(it, xtrContext)
            XTRUtils.toRect(rect)?.let {
                view.frame = it
            }
            return view
        }
        return null
    }

    class State(var globalAlpha: Double = 1.0,
                var fillStyle: XTRColor? = null,
                var strokeStyle: XTRColor? = null,
                var lineCap: String? = null,
                var lineJoin: String? = null,
                var lineWidth: Double = 1.0,
                var miterLimit: Double = 0.0,
                var currentTransform: Matrix = Matrix()) {
        fun copy(): State {
            return State(globalAlpha, fillStyle, strokeStyle, lineCap, lineJoin, lineWidth, miterLimit, currentTransform)
        }
    }

    class InnerObject(scriptObject: ScriptableObject, xtrContext: XTRContext) : XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        private var currentState = State()
        private var stateStack: List<State> = listOf()
        private var currentPath = Path()
        private var drawingPath = Path()
        private var currentPaint = Paint()
        private var currentCanvas: Canvas? = null
        private val scale = resources.displayMetrics.density

        fun xtr_globalAlpha(): Double {
            return currentState.globalAlpha
        }

        fun xtr_setGlobalAlpha(value: Any?) {
            (value as? Double)?.let {
                currentState.globalAlpha = it
            }
        }

        fun xtr_fillStyle(): XTRColor? {
            return currentState.fillStyle
        }

        fun xtr_setFillStyle(value: Any?) {
            currentState.fillStyle = XTRUtils.toColor(value)
        }

        fun xtr_strokeStyle(): XTRColor? {
            return currentState.strokeStyle
        }

        fun xtr_setStrokeStyle(value: Any?) {
            currentState.strokeStyle = XTRUtils.toColor(value)
        }

        fun xtr_lineCap(): String? {
            return currentState.lineCap
        }

        fun xtr_setLineCap(value: Any?) {
            currentState.lineCap = value as? String
        }

        fun xtr_lineJoin(): String? {
            return currentState.lineJoin
        }

        fun xtr_setLineJoin(value: Any?) {
            currentState.lineJoin = value as? String
        }

        fun xtr_lineWidth(): Double {
            return currentState.lineWidth
        }

        fun xtr_setLineWidth(value: Any?) {
            (value as? Double)?.let {
                currentState.lineWidth = it
            }
        }

        fun xtr_miterLimit(): Double {
            return currentState.miterLimit
        }

        fun xtr_setMiterLimit(value: Any?) {
            (value as? Double)?.let {
                currentState.miterLimit = it
            }
        }

        fun xtr_rect(value: Any?) {
            XTRUtils.toRect(value)?.let {
                currentPath.reset()
                currentPath.addRect(
                        RectF(
                                it.x.toFloat() * scale,
                                it.y.toFloat() * scale,
                                (it.x + it.width).toFloat() * scale,
                                (it.y + it.height).toFloat() * scale
                        ), Path.Direction.CCW)
            }
        }

        fun xtr_fillRect(value: Any?) {
            xtr_rect(value)
            xtr_fill()
        }

        fun xtr_strokeRect(value: Any?) {
            xtr_rect(value)
            xtr_stroke()
        }

        fun xtr_clearRect(value: Any?) {
            xtr_rect(value)
            xtr_fill(true)
        }

        fun xtr_fill(clear: Boolean = false) {
            currentPaint.reset()
            if (clear) {
                currentPaint.xfermode = PorterDuffXfermode(PorterDuff.Mode.CLEAR)
            }
            else {
                currentPaint.color = (currentState.fillStyle ?: XTRColor(0.0, 0.0, 0.0, 1.0)).intColor()
                currentPaint.alpha = (currentState.globalAlpha * 255.0).toInt()
            }
            if (!currentState.currentTransform.isIdentity) {
                drawingPath.reset()
                drawingPath.addPath(currentPath)
                drawingPath.transform(currentState.currentTransform)
                currentCanvas?.drawPath(drawingPath, currentPaint)
                return
            }
            currentCanvas?.drawPath(currentPath, currentPaint)
        }

        fun xtr_stroke() {
            currentPaint.reset()
            currentPaint.color = (currentState.strokeStyle ?: XTRColor(0.0, 0.0, 0.0, 1.0)).intColor()
            currentPaint.alpha = (currentState.globalAlpha * 255.0).toInt()
            currentPaint.style = Paint.Style.STROKE
            when (currentState.lineCap) {
                "butt" -> currentPaint.strokeCap = Paint.Cap.BUTT
                "round" -> currentPaint.strokeCap = Paint.Cap.ROUND
                "square" -> currentPaint.strokeCap = Paint.Cap.SQUARE
            }
            when (currentState.lineJoin) {
                "bevel" -> currentPaint.strokeJoin = Paint.Join.BEVEL
                "miter" -> currentPaint.strokeJoin = Paint.Join.MITER
                "round" -> currentPaint.strokeJoin = Paint.Join.ROUND
            }
            currentPaint.strokeWidth = (currentState.lineWidth * scale).toFloat()
            currentPaint.strokeMiter = (currentState.miterLimit * scale).toFloat()
            if (!currentState.currentTransform.isIdentity) {
                drawingPath.reset()
                drawingPath.addPath(currentPath)
                drawingPath.transform(currentState.currentTransform)
                currentCanvas?.drawPath(drawingPath, currentPaint)
                return
            }
            currentCanvas?.drawPath(currentPath, currentPaint)
        }

        fun xtr_beginPath() {
            currentPath.reset()
        }

        fun xtr_moveTo(value: Any?) {
            XTRUtils.toPoint(value)?.let {
                currentPath.moveTo((it.x * scale).toFloat(), (it.y * scale).toFloat())
            }
        }

        fun xtr_closePath() {
            currentPath.close()
        }

        fun xtr_lineTo(value: Any?) {
            XTRUtils.toPoint(value)?.let {
                currentPath.lineTo((it.x * scale).toFloat(), (it.y * scale).toFloat())
            }
        }

        fun xtr_clip() {
            if (!currentState.currentTransform.isIdentity) {
                drawingPath.reset()
                drawingPath.addPath(currentPath)
                drawingPath.transform(currentState.currentTransform)
                currentCanvas?.clipPath(drawingPath)
                return
            }
            currentCanvas?.clipPath(currentPath)
        }

        fun xtr_quadraticCurveTo(argCpPoint: Any?, argXyPoint: Any?) {
            val cpPoint = XTRUtils.toPoint(argCpPoint) ?: return
            val xyPoint = XTRUtils.toPoint(argXyPoint) ?: return
            currentPath.quadTo((cpPoint.x * scale).toFloat(), (cpPoint.y * scale).toFloat(), (xyPoint.x * scale).toFloat(), (xyPoint.y * scale).toFloat())
        }

        fun xtr_bezierCurveTo(argCp1Point: Any?, argCp2Point: Any?, argXyPoint: Any?) {
            val cp1Point = XTRUtils.toPoint(argCp1Point) ?: return
            val cp2Point = XTRUtils.toPoint(argCp2Point) ?: return
            val xyPoint = XTRUtils.toPoint(argXyPoint) ?: return
            currentPath.cubicTo((cp1Point.x * scale).toFloat(), (cp1Point.y * scale).toFloat(), (cp2Point.x * scale).toFloat(), (cp2Point.y * scale).toFloat(), (xyPoint.x * scale).toFloat(), (xyPoint.y * scale).toFloat())
        }

        fun xtr_arc(argPoint: Any?, argR: Any?, argSAngle: Any?, argEAngle: Any?, argCounterclockwise: Any?) {
            val point = XTRUtils.toPoint(argPoint) ?: return
            val r = argR as? Double ?: return
            val sAngle = argSAngle as? Double ?: return
            val eAngle = argEAngle as? Double ?: return
            val counterclockwise = argCounterclockwise as? Boolean ?: return
            currentPath.addArc(
                    RectF(((point.x - r) * scale).toFloat(), ((point.y - r) * scale).toFloat(), ((point.x + r) * scale).toFloat(), ((point.y + r) * scale).toFloat()),
                    if (counterclockwise) ((eAngle / (2 * Math.PI)) * 360f).toFloat() else ((sAngle / (2 * Math.PI)) * 360f).toFloat(),
                    if (counterclockwise) ((sAngle / (2 * Math.PI)) * 360f).toFloat() - ((eAngle / (2 * Math.PI)) * 360f).toFloat() + 360f else ((eAngle / (2 * Math.PI)) * 360f).toFloat() - ((sAngle / (2 * Math.PI)) * 360f).toFloat()
            )
        }

        fun xtr_isPointInPath(value: Any?): Boolean {
            XTRUtils.toPoint(value)?.let {
                val r = Region(0, 0, Int.MAX_VALUE, Int.MAX_VALUE)
                if (!currentState.currentTransform.isIdentity) {
                    drawingPath.reset()
                    drawingPath.addPath(currentPath)
                    drawingPath.transform(currentState.currentTransform)
                    r.setPath(drawingPath, Region(0, 0, Int.MAX_VALUE, Int.MAX_VALUE))
                }
                else {
                    r.setPath(currentPath, Region(0, 0, Int.MAX_VALUE, Int.MAX_VALUE))
                }
                return r.contains((it.x * scale).toInt(), (it.y * scale).toInt())
            }
            return false
        }

        fun xtr_postScale(value: Any?) {
            XTRUtils.toPoint(value)?.let {
                currentState.currentTransform.postScale(it.x.toFloat(), it.y.toFloat())
            }
        }

        fun xtr_postRotate(value: Any?) {
            (value as? Double)?.let {
                currentState.currentTransform.postRotate(((it / (2 * Math.PI)) * 360f).toFloat())
            }
        }

        fun xtr_postTranslate(value: Any?) {
            XTRUtils.toPoint(value)?.let {
                currentState.currentTransform.postTranslate(it.x.toFloat(), it.y.toFloat())
            }
        }

        fun xtr_postTransform(value: Any?) {
            XTRUtils.toTransform(value)?.let {
                currentState.currentTransform.postConcat(it.toNativeMatrix())
            }
        }

        fun xtr_setCanvasTransform(value: Any?) {
            XTRUtils.toTransform(value)?.let {
                currentState.currentTransform = it.toNativeMatrix()
            }
        }

        override fun drawContent(canvas: Canvas?) {
            super.drawContent(canvas)
            canvas?.takeIf { it.width > 0 && it.height > 0 }?.let {
                val bitmap = Bitmap.createBitmap(it.width, it.height, Bitmap.Config.ARGB_8888)
                val offCanvas = Canvas(bitmap)
                currentCanvas = offCanvas
                xtrContext.invokeMethod(scriptObject, "onDraw", arrayOf())
                it.drawBitmap(bitmap, Matrix(), Paint())
                bitmap.recycle()
            }
        }

    }

}
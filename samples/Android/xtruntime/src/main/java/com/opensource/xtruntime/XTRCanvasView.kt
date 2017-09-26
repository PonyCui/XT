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

        private var actions: List<(canvas: Canvas) -> Unit> = listOf()
        private var currentState = State()
        private var fakeState = State()
        private var stateStack: List<State> = listOf()
        private var currentPath = Path()
        private var drawingPath = Path()
        private var currentPaint = Paint()
        private val scale = resources.displayMetrics.density

        fun xtr_globalAlpha(): Double {
            return fakeState.globalAlpha
        }

        fun xtr_setGlobalAlpha(value: Any?) {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    (value as? Double)?.let {
                        currentState.globalAlpha = it
                    }
                }
                this.actions = actions.toList()
            }
            (value as? Double)?.let {
                fakeState.globalAlpha = it
            }
        }

        fun xtr_fillStyle(): XTRColor? {
            return fakeState.fillStyle
        }

        fun xtr_setFillStyle(value: Any?) {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentState.fillStyle = XTRUtils.toColor(value)
                }
                this.actions = actions.toList()
            }
            fakeState.fillStyle = XTRUtils.toColor(value)
        }

        fun xtr_strokeStyle(): XTRColor? {
            return fakeState.strokeStyle
        }

        fun xtr_setStrokeStyle(value: Any?) {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentState.strokeStyle = XTRUtils.toColor(value)
                }
                this.actions = actions.toList()
            }
            fakeState.strokeStyle = XTRUtils.toColor(value)
        }

        fun xtr_lineCap(): String? {
            return fakeState.lineCap
        }

        fun xtr_setLineCap(value: Any?) {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentState.lineCap = value as? String
                }
                this.actions = actions.toList()
            }
            fakeState.lineCap = value as? String
        }

        fun xtr_lineJoin(): String? {
            return fakeState.lineJoin
        }

        fun xtr_setLineJoin(value: Any?) {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentState.lineJoin = value as? String
                }
                this.actions = actions.toList()
            }
            fakeState.lineJoin = value as? String
        }

        fun xtr_lineWidth(): Double {
            return fakeState.lineWidth
        }

        fun xtr_setLineWidth(value: Any?) {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    (value as? Double)?.let {
                        currentState.lineWidth = it
                    }
                }
                this.actions = actions.toList()
            }
            (value as? Double)?.let {
                fakeState.lineWidth = it
            }
        }

        fun xtr_miterLimit(): Double {
            return fakeState.miterLimit
        }

        fun xtr_setMiterLimit(value: Any?) {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    (value as? Double)?.let {
                        currentState.miterLimit = it
                    }
                }
                this.actions = actions.toList()
            }
            (value as? Double)?.let {
                fakeState.miterLimit = it
            }
        }

        fun xtr_rect(value: Any?) {
            XTRUtils.toRect(value)?.let {
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentPath.reset()
                        currentPath.addRect(
                                RectF(
                                        it.x.toFloat() * scale,
                                        it.y.toFloat() * scale,
                                        (it.x + it.width).toFloat() * scale,
                                        (it.y + it.height).toFloat() * scale
                                ), Path.Direction.CCW)
                    }
                    this.actions = actions.toList()
                }
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

        fun xtr_fill() {
            this.actions.toMutableList()?.let { actions ->
                actions.add { currentCanvas ->
                    currentPaint.reset()
                    currentPaint.color = (currentState.fillStyle ?: XTRColor(0.0, 0.0, 0.0, 1.0)).intColor()
                    currentPaint.alpha = (currentState.globalAlpha * 255.0).toInt()
                    if (!currentState.currentTransform.isIdentity) {
                        drawingPath.reset()
                        drawingPath.addPath(currentPath)
                        drawingPath.transform(currentState.currentTransform)
                        currentCanvas.drawPath(drawingPath, currentPaint)
                        return@add
                    }
                    currentCanvas.drawPath(currentPath, currentPaint)
                }
                this.actions = actions.toList()
            }
            invalidate()
        }

        fun xtr_stroke() {
            this.actions.toMutableList()?.let { actions ->
                actions.add { currentCanvas ->
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
                        currentCanvas.drawPath(drawingPath, currentPaint)
                        return@add
                    }
                    currentCanvas.drawPath(currentPath, currentPaint)
                }
                this.actions = actions.toList()
            }
            invalidate()
        }

        fun xtr_beginPath() {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentPath.reset()
                }
                this.actions = actions.toList()
            }
        }

        fun xtr_moveTo(value: Any?) {
            XTRUtils.toPoint(value)?.let {
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentPath.moveTo((it.x * scale).toFloat(), (it.y * scale).toFloat())
                    }
                    this.actions = actions.toList()
                }
            }
        }

        fun xtr_closePath() {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentPath.close()
                }
                this.actions = actions.toList()
            }
        }

        fun xtr_lineTo(value: Any?) {
            XTRUtils.toPoint(value)?.let {
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentPath.lineTo((it.x * scale).toFloat(), (it.y * scale).toFloat())
                    }
                    this.actions = actions.toList()
                }
            }
        }

        fun xtr_quadraticCurveTo(argCpPoint: Any?, argXyPoint: Any?) {
            val cpPoint = XTRUtils.toPoint(argCpPoint) ?: return
            val xyPoint = XTRUtils.toPoint(argXyPoint) ?: return
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentPath.quadTo((cpPoint.x * scale).toFloat(), (cpPoint.y * scale).toFloat(), (xyPoint.x * scale).toFloat(), (xyPoint.y * scale).toFloat())
                }
                this.actions = actions.toList()
            }
        }

        fun xtr_bezierCurveTo(argCp1Point: Any?, argCp2Point: Any?, argXyPoint: Any?) {
            val cp1Point = XTRUtils.toPoint(argCp1Point) ?: return
            val cp2Point = XTRUtils.toPoint(argCp2Point) ?: return
            val xyPoint = XTRUtils.toPoint(argXyPoint) ?: return
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentPath.cubicTo((cp1Point.x * scale).toFloat(), (cp1Point.y * scale).toFloat(), (cp2Point.x * scale).toFloat(), (cp2Point.y * scale).toFloat(), (xyPoint.x * scale).toFloat(), (xyPoint.y * scale).toFloat())
                }
                this.actions = actions.toList()
            }
        }

        fun xtr_arc(argPoint: Any?, argR: Any?, argSAngle: Any?, argEAngle: Any?, argCounterclockwise: Any?) {
            val point = XTRUtils.toPoint(argPoint) ?: return
            val r = argR as? Double ?: return
            val sAngle = argSAngle as? Double ?: return
            val eAngle = argEAngle as? Double ?: return
            val counterclockwise = argCounterclockwise as? Boolean ?: return
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentPath.addArc(
                            RectF(((point.x - r) * scale).toFloat(), ((point.y - r) * scale).toFloat(), ((point.x + r) * scale).toFloat(), ((point.y + r) * scale).toFloat()),
                            if (counterclockwise) ((eAngle / (2 * Math.PI)) * 360f).toFloat() else ((sAngle / (2 * Math.PI)) * 360f).toFloat(),
                            if (counterclockwise) ((sAngle / (2 * Math.PI)) * 360f).toFloat() - ((eAngle / (2 * Math.PI)) * 360f).toFloat() + 360f else ((eAngle / (2 * Math.PI)) * 360f).toFloat() - ((sAngle / (2 * Math.PI)) * 360f).toFloat()
                    )
                }
                this.actions = actions.toList()
            }
        }

        fun xtr_isPointInPath(value: Any?): Boolean {
            XTRUtils.toPoint(value)?.let {
                actions.forEach { it.invoke(Canvas()) }
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
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentState.currentTransform.postScale(it.x.toFloat(), it.y.toFloat())
                    }
                    this.actions = actions.toList()
                }
            }
        }

        fun xtr_postRotate(value: Any?) {
            (value as? Double)?.let {
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentState.currentTransform.postRotate(((it / (2 * Math.PI)) * 360f).toFloat())
                    }
                    this.actions = actions.toList()
                }

            }
        }

        fun xtr_postTranslate(value: Any?) {
            XTRUtils.toPoint(value)?.let {
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentState.currentTransform.postTranslate((it.x * scale).toFloat(), (it.y * scale).toFloat())
                    }
                    this.actions = actions.toList()
                }

            }
        }

        fun xtr_postTransform(value: Any?) {
            XTRUtils.toTransform(value)?.let {
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentState.currentTransform.postConcat(it.toNativeMatrix())
                    }
                    this.actions = actions.toList()
                }

            }
        }

        fun xtr_setCanvasTransform(value: Any?) {
            XTRUtils.toTransform(value)?.let {
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentState.currentTransform = it.toNativeMatrix()
                    }
                    this.actions = actions.toList()
                }
            }
        }

        fun xtr_save() {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    val mutable = stateStack.toMutableList()
                    mutable.add(currentState)
                    stateStack = mutable.toList()
                    currentState = currentState.copy()
                }
                this.actions = actions.toList()
            }
        }

        fun xtr_restore() {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    if (stateStack.isNotEmpty()) {
                        val mutable = stateStack.toMutableList()
                        val lastObject = mutable[mutable.size - 1]
                        mutable.removeAt(mutable.size - 1)
                        stateStack = mutable.toList()
                        currentState = lastObject
                    }
                }
                this.actions = actions.toList()
            }
        }

        fun xtr_clear() {
            actions = listOf()
            invalidate()
        }

        override fun drawContent(canvas: Canvas?) {
            super.drawContent(canvas)
            canvas?.takeIf { it.width > 0 && it.height > 0 }?.let { canvas ->
                stateStack = listOf()
                currentState = State()
                fakeState = State()
                currentPath.reset()
                drawingPath.reset()
                currentPaint.reset()
                actions.forEach { it.invoke(canvas) }
            }
        }

    }

}
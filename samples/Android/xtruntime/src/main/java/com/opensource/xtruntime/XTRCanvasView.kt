package com.opensource.xtruntime

import android.graphics.*
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/9/22.
 */
class XTRCanvasView: XTRComponent() {

    override val name: String = "XTRCanvasView"

    override fun v8Object(): V8Object? {
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "createScriptObject", "createScriptObject", arrayOf(V8Object::class.java, V8Object::class.java))
        return v8Object
    }

    fun createScriptObject(rect: V8Object, scriptObject: V8Object): V8Object {
        val view = InnerObject(scriptObject.twin(), xtrContext)
        XTRUtils.toRect(rect)?.let {
            view.frame = it
        }
        return view.requestV8Object(xtrContext.v8Runtime)
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

    class InnerObject(scriptObject: V8Object, xtrContext: XTRContext) : XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        private var actions: List<(canvas: Canvas) -> Unit> = listOf()
        private var currentState = State()
        private var fakeState = State()
        private var stateStack: List<State> = listOf()
        private var currentPath = Path()
        private var drawingPath = Path()
        private var currentPaint = Paint()
        private val scale = resources.displayMetrics.density


        override fun requestV8Object(runtime: V8): V8Object {
            val v8Object = super<XTRView.InnerObject>.requestV8Object(runtime)
            v8Object.registerJavaMethod(this, "xtr_globalAlpha", "xtr_globalAlpha", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setGlobalAlpha", "xtr_setGlobalAlpha", arrayOf(Double::class.java))
            v8Object.registerJavaMethod(this, "xtr_fillStyle", "xtr_fillStyle", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setFillStyle", "xtr_setFillStyle", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_strokeStyle", "xtr_strokeStyle", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setStrokeStyle", "xtr_setStrokeStyle", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_lineCap", "xtr_lineCap", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setLineCap", "xtr_setLineCap", arrayOf(String::class.java))
            v8Object.registerJavaMethod(this, "xtr_lineJoin", "xtr_lineJoin", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setLineJoin", "xtr_setLineJoin", arrayOf(String::class.java))
            v8Object.registerJavaMethod(this, "xtr_lineWidth", "xtr_lineWidth", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setLineWidth", "xtr_setLineWidth", arrayOf(Double::class.java))
            v8Object.registerJavaMethod(this, "xtr_miterLimit", "xtr_miterLimit", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setMiterLimit", "xtr_setMiterLimit", arrayOf(Double::class.java))
            v8Object.registerJavaMethod(this, "xtr_rect", "xtr_rect", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_fillRect", "xtr_fillRect", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_strokeRect", "xtr_strokeRect", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_fill", "xtr_fill", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_stroke", "xtr_stroke", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_beginPath", "xtr_beginPath", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_moveTo", "xtr_moveTo", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_closePath", "xtr_closePath", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_lineTo", "xtr_lineTo", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_quadraticCurveTo", "xtr_quadraticCurveTo", arrayOf(V8Object::class.java, V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_bezierCurveTo", "xtr_bezierCurveTo", arrayOf(V8Object::class.java, V8Object::class.java, V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_arc", "xtr_arc", arrayOf(V8Object::class.java, Double::class.java, Double::class.java, Double::class.java, Boolean::class.java))
            v8Object.registerJavaMethod(this, "xtr_isPointInPath", "xtr_isPointInPath", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_postScale", "xtr_postScale", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_postRotate", "xtr_postRotate", arrayOf(Double::class.java))
            v8Object.registerJavaMethod(this, "xtr_postTranslate", "xtr_postTranslate", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_postTransform", "xtr_postTransform", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_setCanvasTransform", "xtr_setCanvasTransform", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_save", "xtr_save", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_restore", "xtr_restore", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_clear", "xtr_clear", arrayOf())
            return v8Object
        }

        fun xtr_globalAlpha(): Double {
            return fakeState.globalAlpha
        }

        fun xtr_setGlobalAlpha(value: Double) {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentState.globalAlpha = value
                }
                this.actions = actions.toList()
            }
            fakeState.globalAlpha = value
        }

        fun xtr_fillStyle(): XTRColor? {
            return fakeState.fillStyle
        }

        fun xtr_setFillStyle(value: V8Object) {
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

        fun xtr_setStrokeStyle(value: V8Object) {
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

        fun xtr_setLineCap(value: String) {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentState.lineCap = value
                }
                this.actions = actions.toList()
            }
            fakeState.lineCap = value
        }

        fun xtr_lineJoin(): String? {
            return fakeState.lineJoin
        }

        fun xtr_setLineJoin(value: String) {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentState.lineJoin = value
                }
                this.actions = actions.toList()
            }
            fakeState.lineJoin = value
        }

        fun xtr_lineWidth(): Double {
            return fakeState.lineWidth
        }

        fun xtr_setLineWidth(value: Double) {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentState.lineWidth = value
                }
                this.actions = actions.toList()
            }
            fakeState.lineWidth = value
        }

        fun xtr_miterLimit(): Double {
            return fakeState.miterLimit
        }

        fun xtr_setMiterLimit(value: Double) {
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentState.miterLimit = value
                }
                this.actions = actions.toList()
            }
            fakeState.miterLimit = value
        }

        fun xtr_rect(value: V8Object) {
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

        fun xtr_fillRect(value: V8Object) {
            xtr_rect(value)
            xtr_fill()
        }

        fun xtr_strokeRect(value: V8Object) {
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

        fun xtr_moveTo(value: V8Object) {
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

        fun xtr_lineTo(value: V8Object) {
            XTRUtils.toPoint(value)?.let {
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentPath.lineTo((it.x * scale).toFloat(), (it.y * scale).toFloat())
                    }
                    this.actions = actions.toList()
                }
            }
        }

        fun xtr_quadraticCurveTo(argCpPoint: V8Object, argXyPoint: V8Object) {
            val cpPoint = XTRUtils.toPoint(argCpPoint) ?: return
            val xyPoint = XTRUtils.toPoint(argXyPoint) ?: return
            this.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    currentPath.quadTo((cpPoint.x * scale).toFloat(), (cpPoint.y * scale).toFloat(), (xyPoint.x * scale).toFloat(), (xyPoint.y * scale).toFloat())
                }
                this.actions = actions.toList()
            }
        }

        fun xtr_bezierCurveTo(argCp1Point: V8Object, argCp2Point: V8Object, argXyPoint: V8Object) {
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

        fun xtr_arc(argPoint: V8Object, r: Double, sAngle: Double, eAngle: Double, counterclockwise: Boolean) {
            val point = XTRUtils.toPoint(argPoint) ?: return
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

        fun xtr_isPointInPath(value: V8Object): Boolean {
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

        fun xtr_postScale(value: V8Object) {
            XTRUtils.toPoint(value)?.let {
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentState.currentTransform.postScale(it.x.toFloat(), it.y.toFloat())
                    }
                    this.actions = actions.toList()
                }
            }
        }

        fun xtr_postRotate(value: Double) {
            value.let {
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentState.currentTransform.postRotate(((it / (2 * Math.PI)) * 360f).toFloat())
                    }
                    this.actions = actions.toList()
                }
            }
        }

        fun xtr_postTranslate(value: V8Object) {
            XTRUtils.toPoint(value)?.let {
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentState.currentTransform.postTranslate((it.x * scale).toFloat(), (it.y * scale).toFloat())
                    }
                    this.actions = actions.toList()
                }

            }
        }

        fun xtr_postTransform(value: V8Object) {
            XTRUtils.toTransform(value)?.let {
                this.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        currentState.currentTransform.postConcat(it.toNativeMatrix())
                    }
                    this.actions = actions.toList()
                }

            }
        }

        fun xtr_setCanvasTransform(value: V8Object) {
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
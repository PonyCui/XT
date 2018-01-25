package com.opensource.xt.uikit

import android.graphics.*
import android.util.AttributeSet
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager

/**
 * Created by cuiminghui on 2017/9/22.
 */
class XTUICanvasView @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTUIComponentInstance {

    class State(var globalAlpha: Double = 1.0,
                var fillStyle: XTUIColor = XTUIColor(0.0, 0.0, 0.0, 0.0),
                var strokeStyle: XTUIColor = XTUIColor(0.0, 0.0, 0.0, 0.0),
                var lineCap: String = "",
                var lineJoin: String = "",
                var lineWidth: Double = 1.0,
                var miterLimit: Double = 0.0,
                var currentTransform: Matrix = Matrix()) {
        fun copy(): State {
            return State(globalAlpha, fillStyle, strokeStyle, lineCap, lineJoin, lineWidth, miterLimit, currentTransform)
        }
    }

    private var actions: List<(canvas: Canvas) -> Unit> = listOf()
    private var currentState = State()
    private var fakeState = State()
    private var stateStack: List<State> = listOf()
    private var currentPath = Path()
    private var drawingPath = Path()
    private var currentPaint = Paint()
    private val scale = resources.displayMetrics.density

    init {
        userInteractionEnabled = false
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

    class JSExports(val context: XTUIContext): XTUIComponentExport() {

        override val name: String = "_XTUICanvasView"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_globalAlpha", "xtr_globalAlpha", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setGlobalAlpha", "xtr_setGlobalAlpha", arrayOf(Double::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_fillStyle", "xtr_fillStyle", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setFillStyle", "xtr_setFillStyle", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_strokeStyle", "xtr_strokeStyle", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setStrokeStyle", "xtr_setStrokeStyle", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_lineCap", "xtr_lineCap", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setLineCap", "xtr_setLineCap", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_lineJoin", "xtr_lineJoin", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setLineJoin", "xtr_setLineJoin", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_lineWidth", "xtr_lineWidth", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setLineWidth", "xtr_setLineWidth", arrayOf(Double::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_miterLimit", "xtr_miterLimit", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setMiterLimit", "xtr_setMiterLimit", arrayOf(Double::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_rect", "xtr_rect", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_fillRect", "xtr_fillRect", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_strokeRect", "xtr_strokeRect", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_fill", "xtr_fill", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_stroke", "xtr_stroke", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_beginPath", "xtr_beginPath", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_moveTo", "xtr_moveTo", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_closePath", "xtr_closePath", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_lineTo", "xtr_lineTo", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_quadraticCurveTo", "xtr_quadraticCurveTo", arrayOf(V8Object::class.java, V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_bezierCurveTo", "xtr_bezierCurveTo", arrayOf(V8Object::class.java, V8Object::class.java, V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_arc", "xtr_arc", arrayOf(V8Object::class.java, Double::class.java, Double::class.java, Double::class.java, Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_isPointInPath", "xtr_isPointInPath", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_postScale", "xtr_postScale", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_postRotate", "xtr_postRotate", arrayOf(Double::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_postTranslate", "xtr_postTranslate", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_postTransform", "xtr_postTransform", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_setCanvasTransform", "xtr_setCanvasTransform", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_save", "xtr_save", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_restore", "xtr_restore", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_clear", "xtr_clear", arrayOf(String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTUICanvasView(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_globalAlpha(objectRef: String): Double {
            return (XTMemoryManager.find(objectRef) as? XTUICanvasView)?.fakeState?.globalAlpha ?: 0.0
        }

        fun xtr_setGlobalAlpha(value: Double, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    view.currentState.globalAlpha = value
                }
                view.actions = actions.toList()
            }
            view.fakeState.globalAlpha = value
        }

        fun xtr_fillStyle(objectRef: String): V8Value {
            return (XTMemoryManager.find(objectRef) as? XTUICanvasView)?.let {
                return@let XTUIUtils.fromColor(it.fakeState.fillStyle, context.runtime)
            } ?: V8.getUndefined()
        }

        fun xtr_setFillStyle(value: V8Object, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            val fillStyle = XTUIUtils.toColor(value) ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    view.currentState.fillStyle = fillStyle
                }
                view.actions = actions.toList()
            }
            view.fakeState.fillStyle = fillStyle
        }

        fun xtr_strokeStyle(objectRef: String): V8Value {
            return (XTMemoryManager.find(objectRef) as? XTUICanvasView)?.let {
                return@let XTUIUtils.fromColor(it.fakeState.strokeStyle, context.runtime)
            } ?: V8.getUndefined()
        }

        fun xtr_setStrokeStyle(value: V8Object, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            val strokeStyle = XTUIUtils.toColor(value) ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    view.currentState.strokeStyle = strokeStyle
                }
                view.actions = actions.toList()
            }
            view.fakeState.strokeStyle = strokeStyle
        }

        fun xtr_lineCap(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTUICanvasView)?.fakeState?.lineCap ?: ""
        }

        fun xtr_setLineCap(value: String, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    view.currentState.lineCap = value
                }
                view.actions = actions.toList()
            }
            view.fakeState.lineCap = value
        }

        fun xtr_lineJoin(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTUICanvasView)?.fakeState?.lineJoin ?: ""
        }

        fun xtr_setLineJoin(value: String, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    view.currentState.lineJoin = value
                }
                view.actions = actions.toList()
            }
            view.fakeState.lineJoin = value
        }

        fun xtr_lineWidth(objectRef: String): Double {
            return (XTMemoryManager.find(objectRef) as? XTUICanvasView)?.fakeState?.lineWidth ?: 0.0
        }

        fun xtr_setLineWidth(value: Double, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    view.currentState.lineWidth = value
                }
                view.actions = actions.toList()
            }
            view.fakeState.lineWidth = value
        }

        fun xtr_miterLimit(objectRef: String): Double {
            return (XTMemoryManager.find(objectRef) as? XTUICanvasView)?.fakeState?.miterLimit ?: 0.0
        }

        fun xtr_setMiterLimit(value: Double, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    view.currentState.miterLimit = value
                }
                view.actions = actions.toList()
            }
            view.fakeState.miterLimit = value
        }

        fun xtr_rect(value: V8Object, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            XTUIUtils.toRect(value)?.let {
                view.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        view.currentPath.reset()
                        view.currentPath.addRect(
                                RectF(
                                        it.x.toFloat() * view.scale,
                                        it.y.toFloat() * view.scale,
                                        (it.x + it.width).toFloat() * view.scale,
                                        (it.y + it.height).toFloat() * view.scale
                                ), Path.Direction.CCW)
                    }
                    view.actions = actions.toList()
                }
            }
        }

        fun xtr_fillRect(value: V8Object, objectRef: String) {
            xtr_rect(value, objectRef)
            xtr_fill(objectRef)
        }

        fun xtr_strokeRect(value: V8Object, objectRef: String) {
            xtr_rect(value, objectRef)
            xtr_stroke(objectRef)
        }

        fun xtr_fill(objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { currentCanvas ->
                    view.currentPaint.reset()
                    view.currentPaint.color = view.currentState.fillStyle.intColor()
                    view.currentPaint.alpha = (view.currentState.globalAlpha * 255.0).toInt()
                    if (!view.currentState.currentTransform.isIdentity) {
                        view.drawingPath.reset()
                        view.drawingPath.addPath(view.currentPath)
                        view.drawingPath.transform(view.currentState.currentTransform)
                        currentCanvas.drawPath(view.drawingPath, view.currentPaint)
                        return@add
                    }
                    currentCanvas.drawPath(view.currentPath, view.currentPaint)
                }
                view.actions = actions.toList()
            }
            view.invalidate()
        }

        fun xtr_stroke(objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { currentCanvas ->
                    view.currentPaint.reset()
                    view.currentPaint.color = view.currentState.strokeStyle.intColor()
                    view.currentPaint.alpha = (view.currentState.globalAlpha * 255.0).toInt()
                    view.currentPaint.style = Paint.Style.STROKE
                    when (view.currentState.lineCap) {
                        "butt" -> view.currentPaint.strokeCap = Paint.Cap.BUTT
                        "round" -> view.currentPaint.strokeCap = Paint.Cap.ROUND
                        "square" -> view.currentPaint.strokeCap = Paint.Cap.SQUARE
                    }
                    when (view.currentState.lineJoin) {
                        "bevel" -> view.currentPaint.strokeJoin = Paint.Join.BEVEL
                        "miter" -> view.currentPaint.strokeJoin = Paint.Join.MITER
                        "round" -> view.currentPaint.strokeJoin = Paint.Join.ROUND
                    }
                    view.currentPaint.strokeWidth = (view.currentState.lineWidth * view.scale).toFloat()
                    view.currentPaint.strokeMiter = (view.currentState.miterLimit * view.scale).toFloat()
                    if (!view.currentState.currentTransform.isIdentity) {
                        view.drawingPath.reset()
                        view.drawingPath.addPath(view.currentPath)
                        view.drawingPath.transform(view.currentState.currentTransform)
                        currentCanvas.drawPath(view.drawingPath, view.currentPaint)
                        return@add
                    }
                    currentCanvas.drawPath(view.currentPath, view.currentPaint)
                }
                view.actions = actions.toList()
            }
            view.invalidate()
        }

        fun xtr_beginPath(objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    view.currentPath.reset()
                }
                view.actions = actions.toList()
            }
        }

        fun xtr_moveTo(value: V8Object, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            XTUIUtils.toPoint(value)?.let {
                view.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        view.currentPath.moveTo((it.x * view.scale).toFloat(), (it.y * view.scale).toFloat())
                    }
                    view.actions = actions.toList()
                }
            }
        }

        fun xtr_closePath(objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    view.currentPath.close()
                }
                view.actions = actions.toList()
            }
        }

        fun xtr_lineTo(value: V8Object, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            XTUIUtils.toPoint(value)?.let {
                view.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        view.currentPath.lineTo((it.x * view.scale).toFloat(), (it.y * view.scale).toFloat())
                    }
                    view.actions = actions.toList()
                }
            }
        }

        fun xtr_quadraticCurveTo(argCpPoint: V8Object, argXyPoint: V8Object, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            val cpPoint = XTUIUtils.toPoint(argCpPoint) ?: return
            val xyPoint = XTUIUtils.toPoint(argXyPoint) ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    view.currentPath.quadTo((cpPoint.x * view.scale).toFloat(), (cpPoint.y * view.scale).toFloat(), (xyPoint.x * view.scale).toFloat(), (xyPoint.y * view.scale).toFloat())
                }
                view.actions = actions.toList()
            }
        }

        fun xtr_bezierCurveTo(argCp1Point: V8Object, argCp2Point: V8Object, argXyPoint: V8Object, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            val cp1Point = XTUIUtils.toPoint(argCp1Point) ?: return
            val cp2Point = XTUIUtils.toPoint(argCp2Point) ?: return
            val xyPoint = XTUIUtils.toPoint(argXyPoint) ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    view.currentPath.cubicTo((cp1Point.x * view.scale).toFloat(), (cp1Point.y * view.scale).toFloat(), (cp2Point.x * view.scale).toFloat(), (cp2Point.y * view.scale).toFloat(), (xyPoint.x * view.scale).toFloat(), (xyPoint.y * view.scale).toFloat())
                }
                view.actions = actions.toList()
            }
        }

        fun xtr_arc(argPoint: V8Object, r: Double, sAngle: Double, eAngle: Double, counterclockwise: Boolean, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            val point = XTUIUtils.toPoint(argPoint) ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    view.currentPath.addArc(
                            RectF(((point.x - r) * view.scale).toFloat(), ((point.y - r) * view.scale).toFloat(), ((point.x + r) * view.scale).toFloat(), ((point.y + r) * view.scale).toFloat()),
                            if (counterclockwise) ((eAngle / (2 * Math.PI)) * 360f).toFloat() else ((sAngle / (2 * Math.PI)) * 360f).toFloat(),
                            if (counterclockwise) ((sAngle / (2 * Math.PI)) * 360f).toFloat() - ((eAngle / (2 * Math.PI)) * 360f).toFloat() + 360f else ((eAngle / (2 * Math.PI)) * 360f).toFloat() - ((sAngle / (2 * Math.PI)) * 360f).toFloat()
                    )
                }
                view.actions = actions.toList()
            }
        }

        fun xtr_isPointInPath(value: V8Object, objectRef: String): Boolean {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return false
            XTUIUtils.toPoint(value)?.let {
                view.actions.forEach { it.invoke(Canvas()) }
                val r = Region(0, 0, Int.MAX_VALUE, Int.MAX_VALUE)
                if (!view.currentState.currentTransform.isIdentity) {
                    view.drawingPath.reset()
                    view.drawingPath.addPath(view.currentPath)
                    view.drawingPath.transform(view.currentState.currentTransform)
                    r.setPath(view.drawingPath, Region(0, 0, Int.MAX_VALUE, Int.MAX_VALUE))
                }
                else {
                    r.setPath(view.currentPath, Region(0, 0, Int.MAX_VALUE, Int.MAX_VALUE))
                }
                return r.contains((it.x * view.scale).toInt(), (it.y * view.scale).toInt())
            }
            return false
        }

        fun xtr_postScale(value: V8Object, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            XTUIUtils.toPoint(value)?.let {
                view.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        view.currentState.currentTransform.postScale(it.x.toFloat(), it.y.toFloat())
                    }
                    view.actions = actions.toList()
                }
            }
        }

        fun xtr_postRotate(value: Double, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            value.let {
                view.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        view.currentState.currentTransform.postRotate(((it / (2 * Math.PI)) * 360f).toFloat())
                    }
                    view.actions = actions.toList()
                }
            }
        }

        fun xtr_postTranslate(value: V8Object, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            XTUIUtils.toPoint(value)?.let {
                view.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        view.currentState.currentTransform.postTranslate((it.x * view.scale).toFloat(), (it.y * view.scale).toFloat())
                    }
                    view.actions = actions.toList()
                }

            }
        }

        fun xtr_postTransform(value: V8Object, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            XTUIUtils.toTransform(value)?.let {
                view.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        view.currentState.currentTransform.postConcat(it.toNativeMatrix())
                    }
                    view.actions = actions.toList()
                }

            }
        }

        fun xtr_setCanvasTransform(value: V8Object, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            XTUIUtils.toTransform(value)?.let {
                view.actions.toMutableList()?.let { actions ->
                    actions.add { _ ->
                        view.currentState.currentTransform = it.toNativeMatrix()
                    }
                    view.actions = actions.toList()
                }
            }
        }

        fun xtr_save(objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    val mutable = view.stateStack.toMutableList()
                    mutable.add(view.currentState)
                    view.stateStack = mutable.toList()
                    view.currentState = view.currentState.copy()
                }
                view.actions = actions.toList()
            }
        }

        fun xtr_restore(objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            view.actions.toMutableList()?.let { actions ->
                actions.add { _ ->
                    if (view.stateStack.isNotEmpty()) {
                        val mutable = view.stateStack.toMutableList()
                        val lastObject = mutable[mutable.size - 1]
                        mutable.removeAt(mutable.size - 1)
                        view.stateStack = mutable.toList()
                        view.currentState = lastObject
                    }
                }
                view.actions = actions.toList()
            }
        }

        fun xtr_clear(objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? XTUICanvasView ?: return
            view.actions = listOf()
            view.invalidate()
        }

    }

}
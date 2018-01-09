package com.opensource.xtruntime

import android.animation.Animator
import android.animation.ValueAnimator
import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.view.ViewParent
import android.widget.FrameLayout
import com.eclipsesource.v8.*
import com.facebook.rebound.SimpleSpringListener
import com.facebook.rebound.Spring
import com.facebook.rebound.SpringConfig
import com.facebook.rebound.SpringSystem
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager
import java.util.*
import kotlin.concurrent.timerTask
import kotlin.math.abs

/**
 * Created by cuiminghui on 2017/9/1.
 */
open class XTRView @JvmOverloads constructor(
        context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr), XTRComponentInstance {

    override var objectUUID: String? = null

    fun scriptObject(): V8Object? {
        return XTRView.context.evaluateScript("objectRefs['$objectUUID']") as? V8Object
    }

    init {
        clipChildren = false
        setWillNotDraw(false)
    }

    override fun setClipChildren(clipChildren: Boolean) {
        super.setClipChildren(clipChildren)
        invalidate()
    }

    override fun invalidate() {
        super.invalidate()
        if (android.os.Build.VERSION.SDK_INT < 18) {
            (parent as? View)?.let { it.invalidate() }
        }
    }

    var clipsToBounds = false
        set(value) {
            field = value
            invalidate()
        }

    var frame: XTRRect? = null
        set(value) {
            field = value
            requestLayout()
        }

    var bounds: XTRRect = XTRRect(0.0, 0.0, frame?.width ?: (this.width / resources.displayMetrics.density).toDouble(), frame?.height ?: (this.height / resources.displayMetrics.density).toDouble())
        set(value) {
            field = value
            resetPath()
            invalidate()
        }

    override fun requestLayout() {
        if (isLayoutRequested) {
            this.post {
                super.requestLayout()
            }
            return
        }
        super.requestLayout()
    }

    var transformMatrix: XTRMatrix = XTRMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
        private set(value) {
            field = value
            invalidate()
        }

    override fun getMatrix(): Matrix {
        return transformMatrix.toNativeMatrix(resources.displayMetrics.density)
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec)
        frame?.let {
            val scale = resources.displayMetrics.density
            x = (it.x * scale).toFloat()
            y = (it.y * scale).toFloat()
            setMeasuredDimension((it.width * scale).toInt(), (it.height * scale).toInt())
        }
    }

    var opaque = false

    override fun isOpaque(): Boolean {
        super.isOpaque()
        return opaque
    }

    // Mark: View Rendering

    var backgroundColor: XTRColor = XTRColor(0.0, 0.0, 0.0, 0.0)
        set(value) {
            field = value
            setBackgroundColor(value.intColor())
            invalidate()
        }

    var tintColor: XTRColor? = null
        get() {
            return if (field != null) {
                field
            } else {
                (this.parent as? XTRView)?.tintColor ?: XTRColor(0.0, 122.0 / 255.0, 1.0, 1.0)
            }
        }
        set(value) {
            field = value
            tintColorDidChange()
        }

    open fun tintColorDidChange() {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "tintColorDidChange")
            it.release()
            (0 until childCount).forEach {
                (getChildAt(it) as? XTRView)?.let {
                    it.tintColorDidChange()
                }
            }
        }
    }

    var cornerRadius: Double = 0.0
        set(value) {
            field = Math.max(0.0, value)
            resetPath()
            invalidate()
        }

    var borderWidth: Double = 0.0
        set(value) {
            field = value
            invalidate()
        }

    var borderColor: XTRColor = XTRColor(0.0, 0.0, 0.0, 0.0)
        set(value) {
            field = value
            invalidate()
        }

    private val sharedPath = Path()
    private val sharedPaint = Paint()

    private fun resetPath() {
        sharedPath.reset()
        val scale = resources.displayMetrics.density
        sharedPath.addRoundRect(RectF(0.0f, 0.0f, (bounds.width * scale).toFloat(), (bounds.height * scale).toFloat()), (cornerRadius * scale).toFloat(), (cornerRadius * scale).toFloat(), Path.Direction.CCW)
    }


    override fun draw(canvas: Canvas?) {
        canvas?.save()
        if (!transformMatrix.isIdentity()) {
            val scale = resources.displayMetrics.density
            val unMatrix = transformMatrix.unMatrix()
            val matrix = Matrix()
            matrix.postTranslate(-(this.width / 2.0).toFloat(), -(this.height / 2.0).toFloat())
            matrix.postRotate(unMatrix.degree.toFloat())
            matrix.postScale(unMatrix.scale.x.toFloat(), unMatrix.scale.y.toFloat())
            matrix.postTranslate((unMatrix.translate.x * scale).toFloat(), (unMatrix.translate.y * scale).toFloat())
            matrix.postTranslate((this.width / 2.0).toFloat(), (this.height / 2.0).toFloat())
            canvas?.concat(matrix)
        }
        if (cornerRadius > 0 && clipsToBounds) {
            canvas?.save()
            canvas?.clipPath(sharedPath)
            super.draw(canvas)
            drawContent(canvas)
            canvas?.restore()
        }
        else {
            super.draw(canvas)
            drawContent(canvas)
        }
        if (borderWidth > 0 && borderColor != null) {
            sharedPaint.reset()
            sharedPaint.isAntiAlias = true
            sharedPaint.style = Paint.Style.STROKE
            sharedPaint.strokeWidth = (borderWidth * resources.displayMetrics.density).toFloat()
            sharedPaint.color = borderColor?.intColor() ?: Color.TRANSPARENT
            canvas?.drawPath(sharedPath, sharedPaint)
        }
        canvas?.restore()
    }

    protected open fun drawContent(canvas: Canvas?) {

    }

    var userInteractionEnabled = false

    var mTag: Int = 0

    fun didAddSubview(subview: View) {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "didAddSubview", listOf((subview as? XTRComponentInstance)?.objectUUID ?: V8.getUndefined()))
            it.release()
        }
    }

    fun willRemoveSubView(subview: View) {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "willRemoveSubview", listOf((subview as? XTRComponentInstance)?.objectUUID ?: V8.getUndefined()))
            it.release()
        }
    }

    fun willMoveToSuperview(newSuperview: View?) {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "willMoveToSuperview", listOf((newSuperview as? XTRComponentInstance)?.objectUUID ?: V8.getUndefined()))
            it.release()
        }
    }

    fun didMoveToSuperview() {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "didMoveToSuperview")
            it.release()
        }
    }

    fun willMoveToWindow(newWindow: XTRWindow?) {
//        newWindow?.let {
//            xtrContext.invokeMethod(scriptObject, "willMoveToWindow", listOf(it))
//            return
//        }
//        xtrContext.invokeMethod(scriptObject, "willMoveToWindow", null)
    }

    fun didMoveToWindow() {
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "didMoveToWindow")
            it.release()
        }
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        if (changed) {
            this.bounds = XTRRect(0.0, 0.0, frame?.width ?: (this.width / resources.displayMetrics.density).toDouble(), frame?.height ?: (this.height / resources.displayMetrics.density).toDouble())
            layoutSubviews()
        }
    }

    open fun layoutSubviews() {
//        viewDelegate?.viewWillLayoutSubviews()
        scriptObject()?.let {
            XTRContext.invokeMethod(it, "layoutSubviews")
            it.release()
        }
//        viewDelegate?.viewDidLayoutSubviews()
    }

    open fun intrinsicContentSize(width: Double): XTRSize? {
        return null
    }

    override fun onTouchEvent(event: MotionEvent?): Boolean {
        return false
    }

    companion object: XTRComponentExport() {

        override val name: String = "XTRView"
        lateinit var context: XTRContext

        override fun exports(context: XTRContext): V8Object {
            this.context = context
            val exports = V8Object(context.v8Runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_clipsToBounds", "xtr_clipsToBounds", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setClipsToBounds", "xtr_setClipsToBounds", arrayOf(Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_alpha", "xtr_alpha", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setAlpha", "xtr_setAlpha", arrayOf(Double::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_frame", "xtr_frame", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setFrame", "xtr_setFrame", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_bounds", "xtr_bounds", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_transform", "xtr_transform", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setTransform", "xtr_setTransform", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_backgroundColor", "xtr_backgroundColor", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setBackgroundColor", "xtr_setBackgroundColor", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_hidden", "xtr_hidden", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setHidden", "xtr_setHidden", arrayOf(Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_opaque", "xtr_opaque", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setOpaque", "xtr_setOpaque", arrayOf(Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_tintColor", "xtr_tintColor", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setTintColor", "xtr_setTintColor", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_cornerRadius", "xtr_cornerRadius", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setCornerRadius", "xtr_setCornerRadius", arrayOf(Double::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_borderWidth", "xtr_borderWidth", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setBorderWidth", "xtr_setBorderWidth", arrayOf(Double::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_borderColor", "xtr_borderColor", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setBorderColor", "xtr_setBorderColor", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_superview", "xtr_superview", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_subviews", "xtr_subviews", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_window", "xtr_window", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_removeFromSuperview", "xtr_removeFromSuperview", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_insertSubviewAtIndex", "xtr_insertSubviewAtIndex", arrayOf(String::class.java, Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_exchangeSubviewAtIndex", "xtr_exchangeSubviewAtIndex", arrayOf(Int::class.java, Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_addSubview", "xtr_addSubview", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_insertSubviewBelow", "xtr_insertSubviewBelow", arrayOf(String::class.java, String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_insertSubviewAbove", "xtr_insertSubviewAbove", arrayOf(String::class.java, String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_bringSubviewToFront", "xtr_bringSubviewToFront", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_sendSubviewToBack", "xtr_sendSubviewToBack", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_isDescendantOfView", "xtr_isDescendantOfView", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_viewWithTag", "xtr_viewWithTag", arrayOf(Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_setNeedsLayout", "xtr_setNeedsLayout", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_layoutIfNeeded", "xtr_layoutIfNeeded", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_intrinsicContentSize", "xtr_intrinsicContentSize", arrayOf(Double::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_userInteractionEnabled", "xtr_userInteractionEnabled", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setUserInteractionEnabled", "xtr_setUserInteractionEnabled", arrayOf(Boolean::class.java, String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTRView(this.context.appContext)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        // Mark: View Geometry

        fun xtr_clipsToBounds(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? XTRView)?.let { it.clipsToBounds } ?: false
        }

        fun xtr_setClipsToBounds(value: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                it.clipsToBounds = value
                if (android.os.Build.VERSION.SDK_INT < 18) {
                    it.setLayerType(if (value) View.LAYER_TYPE_SOFTWARE else View.LAYER_TYPE_HARDWARE, null)
                }
            }
        }

        fun xtr_alpha(objectRef: String): Double {
            return (XTMemoryManager.find(objectRef) as? View)?.let { it.alpha.toDouble() } ?: 0.0
        }

        fun xtr_setAlpha(alpha: Double, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? View)?.let {
//                if (animationEnabled) {
//                    addAnimation(AnimationProp("$objectUUID.alpha", this.alpha as Any, alpha.toFloat() as Any, {
//                        this.alpha = it as Float
//                    }))
//                    return
//                }
                it.alpha = alpha.toFloat()
            }
        }

        fun xtr_frame(objectRef: String): V8Value {
            return (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                return@let XTRUtils.fromRect(it.frame ?: XTRRect(0.0, 0.0, (it.width / it.resources.displayMetrics.density).toDouble(), (it.height / it.resources.displayMetrics.density).toDouble()), context.v8Runtime)
            } ?: XTRUtils.fromRect(XTRRect(0.0,0.0,0.0,0.0), context.v8Runtime)
        }

        fun xtr_setFrame(value: V8Object, objectRef: String) {
            XTRUtils.toRect(value)?.let { frame ->
//                if (animationEnabled) {
//                    addAnimation(AnimationProp("$objectUUID.frame.x", (this.frame?.x ?: 0.0).toFloat() as Any, it.x.toFloat() as Any, { x ->
//                        this.frame?.let {
//                            this.frame = XTRRect((x as Float).toDouble(), it.y, it.width, it.height)
//                        }
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.frame.y", (this.frame?.y ?: 0.0).toFloat() as Any, it.y.toFloat() as Any, { y ->
//                        this.frame?.let {
//                            this.frame = XTRRect(it.x, (y as Float).toDouble(), it.width, it.height)
//                        }
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.frame.width", (this.frame?.width ?: 0.0).toFloat() as Any, it.width.toFloat() as Any, { width ->
//                        this.frame?.let {
//                            this.frame = XTRRect(it.x, it.y, (width as Float).toDouble(), it.height)
//                        }
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.frame.height", (this.frame?.height ?: 0.0).toFloat() as Any, it.height.toFloat() as Any, { height ->
//                        this.frame?.let {
//                            this.frame = XTRRect(it.x, it.y, it.width, (height as Float).toDouble())
//                        }
//                    }))
//                    return@let
//                }
                (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                    it.frame = frame
                }
            }
        }

//        fun xtr_setFrame(value: XTRRect) {
//            value?.let {
//                if (animationEnabled) {
//                    addAnimation(AnimationProp("$objectUUID.frame.x", (this.frame?.x ?: 0.0).toFloat() as Any, it.x.toFloat() as Any, { x ->
//                        this.frame?.let {
//                            this.frame = XTRRect((x as Float).toDouble(), it.y, it.width, it.height)
//                        }
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.frame.y", (this.frame?.y ?: 0.0).toFloat() as Any, it.y.toFloat() as Any, { y ->
//                        this.frame?.let {
//                            this.frame = XTRRect(it.x, (y as Float).toDouble(), it.width, it.height)
//                        }
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.frame.width", (this.frame?.width ?: 0.0).toFloat() as Any, it.width.toFloat() as Any, { width ->
//                        this.frame?.let {
//                            this.frame = XTRRect(it.x, it.y, (width as Float).toDouble(), it.height)
//                        }
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.frame.height", (this.frame?.height ?: 0.0).toFloat() as Any, it.height.toFloat() as Any, { height ->
//                        this.frame?.let {
//                            this.frame = XTRRect(it.x, it.y, it.width, (height as Float).toDouble())
//                        }
//                    }))
//                    return@let
//                }
//                frame = it
//            }
//        }

        fun xtr_bounds(objectRef: String): V8Value {
            return (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                return@let XTRUtils.fromRect(it.bounds, context.v8Runtime)
            } ?: XTRUtils.fromRect(XTRRect(0.0,0.0,0.0,0.0), context.v8Runtime)
        }

        fun xtr_transform(objectRef: String): V8Value {
            return (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                return@let XTRUtils.fromTransform(it.transformMatrix, context.v8Runtime)
            } ?: XTRUtils.fromTransform(XTRMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0), context.v8Runtime)
        }

        fun xtr_setTransform(value: V8Object, objectRef: String) {
            XTRUtils.toTransform(value)?.let { transformMatrix ->
//                if (animationEnabled) {
//                    val oldValue = transformMatrix.unMatrix()
//                    val newValue = it.unMatrix()
//                    addAnimation(AnimationProp("$objectUUID.transform.scale.x", oldValue.scale.x.toFloat() as Any, newValue.scale.x.toFloat() as Any, { scaleX ->
//                        transformMatrix = transformMatrix.setScale((scaleX as Float).toDouble(), null)
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.transform.scale.y", oldValue.scale.y.toFloat() as Any, newValue.scale.y.toFloat() as Any, { scaleY ->
//                        transformMatrix = transformMatrix.setScale(null, (scaleY as Float).toDouble())
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.transform.rotate", oldValue.degree.toFloat() as Any, newValue.degree.toFloat() as Any, { value ->
//                        transformMatrix = transformMatrix.setRotate((value as Float).toDouble())
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.transform.translate.x", oldValue.translate.x.toFloat() as Any, newValue.translate.x.toFloat() as Any, { translateX ->
//                        transformMatrix = transformMatrix.setTranslate((translateX as Float).toDouble(), null)
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.transform.translate.y", oldValue.translate.y.toFloat() as Any, newValue.translate.y.toFloat() as Any, { translateY ->
//                        transformMatrix = transformMatrix.setTranslate(null, (translateY as Float).toDouble())
//                    }))
//                    return@let
//                }
                (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                    it.transformMatrix = transformMatrix
                }
            }
        }

        fun xtr_backgroundColor(objectRef: String): V8Value {
            return (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                return@let XTRUtils.fromColor(it.backgroundColor, context.v8Runtime)
            } ?: XTRUtils.fromColor(XTRColor(0.0, 0.0, 0.0, 0.0), context.v8Runtime)
        }

        fun xtr_setBackgroundColor(value: V8Object, objectRef: String) {
            XTRUtils.toColor(value)?.let { color ->
//                if (animationEnabled) {
//                    addAnimation(AnimationProp("$objectUUID.backgroundColor.r", (this.backgroundColor?.r ?: 0.0).toFloat() as Any, it.r.toFloat() as Any, { r ->
//                        this.backgroundColor?.let {
//                            this.backgroundColor = XTRColor((r as Float).toDouble(), it.g, it.b, it.a)
//                        }
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.backgroundColor.g", (this.backgroundColor?.g ?: 0.0).toFloat() as Any, it.g.toFloat() as Any, { g ->
//                        this.backgroundColor?.let {
//                            this.backgroundColor = XTRColor(it.r, (g as Float).toDouble(), it.b, it.a)
//                        }
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.backgroundColor.b", (this.backgroundColor?.b ?: 0.0).toFloat() as Any, it.b.toFloat() as Any, { b ->
//                        this.backgroundColor?.let {
//                            this.backgroundColor = XTRColor(it.r, it.g, (b as Float).toDouble(), it.a)
//                        }
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.backgroundColor.a", (this.backgroundColor?.a ?: 0.0).toFloat() as Any, it.a.toFloat() as Any, { a ->
//                        this.backgroundColor?.let {
//                            this.backgroundColor = XTRColor(it.r, it.g, it.b, (a as Float).toDouble())
//                        }
//                    }))
//                    return@let
//                }
                (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                    it.backgroundColor = color
                }
            }
        }

        fun xtr_hidden(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? View)?.let { it.visibility == View.GONE } ?: false
        }

        fun xtr_setHidden(value: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? View)?.let {
                it.visibility = if (value) View.GONE else View.VISIBLE
            }
        }

        fun xtr_opaque(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? View)?.let { it.isOpaque } ?: false
        }

        fun xtr_setOpaque(value: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                it.opaque = value
            }
        }

        fun xtr_tintColor(objectRef: String): V8Value {
            return (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                return@let XTRUtils.fromColor(it.tintColor ?: XTRColor(0.0, 0.0, 0.0, 0.0), context.v8Runtime)
            } ?: XTRUtils.fromColor(XTRColor(0.0, 0.0, 0.0, 0.0), context.v8Runtime)
        }

        fun xtr_setTintColor(value: V8Object, objectRef: String) {
            XTRUtils.toColor(value)?.let { color ->
                (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                    it.tintColor = color
                }
            }
        }

        // Mark: View Layer-Back Rendering

        fun xtr_cornerRadius(objectRef: String): Double {
            return (XTMemoryManager.find(objectRef) as? XTRView)?.let { it.cornerRadius } ?: 0.0
        }

        fun xtr_setCornerRadius(value: Double, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRView)?.let {
//                if (animationEnabled) {
//                    addAnimation(AnimationProp("$objectUUID.cornerRadius", this.cornerRadius.toFloat() as Any, value.toFloat() as Any, {
//                        this.cornerRadius = (it as Float).toDouble()
//                    }))
//                    return
//                }
                it.cornerRadius = value
            }
        }

        fun xtr_borderWidth(objectRef: String): Double {
            return (XTMemoryManager.find(objectRef) as? XTRView)?.let { it.borderWidth } ?: 0.0
        }

        fun xtr_setBorderWidth(value: Double, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRView)?.let {
//                if (animationEnabled) {
//                    addAnimation(AnimationProp("$objectUUID.borderWidth", this.borderWidth.toFloat() as Any, value.toFloat() as Any, {
//                        this.borderWidth = (it as Float).toDouble()
//                    }))
//                    return
//                }
                it.borderWidth = value
            }
        }

        fun xtr_borderColor(objectRef: String): V8Value {
            return (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                return@let XTRUtils.fromColor(it.borderColor, context.v8Runtime)
            } ?: XTRUtils.fromColor(XTRColor(0.0, 0.0, 0.0, 0.0), context.v8Runtime)
        }

        fun xtr_setBorderColor(value: V8Object, objectRef: String) {
            XTRUtils.toColor(value)?.let { color ->
//                if (animationEnabled) {
//                    addAnimation(AnimationProp("$objectUUID.borderColor.r", (this.borderColor?.r ?: 0.0).toFloat() as Any, it.r.toFloat() as Any, { r ->
//                        this.borderColor?.let {
//                            this.borderColor = XTRColor((r as Float).toDouble(), it.g, it.b, it.a)
//                        }
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.borderColor.g", (this.borderColor?.g ?: 0.0).toFloat() as Any, it.g.toFloat() as Any, { g ->
//                        this.borderColor?.let {
//                            this.borderColor = XTRColor(it.r, (g as Float).toDouble(), it.b, it.a)
//                        }
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.borderColor.b", (this.borderColor?.b ?: 0.0).toFloat() as Any, it.b.toFloat() as Any, { b ->
//                        this.borderColor?.let {
//                            this.borderColor = XTRColor(it.r, it.g, (b as Float).toDouble(), it.a)
//                        }
//                    }))
//                    addAnimation(AnimationProp("$objectUUID.borderColor.a", (this.borderColor?.a ?: 0.0).toFloat() as Any, it.a.toFloat() as Any, { a ->
//                        this.borderColor?.let {
//                            this.borderColor = XTRColor(it.r, it.g, it.b, (a as Float).toDouble())
//                        }
//                    }))
//                    return@let
//                }
                (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                    it.borderColor = color
                }
            }
        }

        // Mark: View Hierarchy

        fun xtr_superview(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? View)?.let { (it.parent as? XTRComponentInstance)?.objectUUID }
        }

        fun xtr_subviews(objectRef: String): V8Array? {
            return (XTMemoryManager.find(objectRef) as? ViewGroup)?.let {
                val v8Array = V8Array(context.v8Runtime)
                (0 until it.childCount).mapNotNull { idx ->
                    return@mapNotNull (it.getChildAt(idx) as? XTRComponentInstance)?.objectUUID
                }.forEach { v8Array.push(it) }
                return@let v8Array
            }
        }

//        fun xtr_windowObject(): XTRWindow.InnerObject? {
//            var current = parent
//            while (current != null) {
//                (current as? XTRWindow.InnerObject)?.let {
//                    return it
//                }
//                current = current.parent
//            }
//            return null
//        }

        fun xtr_window(objectRef: String): String? {
            return null
        }

        fun xtr_removeFromSuperview(objectRef: String) {
            (XTMemoryManager.find(objectRef) as? View)?.let {
                (it.parent as? XTRView)?.willRemoveSubView(it)
                (it as? XTRView)?.willMoveToSuperview(null)
                (it as? XTRView)?.willMoveToWindow(null)
                (it.parent as? ViewGroup)?.removeView(it)
                (it as? XTRView)?.didMoveToSuperview()
                (it as? XTRView)?.didMoveToWindow()
            }
        }

        fun xtr_insertSubviewAtIndex(subviewRef: String, atIndex: Int, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? ViewGroup ?: return
            val subview = XTMemoryManager.find(subviewRef) as? View ?: return
            (subview as? XTRView)?.willMoveToSuperview(view)
//            (subview as? XTRView)?.willMoveToWindow(xtr_windowObject())
            view.addView(subview, atIndex, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
            (view as? XTRView)?.didAddSubview(subview)
            (subview as? XTRView)?.didMoveToSuperview()
            (subview as? XTRView)?.didMoveToWindow()
        }

        fun xtr_exchangeSubviewAtIndex(index1: Int, index2: Int, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? ViewGroup ?: return
            if (index1 > index2) {
                val view1 = view.getChildAt(index1)
                val view2 = view.getChildAt(index2)
                view.removeViewAt(index1)
                view.removeViewAt(index2)
                view.addView(view1, index2)
                view.addView(view2, index1)
            }
            else if (index1 < index2) {
                val view1 = view.getChildAt(index1)
                val view2 = view.getChildAt(index2)
                view.removeViewAt(index2)
                view.removeViewAt(index1)
                view.addView(view2, index1)
                view.addView(view1, index2)
            }
        }

        fun xtr_addSubview(subviewRef: String, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? ViewGroup ?: return
            val subview = XTMemoryManager.find(subviewRef) as? View ?: return
            (subview as? XTRView)?.willMoveToSuperview(view)
//            (subview as? XTRView)?.willMoveToWindow(xtr_windowObject())
            view.addView(subview, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
            (view as? XTRView)?.didAddSubview(subview)
            (subview as? XTRView)?.didMoveToSuperview()
            (subview as? XTRView)?.didMoveToWindow()
        }

//        fun xtr_addSubview(view: XTRView.InnerObject) {
//            view.willMoveToSuperview(this)
//            view.willMoveToWindow(xtr_windowObject())
//            addView(view, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
//            didAddSubview(view)
//            view.didMoveToSuperview()
//            view.didMoveToWindow()
//        }

        fun xtr_insertSubviewBelow(subviewRef: String, siblingSubviewRef: String, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? ViewGroup ?: return
            val siblingSubview = XTMemoryManager.find(siblingSubviewRef) as? View ?: return
            view.indexOfChild(siblingSubview)?.let {
                if (it >= 0) {
                    xtr_insertSubviewAtIndex(subviewRef, it, objectRef)
                }
            }
        }

        fun xtr_insertSubviewAbove(subviewRef: String, siblingSubviewRef: String, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? ViewGroup ?: return
            val siblingSubview = XTMemoryManager.find(siblingSubviewRef) as? View ?: return
            view.indexOfChild(siblingSubview)?.let {
                if (it >= 0){
                    xtr_insertSubviewAtIndex(subviewRef, it + 1, objectRef)
                }
            }
        }

        fun xtr_bringSubviewToFront(subviewRef: String, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? ViewGroup ?: return
            val subview = XTMemoryManager.find(subviewRef) as? View ?: return
            view.bringChildToFront(subview)
        }

        fun xtr_sendSubviewToBack(subviewRef: String, objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? ViewGroup ?: return
            val subview = XTMemoryManager.find(subviewRef) as? View ?: return
            view.removeView(subview)
            view.addView(subview, 0, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
        }

        fun xtr_isDescendantOfView(targetViewRef: String, objectRef: String): Boolean {
            val view = XTMemoryManager.find(objectRef) as? ViewGroup ?: return false
            val targetView = XTMemoryManager.find(targetViewRef) as? View ?: return false
            var current: ViewParent? = view
            while (current != null) {
                if (current == targetView) {
                    return true
                }
                current = current.parent
            }
            return false
        }

        fun xtr_viewWithTag(tag: Int, objectRef: String): String? {
            val view = XTMemoryManager.find(objectRef) as? XTRView ?: return null
            if (view.mTag == tag) {
                return view.objectUUID
            }
            (0 until view.childCount).forEach {
                (view.getChildAt(it) as? XTRComponentInstance)?.let {
                    val foundView = xtr_viewWithTag(tag, it.objectUUID ?: "")
                    if (foundView != null) {
                        return foundView
                    }
                }
            }
            return null
        }

        fun xtr_setNeedsLayout(objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? ViewGroup ?: return
            view.requestLayout()
            (view as? XTRView)?.layoutSubviews()
        }

        fun xtr_layoutIfNeeded(objectRef: String) {
            val view = XTMemoryManager.find(objectRef) as? ViewGroup ?: return
            view.requestLayout()
            (view as? XTRView)?.layoutSubviews()
        }

        // Mark: View LayoutConstraint

        open fun xtr_intrinsicContentSize(width: Double, objectRef: String): V8Value {
            val view = XTMemoryManager.find(objectRef) as? XTRView ?: return V8.getUndefined()
            return view.intrinsicContentSize(width)?.let { XTRUtils.fromSize(it, context.v8Runtime) } ?: V8.getUndefined()
        }

        // Mark: View Interactive

        fun xtr_userInteractionEnabled(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? XTRView)?.let { it.userInteractionEnabled } ?: false
        }

        fun xtr_setUserInteractionEnabled(value: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRView)?.let {
                it.userInteractionEnabled = value
            }
        }


//        var sharedHandler: android.os.Handler? = null
//        var animationEnabled = false
//        var animationProps: Map<String, AnimationProp<Any>> = mapOf()
//        var animatingHandlers: Map<String, () -> Unit> = mapOf()
//
//        fun addAnimation(aniProp: AnimationProp<Any>) {
//            XTRView.animatingHandlers[aniProp.aniKey]?.invoke()
//            (aniProp.fromValue as? Float)?.let { fromValue ->
//                (aniProp.toValue as? Float)?.let { toValue ->
//                    if (abs(fromValue - toValue) < 0.001) {
//                        return
//                    }
//                }
//            }
//            if (aniProp.fromValue == aniProp.toValue) {
//                return
//            }
//            val mutableMap = animationProps.toMutableMap()
//            mutableMap[aniProp.aniKey] = aniProp
//            animationProps = mutableMap.toMap()
//        }

    }

//    class AnimationProp<T>(val aniKey: String, val fromValue: T, val toValue: T, val onValue: (value: T) -> Unit)
//
//    override val name: String = "XTRView"
//
//    override fun v8Object(): V8Object? {
//        val v8Object = V8Object(xtrContext.v8Runtime)
//        v8Object.registerJavaMethod(this, "createScriptObject", "createScriptObject", arrayOf(V8Object::class.java, V8Object::class.java))
//        v8Object.registerJavaMethod(this, "animationWithDuration", "animationWithDuration", arrayOf(Double::class.java, V8Function::class.java, V8Function::class.java))
//        v8Object.registerJavaMethod(this, "animationWithTensionAndFriction", "animationWithTensionAndFriction", arrayOf(Double::class.java, Double::class.java, V8Function::class.java, V8Function::class.java))
//        v8Object.registerJavaMethod(this, "animationWithBouncinessAndSpeed", "animationWithBouncinessAndSpeed", arrayOf(Double::class.java, Double::class.java, V8Function::class.java, V8Function::class.java))
//        return v8Object
//    }
//
//    fun createScriptObject(rect: V8Object, scriptObject: V8Object): V8Object {
//        val view = InnerObject(xtrContext.autoRelease(scriptObject.twin()), xtrContext)
//        XTRUtils.toRect(rect)?.let {
//            view.frame = it
//        }
//        return view.requestV8Object(xtrContext.v8Runtime)
//    }
//
//    fun animationWithDuration(duration: Double, animations: V8Function, completion: V8Function) {
//        val duration = duration as? Double ?: return
//        val completion = completion.twin()
//        animationEnabled = true
//        xtrContext.callWithArguments(animations, null)
//        if (animationProps.values.isEmpty()) {
//            completion.release()
//        }
//        animationEnabled = false
//        var completed = false
//        val animatingHandlers = mutableMapOf<String, () -> Unit> ()
//        val animators = animationProps.values.map { aniProp ->
//            var animator: ValueAnimator? = null
//            (aniProp.fromValue as? Float)?.let {
//                animator = ValueAnimator.ofFloat(aniProp.fromValue as Float, aniProp.toValue as Float)
//            }
//            animator?.duration = (duration * 1000).toLong()
//            animator?.addUpdateListener {
//                (it.animatedValue as? Float)?.let {
//                    aniProp.onValue(it)
//                }
//            }
//            animator?.addListener(object : Animator.AnimatorListener {
//                override fun onAnimationRepeat(p0: Animator?) {}
//                override fun onAnimationEnd(p0: Animator?) {
//                    animator?.removeAllListeners()
//                    animator?.removeAllUpdateListeners()
//                    if (!completed) {
//                        completed = true
//                        xtrContext.callWithArguments(completion, null)
//                    }
//                    if (!completion.runtime.isReleased) {
//                        completion.release()
//                    }
//                }
//                override fun onAnimationCancel(p0: Animator?) {
//                    if (!completion.runtime.isReleased) {
//                        completion.release()
//                    }
//                }
//                override fun onAnimationStart(p0: Animator?) {}
//            })
//            animatingHandlers[aniProp.aniKey] = {
//                animator?.removeAllListeners()
//                animator?.removeAllUpdateListeners()
//                animator?.cancel()
//            }
//            return@map animator
//        }
//        animationProps = mapOf()
//        XTRView.animatingHandlers?.let {
//            val mutable = it.toMutableMap()
//            mutable.putAll(animatingHandlers)
//            XTRView.animatingHandlers = mutable.toMap()
//        }
//        animators.forEach { it?.start() }
//    }
//
//    fun animationWithDuration(duration: Double, animations: () -> Unit, completion: () -> Unit) {
//        val duration = duration as? Double ?: return
//        animationEnabled = true
//        animations()
//        animationEnabled = false
//        var completed = false
//        val animatingHandlers = mutableMapOf<String, () -> Unit> ()
//        val animators = animationProps.values.map { aniProp ->
//            var animator: ValueAnimator? = null
//            (aniProp.fromValue as? Float)?.let {
//                animator = ValueAnimator.ofFloat(aniProp.fromValue as Float, aniProp.toValue as Float)
//            }
//            animator?.duration = (duration * 1000).toLong()
//            animator?.addUpdateListener {
//                (it.animatedValue as? Float)?.let {
//                    aniProp.onValue(it)
//                }
//            }
//            animator?.addListener(object : Animator.AnimatorListener {
//                override fun onAnimationRepeat(p0: Animator?) {}
//                override fun onAnimationEnd(p0: Animator?) {
//                    animator?.removeAllListeners()
//                    animator?.removeAllUpdateListeners()
//                    if (!completed) {
//                        completed = true
//                        completion()
//                    }
//                }
//                override fun onAnimationCancel(p0: Animator?) {}
//                override fun onAnimationStart(p0: Animator?) {}
//            })
//            animatingHandlers[aniProp.aniKey] = {
//                animator?.removeAllListeners()
//                animator?.removeAllUpdateListeners()
//                animator?.cancel()
//            }
//            return@map animator
//        }
//        animationProps = mapOf()
//        XTRView.animatingHandlers?.let {
//            val mutable = it.toMutableMap()
//            mutable.putAll(animatingHandlers)
//            XTRView.animatingHandlers = mutable.toMap()
//        }
//        animators.forEach { it?.start() }
//    }
//
//    fun animationWithTensionAndFriction(tension: Double, friction: Double, animations: V8Function, completion: V8Function) {
//        val tension = tension as? Double ?: return
//        val friction = friction as? Double ?: return
//        val completion = completion.twin()
//        animationEnabled = true
//        xtrContext.callWithArguments(animations, null)
//        if (animationProps.values.isEmpty()) {
//            completion.release()
//        }
//        animationEnabled = false
//        var completed = false
//        val animatingHandlers = mutableMapOf<String, () -> Unit> ()
//        val springSystem = SpringSystem.create()
//        animationProps.values.forEach { aniProp ->
//            val spring = springSystem.createSpring()
//            spring.springConfig = SpringConfig.fromOrigamiTensionAndFriction(tension, friction)
//            (aniProp.fromValue as? Float)?.let {
//                spring.currentValue = (aniProp.fromValue as Float).toDouble()
//            }
//            spring.addListener(object : SimpleSpringListener() {
//                override fun onSpringUpdate(spring: Spring?) {
//                    spring?.currentValue?.toFloat()?.let {
//                        aniProp.onValue(it)
//                    }
//                }
//                override fun onSpringAtRest(spring: Spring?) {
//                    spring?.removeAllListeners()
//                    spring?.destroy()
//                    if (!completed) {
//                        completed = true
//                        xtrContext.callWithArguments(completion, null)
//                    }
//                    if (!animations.runtime.isReleased) {
//                        animations.release()
//                        completion.release()
//                    }
//                }
//            })
//            animatingHandlers[aniProp.aniKey] = {
//                spring.removeAllListeners()
//                spring.destroy()
//            }
//            spring.endValue = (aniProp.toValue as Float).toDouble()
//        }
//        animationProps = mapOf()
//        XTRView.animatingHandlers = animatingHandlers.toMap()
//    }
//
//    fun animationWithBouncinessAndSpeed(bounciness: Double, speed: Double, animations: V8Function, completion: V8Function) {
//        val bounciness = bounciness as? Double ?: return
//        val speed = speed as? Double ?: return
//        val completion = completion.twin()
//        animationEnabled = true
//        xtrContext.callWithArguments(animations, null)
//        if (animationProps.values.isEmpty()) {
//            completion.release()
//        }
//        animationEnabled = false
//        var completed = false
//        val animatingHandlers = mutableMapOf<String, () -> Unit> ()
//        val springSystem = SpringSystem.create()
//        animationProps.values.forEach { aniProp ->
//            val spring = springSystem.createSpring()
//            spring.springConfig = SpringConfig.fromBouncinessAndSpeed(bounciness, speed)
//            (aniProp.fromValue as? Float)?.let {
//                spring.currentValue = (aniProp.fromValue as Float).toDouble()
//            }
//            spring.addListener(object : SimpleSpringListener() {
//                override fun onSpringUpdate(spring: Spring?) {
//                    spring?.currentValue?.toFloat()?.let {
//                        aniProp.onValue(it)
//                    }
//                }
//                override fun onSpringAtRest(spring: Spring?) {
//                    spring?.removeAllListeners()
//                    spring?.destroy()
//                    if (!completed) {
//                        completed = true
//                        xtrContext.callWithArguments(completion, null)
//                    }
//                    if (!animations.runtime.isReleased) {
//                        animations.release()
//                        completion.release()
//                    }
//                }
//
//            })
//            animatingHandlers[aniProp.aniKey] = {
//                spring.removeAllListeners()
//                spring.destroy()
//            }
//            spring.endValue = (aniProp.toValue as Float).toDouble()
//        }
//        animationProps = mapOf()
//        XTRView.animatingHandlers = animatingHandlers.toMap()
//    }
//
//    fun animationWithBouncinessAndSpeed(bounciness: Double, speed: Double, animations: () -> Unit, completion: () -> Unit) {
//        val bounciness = bounciness as? Double ?: return
//        val speed = speed as? Double ?: return
//        animationEnabled = true
//        animations()
//        animationEnabled = false
//        var completed = false
//        val animatingHandlers = mutableMapOf<String, () -> Unit> ()
//        val springSystem = SpringSystem.create()
//        animationProps.values.forEach { aniProp ->
//            val spring = springSystem.createSpring()
//            spring.springConfig = SpringConfig.fromBouncinessAndSpeed(bounciness, speed)
//            (aniProp.fromValue as? Float)?.let {
//                spring.currentValue = (aniProp.fromValue as Float).toDouble()
//            }
//            spring.addListener(object : SimpleSpringListener() {
//                override fun onSpringUpdate(spring: Spring?) {
//                    spring?.currentValue?.toFloat()?.let {
//                        aniProp.onValue(it)
//                    }
//                }
//                override fun onSpringAtRest(spring: Spring?) {
//                    spring?.removeAllListeners()
//                    spring?.destroy()
//                    if (!completed) {
//                        completed = true
//                        completion()
//                    }
//                }
//
//            })
//            animatingHandlers[aniProp.aniKey] = {
//                spring.removeAllListeners()
//                spring.destroy()
//            }
//            spring.endValue = (aniProp.toValue as Float).toDouble()
//        }
//        animationProps = mapOf()
//        XTRView.animatingHandlers = animatingHandlers.toMap()
//    }
//
//    @Suppress("CanBeParameter", "unused")
//    open class InnerObject(override var scriptObject: V8Object?, protected val xtrContext: XTRContext): FrameLayout(xtrContext.appContext), XTRObject {
//
//        internal var viewDelegate: XTRViewController.InnerObject? = null
//        override val objectUUID: String = UUID.randomUUID().toString()
//
//        init {
//            if (sharedHandler == null){
//                sharedHandler = android.os.Handler(context.mainLooper)
//            }
//            clipChildren = false
//            setWillNotDraw(false)
//        }
//
//        override fun requestV8Object(runtime: V8): V8Object {
//            val v8Object = super.requestV8Object(runtime)
//            return v8Object
//        }
//
//
//
//    }

}
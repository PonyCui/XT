package com.opensource.xtruntime

import android.animation.Animator
import android.animation.ValueAnimator
import android.graphics.*
import android.view.*
import android.widget.FrameLayout
import com.facebook.rebound.*
import org.mozilla.javascript.Function
import org.mozilla.javascript.NativeArray
import org.mozilla.javascript.ScriptableObject
import org.mozilla.javascript.Undefined
import java.util.*
import java.util.logging.Handler
import kotlin.concurrent.timerTask

/**
 * Created by cuiminghui on 2017/9/1.
 */
class XTRView: XTRComponent() {

    class AnimationProp<T>(val aniKey: String, val fromValue: T, val toValue: T, val onValue: (value: T) -> Unit)

    override val name: String = "XTRView"

    fun createScriptObject(rect: Any, scriptObject: Any): XTRView.InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            val view = InnerObject(it, xtrContext)
            XTRUtils.toRect(rect)?.let {
                view.frame = it
            }
            return view
        }
        return null
    }

    companion object {

        val sharedLayoutTimer = Timer()
        var sharedHandler: android.os.Handler? = null
        var animationEnabled = false
        var animationProps: Map<String, AnimationProp<Any>> = mapOf()
        var animatingHandlers: Map<String, () -> Unit> = mapOf()

        fun addAnimation(aniProp: AnimationProp<Any>) {
            XTRView.animatingHandlers[aniProp.aniKey]?.invoke()
            if (aniProp.fromValue == aniProp.toValue) {
                return
            }
            val mutableMap = animationProps.toMutableMap()
            mutableMap[aniProp.aniKey] = aniProp
            animationProps = mutableMap.toMap()
        }

    }

    fun animationWithDuration(duration: Any?, animations: Any?, completion: Any?) {
        val duration = duration as? Double ?: return
        animationEnabled = true
        (animations as? Function)?.let {
            xtrContext.callWithArguments(it, arrayOf())
        }
        (animations as? () -> Unit)?.let {
            it.invoke()
        }
        animationEnabled = false
        var completed = false
        val animatingHandlers = mutableMapOf<String, () -> Unit> ()
        val animators = animationProps.values.map { aniProp ->
            var animator: ValueAnimator? = null
            (aniProp.fromValue as? Float)?.let {
                animator = ValueAnimator.ofFloat(aniProp.fromValue as Float, aniProp.toValue as Float)
            }
            animator?.duration = (duration * 1000).toLong()
            animator?.addUpdateListener {
                (it.animatedValue as? Float)?.let {
                    aniProp.onValue(it)
                }
            }
            animator?.addListener(object : Animator.AnimatorListener {
                override fun onAnimationRepeat(p0: Animator?) {}
                override fun onAnimationEnd(p0: Animator?) {
                    animator?.removeAllListeners()
                    animator?.removeAllUpdateListeners()
                    if (!completed) {
                        completed = true
                        (completion as? Function)?.let { xtrContext.callWithArguments(it, arrayOf()) }
                        (completion as? () -> Unit)?.let {
                            it.invoke()
                        }
                    }
                }
                override fun onAnimationCancel(p0: Animator?) {}
                override fun onAnimationStart(p0: Animator?) {}
            })
            animatingHandlers[aniProp.aniKey] = {
                animator?.removeAllListeners()
                animator?.removeAllUpdateListeners()
                animator?.cancel()
            }
            return@map animator
        }
        animationProps = mapOf()
        XTRView.animatingHandlers = animatingHandlers.toMap()
        animators.forEach { it?.start() }
    }

    fun animationWithTensionAndFriction(tension: Any?, friction: Any?, animations: Any?, completion: Any?) {
        val tension = tension as? Double ?: return
        val friction = friction as? Double ?: return
        animationEnabled = true
        (animations as? Function)?.let {
            xtrContext.callWithArguments(it, arrayOf())
        }
        (animations as? () -> Unit)?.let {
            it.invoke()
        }
        animationEnabled = false
        var completed = false
        val animatingHandlers = mutableMapOf<String, () -> Unit> ()
        val springSystem = SpringSystem.create()
        animationProps.values.forEach { aniProp ->
            val spring = springSystem.createSpring()
            spring.springConfig = SpringConfig.fromOrigamiTensionAndFriction(tension, friction)
            (aniProp.fromValue as? Float)?.let {
                spring.currentValue = (aniProp.fromValue as Float).toDouble()
            }
            spring.addListener(object : SimpleSpringListener() {
                override fun onSpringUpdate(spring: Spring?) {
                    spring?.currentValue?.toFloat()?.let {
                        aniProp.onValue(it)
                    }
                }
                override fun onSpringAtRest(spring: Spring?) {
                    spring?.removeAllListeners()
                    spring?.destroy()
                    if (!completed) {
                        completed = true
                        (completion as? Function)?.let { xtrContext.callWithArguments(it, arrayOf()) }
                        (completion as? () -> Unit)?.let {
                            it.invoke()
                        }
                    }
                }
            })
            animatingHandlers[aniProp.aniKey] = {
                spring.removeAllListeners()
                spring.destroy()
            }
            spring.endValue = (aniProp.toValue as Float).toDouble()
        }
        animationProps = mapOf()
        XTRView.animatingHandlers = animatingHandlers.toMap()
    }

    fun animationWithBouncinessAndSpeed(bounciness: Any?, speed: Any?, animations: Any?, completion: Any?) {
        val bounciness = bounciness as? Double ?: return
        val speed = speed as? Double ?: return
        animationEnabled = true
        (animations as? Function)?.let {
            xtrContext.callWithArguments(it, arrayOf())
        }
        (animations as? () -> Unit)?.let {
            it.invoke()
        }
        animationEnabled = false
        var completed = false
        val animatingHandlers = mutableMapOf<String, () -> Unit> ()
        val springSystem = SpringSystem.create()
        animationProps.values.forEach { aniProp ->
            val spring = springSystem.createSpring()
            spring.springConfig = SpringConfig.fromBouncinessAndSpeed(bounciness, speed)
            (aniProp.fromValue as? Float)?.let {
                spring.currentValue = (aniProp.fromValue as Float).toDouble()
            }
            spring.addListener(object : SimpleSpringListener() {
                override fun onSpringUpdate(spring: Spring?) {
                    spring?.currentValue?.toFloat()?.let {
                        aniProp.onValue(it)
                    }
                }
                override fun onSpringAtRest(spring: Spring?) {
                    spring?.removeAllListeners()
                    spring?.destroy()
                    if (!completed) {
                        completed = true
                        (completion as? Function)?.let { xtrContext.callWithArguments(it, arrayOf()) }
                        (completion as? () -> Unit)?.let {
                            it.invoke()
                        }
                    }
                }

            })
            animatingHandlers[aniProp.aniKey] = {
                spring.removeAllListeners()
                spring.destroy()
            }
            spring.endValue = (aniProp.toValue as Float).toDouble()
        }
        animationProps = mapOf()
        XTRView.animatingHandlers = animatingHandlers.toMap()
    }

    @Suppress("CanBeParameter", "unused")
    open class InnerObject(val scriptObject: ScriptableObject, protected val xtrContext: XTRContext): FrameLayout(xtrContext.appContext), XTRObject {

        internal var viewDelegate: XTRViewController.InnerObject? = null
        override val objectUUID: String = UUID.randomUUID().toString()

        init {
            if (sharedHandler == null){
                sharedHandler = android.os.Handler(context.mainLooper)
            }
            clipChildren = false
            setWillNotDraw(false)
        }

        // Mark: View Geometry

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

        private var clipsToBounds = false
            set(value) {
                field = value
                invalidate()
            }

        fun xtr_clipsToBounds(): Boolean {
            return this.clipsToBounds
        }

        fun xtr_setClipsToBounds(value: Any?) {
            this.clipsToBounds = value as? Boolean ?: false
            if (android.os.Build.VERSION.SDK_INT < 18) {
                setLayerType(if (value as? Boolean == true) View.LAYER_TYPE_SOFTWARE else View.LAYER_TYPE_HARDWARE, null)
            }
        }

        override fun setAlpha(alpha: Float) {
            if (animationEnabled) {
                addAnimation(AnimationProp("$objectUUID.alpha", this.alpha as Any, alpha as Any, {
                    setAlpha(it as Float)
                }))
                return
            }
            super.setAlpha(alpha)
        }

        var frame: XTRRect? = null
            set(value) {
                field = value
                requestLayout()
            }

        override fun requestLayout() {
            if (isLayoutRequested) {
                sharedLayoutTimer.schedule(timerTask {
                    sharedHandler?.post {
                        super.requestLayout()
                    }
                }, 0)
                return
            }
            super.requestLayout()
        }

        fun xtr_frame(): XTRRect {
            return this.frame ?: XTRRect(0.0, 0.0, (width / resources.displayMetrics.density).toDouble(), (height / resources.displayMetrics.density).toDouble())
        }

        fun xtr_setFrame(value: Any?) {
            XTRUtils.toRect(value)?.let {
                if (animationEnabled) {
                    addAnimation(AnimationProp("$objectUUID.frame.x", (this.frame?.x ?: 0.0).toFloat() as Any, it.x.toFloat() as Any, { x ->
                        this.frame?.let {
                            this.frame = XTRRect((x as Float).toDouble(), it.y, it.width, it.height)
                        }
                    }))
                    addAnimation(AnimationProp("$objectUUID.frame.y", (this.frame?.y ?: 0.0).toFloat() as Any, it.y.toFloat() as Any, { y ->
                        this.frame?.let {
                            this.frame = XTRRect(it.x, (y as Float).toDouble(), it.width, it.height)
                        }
                    }))
                    addAnimation(AnimationProp("$objectUUID.frame.width", (this.frame?.width ?: 0.0).toFloat() as Any, it.width.toFloat() as Any, { width ->
                        this.frame?.let {
                            this.frame = XTRRect(it.x, it.y, (width as Float).toDouble(), it.height)
                        }
                    }))
                    addAnimation(AnimationProp("$objectUUID.frame.height", (this.frame?.height ?: 0.0).toFloat() as Any, it.height.toFloat() as Any, { height ->
                        this.frame?.let {
                            this.frame = XTRRect(it.x, it.y, it.width, (height as Float).toDouble())
                        }
                    }))
                    return@let
                }
                frame = it
            }
        }

        var bounds: XTRRect = XTRRect(0.0, 0.0, frame?.width ?: (this.width / resources.displayMetrics.density).toDouble(), frame?.height ?: (this.height / resources.displayMetrics.density).toDouble())
            set(value) {
                field = value
                resetPath()
                invalidate()
            }

        fun xtr_bounds(): XTRRect {
            return this.bounds
        }

        var transformMatrix: XTRMatrix = XTRMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
            private set(value) {
                field = value
                invalidate()
            }

        override fun getMatrix(): Matrix {
            return transformMatrix.toNativeMatrix(resources.displayMetrics.density)
        }

        fun xtr_transform(): XTRMatrix {
            return transformMatrix
        }

        fun xtr_setTransform(value: Any?) {
            XTRUtils.toTransform(value)?.let {
                if (animationEnabled) {
                    val oldValue = transformMatrix.unMatrix()
                    val newValue = it.unMatrix()
                    addAnimation(AnimationProp("$objectUUID.transform.scale.x", oldValue.scale.x.toFloat() as Any, newValue.scale.x.toFloat() as Any, { scaleX ->
                        transformMatrix = transformMatrix.setScale((scaleX as Float).toDouble(), null)
                    }))
                    addAnimation(AnimationProp("$objectUUID.transform.scale.y", oldValue.scale.y.toFloat() as Any, newValue.scale.y.toFloat() as Any, { scaleY ->
                        transformMatrix = transformMatrix.setScale(null, (scaleY as Float).toDouble())
                    }))
                    addAnimation(AnimationProp("$objectUUID.transform.rotate", oldValue.degree.toFloat() as Any, newValue.degree.toFloat() as Any, { value ->
                        transformMatrix = transformMatrix.setRotate((value as Float).toDouble())
                    }))
                    addAnimation(AnimationProp("$objectUUID.transform.translate.x", oldValue.translate.x.toFloat() as Any, newValue.translate.x.toFloat() as Any, { translateX ->
                        transformMatrix = transformMatrix.setTranslate((translateX as Float).toDouble(), null)
                    }))
                    addAnimation(AnimationProp("$objectUUID.transform.translate.y", oldValue.translate.y.toFloat() as Any, newValue.translate.y.toFloat() as Any, { translateY ->
                        transformMatrix = transformMatrix.setTranslate(null, (translateY as Float).toDouble())
                    }))
                    return@let
                }
                transformMatrix = it
            }
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

        // Mark: View Rendering

        protected var backgroundColor: XTRColor? = null
            set(value) {
                field = value
                setBackgroundColor(value?.intColor() ?: Color.TRANSPARENT)
                invalidate()
            }

        fun xtr_backgroundColor(): XTRColor? {
            return this.backgroundColor
        }

        fun xtr_setBackgroundColor(value: Any?) {
            XTRUtils.toColor(value)?.let {
                if (animationEnabled) {
                    addAnimation(AnimationProp("$objectUUID.backgroundColor.r", (this.backgroundColor?.r ?: 0.0).toFloat() as Any, it.r.toFloat() as Any, { r ->
                        this.backgroundColor?.let {
                            this.backgroundColor = XTRColor((r as Float).toDouble(), it.g, it.b, it.a)
                        }
                    }))
                    addAnimation(AnimationProp("$objectUUID.backgroundColor.g", (this.backgroundColor?.g ?: 0.0).toFloat() as Any, it.g.toFloat() as Any, { g ->
                        this.backgroundColor?.let {
                            this.backgroundColor = XTRColor(it.r, (g as Float).toDouble(), it.b, it.a)
                        }
                    }))
                    addAnimation(AnimationProp("$objectUUID.backgroundColor.b", (this.backgroundColor?.b ?: 0.0).toFloat() as Any, it.b.toFloat() as Any, { b ->
                        this.backgroundColor?.let {
                            this.backgroundColor = XTRColor(it.r, it.g, (b as Float).toDouble(), it.a)
                        }
                    }))
                    addAnimation(AnimationProp("$objectUUID.backgroundColor.a", (this.backgroundColor?.a ?: 0.0).toFloat() as Any, it.a.toFloat() as Any, { a ->
                        this.backgroundColor?.let {
                            this.backgroundColor = XTRColor(it.r, it.g, it.b, (a as Float).toDouble())
                        }
                    }))
                    return@let
                }
                this.backgroundColor = it
            }
        }

        fun xtr_hidden(): Boolean {
            return this.visibility == View.GONE
        }

        fun xtr_setHidden(value: Boolean) {
            this.visibility = if (value) View.GONE else View.VISIBLE
        }

        protected var opaque = false

        fun xtr_opaque(): Boolean {
            return opaque
        }

        fun xtr_setOpaque(value: Boolean) {
            this.opaque = value
        }

        override fun isOpaque(): Boolean {
            super.isOpaque()
            return opaque
        }

        private var tintColor: XTRColor? = null
            set(value) {
                field = value
                tintColorDidChange()
            }

        fun xtr_tintColor(): XTRColor {
            return this.tintColor ?: (parent as? XTRView.InnerObject)?.xtr_tintColor() ?: XTRColor(0.0, 122.0 / 255.0, 1.0, 1.0)
        }

        fun xtr_setTintColor(value: Any?) {
            XTRUtils.toColor(value)?.let {
                this.tintColor = it
            }
        }

        open fun tintColorDidChange() {
            xtrContext.invokeMethod(scriptObject, "tintColorDidChange", arrayOf())
            (0 until childCount).forEach {
                (getChildAt(it) as? XTRView.InnerObject)?.let {
                    it.tintColorDidChange()
                }
            }
        }

        // Mark: View Layer-Back Rendering

        private var cornerRadius: Double = 0.0
            set(value) {
                field = Math.max(0.0, value)
                resetPath()
                invalidate()
            }

        fun xtr_cornerRadius(): Double {
            return this.cornerRadius
        }

        fun xtr_setCornerRadius(value: Any?) {
            val value = value as? Double ?: return
            if (animationEnabled) {
                addAnimation(AnimationProp("$objectUUID.cornerRadius", this.cornerRadius.toFloat() as Any, value.toFloat() as Any, {
                    this.cornerRadius = (it as Float).toDouble()
                }))
                return
            }
            this.cornerRadius = value
        }

        private var borderWidth: Double = 0.0
            set(value) {
                field = value
                invalidate()
            }

        fun xtr_borderWidth(): Double {
            return this.borderWidth
        }

        fun xtr_setBorderWidth(value: Any?) {
            val value = value as? Double ?: return
            if (animationEnabled) {
                addAnimation(AnimationProp("$objectUUID.borderWidth", this.borderWidth.toFloat() as Any, value.toFloat() as Any, {
                    this.borderWidth = (it as Float).toDouble()
                }))
                return
            }
            this.borderWidth = value
        }

        protected var borderColor: XTRColor? = null
            set(value) {
                field = value
                invalidate()
            }

        fun xtr_borderColor(): XTRColor? {
            return this.borderColor
        }

        fun xtr_setBorderColor(value: Any?) {
            XTRUtils.toColor(value)?.let {
                if (animationEnabled) {
                    addAnimation(AnimationProp("$objectUUID.borderColor.r", (this.borderColor?.r ?: 0.0).toFloat() as Any, it.r.toFloat() as Any, { r ->
                        this.borderColor?.let {
                            this.borderColor = XTRColor((r as Float).toDouble(), it.g, it.b, it.a)
                        }
                    }))
                    addAnimation(AnimationProp("$objectUUID.borderColor.g", (this.borderColor?.g ?: 0.0).toFloat() as Any, it.g.toFloat() as Any, { g ->
                        this.borderColor?.let {
                            this.borderColor = XTRColor(it.r, (g as Float).toDouble(), it.b, it.a)
                        }
                    }))
                    addAnimation(AnimationProp("$objectUUID.borderColor.b", (this.borderColor?.b ?: 0.0).toFloat() as Any, it.b.toFloat() as Any, { b ->
                        this.borderColor?.let {
                            this.borderColor = XTRColor(it.r, it.g, (b as Float).toDouble(), it.a)
                        }
                    }))
                    addAnimation(AnimationProp("$objectUUID.borderColor.a", (this.borderColor?.a ?: 0.0).toFloat() as Any, it.a.toFloat() as Any, { a ->
                        this.borderColor?.let {
                            this.borderColor = XTRColor(it.r, it.g, it.b, (a as Float).toDouble())
                        }
                    }))
                    return@let
                }
                this.borderColor = it
            }
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

        // Mark: View Hierarchy

        var xtr_tag: Int = 0

        fun xtr_superview(): Any? {
            (parent as? XTRView.InnerObject)?.let {
                return XTRUtils.fromObject(xtrContext, it)
            }
            return Undefined.instance
        }

        fun xtr_subviews(): NativeArray {
            return NativeArray((0 until childCount).map {
                (getChildAt(it) as? XTRView.InnerObject)?.let {
                    return@map XTRUtils.fromObject(xtrContext, it)
                }
            }.toTypedArray())
        }

        fun xtr_windowObject(): XTRWindow.InnerObject? {
            var current = parent
            while (current != null) {
                (current as? XTRWindow.InnerObject)?.let {
                    return it
                }
                current = current.parent
            }
            return null
        }

        fun xtr_window(): Any? {
            xtr_windowObject()?.let {
                XTRUtils.fromObject(xtrContext, it)
            }
            return null
        }

        fun xtr_removeFromSuperview() {
            (parent as? XTRView.InnerObject)?.willRemoveSubView(this)
            willMoveToSuperview(null)
            willMoveToWindow(null)
            (parent as? ViewGroup)?.removeView(this)
            didMoveToSuperview()
            didMoveToWindow()
        }

        fun xtr_insertSubviewAtIndex(subview: Any?, atIndex: Int) {
            XTRUtils.toView(subview)?.let { subview ->
                (subview as? XTRView.InnerObject)?.willMoveToSuperview(this)
                (subview as? XTRView.InnerObject)?.willMoveToWindow(xtr_windowObject())
                addView(subview, atIndex, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
                didAddSubview(subview)
                (subview as? XTRView.InnerObject)?.didMoveToSuperview()
                (subview as? XTRView.InnerObject)?.didMoveToWindow()
            }
        }

        fun xtr_exchangeSubviewAtIndex(index1: Int, index2: Int) {
            if (index1 > index2) {
                val view1 = getChildAt(index1)
                val view2 = getChildAt(index2)
                removeViewAt(index1)
                removeViewAt(index2)
                addView(view1, index2)
                addView(view2, index1)
            }
            else if (index1 < index2) {
                val view1 = getChildAt(index1)
                val view2 = getChildAt(index2)
                removeViewAt(index2)
                removeViewAt(index1)
                addView(view2, index1)
                addView(view1, index2)
            }
        }

        fun xtr_addSubview(view: Any?) {
            XTRUtils.toView(view)?.let {
                (it as? XTRView.InnerObject)?.willMoveToSuperview(this)
                (it as? XTRView.InnerObject)?.willMoveToWindow(xtr_windowObject())
                addView(it, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
                didAddSubview(it)
                (it as? XTRView.InnerObject)?.didMoveToSuperview()
                (it as? XTRView.InnerObject)?.didMoveToWindow()
            }
        }

        fun xtr_insertSubviewBelow(view: Any?, siblingSubview: Any?) {
            XTRUtils.toView(siblingSubview)?.let {
                indexOfChild(it)?.let {
                    if (it >= 0) {
                        xtr_insertSubviewAtIndex(view, it)
                    }
                }
            }
        }

        fun xtr_insertSubviewAbove(view: Any?, siblingSubview: Any?) {
            XTRUtils.toView(siblingSubview)?.let {
                indexOfChild(it)?.let {
                    if (it >= 0){
                        xtr_insertSubviewAtIndex(view, it + 1)
                    }
                }
            }
        }

        fun xtr_bringSubviewToFront(subview: Any?) {
            XTRUtils.toView(subview)?.let {
                bringChildToFront(it)
            }
        }

        fun xtr_sendSubviewToBack(subview: Any?) {
            XTRUtils.toView(subview)?.let {
                removeView(it)
                addView(it, 0, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
            }
        }

        fun didAddSubview(subview: View) {
            XTRUtils.fromObject(xtrContext, subview)?.let {
                xtrContext.invokeMethod(scriptObject, "didAddSubview", arrayOf(it))
            }
        }

        fun willRemoveSubView(subview: View) {
            XTRUtils.fromObject(xtrContext, subview)?.let {
                xtrContext.invokeMethod(scriptObject, "willRemoveSubView", arrayOf(it))
            }
        }

        fun willMoveToSuperview(newSuperview: View?) {
            newSuperview?.let {
                XTRUtils.fromObject(xtrContext, it)?.let {
                    xtrContext.invokeMethod(scriptObject, "willMoveToSuperview", arrayOf(it))
                    return
                }
            }
            xtrContext.invokeMethod(scriptObject, "willMoveToSuperview", arrayOf())
        }

        fun didMoveToSuperview() {
            xtrContext.invokeMethod(scriptObject, "didMoveToSuperview", arrayOf())
        }

        fun willMoveToWindow(newWindow: XTRWindow.InnerObject?) {
            newWindow?.let {
                XTRUtils.fromObject(xtrContext, it)?.let {
                    xtrContext.invokeMethod(scriptObject, "willMoveToWindow", arrayOf(it))
                    return
                }
            }
            xtrContext.invokeMethod(scriptObject, "willMoveToWindow", arrayOf())
        }

        fun didMoveToWindow() {
            xtrContext.invokeMethod(scriptObject, "didMoveToWindow", arrayOf())
        }

        fun xtr_isDescendantOfView(view: Any?): Boolean {
            XTRUtils.toView(view)?.let { view ->
                var current: ViewParent? = this
                while (current != null) {
                    if (current == view) {
                        return true
                    }
                    current = current.parent
                }
            }
            return false
        }

        fun xtr_viewWithTag(tag: Int): Any? {
            if (xtr_tag == tag) {
                return XTRUtils.fromObject(xtrContext, this)
            }
            (0 until childCount).forEach {
                ((getChildAt(it) as? XTRView.InnerObject)?.xtr_viewWithTag(tag))?.let {
                    return it
                }
            }
            return null
        }

        fun xtr_setNeedsLayout() {
            requestLayout()
            layoutSubviews()
        }

        fun xtr_layoutIfNeeded() {
            requestLayout()
            layoutSubviews()
        }

        override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
            super.onLayout(changed, left, top, right, bottom)
            if (changed) {
                this.bounds = XTRRect(0.0, 0.0, frame?.width ?: (this.width / resources.displayMetrics.density).toDouble(), frame?.height ?: (this.height / resources.displayMetrics.density).toDouble())
                layoutSubviews()
            }
        }

        open fun layoutSubviews() {
            viewDelegate?.viewWillLayoutSubviews()
            xtrContext.invokeMethod(scriptObject, "layoutSubviews", arrayOf())
            viewDelegate?.viewDidLayoutSubviews()
        }

        // Mark: View LayoutConstraint

        open fun xtr_intrinsicContentSize(width: Any?): XTRSize? {
            return null
        }

        // Mark: View Interactive

        protected var userInteractionEnabled = false

        fun xtr_userInteractionEnabled(): Boolean {
            return this.userInteractionEnabled
        }

        fun xtr_setUserInteractionEnabled(value: Any?) {
            (value as? Boolean)?.let {
                this.userInteractionEnabled = it
            }
        }

        private var onTap: Any? = null
        private var onDoubleTap: Any? = null
        private var maybeDoubleTimer: Timer? = null
        private var maybeDoubleTap = false
        private var maybeDoubleTapTS: Long = 0
        private var maybeLongPress = false
        private var longPressTimer: Timer? = null
        private var longPressDuration = 0.25
        private var firstLongPressPoint = XTRPoint(0.0, 0.0)
        private var onLongPress: Any? = null
        private var longPressing = false
        private var onPan: Any? = null
        private var maybePan = false
        private var firstPanPoint = XTRPoint(0.0, 0.0)
        private var panning = false

        fun xtr_longPressDuration(): Double {
            return this.longPressDuration
        }

        fun xtr_setLongPressDuration(value: Any?) {
            (value as? Double)?.let { this.longPressDuration = it }
        }

        fun xtr_setTap(value: Any?) {
            if (value !is Function) {
                this.onTap = null
                return
            }
            this.isClickable = true
            this.onTap = value
            this.setOnClickListener(clickListener)
        }

        fun xtr_setDoubleTap(value: Any?) {
            if (value !is Function) {
                this.onDoubleTap = null
                return
            }
            this.isClickable = true
            this.onDoubleTap = value
            this.setOnClickListener(clickListener)
        }

        private var clickListener = OnClickListener {
            if (onDoubleTap == null) {
                (onTap as? Function)?.let { xtrContext.callWithArguments(it, arrayOf()) }
            }
            else {
                if (!maybeDoubleTap) {
                    maybeDoubleTap = true
                    maybeDoubleTapTS = System.currentTimeMillis()
                    maybeDoubleTimer = Timer()
                    maybeDoubleTimer?.schedule(object : TimerTask() {
                        override fun run() {
                            maybeDoubleTap = false
                            maybeDoubleTapTS = 0
                            (onTap as? Function)?.let { xtrContext.callWithArguments(it, arrayOf()) }
                        }
                    }, 300)
                }
                else if (maybeDoubleTap && System.currentTimeMillis() - maybeDoubleTapTS < 300) {
                    maybeDoubleTap = false
                    maybeDoubleTapTS = 0
                    maybeDoubleTimer?.cancel()
                    (onDoubleTap as? Function)?.let { xtrContext.callWithArguments(it, arrayOf()) }
                }
            }
        }

        fun xtr_setLongPress(value: Any?) {
            if (value !is Function) {
                this.onLongPress = null
                return
            }
            onLongPress = value
        }

        fun xtr_setPan(value: Any?) {
            if (value !is Function) {
                this.onPan = null
                return
            }
            onPan = value
        }

        override fun onTouchEvent(event: MotionEvent?): Boolean {
            return false
//            if (!transformMatrix.isIdentity()) {
//                event?.transform(transformMatrix.toNativeMatrix(resources.displayMetrics.density))
//            }
//            var currentParent: XTRView.InnerObject? = parent as? XTRView.InnerObject
//            var currentOffset = XTRPoint(frame?.x ?: 0.0 - scrollX / resources.displayMetrics.density, frame?.y ?: 0.0 - scrollY / resources.displayMetrics.density)
//            while (currentParent != null) {
//                if (currentParent.stealingTouch(event, currentOffset)) {
//                    cancelTouches()
//                    return true
//                }
//                currentOffset = XTRPoint(
//                        currentOffset.x + (currentParent.frame?.x ?: 0.0) - currentParent.scrollX / resources.displayMetrics.density,
//                        currentOffset.y + (currentParent.frame?.y ?: 0.0) - currentParent.scrollY / resources.displayMetrics.density
//                )
//                currentParent = currentParent.parent as? XTRView.InnerObject
//            }
//            handlePanEvents(event)
//            handleLongPressEvents(event)
//            return super.onTouchEvent(event)
        }

        open fun stealingTouch(event: MotionEvent?, offset: XTRPoint): Boolean {
            return false
        }

        fun cancelTouches() {
            longPressTimer?.cancel()
            if (longPressing) {
                (onLongPress as? Function)?.let { xtrContext.callWithArguments(it, arrayOf(3)) }
            }
            if (panning) {
                (onPan as? Function)?.let { xtrContext.callWithArguments(it, arrayOf(3)) }
            }
        }

        private fun handleLongPressEvents(event: MotionEvent?) {
            if (onLongPress == null) {
                return
            }
            if (onLongPress != null && event?.action == MotionEvent.ACTION_DOWN && !longPressing) {
                maybeLongPress = true
                firstLongPressPoint = XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                longPressTimer = Timer()
                longPressTimer?.schedule(timerTask {
                    android.os.Handler(xtrContext.appContext.mainLooper).post {
                        if (maybeLongPress) {
                            longPressing = true
                            (onLongPress as? Function)?.let { xtrContext.callWithArguments(it, arrayOf(0)) }
                        }
                    }
                }, (this.longPressDuration * 1000).toLong())
            }
            else if (onLongPress != null && event?.action == MotionEvent.ACTION_MOVE && !longPressing && maybeLongPress) {
                val currentLongPressPoint = XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                if (Math.abs(currentLongPressPoint.x - firstLongPressPoint.x) > 16.0 || Math.abs(currentLongPressPoint.y - firstLongPressPoint.y) > 16.0) {
                    maybeLongPress = false
                    longPressTimer?.cancel()
                }
            }
            else if (longPressing && event?.action == MotionEvent.ACTION_MOVE) {
                (onLongPress as? Function)?.let {
                    xtrContext.callWithArguments(
                            it,
                            arrayOf(
                                    1,
                                    XTRPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density).toDouble()),
                                    XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                            )
                    ) }
            }
            else if (longPressing && event?.action == MotionEvent.ACTION_UP) {
                longPressing = false
                (onLongPress as? Function)?.let { xtrContext.callWithArguments(
                        it,
                        arrayOf(
                                2,
                                XTRPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density).toDouble()),
                                XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                        )
                ) }
            }
            else if (event?.action == MotionEvent.ACTION_UP) {
                maybeLongPress = false
                longPressTimer?.cancel()
            }
        }

        private fun handlePanEvents(event: MotionEvent?) {
            if (onPan == null) {
                return
            }
            if (onPan != null && event?.action == MotionEvent.ACTION_DOWN && !panning) {
                maybePan = true
                panning = false
                firstPanPoint = XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
            }
            else if (onPan != null && event?.action == MotionEvent.ACTION_MOVE && !panning && maybePan) {
                val currentPanPoint = XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                if (Math.abs(currentPanPoint.x - firstLongPressPoint.x) > 8.0 || Math.abs(currentPanPoint.y - firstLongPressPoint.x) > 8.0) {
                    maybeLongPress = false
                    maybePan = false
                    panning = true
                    (onPan as? Function)?.let {
                        xtrContext.callWithArguments(
                                it,
                                arrayOf(
                                        0,
                                        XTRPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density).toDouble()),
                                        XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                                )
                        ) }
                }
            }
            else if (panning && event?.action == MotionEvent.ACTION_MOVE) {
                (onPan as? Function)?.let {
                    xtrContext.callWithArguments(
                            it,
                            arrayOf(
                                    1,
                                    XTRPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density).toDouble()),
                                    XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                            )
                    ) }
            }
            else if (panning && event?.action == MotionEvent.ACTION_UP) {
                panning = false
                (onPan as? Function)?.let { xtrContext.callWithArguments(
                        it,
                        arrayOf(
                                2,
                                XTRPoint((event.x / resources.displayMetrics.density).toDouble(), (event.y / resources.displayMetrics.density).toDouble()),
                                XTRPoint((event.rawX / resources.displayMetrics.density).toDouble(), (event.rawY / resources.displayMetrics.density).toDouble())
                        )
                ) }
            }
            else if (event?.action == MotionEvent.ACTION_UP) {
                maybePan = false
            }
        }

    }

}
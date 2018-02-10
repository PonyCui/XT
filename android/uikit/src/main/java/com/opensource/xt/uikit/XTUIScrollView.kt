package com.opensource.xt.uikit

import android.util.AttributeSet
import android.view.ViewGroup
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xt.core.*

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTUIScrollView @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTComponentInstance {

    val XTUIView: XTUIView.JSExports
        get() = xtrContext?.registeredComponents?.get("_XTUIView") as XTUIView.JSExports

    val innerView = XTMemoryManager.find(XTUIView.create()) as XTUIView
    val horizontalScrollIndicator = XTMemoryManager.find(XTUIView.create()) as XTUIView
    val verticalScrollIndicator = XTMemoryManager.find(XTUIView.create()) as XTUIView
    var contentOffset: XTUIPoint = XTUIPoint(0.0, 0.0)
        set(value) {
            if (field.x == value.x && field.y == value.y) {
                return
            }
            if (XTUIViewAnimator.animationEnabled) {
                XTUIViewAnimator.addAnimation(XTUIViewAnimationProperty("$objectUUID.contentOffset.x", (field.x).toFloat() as Any, value.x.toFloat() as Any, { x ->
                    this.contentOffset = XTUIPoint((x as Float).toDouble(), this.contentOffset.y)
                }))
                XTUIViewAnimator.addAnimation(XTUIViewAnimationProperty("$objectUUID.contentOffset.y", (field.y).toFloat() as Any, value.y.toFloat() as Any, { y ->
                    this.contentOffset = XTUIPoint(this.contentOffset.x, (y as Float).toDouble())
                }))
                return
            }
            field = value
            this.innerView.scrollX = (value.x * this.resources.displayMetrics.density).toInt()
            this.innerView.scrollY = (value.y * this.resources.displayMetrics.density).toInt()
            this.innerView.requestLayout()
            scriptObject()?.let {
                XTContext.invokeMethod(it, "scrollerDidScroll")
                it.release()
            }
        }


    init {
        clipsToBounds = true
        addView(innerView, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
        addView(horizontalScrollIndicator, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
        addView(verticalScrollIndicator, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
    }

    override fun layoutSubviews() {
        super.layoutSubviews()
        this.innerView.frame = this.bounds
    }

    class JSExports(context: XTUIContext): XTUIView.JSExports(context) {

        override val name: String = "_XTUIScrollView"

        override val viewClass: Class<XTUIView> = XTUIScrollView::class.java as Class<XTUIView>

        override fun exports(): V8Object {
            val exports = super.exports()
            exports.registerJavaMethod(this, "xtr_innerView", "xtr_innerView", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_horizontalScrollIndicator", "xtr_horizontalScrollIndicator", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_verticalScrollIndicator", "xtr_verticalScrollIndicator", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_contentOffset", "xtr_contentOffset", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setContentOffset", "xtr_setContentOffset", arrayOf(V8Object::class.java, String::class.java))
            return exports
        }

        fun xtr_innerView(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUIScrollView)?.innerView?.objectUUID
        }

        fun xtr_horizontalScrollIndicator(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUIScrollView)?.horizontalScrollIndicator?.objectUUID
        }

        fun xtr_verticalScrollIndicator(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUIScrollView)?.verticalScrollIndicator?.objectUUID
        }

        fun xtr_contentOffset(objectRef: String): V8Value {
            val scrollView = (XTMemoryManager.find(objectRef) as? XTUIScrollView) ?: return V8.getUndefined()
            return XTUIUtils.fromPoint(XTUIPoint(
                    (scrollView.innerView.scrollX.toFloat() / scrollView.resources.displayMetrics.density).toDouble(),
                    (scrollView.innerView.scrollY.toFloat() / scrollView.resources.displayMetrics.density).toDouble()
            ), context.runtime)
        }

        fun xtr_setContentOffset(value: V8Object, objectRef: String) {
            val scrollView = (XTMemoryManager.find(objectRef) as? XTUIScrollView) ?: return
            XTUIUtils.toPoint(value)?.let {
                scrollView.contentOffset = it
            }
        }

    }

}
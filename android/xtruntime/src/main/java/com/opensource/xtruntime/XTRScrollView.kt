package com.opensource.xtruntime

import android.util.AttributeSet
import android.view.ViewGroup
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTRScrollView @JvmOverloads constructor(
        xtrContext: XTRContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTRView(xtrContext, attrs, defStyleAttr), XTRComponentInstance {

    val XTRView: XTRView.JSExports
        get() = xtrContext?.bridge?.get()?.registeredComponents?.get("XTRView") as XTRView.JSExports

    val innerView = XTMemoryManager.find(XTRView.create()) as XTRView
    val horizontalScrollIndicator = XTMemoryManager.find(XTRView.create()) as XTRView
    val verticalScrollIndicator = XTMemoryManager.find(XTRView.create()) as XTRView
    var contentOffset: XTRPoint = XTRPoint(0.0, 0.0)
        set(value) {
            if (field.x == value.x && field.y == value.y) {
                return
            }
            if (XTRViewAnimator.animationEnabled) {
                XTRViewAnimator.addAnimation(XTRViewAnimationProperty("$objectUUID.contentOffset.x", (field.x).toFloat() as Any, value.x.toFloat() as Any, { x ->
                    this.contentOffset = XTRPoint((x as Float).toDouble(), this.contentOffset.y)
                }))
                XTRViewAnimator.addAnimation(XTRViewAnimationProperty("$objectUUID.contentOffset.y", (field.y).toFloat() as Any, value.y.toFloat() as Any, { y ->
                    this.contentOffset = XTRPoint(this.contentOffset.x, (y as Float).toDouble())
                }))
                return
            }
            field = value
            this.innerView.scrollX = (value.x * this.resources.displayMetrics.density).toInt()
            this.innerView.scrollY = (value.y * this.resources.displayMetrics.density).toInt()
            this.innerView.requestLayout()
            scriptObject()?.let {
                XTRContext.invokeMethod(it, "scrollerDidScroll")
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

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRScrollView"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_innerView", "xtr_innerView", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_horizontalScrollIndicator", "xtr_horizontalScrollIndicator", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_verticalScrollIndicator", "xtr_verticalScrollIndicator", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_contentOffset", "xtr_contentOffset", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setContentOffset", "xtr_setContentOffset", arrayOf(V8Object::class.java, String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTRScrollView(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_innerView(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTRScrollView)?.innerView?.objectUUID
        }

        fun xtr_horizontalScrollIndicator(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTRScrollView)?.horizontalScrollIndicator?.objectUUID
        }

        fun xtr_verticalScrollIndicator(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTRScrollView)?.verticalScrollIndicator?.objectUUID
        }

        fun xtr_contentOffset(objectRef: String): V8Value {
            val scrollView = (XTMemoryManager.find(objectRef) as? XTRScrollView) ?: return V8.getUndefined()
            return XTRUtils.fromPoint(XTRPoint(
                    (scrollView.innerView.scrollX.toFloat() / scrollView.resources.displayMetrics.density).toDouble(),
                    (scrollView.innerView.scrollY.toFloat() / scrollView.resources.displayMetrics.density).toDouble()
            ), context.runtime)
        }

        fun xtr_setContentOffset(value: V8Object, objectRef: String) {
            val scrollView = (XTMemoryManager.find(objectRef) as? XTRScrollView) ?: return
            XTRUtils.toPoint(value)?.let {
                scrollView.contentOffset = it
            }
        }

    }

}
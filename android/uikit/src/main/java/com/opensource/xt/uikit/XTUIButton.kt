package com.opensource.xt.uikit

import android.graphics.Color
import android.util.AttributeSet
import android.view.ViewGroup
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTComponentInstance

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTUIButton @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTComponentInstance {

    val XTUILabel: XTUILabel.JSExports = xtrContext?.registeredComponents?.get("_XTUILabel") as XTUILabel.JSExports
    val XTUIImageView: XTUIImageView.JSExports = xtrContext?.registeredComponents?.get("_XTUIImageView") as XTUIImageView.JSExports

    var imageView: XTUIImageView = XTMemoryManager.find(XTUIImageView.create()) as XTUIImageView
    var titleLabel: XTUILabel = XTMemoryManager.find(XTUILabel.create()) as XTUILabel

    init {
        titleLabel.mFont = XTUIFont(16.0, "400", "normal", "")
        addView(titleLabel, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
        addView(imageView, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
    }

    private var isVertical = false

    private var inset = 0.0

    override fun tintColorDidChange() {
        super.tintColorDidChange()
        this.titleLabel.textView.setTextColor(this.tintColor?.intColor() ?: Color.BLACK)
    }

    override fun layoutSubviews() {
        super.layoutSubviews()
        resetContents()
    }

    private fun resetContents() {
        val imageWidth = (this.imageView.image?.size?.width ?: 0.0)
        val imageHeight = (this.imageView.image?.size?.height ?: 0.0)
        val textSize = this.titleLabel.intrinsicContentSize(this.bounds.width  - imageWidth - inset) ?: XTUISize(0.0, 0.0)
        val textWidth = textSize.width
        val textHeight = textSize.height
        if (isVertical) {
            val contentHeight = imageHeight + inset + textHeight
            imageView.frame = XTUIRect(
                    (this.bounds.width - imageWidth) / 2.0,
                    (this.bounds.height - contentHeight) / 2.0,
                    imageWidth,
                    imageHeight
            )
            titleLabel.frame = XTUIRect(
                    (this.bounds.width - textWidth) / 2.0,
                    (this.bounds.height - contentHeight) / 2.0 + imageHeight + inset,
                    textWidth,
                    textHeight
            )
        }
        else {
            val contentWidth = imageWidth + inset + textWidth
            imageView.frame = XTUIRect(
                    (this.bounds.width - contentWidth) / 2.0,
                    (this.bounds.height - imageHeight) / 2.0,
                    imageWidth,
                    imageHeight
            )
            titleLabel.frame = XTUIRect(
                    (this.bounds.width - contentWidth) / 2.0 + imageWidth + inset,
                    (this.bounds.height - textHeight) / 2.0,
                    textWidth,
                    textHeight
            )
        }
    }

    class JSExports(val context: XTUIContext): XTComponentExport() {

        val XTUILabel: XTUILabel.JSExports
            get() = context?.registeredComponents?.get("_XTUILabel") as XTUILabel.JSExports
        val XTUIImageView: XTUIImageView.JSExports
            get() = context?.registeredComponents?.get("_XTUIImageView") as XTUIImageView.JSExports

        override val name: String = "_XTUIButton"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_titleLabel", "xtr_titleLabel", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_imageView", "xtr_imageView", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_title", "xtr_title", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setTitle", "xtr_setTitle", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_font", "xtr_font", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setFont", "xtr_setFont", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_image", "xtr_image", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setImage", "xtr_setImage", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_color", "xtr_color", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setColor", "xtr_setColor", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_vertical", "xtr_vertical", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setVertical", "xtr_setVertical", arrayOf(Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_inset", "xtr_inset", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setInset", "xtr_setInset", arrayOf(Double::class.java, String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTUIButton(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_titleLabel(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTUIButton)?.titleLabel?.objectUUID ?: ""
        }

        fun xtr_imageView(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTUIButton)?.imageView?.objectUUID ?: ""
        }

        fun xtr_title(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTUIButton)?.titleLabel?.let {
                return@let XTUILabel.xtr_text(it.objectUUID ?: "")
            } ?: ""
        }

        fun xtr_setTitle(value: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIButton)?.let {
                XTUILabel.xtr_setText(value, it.titleLabel.objectUUID ?: "")
                it.resetContents()
            }
        }

        fun xtr_font(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTUIButton)?.titleLabel?.let {
                return@let XTUILabel.xtr_font(it.objectUUID ?: "")
            } ?: ""
        }

        fun xtr_setFont(fontRef: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIButton)?.let {
                XTUILabel.xtr_setFont(fontRef, it.titleLabel.objectUUID ?: "")
                it.resetContents()
            }
        }

        fun xtr_image(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUIButton)?.imageView?.let {
                return@let XTUIImageView.xtr_image(it.objectUUID ?: "")
            } ?: null
        }

        fun xtr_setImage(imageRef: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIButton)?.let {
                XTUIImageView.xtr_setImage(imageRef, it.imageView.objectUUID ?: "")
                it.resetContents()
            }
        }

        fun xtr_color(objectRef: String): V8Value {
            return XTUIUtils.fromColor((XTMemoryManager.find(objectRef) as? XTUIButton)?.tintColor ?: XTUIColor(0.0, 0.0, 0.0, 0.0), context.runtime)
        }

        fun xtr_setColor(value: V8Object, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIButton)?.let {
                it.tintColor = XTUIUtils.toColor(value)
            }
        }

        fun xtr_vertical(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? XTUIButton)?.isVertical ?: false
        }

        fun xtr_setVertical(value: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIButton)?.let {
                it.isVertical = value
                it.resetContents()
            }
        }

        fun xtr_inset(objectRef: String): Double {
            return (XTMemoryManager.find(objectRef) as? XTUIButton)?.inset ?: 0.0
        }

        fun xtr_setInset(value: Double, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIButton)?.let {
                it.inset = value
                it.resetContents()
            }
        }

    }

}
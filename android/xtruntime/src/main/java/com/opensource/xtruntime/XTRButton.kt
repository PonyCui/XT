package com.opensource.xtruntime

import android.content.Context
import android.util.AttributeSet
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTRButton @JvmOverloads constructor(
        context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTRView(context, attrs, defStyleAttr), XTRComponentInstance {

    var imageView: XTRImageView = XTMemoryManager.find(XTRImageView.create()) as XTRImageView
    var titleLabel: XTRLabel = XTMemoryManager.find(XTRLabel.create()) as XTRLabel

    init {
        XTRView.xtr_addSubview(imageView.objectUUID ?: "", this.objectUUID ?: "")
    }

    private var isVertical = false

    private var inset = 0.0

    override fun tintColorDidChange() {
        super.tintColorDidChange()
//        this.titleLabel.xtr_setTextColor(this.xtr_tintColorXTRTypes())
    }

    override fun layoutSubviews() {
        super.layoutSubviews()
        resetContents()
    }

    private fun resetContents() {
        val scale = resources.displayMetrics.density
        val imageWidth = (this.imageView.image?.size?.width ?: 0.0)
        val imageHeight = (this.imageView.image?.size?.height ?: 0.0)
        val textSize = this.titleLabel.intrinsicContentSize(this.width.toDouble() / scale  - imageWidth - inset) ?: XTRSize(0.0, 0.0)
        val textWidth = textSize.width
        val textHeight = textSize.height
        if (isVertical) {
            val contentHeight = imageHeight + inset + textHeight
            imageView.frame = XTRRect(
                    (this.bounds.width - imageWidth) / 2.0,
                    (this.bounds.height - contentHeight) / 2.0,
                    imageWidth,
                    imageHeight
            )
            titleLabel.frame = XTRRect(
                    (this.bounds.width - textWidth) / 2.0,
                    (this.bounds.height - contentHeight) / 2.0 + imageHeight + inset,
                    textWidth,
                    textHeight
            )
        }
        else {
            val contentWidth = imageWidth + inset + textWidth
            imageView.frame = XTRRect(
                    (this.bounds.width - contentWidth) / 2.0,
                    (this.bounds.height - imageHeight) / 2.0,
                    imageWidth,
                    imageHeight
            )
            titleLabel.frame = XTRRect(
                    (this.bounds.width - contentWidth) / 2.0 + imageWidth + inset,
                    (this.bounds.height - textHeight) / 2.0,
                    textWidth,
                    textHeight
            )
        }
    }

    companion object: XTRComponentExport() {

        override val name: String = "XTRButton"

        override fun exports(context: XTRContext): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
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
            val view = XTRButton(XTRView.context.appContext)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_title(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTRButton)?.titleLabel?.let {
                return@let XTRLabel.xtr_text(it.objectUUID ?: "")
            } ?: ""
        }

        fun xtr_setTitle(value: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRButton)?.titleLabel?.let {
                XTRLabel.xtr_setText(value, it.objectUUID ?: "")
            }
        }

        fun xtr_font(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTRButton)?.titleLabel?.let {
                return@let XTRLabel.xtr_font(it.objectUUID ?: "")
            } ?: ""
        }

        fun xtr_setFont(fontRef: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRButton)?.titleLabel?.let {
                XTRLabel.xtr_setFont(fontRef, it.objectUUID ?: "")
            }
        }

        fun xtr_image(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTRButton)?.imageView?.let {
                return@let XTRImageView.xtr_image(it.objectUUID ?: "")
            } ?: null
        }

        fun xtr_setImage(imageRef: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRButton)?.let {
                XTRImageView.xtr_setImage(imageRef, it.imageView.objectUUID ?: "")
                it.resetContents()
            }
        }

        fun xtr_color(objectRef: String): V8Value {
            return XTRUtils.fromColor((XTMemoryManager.find(objectRef) as? XTRButton)?.tintColor ?: XTRColor(0.0, 0.0, 0.0, 0.0), context.runtime)
        }

        fun xtr_setColor(value: V8Object, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRButton)?.let {
                it.tintColor = XTRUtils.toColor(value)
            }
        }

        fun xtr_vertical(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? XTRButton)?.isVertical ?: false
        }

        fun xtr_setVertical(value: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRButton)?.let {
                it.isVertical = value
                it.resetContents()
            }
        }

        fun xtr_inset(objectRef: String): Double {
            return (XTMemoryManager.find(objectRef) as? XTRButton)?.inset ?: 0.0
        }

        fun xtr_setInset(value: Double, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRButton)?.let {
                it.inset = value
                it.resetContents()
            }
        }

    }

}
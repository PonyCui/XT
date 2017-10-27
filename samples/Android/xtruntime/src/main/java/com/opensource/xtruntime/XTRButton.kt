package com.opensource.xtruntime

import android.view.MotionEvent
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTRButton: XTRComponent() {

    override val name: String = "XTRButton"

    override fun v8Object(): V8Object? {
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "createScriptObject", "createScriptObject", arrayOf(V8Object::class.java, V8Object::class.java))
        return v8Object
    }

    fun createScriptObject(rect: V8Object, scriptObject: V8Object): V8Object {
        val view = InnerObject(xtrContext.autoRelease(scriptObject.twin()), xtrContext)
        XTRUtils.toRect(rect)?.let {
            view.frame = it
        }
        return view.requestV8Object(xtrContext.v8Runtime)
    }

    class InnerObject(scriptObject: V8Object, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        lateinit var imageView: XTRImageView.InnerObject
        lateinit var titleLabel: XTRLabel.InnerObject

        init {
            (XTRUtils.toView(scriptObject.get("imageView")) as? XTRImageView.InnerObject)?.let {
                imageView = it
            }
            (XTRUtils.toView(scriptObject.get("titleLabel")) as? XTRLabel.InnerObject)?.let {
                titleLabel = it
            }
        }

        override fun requestV8Object(runtime: V8): V8Object {
            val v8Object = super<XTRView.InnerObject>.requestV8Object(runtime)
            v8Object.registerJavaMethod(this, "xtr_title", "xtr_title", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setTitle", "xtr_setTitle", arrayOf(String::class.java))
            v8Object.registerJavaMethod(this, "xtr_font", "xtr_font", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setFont", "xtr_setFont", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_image", "xtr_image", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setImage", "xtr_setImage", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_color", "xtr_color", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setColor", "xtr_setColor", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_vertical", "xtr_vertical", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setVertical", "xtr_setVertical", arrayOf(Boolean::class.java))
            v8Object.registerJavaMethod(this, "xtr_inset", "xtr_inset", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setInset", "xtr_setInset", arrayOf(Double::class.java))
            return v8Object
        }

        fun xtr_title(): String? {
            return this.titleLabel.xtr_text()
        }

        fun xtr_setTitle(value: String) {
            this.titleLabel.xtr_setText(value)
            resetContents()
        }

        fun xtr_font(): V8Value {
            return XTRUtils.fromObject(xtrContext, this.titleLabel.xtr_font()) as? V8Object ?: V8.getUndefined()
        }

        fun xtr_setFont(value: V8Object) {
            this.titleLabel.xtr_setFont(value)
            resetContents()
        }

        fun xtr_image(): Any? {
            return this.imageView.xtr_image()
        }

        fun xtr_setImage(value: V8Object) {
            this.imageView.xtr_setImage(value)
            resetContents()
        }

        fun xtr_color(): V8Value {
            return XTRUtils.fromObject(xtrContext, this.xtr_tintColor()) as? V8Object ?: V8.getUndefined()
        }

        fun xtr_setColor(value: V8Object) {
            this.xtr_setTintColor(value)
        }

        private var isVertical = false

        fun xtr_vertical(): Boolean {
            return this.isVertical
        }

        fun xtr_setVertical(value: Boolean) {
            this.isVertical = value
            resetContents()
        }

        private var inset = 0.0

        fun xtr_inset(): Double {
            return this.inset
        }

        fun xtr_setInset(value: Double) {
            this.inset = value
            resetContents()
        }

        override fun tintColorDidChange() {
            super.tintColorDidChange()
            this.titleLabel.xtr_setTextColor(this.xtr_tintColorXTRTypes())
        }

        override fun layoutSubviews() {
            super.layoutSubviews()
            resetContents()
        }

        private fun resetContents() {
            val scale = resources.displayMetrics.density
            val imageWidth = (this.imageView.image?.size?.width ?: 0.0)
            val imageHeight = (this.imageView.image?.size?.height ?: 0.0)
            val textBounds = this.titleLabel.xtr_textRectForBounds(
                    XTRRect(
                            0.0,
                            0.0,
                            this.width.toDouble() / scale  - imageWidth - inset,
                            this.height.toDouble() / scale
                    )
            )
            val textWidth = textBounds.width
            val textHeight = textBounds.height
            if (isVertical) {
                val contentHeight = imageHeight + inset + textHeight
                imageView.xtr_setFrame(
                        XTRRect(
                                (this.bounds.width - imageWidth) / 2.0,
                                (this.bounds.height - contentHeight) / 2.0,
                                imageWidth,
                                imageHeight
                        )
                )
                titleLabel.xtr_setFrame(
                        XTRRect(
                                (this.bounds.width - textWidth) / 2.0,
                                (this.bounds.height - contentHeight) / 2.0 + imageHeight + inset,
                                textWidth,
                                textHeight
                        )
                )
            }
            else {
                val contentWidth = imageWidth + inset + textWidth
                imageView.xtr_setFrame(
                        XTRRect(
                                (this.bounds.width - contentWidth) / 2.0,
                                (this.bounds.height - imageHeight) / 2.0,
                                imageWidth,
                                imageHeight
                        )
                )
                titleLabel.xtr_setFrame(
                        XTRRect(
                                (this.bounds.width - contentWidth) / 2.0 + imageWidth + inset,
                                (this.bounds.height - textHeight) / 2.0,
                                textWidth,
                                textHeight
                        )
                )
            }
        }

    }

}
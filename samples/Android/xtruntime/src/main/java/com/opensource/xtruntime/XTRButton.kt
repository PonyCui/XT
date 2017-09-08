package com.opensource.xtruntime

import android.view.MotionEvent
import org.mozilla.javascript.Function
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/9/8.
 */
class XTRButton: XTRComponent() {

    override val name: String = "XTRButton"

    fun createScriptObject(rect: Any, scriptObject: Any): XTRButton.InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            return XTRButton.InnerObject(it, xtrContext)
        }
        return null
    }

    class InnerObject(scriptObject: ScriptableObject, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        lateinit var imageView: XTRImageView.InnerObject
        lateinit var titleLabel: XTRLabel.InnerObject

        init {
            (XTRUtils.toView(scriptObject.get("imageView")) as? XTRImageView.InnerObject)?.let {
                imageView = it
            }
            (XTRUtils.toView(scriptObject.get("titleLabel")) as? XTRLabel.InnerObject)?.let {
                titleLabel = it
            }
            addTouches()
        }

        fun xtr_title(): String? {
            return this.titleLabel.xtr_text()
        }

        fun xtr_setTitle(value: Any?) {
            this.titleLabel.xtr_setText(value)
            resetContents()
        }

        fun xtr_font(): XTRFont {
            return this.titleLabel.xtr_font()
        }

        fun xtr_setFont(value: Any?) {
            this.titleLabel.xtr_setFont(value)
            resetContents()
        }

        fun xtr_image(): ScriptableObject? {
            return this.imageView.xtr_image()
        }

        fun xtr_setImage(value: Any?) {
            this.imageView.xtr_setImage(value)
            resetContents()
        }

        fun xtr_color(): XTRColor {
            return this.xtr_tintColor()
        }

        fun xtr_setColor(value: Any?) {
            this.xtr_setTintColor(value)
        }

        private var isVertical = false

        fun xtr_vertical(): Boolean {
            return this.isVertical
        }

        fun xtr_setVertical(value: Any?) {
            this.isVertical = value as? Boolean ?: false
            resetContents()
        }

        private var inset = 0.0

        fun xtr_inset(): Double {
            return this.inset
        }

        fun xtr_setInset(value: Any?) {
            this.inset = value as? Double ?: 0.0
            resetContents()
        }

        override fun tintColorDidChange() {
            super.tintColorDidChange()
            this.titleLabel.xtr_setTextColor(this.xtr_tintColor())
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

        private fun addTouches() {
            xtr_setUserInteractionEnabled(true)
            this.setOnClickListener({
                xtrContext.invokeMethod(scriptObject, "handleTouchUpInside", arrayOf())
            })
        }

        private var highlighted: Boolean = false
            set(value) {
                if (field == value) { return }
                field = value
                if (field) {
                    XTRView().animationWithDuration(0.15, {
                        imageView.alpha = 0.25f
                        titleLabel.alpha = 0.25f
                    }, null)
                }
                else {
                    XTRView().animationWithDuration(0.15, {
                        imageView.alpha = 1.0f
                        titleLabel.alpha = 1.0f
                    }, null)
                }
                xtrContext.invokeMethod(scriptObject, "handleHighlighted", arrayOf(field))
            }

        override fun onTouchEvent(event: MotionEvent?): Boolean {
            handlePanEvents(event)
            return super.onTouchEvent(event)
        }

        private fun handlePanEvents(event: MotionEvent?) {
            when {
                event?.action == MotionEvent.ACTION_DOWN -> highlighted = true
                event?.action == MotionEvent.ACTION_MOVE -> {
                    val scale = resources.displayMetrics.density
                    val x = event?.x / scale
                    val y = event?.y / scale
                    highlighted = !(x < -44 || x > this.bounds.width + 44 || y < -44 || y > this.bounds.height + 44)
                }
                event?.action == MotionEvent.ACTION_UP -> {
                    val scale = resources.displayMetrics.density
                    val x = event?.x / scale
                    val y = event?.y / scale
                    if (!(x < -44 || x > this.bounds.width + 44 || y < -44 || y > this.bounds.height + 44)) {
                        xtrContext.invokeMethod(scriptObject, "handleTouchUpInside", arrayOf())
                    }
                    highlighted = false
                }
            }
        }

    }

}
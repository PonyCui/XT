package com.opensource.xtruntime

import android.graphics.*
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/9/6.
 */
class XTRImageView: XTRComponent() {

    override val name: String = "XTRImageView"

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

    class InnerObject(scriptObject: ScriptableObject, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        var image: XTRImage.InnerObject? = null
            private set

        fun xtr_image(): Any? {
            return XTRUtils.fromObject(xtrContext, this.image)
        }

        fun xtr_setImage(image: Any?) {
            this.image = XTRUtils.toImage(image)
            setWillNotDraw(this.image == null)
            invalidate()
        }

        var contentMode: Int = 0
            private set

        fun xtr_contentMode(): Int {
            return this.contentMode
        }

        fun xtr_setContentMode(value: Any?) {
            this.contentMode = (value as? Double ?: 0.0).toInt()
            invalidate()
        }

        private val sharedImagePaint = Paint()

        override fun drawContent(canvas: Canvas?) {
            super.drawContent(canvas)
            image?.let { image ->
                canvas?.let { canvas ->
                    sharedImagePaint.reset()
                    sharedImagePaint.isAntiAlias = true
                    sharedImagePaint.alpha = (alpha * 255).toInt()
                    if (image.renderingMode == 2) {
                        sharedImagePaint.colorFilter = PorterDuffColorFilter(xtr_tintColor().intColor(), PorterDuff.Mode.SRC_IN)
                    }
                    when (contentMode) {
                        0 -> {
                            canvas.drawBitmap(
                                    image.bitmap,
                                    Rect(0, 0, image.bitmap.width, image.bitmap.height),
                                    Rect(0, 0, canvas.width, canvas.height),
                                    sharedImagePaint
                            )
                        }
                        1, 2 -> {
                            val imageRatio = image.bitmap.width.toFloat() / image.bitmap.height.toFloat()
                            val viewRatio = canvas.width.toFloat() / canvas.height.toFloat()
                            if ((imageRatio > viewRatio && contentMode == 1) || (imageRatio < viewRatio && contentMode == 2)) {
                                val imgHeight =(canvas.width.toFloat() / image.bitmap.width.toFloat() * image.bitmap.height.toFloat()).toInt()
                                val imgY = ((canvas.height.toFloat() - imgHeight.toFloat()) / 2.0f).toInt()
                                canvas.drawBitmap(
                                        image.bitmap,
                                        Rect(0, 0, image.bitmap.width, image.bitmap.height),
                                        Rect(0, imgY, canvas.width, imgY + imgHeight),
                                        sharedImagePaint
                                )
                            }
                            else if ((imageRatio < viewRatio && contentMode == 1) || (imageRatio > viewRatio && contentMode == 2)) {
                                val imgWidth = (canvas.height.toFloat() / image.bitmap.height.toFloat() * image.bitmap.width.toFloat()).toInt()
                                val imgX = ((canvas.width.toFloat() - imgWidth.toFloat()) / 2.0f).toInt()
                                canvas.drawBitmap(
                                        image.bitmap,
                                        Rect(0, 0, image.bitmap.width, image.bitmap.height),
                                        Rect(imgX, 0, imgX + imgWidth, canvas.height),
                                        sharedImagePaint
                                )
                            }
                        }
                    }
                }
            }
        }

        override fun xtr_intrinsicContentSize(width: Any?): XTRSize? {
            image?.let {
                return it.size
            }
            return super.xtr_intrinsicContentSize(width)
        }

    }

}
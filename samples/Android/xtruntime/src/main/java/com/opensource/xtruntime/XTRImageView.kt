package com.opensource.xtruntime

import android.graphics.*
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Function
import com.eclipsesource.v8.V8Object
import org.mozilla.javascript.ScriptableObject

/**
 * Created by cuiminghui on 2017/9/6.
 */
class XTRImageView: XTRComponent() {

    override val name: String = "XTRImageView"

    override fun v8Object(): V8Object? {
        XTRImage.runtime = xtrContext.v8Runtime
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "createScriptObject", "createScriptObject", arrayOf(V8Object::class.java, V8Object::class.java))
        return v8Object
    }

    fun createScriptObject(rect: V8Object, scriptObject: V8Object): V8Object {
        val view = InnerObject(scriptObject.twin(), xtrContext)
        XTRUtils.toRect(rect)?.let {
            view.frame = it
        }
        return view.requestV8Object(xtrContext.v8Runtime)
    }

    class InnerObject(scriptObject: V8Object, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        var image: XTRImage.InnerObject? = null
            private set

        override fun requestV8Object(runtime: V8): V8Object {
            val v8Object = super<XTRView.InnerObject>.requestV8Object(runtime)
            v8Object.registerJavaMethod(this, "xtr_image", "xtr_image", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setImage", "xtr_setImage", arrayOf(V8Object::class.java))
            v8Object.registerJavaMethod(this, "xtr_contentMode", "xtr_contentMode", arrayOf())
            v8Object.registerJavaMethod(this, "xtr_setContentMode", "xtr_setContentMode", arrayOf(Int::class.java))
            return v8Object
        }

        fun xtr_image(): Any? {
            return XTRUtils.fromObject(xtrContext, this.image)
        }

        fun xtr_setImage(image: V8Object) {
            this.image = XTRUtils.toImage(image)
            setWillNotDraw(this.image == null)
            invalidate()
        }

        var contentMode: Int = 0
            private set

        fun xtr_contentMode(): Int {
            return this.contentMode
        }

        fun xtr_setContentMode(value: Int) {
            this.contentMode = value
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

        override fun xtr_intrinsicContentSize(width: Double): XTRSize? {
            image?.let {
                return it.size
            }
            return super.xtr_intrinsicContentSize(width)
        }

    }

}
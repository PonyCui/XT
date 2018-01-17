package com.opensource.xtruntime

import android.graphics.*
import android.util.AttributeSet
import com.eclipsesource.v8.V8Object
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager

/**
 * Created by cuiminghui on 2017/9/6.
 */
class XTRImageView @JvmOverloads constructor(
        xtrContext: XTRContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTRView(xtrContext, attrs, defStyleAttr), XTRComponentInstance {

    var image: XTRImage? = null
        internal set

    var contentMode: Int = 0
        internal set

    private val sharedImagePaint = Paint()

    override fun drawContent(canvas: Canvas?) {
        super.drawContent(canvas)
        image?.let { image ->
            canvas?.let { canvas ->
                sharedImagePaint.reset()
                sharedImagePaint.isAntiAlias = true
                sharedImagePaint.isFilterBitmap = true
                sharedImagePaint.alpha = (alpha * 255).toInt()
                if (image.renderingMode == 2) {
                    sharedImagePaint.colorFilter = PorterDuffColorFilter(tintColor?.intColor() ?: 0, PorterDuff.Mode.SRC_IN)
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

    override fun intrinsicContentSize(width: Double): XTRSize? {
        return image?.size
    }

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRImageView"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_image", "xtr_image", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setImage", "xtr_setImage", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_contentMode", "xtr_contentMode", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setContentMode", "xtr_setContentMode", arrayOf(Int::class.java, String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTRImageView(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_image(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTRImageView)?.image?.objectUUID
        }

        fun xtr_setImage(imageRef: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRImageView)?.let {
                it.image = XTMemoryManager.find(imageRef) as? XTRImage
                it.setWillNotDraw(it.image == null)
                it.invalidate()
            }
        }

        fun xtr_contentMode(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTRImageView)?.contentMode ?: 0
        }

        fun xtr_setContentMode(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTRImageView)?.let {
                it.contentMode = value
                it.invalidate()
            }
        }

    }

}
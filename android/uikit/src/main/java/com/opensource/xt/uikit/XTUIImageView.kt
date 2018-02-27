package com.opensource.xt.uikit

import android.animation.ValueAnimator
import android.graphics.*
import android.util.AttributeSet
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTComponentInstance
import com.opensource.xt.core.XTMemoryManager

/**
 * Created by cuiminghui on 2017/9/6.
 */
class XTUIImageView @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTComponentInstance {

    var image: XTUIImage? = null
        internal set

    private var currentURL: String? = null

    var contentMode: Int = 0
        internal set

    private val sharedImagePaint = Paint()

    init {
        userInteractionEnabled = false
    }

    private var fadeInAnimator: ValueAnimator? = null

    fun cancelFadeInAnimation() {
        fadeInAnimator?.cancel()
        fadeInAnimator = null
        this.invalidate()
    }

    fun fadeIn() {
        fadeInAnimator = ValueAnimator.ofFloat(0.0f, 1.0f)
        fadeInAnimator?.duration = 300
        fadeInAnimator?.addUpdateListener {
            this.invalidate()
            if (it.animatedValue as Float >= 1.0f) {
                fadeInAnimator = null
            }
        }
        fadeInAnimator?.start()
    }

    override fun tintColorDidChange() {
        super.tintColorDidChange()
        invalidate()
    }

    override fun drawContent(canvas: Canvas?) {
        super.drawContent(canvas)
        image?.let { image ->
            canvas?.let { canvas ->
                sharedImagePaint.reset()
                sharedImagePaint.isAntiAlias = true
                sharedImagePaint.isFilterBitmap = true
                sharedImagePaint.alpha = (alpha * 255).toInt()
                fadeInAnimator?.let {
                    sharedImagePaint.alpha = ((it.animatedValue as Float) * alpha * 255).toInt()
                }
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

    override fun intrinsicContentSize(width: Double): XTUISize? {
        return image?.size
    }

    class JSExports(context: XTUIContext): XTUIView.JSExports(context) {

        val XTUIImage: XTUIImage.JSExports
            get() = context?.registeredComponents?.get("_XTUIImage") as XTUIImage.JSExports

        override val name: String = "_XTUIImageView"

        override val viewClass: Class<XTUIView> = XTUIImageView::class.java as Class<XTUIView>

        override fun exports(): V8Object {
            val exports = super.exports()
            exports.registerJavaMethod(this, "xtr_image", "xtr_image", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setImage", "xtr_setImage", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_loadImage", "xtr_loadImage", arrayOf(String::class.java, Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_contentMode", "xtr_contentMode", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setContentMode", "xtr_setContentMode", arrayOf(Int::class.java, String::class.java))
            return exports
        }

        fun xtr_image(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUIImageView)?.image?.objectUUID
        }

        fun xtr_setImage(imageRef: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIImageView)?.let {
                it.image = XTMemoryManager.find(imageRef) as? XTUIImage
                it.setWillNotDraw(it.image == null)
                it.invalidate()
            }
        }

        fun xtr_loadImage(url: String, fadeIn: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIImageView)?.let { imageView ->
                imageView.cancelFadeInAnimation()
                imageView.image = null
                imageView.currentURL = url
                XTUIImage.xtr_fromURL(url, { image, url ->
                    if (imageView.currentURL == url) {
                        imageView.image = image
                        imageView.setWillNotDraw(false)
                        imageView.invalidate()
                        if (fadeIn) {
                            imageView.fadeIn()
                        }
                    }
                })
            }
        }

        fun xtr_contentMode(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTUIImageView)?.contentMode ?: 0
        }

        fun xtr_setContentMode(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUIImageView)?.let {
                it.contentMode = value
                it.invalidate()
            }
        }

    }

}
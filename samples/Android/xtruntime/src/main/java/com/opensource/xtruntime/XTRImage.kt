package com.opensource.xtruntime

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.widget.ImageView
import org.mozilla.javascript.Function
import org.mozilla.javascript.NativeArray
import java.util.*

/**
 * Created by cuiminghui on 2017/9/6.
 */
class XTRImage: XTRComponent() {

    override val name: String = "XTRImage"

    fun xtr_fromAssets(named: Any?, scales: Any?, success: Any?, failure: Any?) {
        val named = named as? String ?: return
        val scales: List<Double> = (scales as? NativeArray)?.mapNotNull { return@mapNotNull it as? Double } ?: listOf()
        var targetScale: Double = scales?.let {
            it.forEach {
                if (it === xtrContext.appContext.resources.displayMetrics.density.toDouble()) {
                    return@let it
                }
            }
            return@let it.lastOrNull() ?: 1.0
        }
        if (named.startsWith("./assets/")) {
            val imgNamed = named.replaceFirst("./assets/", "") + (if (targetScale > 1) "@${targetScale.toInt()}x.png" else ".png")
            try {
                val inputStream = xtrContext.appContext.assets.open(imgNamed)
                val bitmap = BitmapFactory.decodeStream(inputStream)
                (success as? Function)?.let {
                    xtrContext.callWithArguments(it, arrayOf(
                            InnerObject(
                                    bitmap,
                                    targetScale.toInt(),
                                    XTRSize(bitmap.width / targetScale, bitmap.height / targetScale)
                            )
                    ))
                }
                print(true)
            } catch (e: Exception) {
                (failure as? Function)?.let {
                    xtrContext.callWithArguments(it, arrayOf())
                }
            }
        }
    }

    class InnerObject(val bitmap: Bitmap, val scale: Int, val size: XTRSize)

}
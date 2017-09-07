package com.opensource.xtruntime

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import org.mozilla.javascript.Function
import org.mozilla.javascript.NativeArray
import java.io.InputStream
import java.net.URL
import android.net.http.HttpResponseCache
import java.io.File
import java.io.IOException


/**
 * Created by cuiminghui on 2017/9/6.
 */
class XTRImage: XTRComponent() {

    override val name: String = "XTRImage"

    fun installCache(context: Context) {
        val cacheDir = File(context.applicationContext.cacheDir, "http")
        if (!cacheDir.exists()) {
            cacheDir.mkdirs()
        }
        try {
            HttpResponseCache.getInstalled()?.let { if (it.maxSize() >= 1024 * 1024 * 128 ) return }
            HttpResponseCache.install(cacheDir, 1024 * 1024 * 128)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun xtr_fromURL(url: Any?, success: Any?, failure: Any?) {
        val url = url as? String ?: return
        Thread({
            var inputStream: InputStream? = null
            installCache(xtrContext.appContext)
            try {
                URL(url)?.let {
                    val conn = it.openConnection()
                    conn.connectTimeout = 5000
                    conn.readTimeout = 15000
                    conn.useCaches = true
                    conn.connect()
                    inputStream = conn.getInputStream()
                    val bitmap = BitmapFactory.decodeStream(inputStream)
                    (success as? Function)?.let {
                        xtrContext.callWithArguments(it, arrayOf(
                                InnerObject(
                                        bitmap,
                                        1,
                                        XTRSize(bitmap.width.toDouble(), bitmap.height.toDouble())
                                )
                        ))
                    }
                    inputStream?.close()
                }
            } catch (e: Exception) {
                (failure as? Function)?.let {
                    xtrContext.callWithArguments(it, arrayOf())
                }
            } finally {
                inputStream?.close()
            }
        }).start()
    }

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
            var inputStream: InputStream? = null
            try {
                inputStream = xtrContext.appContext.assets.open(imgNamed)
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
                inputStream?.close()
            } catch (e: Exception) {
                (failure as? Function)?.let {
                    xtrContext.callWithArguments(it, arrayOf())
                }
                inputStream?.close()
            }
        }
    }

    class InnerObject(val bitmap: Bitmap, val scale: Int, val size: XTRSize)

}
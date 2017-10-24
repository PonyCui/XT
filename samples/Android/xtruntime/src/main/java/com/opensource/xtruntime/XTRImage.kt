package com.opensource.xtruntime

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.http.HttpResponseCache
import android.util.Base64
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Function
import com.eclipsesource.v8.V8Object
import java.io.File
import java.io.InputStream
import java.net.URI
import java.net.URL
import java.util.*


/**
 * Created by cuiminghui on 2017/9/6.
 */
class XTRImage: XTRComponent() {

    companion object {

        var runtime: V8? = null

    }

    override val name: String = "XTRImage"

    override fun v8Object(): V8Object? {
        XTRImage.runtime = xtrContext.v8Runtime
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "xtr_fromURL", "xtr_fromURL", arrayOf(String::class.java, V8Function::class.java, V8Function::class.java))
        v8Object.registerJavaMethod(this, "xtr_fromURLWithScale", "xtr_fromURLWithScale", arrayOf(String::class.java, Int::class.java, V8Function::class.java, V8Function::class.java))
        v8Object.registerJavaMethod(this, "xtr_fromAssets", "xtr_fromAssets", arrayOf(String::class.java, String::class.java, V8Array::class.java, V8Function::class.java, V8Function::class.java))
        v8Object.registerJavaMethod(this, "xtr_fromBase64", "xtr_fromBase64", arrayOf(String::class.java, Int::class.java, V8Function::class.java))
        v8Object.registerJavaMethod(this, "xtr_imageWithImageRenderingMode", "xtr_imageWithImageRenderingMode", arrayOf(V8Object::class.java, Int::class.java))
        return v8Object
    }

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

    fun xtr_fromURL(url: String, success: V8Function, failure: V8Function) {
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
                    xtrContext.callWithArguments(success, arrayOf(
                            InnerObject(
                                    bitmap,
                                    1,
                                    XTRSize(bitmap.width.toDouble(), bitmap.height.toDouble()),
                                    1
                            )
                    ))
                    inputStream?.close()
                }
            } catch (e: Exception) {
                xtrContext.callWithArguments(failure, arrayOf())
            } finally {
                inputStream?.close()
            }
        }).start()
    }

    fun xtr_fromURLWithScale(url: String, scale: Int, success: V8Function, failure: V8Function) {
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
                    xtrContext.callWithArguments(success, arrayOf(
                            InnerObject(
                                    bitmap,
                                    scale,
                                    XTRSize(bitmap.width.toDouble(), bitmap.height.toDouble()),
                                    1
                            )
                    ))
                    inputStream?.close()
                }
            } catch (e: Exception) {
                xtrContext.callWithArguments(failure, arrayOf())
            } finally {
                inputStream?.close()
            }
        }).start()
    }

    fun xtr_fromAssets(named: String, path: String, scales: V8Array, success: V8Function, failure: V8Function) {
        val scales: List<Int> = (0 until scales.length()).map { return@map scales.getInteger(it) }
        var targetScale: Int = scales?.let {
            it.forEach {
                if (it === xtrContext.appContext.resources.displayMetrics.density.toInt()) {
                    return@let it
                }
            }
            return@let it.lastOrNull() ?: 1
        }
        val imgNamed = named + (if (targetScale > 1) "@${targetScale.toInt()}x.png" else ".png")
        xtrContext.xtrBridge?.xtrSourceURL?.let { sourceURL ->
            val uri = URI(sourceURL)
            val relativeURL = uri.resolve("$path$imgNamed")
            xtr_fromURLWithScale(relativeURL.toString(), targetScale.toInt(), success, failure)
            return
        }
        var inputStream: InputStream? = null
        try {
            inputStream = xtrContext.appContext.assets.open(imgNamed)
            val bitmap = BitmapFactory.decodeStream(inputStream)
            xtrContext.callWithArguments(success, arrayOf(
                    InnerObject(
                            bitmap,
                            targetScale.toInt(),
                            XTRSize(bitmap.width / targetScale.toDouble(), bitmap.height / targetScale.toDouble()),
                            1
                    )
            ))
            inputStream?.close()
        } catch (e: Exception) {
            xtrContext.callWithArguments(failure, arrayOf())
            inputStream?.close()
        }
    }

    fun xtr_fromBase64(value: String, scale: Int, success: V8Function) {
        val value = value as? String ?: return
        val scale = scale as? Double ?: return
        try {
            val bytes = Base64.decode(value, 0)
            val bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
            xtrContext.callWithArguments(success, arrayOf(
                    InnerObject(
                            bitmap,
                            scale.toInt(),
                            XTRSize(bitmap.width / scale, bitmap.height / scale),
                            1
                    )
            ))
        } catch (e: Exception) {}
    }

    fun xtr_imageWithImageRenderingMode(image: V8Object, renderingMode: Int): V8Object {
        XTRUtils.toImage(image)?.let {
            XTRImage.InnerObject(it.bitmap, it.scale, it.size, renderingMode).requestV8Object(xtrContext.v8Runtime)
        }
        return image
    }

    class InnerObject(val bitmap: Bitmap, val scale: Int, val size: XTRSize, val renderingMode: Int): XTRObject {

        override val objectUUID: String = UUID.randomUUID().toString()

        override fun requestV8Object(runtime: V8): V8Object {
            val v8Object = super.requestV8Object(runtime)
            v8Object.registerJavaMethod(this, "imageWithImageRenderingMode", "imageWithImageRenderingMode", arrayOf(Int::class.java))
            return v8Object;
        }

        fun imageWithImageRenderingMode(renderingMode: Int): V8Object? {
            XTRImage.runtime?.let {
                XTRImage.InnerObject(this.bitmap, this.scale, this.size, renderingMode).requestV8Object(it)
            }
            return null
        }

    }

}
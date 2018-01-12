package com.opensource.xtruntime

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.http.HttpResponseCache
import android.util.Base64
import com.eclipsesource.v8.*
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager
import java.io.File
import java.io.InputStream
import java.net.URL


/**
 * Created by cuiminghui on 2017/9/6.
 */
class XTRImage(val bitmap: Bitmap, val scale: Int, val renderingMode: Int): XTRComponentInstance {

    override var objectUUID: String? = null

    var size: XTRSize = XTRSize(bitmap.width.toDouble() / scale.toDouble(), bitmap.height.toDouble() / scale.toDouble())

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRImage"

        override fun exports(): V8Object {
            installCache(context.appContext)
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "xtr_fromURL", "xtr_fromURL", arrayOf(String::class.java, V8Function::class.java, V8Function::class.java))
            exports.registerJavaMethod(this, "xtr_fromAssets", "xtr_fromAssets", arrayOf(String::class.java, V8Function::class.java, V8Function::class.java))
            exports.registerJavaMethod(this, "xtr_fromBase64", "xtr_fromBase64", arrayOf(String::class.java, Int::class.java, V8Function::class.java))
            exports.registerJavaMethod(this, "xtr_imageWithImageRenderingMode", "xtr_imageWithImageRenderingMode", arrayOf(String::class.java, Int::class.java))
            return exports
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
            val handler = android.os.Handler()
            val success = success.twin()
            val failure = failure.twin()
            Thread({
                var inputStream: InputStream? = null
                try {
                    URL(url)?.let {
                        val conn = it.openConnection()
                        conn.connectTimeout = 5000
                        conn.readTimeout = 15000
                        conn.useCaches = true
                        conn.connect()
                        inputStream = conn.getInputStream()
                        val bitmap = BitmapFactory.decodeStream(inputStream) ?: throw Exception()
                        handler.post {
                            val instance = XTRImage(bitmap, 1, 0)
                            val managedObject = XTManagedObject(instance)
                            instance.objectUUID = managedObject.objectUUID
                            XTMemoryManager.add(managedObject)
                            XTRContext.callWithArgument(success, managedObject.objectUUID)
                            success.release()
                            failure.release()
                        }
                    }
                } catch (e: Exception) {
                    handler.post {
                        XTRContext.callWithArgument(failure, null)
                        success.release()
                        failure.release()
                    }
                } finally {
                    inputStream?.close()
                }
            }).start()
        }

        private val scaleOptions = listOf(3, 2)

        fun xtr_fromAssets(named: String, success: V8Function, failure: V8Function) {
            this.context?.let { ctx ->
                ctx.bridge?.get()?.bundleAssets?.let { assets ->
                    var targetData: String? = null
                    var scale = Math.ceil(ctx.appContext.resources.displayMetrics.density.toDouble()).toInt()
                    assets.optString("$named@${scale}x.png", null)?.let {
                        targetData = it
                    } ?: kotlin.run {
                        scaleOptions.firstOrNull { return@firstOrNull assets.optString("$named@${it}x.png", null) != null }?.let {
                            targetData = assets.optString("$named@${it}x.png")
                            scale = it
                        }
                    }
                    targetData?.let {
                        xtr_fromBase64(it, scale, success)
                        failure?.release()
                    }
                }
            }
        }

        fun xtr_fromBase64(value: String, scale: Int, success: V8Function) {
            val handler = android.os.Handler()
            val success = success.twin()
            try {
                val bytes = Base64.decode(value, 0)
                val bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.size) ?: throw Exception()
                handler.post {
                    val instance = XTRImage(bitmap, scale, 0)
                    val managedObject = XTManagedObject(instance)
                    instance.objectUUID = managedObject.objectUUID
                    XTMemoryManager.add(managedObject)
                    XTRContext.callWithArgument(success, managedObject.objectUUID)
                    success.release()
                }
            } catch (e: Exception) {
                success.release()
            }
        }

        fun xtr_imageWithImageRenderingMode(imageRef: String, renderingMode: Int): String? {
            (XTMemoryManager.find(imageRef) as? XTRImage)?.let {
                val instance = XTRImage(it.bitmap, it.scale, renderingMode)
                val managedObject = XTManagedObject(instance)
                instance.objectUUID = managedObject.objectUUID
                XTMemoryManager.add(managedObject)
                return managedObject.objectUUID
            }
            return null
        }

    }

}
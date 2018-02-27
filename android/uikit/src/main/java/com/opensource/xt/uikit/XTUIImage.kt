package com.opensource.xt.uikit

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.http.HttpResponseCache
import android.util.Base64
import com.eclipsesource.v8.*
import com.opensource.xt.core.*
import java.io.File
import java.io.InputStream
import java.net.URL


/**
 * Created by cuiminghui on 2017/9/6.
 */
class XTUIImage(val bitmap: Bitmap, val scale: Int, val renderingMode: Int): XTComponentInstance {

    override var objectUUID: String? = null

    var size: XTUISize = XTUISize(bitmap.width.toDouble() / scale.toDouble(), bitmap.height.toDouble() / scale.toDouble())

    class JSExports(val context: XTUIContext): XTComponentExport() {

        override val name: String = "_XTUIImage"

        override fun exports(): V8Object {
            installCache(context.appContext)
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "xtr_fromURL", "xtr_fromURL", arrayOf(String::class.java, V8Function::class.java, V8Function::class.java))
            exports.registerJavaMethod(this, "xtr_fromBase64", "xtr_fromBase64", arrayOf(String::class.java, Int::class.java))
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
                            val instance = XTUIImage(bitmap, 1, 0)
                            val managedObject = XTManagedObject(instance)
                            instance.objectUUID = managedObject.objectUUID
                            XTMemoryManager.add(managedObject)
                            XTContext.callWithArgument(success, managedObject.objectUUID)
                            XTContext.release(success)
                            XTContext.release(failure)
                        }
                    }
                } catch (e: Exception) {
                    handler.post {
                        XTContext.callWithArgument(failure, null)
                        XTContext.release(success)
                        XTContext.release(failure)
                    }
                } finally {
                    inputStream?.close()
                }
            }).start()
        }

        fun xtr_fromURL(url: String, success: (image: XTUIImage, url: String) -> Unit) {
            val handler = android.os.Handler()
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
                            val instance = XTUIImage(bitmap, 1, 0)
                            val managedObject = XTManagedObject(instance)
                            instance.objectUUID = managedObject.objectUUID
                            XTMemoryManager.add(managedObject)
                            success(instance, url)
                        }
                    }
                } catch (e: Exception) { } finally {
                    inputStream?.close()
                }
            }).start()
        }

        private val scaleOptions = listOf(3, 2)

        fun xtr_fromBase64(value: String, scale: Int): String? {
            try {
                val bytes = Base64.decode(value, 0)
                val bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.size) ?: throw Exception()
                val instance = XTUIImage(bitmap, scale, 0)
                val managedObject = XTManagedObject(instance)
                instance.objectUUID = managedObject.objectUUID
                XTMemoryManager.add(managedObject)
                return managedObject.objectUUID
            } catch (e: Exception) { }
            return null
        }

        fun xtr_imageWithImageRenderingMode(imageRef: String, renderingMode: Int): String? {
            (XTMemoryManager.find(imageRef) as? XTUIImage)?.let {
                val instance = XTUIImage(it.bitmap, it.scale, renderingMode)
                val managedObject = XTManagedObject(instance)
                instance.objectUUID = managedObject.objectUUID
                XTMemoryManager.add(managedObject)
                return managedObject.objectUUID
            }
            return null
        }

    }

}
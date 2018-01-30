package com.opensource.xt.foundation

import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.*
import okhttp3.*
import java.util.concurrent.TimeUnit

/**
 * Created by cuiminghui on 2018/1/30.
 */
class XTFURLRequest(URLString: String, val timeout: Int, cachePolicy: Int): XTComponentInstance {

    override var objectUUID: String? = null

    private val requestBuilder: Request.Builder = Request.Builder().url(URLString).cacheControl(
            when (cachePolicy) {
                0 -> CacheControl.Builder().build()
                1 -> CacheControl.FORCE_NETWORK
                2 -> CacheControl.Builder().maxStale(Integer.MAX_VALUE, TimeUnit.SECONDS).build()
                3 -> CacheControl.FORCE_CACHE
                else -> CacheControl.Builder().build()
            }
    )

    var method: String = "GET"
    var contentType: String? = null
    var bodyBytes: ByteArray? = null

    fun build(): Request {
        try {
            val requestBody = bodyBytes?.let { RequestBody.create(MediaType.parse(this.contentType ?: "application/octet-stream"), it) }
            requestBuilder.method(this.method, requestBody)
        } catch (e: Exception) {}
        return requestBuilder.build()
    }

    fun setHTTPHeader(value: String, key: String) {
        requestBuilder.header(key, value)
        if (key == "Content-Type") {
            contentType = value
        }
    }

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTFURLRequest"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf(String::class.java, Int::class.java, Int::class.java))
            exports.registerJavaMethod(this, "xtr_setHTTPMethod", "xtr_setHTTPMethod", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_setHTTPHeader", "xtr_setHTTPHeader", arrayOf(String::class.java, String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_setHTTPBodyFromString", "xtr_setHTTPBodyFromString", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_setHTTPBodyFromData", "xtr_setHTTPBodyFromData", arrayOf(String::class.java, String::class.java))

            return exports
        }

        fun create(URLString: String, timeout: Int, cachePolicy: Int): String {
            val instance = XTFURLRequest(URLString, timeout, cachePolicy)
            val managedObject = XTManagedObject(instance)
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_setHTTPMethod(value: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTFURLRequest)?.method = value
        }

        fun xtr_setHTTPHeader(value: String, key: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTFURLRequest)?.setHTTPHeader(value, key)
        }

        fun xtr_setHTTPBodyFromString(value: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTFURLRequest)?.bodyBytes = value.toByteArray()
        }

        fun xtr_setHTTPBodyFromData(dataRef: String, objectRef: String) {
            val data = XTMemoryManager.find(dataRef) as? XTFData ?: return
            (XTMemoryManager.find(objectRef) as? XTFURLRequest)?.contentType = "application/octet-stream"
            (XTMemoryManager.find(objectRef) as? XTFURLRequest)?.bodyBytes = data.bytes
        }

    }

}
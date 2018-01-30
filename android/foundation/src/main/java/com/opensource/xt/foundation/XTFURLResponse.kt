package com.opensource.xt.foundation

import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.*
import okhttp3.Response

/**
 * Created by cuiminghui on 2018/1/30.
 */
class XTFURLResponse(val response: Response): XTComponentInstance {

    override var objectUUID: String? = null

    init {
        val managedObject = XTManagedObject(this)
        this.objectUUID = managedObject.objectUUID
        XTMemoryManager.add(managedObject)
    }

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTFURLResponse"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "xtr_URLString", "xtr_URLString", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_MIMEType", "xtr_MIMEType", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_expectedContentLength", "xtr_expectedContentLength", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_textEncodingName", "xtr_textEncodingName", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_suggestedFilename", "xtr_suggestedFilename", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_statusCode", "xtr_statusCode", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_allHeaderFields", "xtr_allHeaderFields", arrayOf(String::class.java))
            return exports
        }

        fun xtr_URLString(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTFURLResponse)?.response?.request()?.url()?.toString()
        }

        fun xtr_MIMEType(objectRef: String): String {
            val contentType = (XTMemoryManager.find(objectRef) as? XTFURLResponse)?.response?.header("Content-Type") ?: ""
            return if (contentType.contains(";")) contentType.split(";").first().trim() else contentType.trim()
        }

        fun xtr_expectedContentLength(objectRef: String): Int {
            return try {
                (XTMemoryManager.find(objectRef) as? XTFURLResponse)?.response?.header("Content-Length")?.toInt()
            } catch (e: Exception) { return 0 } ?: 0
        }

        fun xtr_textEncodingName(objectRef: String): String {
            val contentType = (XTMemoryManager.find(objectRef) as? XTFURLResponse)?.response?.header("Content-Type") ?: ""
            return if (contentType.contains("charset=")) contentType.split("charset=").last().trim() else "UTF-8"
        }

        fun xtr_suggestedFilename(objectRef: String): String {
            val disposition = (XTMemoryManager.find(objectRef) as? XTFURLResponse)?.response?.header("Content-Disposition") ?: "Unknown"
            return if (disposition.contains("filename=")) disposition.split("filename=").last().replace("\"", "").trim() else "Unknown"
        }

        fun xtr_statusCode(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTFURLResponse)?.response?.code() ?: 0
        }

        fun xtr_allHeaderFields(objectRef: String): V8Object {
            val v8Object = V8Object(context.runtime)
            (XTMemoryManager.find(objectRef) as? XTFURLResponse)?.response?.headers()?.let { headers ->
                headers.names()?.forEach {
                    v8Object.add(it, headers[it])
                }
            }
            return v8Object
        }

    }

}
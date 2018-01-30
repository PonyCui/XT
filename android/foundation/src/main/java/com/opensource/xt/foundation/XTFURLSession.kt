package com.opensource.xt.foundation

import com.eclipsesource.v8.V8Function
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTContext
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager
import okhttp3.*
import java.io.IOException
import java.util.concurrent.TimeUnit

/**
 * Created by cuiminghui on 2018/1/30.
 */
class XTFURLSession {

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTFURLSession"

        val cache = Cache(context.appContext.cacheDir, 1024 * 1024 * 50)

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "dataTaskWithURL", "dataTaskWithURL", arrayOf(String::class.java, V8Function::class.java))
            exports.registerJavaMethod(this, "dataTaskWithRequest", "dataTaskWithRequest", arrayOf(String::class.java, V8Function::class.java))
            return exports
        }

        fun dataTaskWithURL(URLString: String, callback: V8Function): String {
            try {
                val req = XTFURLRequest(URLString, 15, 0)
                val client = OkHttpClient.Builder()
                        .cache(cache)
                        .connectTimeout(req.timeout.toLong(), TimeUnit.SECONDS)
                        .build()
                val task = XTFURLSessionTask(context, client.newCall(req.build()), callback.twin())
                val managedObject = XTManagedObject(task)
                XTMemoryManager.add(managedObject)
                return managedObject.objectUUID
            } catch (e: Exception) {
                throw e
                println(true)
            }

        }

        fun dataTaskWithRequest(reqRef: String, callback: V8Function): String {
            val req = XTMemoryManager.find(reqRef) as? XTFURLRequest ?: return ""
            val client = OkHttpClient.Builder().connectTimeout(req.timeout.toLong(), TimeUnit.SECONDS).build()
            val task = XTFURLSessionTask(context, client.newCall(req.build()), callback.twin())
            val managedObject = XTManagedObject(task)
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

    }
}
package com.opensource.xt.foundation

import android.content.Context.MODE_PRIVATE
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTContext
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager
import java.io.File

/**
 * Created by cuiminghui on 2018/1/29.
 */
class XTFFileManager {

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTFFileManager"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "writeData", "writeData", arrayOf(String::class.java, String::class.java, Int::class.java))
            exports.registerJavaMethod(this, "readData", "readData", arrayOf(String::class.java, Int::class.java))
            exports.registerJavaMethod(this, "fileExists", "fileExists", arrayOf(String::class.java, Int::class.java))
            exports.registerJavaMethod(this, "deleteFile", "deleteFile", arrayOf(String::class.java, Int::class.java))
            exports.registerJavaMethod(this, "list", "list", arrayOf(String::class.java, Int::class.java))
            return exports
        }

        private fun buildPath(path: String, location: Int): File {
            when(location) {
                0 -> {
                    val baseDir = context.appContext.getDir("Document", MODE_PRIVATE).absolutePath
                    return File("$baseDir/$path")
                }
                1 -> {
                    val baseDir = context.appContext.cacheDir.absolutePath + "/Caches"
                    return File("$baseDir/$path")
                }
                2 -> {
                    val baseDir = context.appContext.cacheDir.absolutePath + "/tmp"
                    return File("$baseDir/$path")
                }
                3 -> {
                    val baseDir = context.appContext.externalCacheDir.absolutePath
                    return File("$baseDir/$path")
                }
                else -> {
                    val baseDir = context.appContext.cacheDir.absolutePath + "/tmp"
                    return File("$baseDir/$path")
                }
            }
        }

        private fun mkdirs(file: File) {
            file.parentFile.mkdirs()
        }

        fun writeData(dataRef: String, path: String, location: Int): Boolean {
            val data = XTMemoryManager.find(dataRef) as? XTFData ?: return false
            try {
                val file = buildPath(path, location)
                mkdirs(file)
                file.writeBytes(data.bytes)
                return true
            } catch (e: Exception) {
                e.printStackTrace()
                return false
            }
        }

        fun readData(path: String, location: Int): String? {
            try {
                val file = buildPath(path, location)
                val data = XTFData(file.readBytes())
                val managedObject = XTManagedObject(data)
                data.objectUUID = managedObject.objectUUID
                XTMemoryManager.add(managedObject)
                return managedObject.objectUUID
            } catch (e: Exception) {
                e.printStackTrace()
                return null
            }
        }

        fun fileExists(path: String, location: Int): Boolean {
            try {
                val file = buildPath(path, location)
                return file.exists()
            } catch (e: Exception) {
                e.printStackTrace()
                return false
            }
        }

        fun deleteFile(path: String, location: Int): Boolean {
            try {
                val file = buildPath(path, location)
                return file.delete()
            } catch (e: Exception) {
                e.printStackTrace()
                return false
            }
        }

        fun list(path: String, location: Int): V8Array {
            try {
                val file = buildPath(path, location)
                val output = V8Array(context.runtime)
                file.listFiles().filter { it.isFile }.forEach {
                    output.push(it.name)
                }
                return output
            } catch (e: Exception) {
                e.printStackTrace()
                return V8Array(context.runtime)
            }
        }

    }

}
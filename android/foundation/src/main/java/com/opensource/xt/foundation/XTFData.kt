package com.opensource.xt.foundation

import android.util.Base64
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8ArrayBuffer
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.*
import java.nio.ByteBuffer
import java.security.MessageDigest
import java.util.*

/**
 * Created by cuiminghui on 2018/1/28.
 */

class XTFData(val bytes: ByteArray): XTComponentInstance {

    override var objectUUID: String? = null

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTFData"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "createWithString", "createWithString", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "createWithBytes", "createWithBytes", arrayOf(V8Array::class.java))
            exports.registerJavaMethod(this, "createWithData", "createWithData", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "createWithBase64EncodedString", "createWithBase64EncodedString", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "createWithBase64EncodedData", "createWithBase64EncodedData", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "isEqualTo", "isEqualTo", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "getBytes", "getBytes", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "length", "length", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "base64EncodedData", "base64EncodedData", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "base64EncodedString", "base64EncodedString", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "utf8String", "utf8String", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "md5", "md5", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "sha1", "sha1", arrayOf(String::class.java))
            return exports
        }

        fun createWithString(stringValue: String): String {
            val data = XTFData(stringValue.toByteArray())
            val managedObject = XTManagedObject(data)
            data.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun createWithBytes(bufferView: V8Array): String {
            val bytes = bufferView.getBytes(0, bufferView.length())
            val data = XTFData(bytes)
            val managedObject = XTManagedObject(data)
            data.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun createWithData(dataRef: String): String? {
            val originData = XTMemoryManager.find(dataRef) as? XTFData ?: return null
            val data = XTFData(originData.bytes)
            val managedObject = XTManagedObject(data)
            data.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun createWithBase64EncodedString(base64EncodedString: String): String? {
            val bytes = try {
                Base64.decode(base64EncodedString, 0)
            } catch (e: Exception) { return null }
            val data = XTFData(bytes)
            val managedObject = XTManagedObject(data)
            data.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun createWithBase64EncodedData(dataRef: String): String? {
            val base64EncodedData = XTMemoryManager.find(dataRef) as? XTFData ?: return null
            val bytes = try {
                Base64.decode(base64EncodedData.bytes, 0)
            } catch (e: Exception) { return null }
            val data = XTFData(bytes)
            val managedObject = XTManagedObject(data)
            data.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun isEqualTo(toObjectRef: String, objectRef: String): Boolean {
            val toObject = XTMemoryManager.find(toObjectRef) as? XTFData ?: return false
            val obj = XTMemoryManager.find(objectRef) as? XTFData ?: return false
            return Arrays.equals(toObject.bytes, obj.bytes)
        }

        fun getBytes(dataRef: String): V8Array? {
            val data = XTMemoryManager.find(dataRef) as? XTFData ?: return null
            val value = V8Array(context.runtime)
            data.bytes.forEach {
                value.push(it.toInt())
            }
            return value
        }

        fun length(dataRef: String): Int {
            val data = XTMemoryManager.find(dataRef) as? XTFData ?: return 0
            return data.bytes.size
        }

        fun base64EncodedData(dataRef: String): String? {
            val data = XTMemoryManager.find(dataRef) as? XTFData ?: return null
            val encodedData = Base64.encode(data.bytes, 0)
            val managedObject = XTManagedObject(encodedData)
            data.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun base64EncodedString(dataRef: String): String? {
            val data = XTMemoryManager.find(dataRef) as? XTFData ?: return null
            return String(Base64.encode(data.bytes, 0)).trim()
        }

        fun utf8String(dataRef: String): String? {
            val data = XTMemoryManager.find(dataRef) as? XTFData ?: return null
            return String(data.bytes)
        }

        fun md5(dataRef: String): String? {
            val data = XTMemoryManager.find(dataRef) as? XTFData ?: return null
            val md5 = MessageDigest.getInstance("MD5")
            md5.update(data.bytes);
            val resultArray = md5.digest()
            return byteArrayToHex(resultArray).toUpperCase()
        }

        fun sha1(dataRef: String): String? {
            val data = XTMemoryManager.find(dataRef) as? XTFData ?: return null
            val md5 = MessageDigest.getInstance("SHA1")
            md5.update(data.bytes);
            val resultArray = md5.digest()
            return byteArrayToHex(resultArray).toUpperCase()
        }

        private fun byteArrayToHex(byteArray: ByteArray): String {
            val hexDigits = charArrayOf('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F')
            val resultCharArray = CharArray(byteArray.size * 2)
            var index = 0
            for (b in byteArray) {
                resultCharArray[index++] = hexDigits[b.toInt().ushr(4) and 0xf]
                resultCharArray[index++] = hexDigits[b.toInt() and 0xf]
            }
            return String(resultCharArray)
        }

    }

}
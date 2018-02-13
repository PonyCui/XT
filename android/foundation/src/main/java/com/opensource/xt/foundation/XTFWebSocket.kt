package com.opensource.xt.foundation

import android.os.Handler
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.*
import org.java_websocket.client.WebSocketClient
import org.java_websocket.drafts.Draft
import org.java_websocket.drafts.Draft_6455
import org.java_websocket.handshake.ServerHandshake
import java.lang.Exception
import java.net.URI
import java.nio.ByteBuffer

/**
 * Created by cuiminghui on 2018/1/30.
 */
class XTFWebSocket(val context: XTContext, URLString: String): WebSocketClient(URI.create(URLString), Draft_6455()), XTComponentInstance {

    override var objectUUID: String? = null

    init {
        Handler().postDelayed({
            connect()
        }, 100)
    }

    fun scriptObject(): V8Object? {
        return context.evaluateScript("objectRefs['$objectUUID']") as? V8Object
    }

    override fun onOpen(handshakedata: ServerHandshake?) {
        context.sharedHandler.post {
            scriptObject()?.let {
                XTContext.invokeMethod(it, "handleOpen")
                XTContext.release(it)
            }
        }
    }

    override fun onClose(code: Int, reason: String?, remote: Boolean) {
        context.sharedHandler.post {
            scriptObject()?.let {
                XTContext.invokeMethod(it, "handleClose", listOf(code, reason ?: ""))
                XTContext.release(it)
            }
        }
    }

    override fun onMessage(message: String?) {
        context.sharedHandler.post {
            scriptObject()?.let {
                XTContext.invokeMethod(it, "handleStringMessage", listOf(message ?: ""))
                XTContext.release(it)
            }
        }
    }

    override fun onMessage(bytes: ByteBuffer?) {
        val bytes = bytes ?: return
        val byteArray = ByteArray(bytes.remaining())
        bytes.get(byteArray)
        context.sharedHandler.post {
            scriptObject()?.let {
                val data = XTFData(byteArray)
                val managedObject = XTManagedObject(data)
                data.objectUUID = managedObject.objectUUID
                XTMemoryManager.add(managedObject)
                XTContext.invokeMethod(it, "handleStringMessage", listOf(managedObject.objectUUID))
                XTContext.release(it)
            }
        }
    }

    override fun onError(ex: Exception?) {
        context.sharedHandler.post {
            scriptObject()?.let {
                XTContext.invokeMethod(it, "handleFail", listOf(ex?.message ?: ""))
                XTContext.release(it)
            }
        }
    }


    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTFWebSocket"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_sendData", "xtr_sendData", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_sendString", "xtr_sendString", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_close", "xtr_close", arrayOf(String::class.java))
            return exports
        }

        fun create(URLString: String): String {
            val instance = XTFWebSocket(context, URLString)
            val managedObject = XTManagedObject(instance)
            instance.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_sendData(dataRef: String, objectRef: String) {
            val data = XTMemoryManager.find(dataRef) as? XTFData ?: return
            val socket = XTMemoryManager.find(objectRef) as? XTFWebSocket ?: return
            socket.send(data.bytes)
        }

        fun xtr_sendString(stringValue: String, objectRef: String) {
            val socket = XTMemoryManager.find(objectRef) as? XTFWebSocket ?: return
            socket.send(stringValue)
        }

        fun xtr_close(objectRef: String) {
            val socket = XTMemoryManager.find(objectRef) as? XTFWebSocket ?: return
            socket.close()
        }

    }

}
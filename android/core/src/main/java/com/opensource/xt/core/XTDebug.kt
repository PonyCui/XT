package com.opensource.xt.core
import android.content.Context
import android.net.Uri
import android.os.Handler
import android.util.Base64
import com.eclipsesource.v8.V8Object
import org.java_websocket.WebSocket
import org.java_websocket.client.WebSocketClient
import org.java_websocket.handshake.ServerHandshake
import org.json.JSONObject
import java.io.File
import java.lang.Exception
import java.net.URI

/**
 * Created by cuiminghui on 2018/2/1.
 */

interface XTDebugDelegate {

    fun debuggerDidTerminal()
    fun debuggerDidReload()
    fun debuggerEval(code: String, callback: (value: String) -> Unit)

}

class XTDebug {

    var sourceURL: String? = null
    var delegate: XTDebugDelegate? = null
    var debugContext: XTContext? = null
    private var context: Context? = null
    private var socketHandler = Handler()
    private var socket: WebSocket? = null
        set(value) {
            field?.let { it.close() }
            field = value
        }
    private var breakpointLocking = false
    private var breakpointStepping = false

    private fun connectWithIP(IP: String, port: String, context: Context) {
        this.context = context
        this.socket = object: WebSocketClient(URI.create("ws://$IP:$port/")) {

            init {
                connect()
            }

            override fun onOpen(data: ServerHandshake?) {
                send("Hello, World!")
            }

            override fun onClose(code: Int, reason: String?, remote: Boolean) {
                if (remote) {
                    handleStop()
                    socketHandler.postDelayed({
                        connectWithIP(IP, port, context)
                    }, 1000)
                }
            }

            override fun onMessage(message: String?) {
                try {
                    val obj = JSONObject(message)
                    when (obj.optString("action")) {
                        "reload" -> {
                            handleReload(obj)
                        }
                        "clearBreakPoint" -> {
                            handleClearBreakPoint(obj)
                        }
                        "clearBreakPoints" -> {
                            handleClearBreakPoints(obj)
                        }
                        "setBreakPoint" -> {
                            handleSetBreakPoint(obj)
                        }
                        "continue" -> {
                            handleContinue()
                        }
                        "stop" -> {
                            handleStop()
                        }
                        "step" -> {
                            handleStep()
                        }
                        "eval" -> {
                            handleEval(obj)
                        }
                        else -> {
                            println(false)
                        }
                    }
                } catch (e: Exception) {}
            }

            override fun onError(ex: Exception?) {
                socketHandler.postDelayed({
                    connectWithIP(IP, port, context)
                }, 1000)
            }

        }
    }

    private fun handleReload(obj: JSONObject) {
        obj.optString("source")?.let {
            val sourceFile = File(context?.cacheDir, System.currentTimeMillis().toString() + ".js")
            sourceFile.writeBytes(Base64.decode(it, 0))
            this.sourceURL = Uri.fromFile(sourceFile).toString()
            this.delegate?.debuggerDidReload()
        }
    }

    private fun handleClearBreakPoint(obj: JSONObject) {
        val bpIdentifier = obj.optString("path") + ":" + obj.optString("line")
        debugContext?.sharedHandler?.post {
            try {
                (debugContext?.evaluateScript("window.XTDebug") as? V8Object)?.let {
                    XTContext.invokeMethod(it, "clearBreakpoint", listOf(bpIdentifier))
                }
            } catch (e: Exception) {}
        }
    }

    private fun handleClearBreakPoints(obj: JSONObject) {
        val path = obj.optString("path")
        debugContext?.sharedHandler?.post {
            try {
                (debugContext?.evaluateScript("window.XTDebug") as? V8Object)?.let {
                    XTContext.invokeMethod(it, "clearBreakpoints", listOf(path))
                }
            } catch (e: Exception) {}
        }
    }

    private fun handleSetBreakPoint(obj: JSONObject) {
        val bpIdentifier = obj.optString("path") + ":" + obj.optString("line")
        debugContext?.sharedHandler?.post {
            try {
                (debugContext?.evaluateScript("window.XTDebug") as? V8Object)?.let {
                    XTContext.invokeMethod(it, "setBreakpoint", listOf(bpIdentifier))
                }
            } catch (e: Exception) {}
        }
    }

    private fun handleBreak(bpIdentifier: String, T: String, S: String) {
        this.sendBreak(bpIdentifier, T, S)
        this.breakpointLocking = true
    }

    private fun handleContinue() {
        this.breakpointStepping = false
        this.breakpointLocking = false
    }

    private fun handleStep() {
        this.breakpointStepping = true
        this.breakpointLocking = false
        socketHandler.postDelayed({
            this.breakpointStepping = false
        }, 100)
    }

    private fun handleStop() {
        this.breakpointStepping = false
        this.breakpointLocking = false
        socketHandler.post {
            this.delegate?.debuggerDidTerminal()
        }
    }

    private fun sendBreak(bpIdentifier: String, T: String, S: String) {
        try {
            val obj = JSONObject()
            obj.put("type", "break")
            obj.put("bpIdentifier", bpIdentifier)
            obj.put("this", T)
            obj.put("scope", S)
            this.socket?.send(obj.toString())
        } catch (e: Exception) { e.printStackTrace() }
    }

    private fun handleEval(obj: JSONObject) {
        val expression = obj.optString("expression") ?: return
        debugContext?.sharedHandler?.post {
            try {
                (debugContext?.evaluateScript("window.XTDebug") as? V8Object)?.let {
                    sendLog(XTContext.invokeMethod(it, "eval", listOf(expression)) as? String ?: "undefined", true)
                }
            } catch (e: Exception) {}
        }
    }

    fun sendLog(content: String, isEval: Boolean = false) {
        debugContext?.sharedHandler?.post {
            try {
                val bpIdentifier = debugContext?.evaluateScript("window.XTDebug.currentBpIdentifier") as? String ?: ""
                val obj = JSONObject()
                obj.put("type", "console.log")
                obj.put("payload", Base64.encodeToString(content.toByteArray(), 0))
                obj.put("bpIdentifier", if (isEval) "console" else bpIdentifier)
                this.socket?.send(obj.toString())
            } catch (e: Exception) {}
        }
    }

    companion object {

        val sharedDebugger = XTDebug()

        fun debugWithIP(IP: String, port: String, context: Context) {
            sharedDebugger.connectWithIP(IP, port, context)
        }

    }

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTDebug"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "xtr_break", "xtr_break", arrayOf(String::class.java, String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_wait", "xtr_wait", arrayOf())
            exports.registerJavaMethod(this, "xtr_locking", "xtr_locking", arrayOf())
            exports.registerJavaMethod(this, "xtr_stepping", "xtr_stepping", arrayOf())
            return exports
        }

        fun xtr_break(bpIdentifier: String, T: String, S: String) {
            sharedDebugger.handleBreak(bpIdentifier, T, S)
        }

        fun xtr_wait() {
            try {
                Thread.sleep(100)
            } catch (e: Exception) { sharedDebugger.breakpointLocking = false }
        }

        fun xtr_locking(): Boolean {
            return sharedDebugger.breakpointLocking
        }

        fun xtr_stepping(): Boolean {
            return sharedDebugger.breakpointStepping
        }

    }

}
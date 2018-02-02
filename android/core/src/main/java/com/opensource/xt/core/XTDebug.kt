package com.opensource.xt.core
import android.content.Context
import org.java_websocket.WebSocket
import org.java_websocket.client.WebSocketClient
import org.java_websocket.handshake.ServerHandshake
import java.lang.Exception
import java.net.URI

/**
 * Created by cuiminghui on 2018/2/1.
 */
class XTDebug() {

    private var context: Context? = null
    private var socket: WebSocket? = null
        set(value) {
            field?.let { it.close() }
            field = value
        }

    fun connectWithIP(IP: String, port: String, context: Context) {
        this.context = context
        this.socket = object: WebSocketClient(URI.create("ws://$IP:$port/")) {

            init {
                connect()
            }

            override fun onOpen(handshakedata: ServerHandshake?) {
                println(true)
            }

            override fun onClose(code: Int, reason: String?, remote: Boolean) {
                println(true)
            }

            override fun onMessage(message: String?) {
                println(true)
            }

            override fun onError(ex: Exception?) {
                println(true)
            }

        }
    }

    companion object {

        val sharedDebugger = XTDebug()

        fun debugWithIP(IP: String, port: String, context: Context) {
            sharedDebugger.connectWithIP(IP, port, context)
        }

    }

}
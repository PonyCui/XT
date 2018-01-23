package com.opensource.xtruntime

import android.app.AlertDialog
import android.graphics.Color
import android.graphics.PorterDuff
import android.view.KeyEvent
import android.view.Window
import android.view.WindowManager
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import android.widget.TextView
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Function
import com.eclipsesource.v8.V8Object

/**
 * Created by cuiminghui on 2018/1/22.
 */
class XTRModal {

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRModal"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "showAlert", "showAlert", arrayOf(V8Object::class.java, V8Object::class.java))
            exports.registerJavaMethod(this, "showConfirm", "showConfirm", arrayOf(V8Object::class.java, V8Object::class.java, V8Object::class.java))
            exports.registerJavaMethod(this, "showPrompt", "showPrompt", arrayOf(V8Object::class.java, V8Object::class.java, V8Object::class.java))
            return exports
        }

        fun showAlert(params: V8Object, callback: V8Object) {
            val callbackTwin = callback.twin()
            val dialogBuilder = AlertDialog.Builder(context.appContext)
            dialogBuilder.setTitle(params.getString("message") ?: "")
            dialogBuilder.setNegativeButton(params.getString("buttonTitle") ?: "好的", { _, _ ->
                (callbackTwin as? V8Function)?.call(null, null)
                callbackTwin.release()
            })
            dialogBuilder.create().show()
        }

        fun showConfirm(params: V8Object, resolver: V8Object, rejected: V8Object) {
            val resolverTwin = resolver.twin()
            val rejectedTwin = rejected.twin()
            val dialogBuilder = AlertDialog.Builder(context.appContext)
            dialogBuilder.setTitle(params.getString("message") ?: "")
            dialogBuilder.setPositiveButton(params.getString("confirmTitle") ?: "确认", { _, _ ->
                (resolverTwin as? V8Function)?.call(null, null)
                resolverTwin.release()
                rejectedTwin.release()
            })
            dialogBuilder.setNegativeButton(params.getString("cancelTitle") ?: "取消", { _, _ ->
                (rejectedTwin as? V8Function)?.call(null, null)
                resolverTwin.release()
                rejectedTwin.release()
            })
            dialogBuilder.setOnCancelListener {
                (rejectedTwin as? V8Function)?.call(null, null)
                resolverTwin.release()
                rejectedTwin.release()
            }
            dialogBuilder.create().show()
        }

        fun showPrompt(params: V8Object, resolver: V8Object, rejected: V8Object) {
            val resolverTwin = resolver.twin()
            val rejectedTwin = rejected.twin()
            val dialogBuilder = AlertDialog.Builder(context.appContext)
            val editText = EditText(context.appContext)
            editText.setSingleLine(true)
            editText.imeOptions = EditorInfo.IME_ACTION_GO
            editText.hint = params.getString("placeholder") ?: ""
            params.getString("defaultValue")?.let {
                editText.text.clear()
                editText.text.append(it)
            }
            dialogBuilder.setTitle(params.getString("message") ?: "")
            dialogBuilder.setPositiveButton(params.getString("confirmTitle") ?: "确认", { _, _ ->
                (resolverTwin as? V8Function)?.let {
                    val returnParams = V8Array(it.runtime)
                    returnParams.push(editText.editableText.toString())
                    it.call(null, returnParams)
                    returnParams.release()
                }
                resolverTwin.release()
                rejectedTwin.release()
            })
            dialogBuilder.setNegativeButton(params.getString("cancelTitle") ?: "取消", { _, _ ->
                (rejectedTwin as? V8Function)?.call(null, null)
                resolverTwin.release()
                rejectedTwin.release()
            })
            dialogBuilder.setCancelable(false)
            val dialog = dialogBuilder.create()
            editText.setOnEditorActionListener { v, actionId, event ->
                dialog.dismiss()
                (resolverTwin as? V8Function)?.let {
                    val returnParams = V8Array(it.runtime)
                    returnParams.push(editText.editableText.toString())
                    it.call(null, returnParams)
                    returnParams.release()
                }
                resolverTwin.release()
                rejectedTwin.release()
                return@setOnEditorActionListener true
            }
            dialog.setView(editText, (20.0 * editText.resources.displayMetrics.density).toInt(), (20.0 * editText.resources.displayMetrics.density).toInt(), (20.0 * editText.resources.displayMetrics.density).toInt(), (20.0 * editText.resources.displayMetrics.density).toInt())
            dialog.show()
        }

    }

}
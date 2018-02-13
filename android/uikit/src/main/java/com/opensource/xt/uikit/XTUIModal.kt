package com.opensource.xt.uikit

import android.app.ActivityManager
import android.app.AlertDialog
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Function
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTContext

/**
 * Created by cuiminghui on 2018/1/22.
 */
class XTUIModal {

    class JSExports(val context: XTUIContext): XTComponentExport() {

        override val name: String = "_XTUIModal"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "showAlert", "showAlert", arrayOf(V8Object::class.java, V8Object::class.java))
            exports.registerJavaMethod(this, "showConfirm", "showConfirm", arrayOf(V8Object::class.java, V8Object::class.java, V8Object::class.java))
            exports.registerJavaMethod(this, "showPrompt", "showPrompt", arrayOf(V8Object::class.java, V8Object::class.java, V8Object::class.java))
            return exports
        }

        fun showAlert(params: V8Object, callback: V8Object) {
            val callbackTwin = callback.twin()
            val dialogBuilder = AlertDialog.Builder(XTUIActivity.current ?: context.appContext)
            dialogBuilder.setTitle(params.getString("message") ?: "")
            dialogBuilder.setNegativeButton(params.getString("buttonTitle") ?: "好的", { _, _ ->
                (callbackTwin as? V8Function)?.call(null, null)
                XTContext.release(callbackTwin)
            })
            dialogBuilder.create().show()
        }

        fun showConfirm(params: V8Object, resolver: V8Object, rejected: V8Object) {
            val resolverTwin = resolver.twin()
            val rejectedTwin = rejected.twin()
            val dialogBuilder = AlertDialog.Builder(XTUIActivity.current ?: context.appContext)
            dialogBuilder.setTitle(params.getString("message") ?: "")
            dialogBuilder.setPositiveButton(params.getString("confirmTitle") ?: "确认", { _, _ ->
                (resolverTwin as? V8Function)?.call(null, null)
                XTContext.release(resolverTwin)
                XTContext.release(rejectedTwin)
            })
            dialogBuilder.setNegativeButton(params.getString("cancelTitle") ?: "取消", { _, _ ->
                (rejectedTwin as? V8Function)?.call(null, null)
                XTContext.release(resolverTwin)
                XTContext.release(rejectedTwin)
            })
            dialogBuilder.setOnCancelListener {
                (rejectedTwin as? V8Function)?.call(null, null)
                XTContext.release(resolverTwin)
                XTContext.release(rejectedTwin)
            }
            dialogBuilder.create().show()
        }

        fun showPrompt(params: V8Object, resolver: V8Object, rejected: V8Object) {
            val resolverTwin = resolver.twin()
            val rejectedTwin = rejected.twin()
            val dialogBuilder = AlertDialog.Builder(XTUIActivity.current ?: context.appContext)
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
                    XTContext.release(returnParams)
                }
                XTContext.release(resolverTwin)
                XTContext.release(rejectedTwin)
            })
            dialogBuilder.setNegativeButton(params.getString("cancelTitle") ?: "取消", { _, _ ->
                (rejectedTwin as? V8Function)?.call(null, null)
                XTContext.release(resolverTwin)
                XTContext.release(rejectedTwin)
            })
            dialogBuilder.setCancelable(false)
            val dialog = dialogBuilder.create()
            editText.setOnEditorActionListener { v, actionId, event ->
                dialog.dismiss()
                (resolverTwin as? V8Function)?.let {
                    val returnParams = V8Array(it.runtime)
                    returnParams.push(editText.editableText.toString())
                    it.call(null, returnParams)
                    XTContext.release(returnParams)
                }
                XTContext.release(resolverTwin)
                XTContext.release(rejectedTwin)
                return@setOnEditorActionListener true
            }
            dialog.setView(editText, (20.0 * editText.resources.displayMetrics.density).toInt(), (20.0 * editText.resources.displayMetrics.density).toInt(), (20.0 * editText.resources.displayMetrics.density).toInt(), (20.0 * editText.resources.displayMetrics.density).toInt())
            dialog.show()
        }

    }

}
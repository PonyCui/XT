package com.opensource.xtruntime

import android.app.AlertDialog
import android.widget.EditText

/**
 * Created by cuiminghui on 2017/9/20.
 */

class XTRDebug {

    companion object {

        fun showMenu(bridge: XTRBridge) {
            val builder = AlertDialog.Builder(bridge.appContext)
            builder.setTitle("Debugger")
            builder.setItems(listOf(
                    "Reload",
                    "Reset Source URL"
            ).toTypedArray(), { _, idx ->
                if (idx == 0) {
                    bridge.loadScript()
                }
                else if (idx == 1) {
                    resetSourceURL(bridge)
                }
                return@setItems
            })
            builder.setCancelable(true)
            builder.create().show()
        }

        fun resetSourceURL(bridge: XTRBridge) {
            val builder = AlertDialog.Builder(bridge.appContext)
            builder.setTitle("Enter Source URL")
            val editText = EditText(bridge.appContext)
            editText.text.append(bridge.xtrSourceURL ?: "")
            builder.setView(editText)
            builder.setPositiveButton("Continue", { _, _ ->
                bridge.xtrSourceURL = editText.text.toString()
            })
            builder.create().show()
        }

    }

}
package com.opensource.xtsample

import android.app.Activity
import android.app.AlertDialog
import android.app.Fragment
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import android.widget.FrameLayout
import com.opensource.xt.core.XTContext
import com.opensource.xt.core.XTDebug
import com.opensource.xt.foundation.XTFoundationContext
import com.opensource.xt.uikit.XTUIActivity
import com.opensource.xt.uikit.XTUIContext
import com.opensource.xt.uikit.XTUIWindow

class FooFragment: Fragment() {

    override fun onCreateView(inflater: LayoutInflater?, container: ViewGroup?, savedInstanceState: Bundle?): View {
        return FrameLayout(inflater?.context)
    }

}

class AppActivity : Activity() {

    var currentUIContext: XTUIContext? = null

    override fun onDestroy() {
        super.onDestroy()
        currentUIContext?.release()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.app)
    }

    fun startLocalApplication(sender: View) {
        val mode = 0
        currentUIContext = XTUIContext.createWithAssets(this, "sample.min.js", mapOf(Pair("foo", "value")), {
            when (mode) {
                0 -> it.start()
                1 -> it.attach(this)
                2 -> {
                    findViewById<View>(R.id.button).visibility = View.GONE
                    findViewById<View>(R.id.button2).visibility = View.GONE
                    it.attach(this, R.id.foo_fragment)
                }
            }
        })
//        currentUIContext = XTUIContext.createWithSourceURL(this, "http://xt-playground.oss-cn-shenzhen.aliyuncs.com/tmp_94423207.10000005_0.17082901325064914.min.js", null, {
//            it.start()
//        })
    }

    fun startDebugApplication(sender: View) {
        val dialogBuilder = AlertDialog.Builder(this)
        val editText = EditText(this)
        editText.setSingleLine(true)
        editText.imeOptions = EditorInfo.IME_ACTION_GO
        editText.text.clear()
        editText.text.append(this.getSharedPreferences("Sample", android.content.Context.MODE_PRIVATE).getString("DEBUG_ADDRESS", "10.0.2.2:8081"))
        dialogBuilder.setTitle("Enter IP:Port")
        dialogBuilder.setPositiveButton("确认", { _, _ ->
            startDebugWithAddress(editText.text.toString())
        })
        dialogBuilder.setNegativeButton("取消", { _, _ -> })
        dialogBuilder.setCancelable(false)
        val dialog = dialogBuilder.create()
        editText.setOnEditorActionListener { _, _, _ ->
            dialog.dismiss()
            startDebugWithAddress(editText.text.toString())
            return@setOnEditorActionListener true
        }
        dialog.setView(editText, (20.0 * editText.resources.displayMetrics.density).toInt(), (20.0 * editText.resources.displayMetrics.density).toInt(), (20.0 * editText.resources.displayMetrics.density).toInt(), (20.0 * editText.resources.displayMetrics.density).toInt())
        dialog.show()
    }

    fun startDebugWithAddress(address: String) {
        findViewById<View>(R.id.button).visibility = View.GONE
        findViewById<View>(R.id.button2).visibility = View.GONE
        findViewById<View>(R.id.progressBar).visibility = View.VISIBLE
        this.getSharedPreferences("Sample", android.content.Context.MODE_PRIVATE)
                .edit()
                .putString("DEBUG_ADDRESS", address)
                .apply()
        val IP = address.split(":").firstOrNull() ?: return
        val port = address.split(":").lastOrNull() ?: return
        XTUIContext.currentDebugApplicationContext = this
        XTDebug.sharedDebugger.delegate = XTUIContext
        XTDebug.debugWithIP(IP, port, this)
    }

}

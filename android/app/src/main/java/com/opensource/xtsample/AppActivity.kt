package com.opensource.xtsample

import android.app.Activity
import android.os.Bundle
import android.view.WindowManager
import android.widget.EditText
import com.opensource.xtruntime.XTRActivity
import com.opensource.xtruntime.XTRBridge
import com.opensource.xtruntime.XTRFragment
import com.opensource.xtruntime.XTRCustomView

class AppActivity : XTRActivity() {

    var bridge: XTRBridge? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        XTRCustomView.registerClass(FOOView::class.java.name, "FOOView")
        this.bridge = XTRBridge.createWithAssets(this, "sample.min.js", {
            it.keyWindow?.rootViewController?.setContentView(this)
        })
    }

}

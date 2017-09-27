package com.opensource.xtsample

import android.os.Bundle
import com.opensource.xtruntime.XTRActivity
import com.opensource.xtruntime.XTRBridge
import com.opensource.xtruntime.XTRCustomView

class MainActivity : XTRActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        loadLocal()
        registerViews()
        super.onCreate(savedInstanceState)
    }

    fun registerViews() {
        XTRCustomView.registerClass(FOOView::class.java.name, "FOOView")
    }

    fun loadRemote() {
        if (this.bridge == null) {
            this.bridge = XTRBridge.createWithSourceURL(this, "http://172.26.80.36:8083/sample.android.min.js", {
                onBridgeReady()
            })
        }
    }

    fun loadLocal() {
        XTRBridge.setGlobalBridgeScriptWithAssets(applicationContext, "sample.android.min.js")
    }

}

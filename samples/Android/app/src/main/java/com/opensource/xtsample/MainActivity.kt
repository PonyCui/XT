package com.opensource.xtsample

import android.os.Bundle
import com.opensource.xtruntime.XTRActivity
import com.opensource.xtruntime.XTRBridge

class MainActivity : XTRActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
//        if (this.bridge == null) {
//            this.bridge = XTRBridge.createWithSourceURL(this, "http://172.26.80.36:8083/sample.android.min.js", {
//                onBridgeReady()
//            })
//        }
        XTRBridge.setGlobalBridgeScriptWithAssets(applicationContext, "sample.android.min.js")
        super.onCreate(savedInstanceState)
    }

}

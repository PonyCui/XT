package com.opensource.xtsample

import android.os.Bundle
import com.opensource.xtruntime.XTRActivity
import com.opensource.xtruntime.XTRBridge

class MainActivity : XTRActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        XTRBridge.setGlobalBridgeScriptWithAssets(applicationContext, "sample.android.min.js")
        super.onCreate(savedInstanceState)
    }

}

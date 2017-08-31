package com.opensource.xtsample

import com.opensource.xtruntime.XTApplication
import com.opensource.xtruntime.XTRBridge

/**
 * Created by cuiminghui on 2017/8/31.
 */
class SampleApplication: XTApplication() {

    override fun onCreate() {
        XTRBridge.setGlobalBridgeScriptWithAssets(this, "sample.android.min.js")
        super.onCreate()
    }

}
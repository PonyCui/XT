package com.opensource.xtsample

import android.os.Bundle
import com.opensource.xt.foundation.XTFoundationContext
import com.opensource.xt.uikit.XTUIActivity
import com.opensource.xt.uikit.XTUIContext

class AppActivity : XTUIActivity() {

    var bridge: XTUIContext? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        this.bridge = XTUIContext.createWithAssets(this, "sample.min.js", {
            it.application?.delegate?.window?.rootViewController?.setContentView(this)
        })
        XTFoundationContext(this, this.bridge)
    }

}

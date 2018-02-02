package com.opensource.xtsample

import android.os.Bundle
import android.view.View
import com.opensource.xt.core.XTContext
import com.opensource.xt.foundation.XTFoundationContext
import com.opensource.xt.uikit.XTUIActivity
import com.opensource.xt.uikit.XTUIContext

class AppActivity : XTUIActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.app)
    }

    fun startLocalApplication(sender: View) {
        XTUIContext.addDefaultAttachContext(XTFoundationContext::class.java as Class<XTContext>)
        XTUIContext.createWithAssets(this, "sample.min.js", {
            it.start()
        })
    }

}

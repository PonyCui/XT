package com.opensource.xtruntime

import android.app.Activity
import android.os.Bundle
import android.view.ViewGroup

/**
 * Created by cuiminghui on 2017/8/31.
 */
open class XTRActivity: Activity() {

    open var bridge: XTRBridge? = null
        protected set

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        actionBar?.hide()
        if (bridge == null) {
            bridge = XTRBridge(applicationContext, null, {
                bridge?.xtrApplication?.delegate?.windowMakeKeyAndVisibleRunnable = {
                    bridge?.xtrApplication?.delegate?.window?.let {
                        setContentView(it, ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
                    }
                }
                bridge?.xtrApplication?.delegate?.applicationDidFinishLaunchingWithOptions()
            })
        }
    }

    override fun onBackPressed() {
        (bridge?.xtrApplication?.delegate?.window?.rootViewController as? XTRNavigationController.InnerObject)?.let {
            if (it.childViewControllers.size > 1) {
                it.xtr_popViewController(true)
                return
            }
        }
        super.onBackPressed()
    }

}
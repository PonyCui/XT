package com.opensource.xt.uikit

import android.app.Activity
import android.os.Bundle
import android.view.WindowManager


/**
 * Created by cuiminghui on 2017/8/31.
 */
open class XTUIActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        window.setFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS, WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
        window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING)
        super.onCreate(savedInstanceState)
    }

}
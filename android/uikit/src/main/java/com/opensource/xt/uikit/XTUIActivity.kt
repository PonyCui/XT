package com.opensource.xt.uikit

import android.app.Activity
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowManager


/**
 * Created by cuiminghui on 2017/8/31.
 */
open class XTUIActivity : Activity() {

    companion object {

        internal var current: XTUIActivity? = null

    }

    var uiContext: XTUIContext? = null

    override fun onResume() {
        super.onResume()
        current = this
    }

    override fun onPause() {
        super.onPause()
        current = null
    }

    override fun onDestroy() {
        super.onDestroy()
        uiContext?.release()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
            window.statusBarColor = Color.TRANSPARENT
            window.decorView.systemUiVisibility = 0
        }
        else {
            window.setFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS, WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
        }
        handleStart()
        super.onCreate(savedInstanceState)
    }

    private fun handleStart() {
        uiContext?.let {
            it.application?.delegate?.window?.rootViewController?.setContentView(this)
        } ?: kotlin.run {
            XTUIContext.currentUIContextInstance?.let {
                uiContext = it
                it.application?.delegate?.window?.rootViewController?.setContentView(this)
                XTUIContext.currentUIContextInstance = null
            }
        }
    }

}
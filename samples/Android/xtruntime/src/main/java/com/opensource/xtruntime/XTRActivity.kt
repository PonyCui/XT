package com.opensource.xtruntime

import android.app.Activity
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.ViewGroup
import android.view.WindowManager
import java.util.*
import kotlin.concurrent.timerTask

/**
 * Created by cuiminghui on 2017/8/31.
 */
open class XTRActivity: Activity(), KeyboardHeightObserver {

    open var bridge: XTRBridge? = null
        protected set
    private var keyboardHeightProvider: KeyboardHeightProvider? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window?.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING)
        actionBar?.hide()
        setupKeyboardHeightProvider()
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

    private fun setupKeyboardHeightProvider() {
        keyboardHeightProvider = KeyboardHeightProvider(this)
        findViewById(android.R.id.content).rootView?.post {
            keyboardHeightProvider?.start()
        }
    }

    override fun onKeyboardHeightChanged(height: Int, orientation: Int) {
        if (height > 0) {
            bridge?.xtrApplication?.delegate?.window?.xtr_keyboardWillShow(height)
        }
        else {
            bridge?.xtrApplication?.delegate?.window?.xtr_keyboardWillHide()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        keyboardHeightProvider?.close()
    }

    override fun onPause() {
        super.onPause()
        keyboardHeightProvider?.setKeyboardHeightObserver(null)
    }

    override fun onResume() {
        super.onResume()
        keyboardHeightProvider?.setKeyboardHeightObserver(this)
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
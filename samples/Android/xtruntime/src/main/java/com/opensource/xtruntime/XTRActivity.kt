package com.opensource.xtruntime

import android.app.Activity
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.*
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
                onBridgeReady()
            })
        }
    }

    open fun onBridgeReady() {
        bridge?.xtrApplication?.delegate?.windowMakeKeyAndVisibleRunnable = {
            bridge?.xtrApplication?.delegate?.window?.let {
                setContentView(it, ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
            }
        }
        bridge?.xtrApplication?.delegate?.applicationDidFinishLaunchingWithOptions()
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

    var debugTriggerTime: Long = 0
    var debugTriggerStart = 3

    override fun dispatchTouchEvent(ev: MotionEvent?): Boolean {
        if (ev?.action == MotionEvent.ACTION_DOWN) {
            if (ev?.eventTime - debugTriggerTime > 500) {
                debugTriggerStart = 3
            }
            debugTriggerTime = ev?.eventTime
        }
        if (ev?.action == MotionEvent.ACTION_UP) {
            val rawWidth = findViewById(android.R.id.content).width / resources.displayMetrics.density
            val rawHeight = findViewById(android.R.id.content).height / resources.displayMetrics.density
            val rawX = ev?.x / resources.displayMetrics.density
            val rawY = ev?.y / resources.displayMetrics.density
            if (rawX > rawWidth - 44 && rawY > rawHeight - 44) {
                debugTriggerStart--
                if (debugTriggerStart <= 0) {
                    debugTriggerStart = 3
                    bridge?.let {
                        XTRDebug.showMenu(it)
                    }
                }
            }
        }
        return super.dispatchTouchEvent(ev)
    }

}
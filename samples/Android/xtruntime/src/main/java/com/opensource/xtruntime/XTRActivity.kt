package com.opensource.xtruntime

import android.app.Activity
import android.content.pm.ActivityInfo
import android.os.Bundle
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
        setupOrientations()
        if (bridge == null) {
            bridge = XTRBridge(applicationContext, null, {
                onBridgeReady()
            })
        }
    }

    override fun onStop() {
        bridge?.xtrContext?.release()
        super.onStop()
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

    private var orientationListener: OrientationEventListener? = null
    private var orientationLastValue = 0
    private var orientationChangeInvokeTimer: Timer = Timer()

    private fun setupOrientations() {
        requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
        orientationListener = object : OrientationEventListener(this) {
            override fun onOrientationChanged(p0: Int) {
                val p0 = p0 % 360
                if (Math.abs(orientationLastValue - p0) < 75) {
                    return
                }
                else {
                    orientationLastValue = Math.round(p0.toFloat() / 90f) * 90
                }
                val newOrientation: DeviceOrientation = when (Math.round(p0.toFloat() / 90f)) {
                    0 -> DeviceOrientation.Portrait
                    1 -> DeviceOrientation.LandscapeLeft
                    2 -> DeviceOrientation.PortraitUpsideDown
                    3 -> DeviceOrientation.LandscapeRight
                    else -> XTRDevice.current?.orientation ?: DeviceOrientation.Portrait
                }
                if (newOrientation != XTRDevice.current?.orientation) {
                    XTRDevice.current?.orientation = newOrientation
                    orientationChangeInvokeTimer.cancel()
                    orientationChangeInvokeTimer = Timer()
                    orientationChangeInvokeTimer.schedule(timerTask {
                        runOnUiThread {
                            bridge?.xtrApplication?.delegate?.window?.orientationChanged()
                        }
                    }, 500)
                }
            }
        }
        orientationListener?.enable()
    }

    override fun onKeyboardHeightChanged(height: Int, orientation: Int) {
        if (height > 0) {
            bridge?.xtrApplication?.delegate?.window?.keyboardWillShow(height)
        }
        else {
            bridge?.xtrApplication?.delegate?.window?.keyboardWillHide()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        keyboardHeightProvider?.close()
        orientationListener?.disable()
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
                        XTRDebug.showMenu(this, it)
                    }
                }
            }
        }
        return super.dispatchTouchEvent(ev)
    }

}
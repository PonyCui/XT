package com.opensource.xt.uikit

import android.app.Activity
import android.content.pm.ActivityInfo
import android.content.res.Configuration
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowManager
import com.opensource.xt.core.XTMemoryManager
import com.opensource.xt.uikit.libraries.orientation.OrientationManager




/**
 * Created by cuiminghui on 2017/8/31.
 */
open class XTUIActivity : Activity(), OrientationManager.OrientationChangeListener {

    companion object {

        internal var current: XTUIActivity? = null

    }

    private var rootViewController: XTUIViewController? = null
        set(value) {
            field = value
            resetOrientation()
        }

    private var currentOrientation: Int = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
    private var orientationManager: OrientationManager? = null

    override fun onResume() {
        super.onResume()
        current = this
        this.orientationManager?.setOrientationChangedListener(this)
        this.orientationManager?.enable()
    }

    override fun onPause() {
        super.onPause()
        current = null
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            window.addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS)
        }
        super.onCreate(savedInstanceState)
        intent?.getStringExtra("ViewControllerObjectUUID")?.let {
            this.rootViewController = XTMemoryManager.find(it) as? XTUIViewController
            this.rootViewController?.setContentView(this)
        }
        this.orientationManager = OrientationManager.getInstance(this)
        requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
        resetOrientation()
    }

    fun resetOrientation() {
        if (currentOrientation == Configuration.ORIENTATION_LANDSCAPE) {
            if (this.rootViewController?.requestFragment()?.supportOrientations?.contains(3) == true ||
                this.rootViewController?.requestFragment()?.supportOrientations?.contains(4) == true) {
                this.rootViewController?.requestFragment()?.currentOrientation = XTUIFragment.Orientation.LandScape
                requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE
                window.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
            }
            else if (this.rootViewController?.requestFragment()?.supportOrientations?.contains(1) == true) {
                this.rootViewController?.requestFragment()?.currentOrientation = XTUIFragment.Orientation.Portrait
                requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
                window.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
            }
        }
        else if (currentOrientation == Configuration.ORIENTATION_PORTRAIT) {
            if (this.rootViewController?.requestFragment()?.supportOrientations?.contains(1) == true) {
                this.rootViewController?.requestFragment()?.currentOrientation = XTUIFragment.Orientation.Portrait
                requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
                window.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
            }
            else if (this.rootViewController?.requestFragment()?.supportOrientations?.contains(3) == true ||
                    this.rootViewController?.requestFragment()?.supportOrientations?.contains(4) == true) {
                this.rootViewController?.requestFragment()?.currentOrientation = XTUIFragment.Orientation.LandScape
                requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE
                window.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
            }
        }
    }

    override fun onOrientationChanged(newOrientation: Int) {
        currentOrientation = newOrientation
        resetOrientation()
    }

}
package com.opensource.xtruntime

import android.app.Application

/**
 * Created by cuiminghui on 2017/8/31.
 */
open class XTApplication: Application() {

    lateinit var bridge: XTRBridge

    override fun onCreate() {
        super.onCreate()
        bridge = XTRBridge()
        XTRApplicationDelegate.shared.applicationDidFinishLaunchingWithOptions()
    }

}
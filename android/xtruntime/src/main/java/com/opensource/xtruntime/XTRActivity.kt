package com.opensource.xtruntime

import android.app.Activity
import android.content.pm.ActivityInfo
import android.os.Bundle
import android.view.*
import android.widget.LinearLayout
import android.widget.ProgressBar
import java.util.*
import kotlin.concurrent.timerTask
import android.view.Gravity
import com.opensource.xtruntime.libraries.keyboard.KeyboardHeightObserver
import com.opensource.xtruntime.libraries.keyboard.KeyboardHeightProvider


/**
 * Created by cuiminghui on 2017/8/31.
 */
open class XTRActivity: Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        window.setFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS, WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
        window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING)
        super.onCreate(savedInstanceState)
    }

}
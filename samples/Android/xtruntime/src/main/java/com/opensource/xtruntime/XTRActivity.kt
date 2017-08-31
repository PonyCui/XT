package com.opensource.xtruntime

import android.os.Bundle
import android.support.v7.app.AppCompatActivity

/**
 * Created by cuiminghui on 2017/8/31.
 */
open class XTRActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        supportActionBar?.hide()
    }

}
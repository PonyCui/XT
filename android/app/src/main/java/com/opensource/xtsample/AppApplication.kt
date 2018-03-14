package com.opensource.xtsample

import android.app.Application


/**
 * Created by cuiminghui on 2018/3/12.
 */
class AppApplication: Application() {

    override fun onCreate() {
        super.onCreate()
        FooView.register()
    }

}
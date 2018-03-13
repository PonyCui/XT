package com.opensource.xtsample

import android.app.Application
import com.opensource.xt.core.XTExtObject

/**
 * Created by cuiminghui on 2018/3/12.
 */
class AppApplication: Application() {

    override fun onCreate() {
        super.onCreate()
        FooClass.register()
        FooView.register()
    }

}
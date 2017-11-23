package com.opensource.xtsample

import android.app.Activity
import android.app.AlertDialog
import android.os.Bundle
import android.view.View
import com.opensource.xtruntime.XTRuntime

/**
 * Created by cuiminghui on 2017/11/23.
 */
class ModuleSampleActivity: Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.module_sample)
    }

    fun startApp(view: View) {
        XTRuntime.startWithAssets("sample.min.js", this)
//        XTRuntime.startWithURLString("http://172.26.80.14:8080/dist/sample.min.js", this, {
//            AlertDialog.Builder(it).setTitle("Please Retry Later").setNegativeButton("OK", { _, _ ->
//                it.finish()
//            }).create().show()
//        })
    }

}
package com.opensource.xtruntime

import android.app.Activity
import android.content.Context
import android.content.Intent

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRuntime {

    companion object {

        val version = "0.0.1"

        fun startWithAssets(named: String, context: Context) {
            Intent(context, XTRActivity::class.java)?.let {
                it.putExtra("XTR_fromAssets", named)
                context.startActivity(it)
            }
        }

        internal var currentFailureBlock: ((activity: Activity) -> Unit)? = null

        fun startWithURLString(URLString: String, context: Context, failureBlock: (activity: Activity) -> Unit) {
            currentFailureBlock = failureBlock
            Intent(context, XTRActivity::class.java)?.let {
                it.putExtra("XTR_fromURLString", URLString)
                context.startActivity(it)
            }
        }

    }

}
package com.opensource.xt.core

import android.content.Context

/**
 * Created by cuiminghui on 2018/2/27.
 */
class XTFrameworkLoader {

    companion object {

        fun loadFrameworks(evalCode: String, context: XTContext) {
            if (evalCode.contains("NS.", false)) {
                try {
                    val clazz = Class.forName("com.opensource.xt.foundation.XTFoundationContext")
                    if (clazz.isAssignableFrom(context.javaClass)) { return }
                    clazz.getDeclaredConstructor(Context::class.java, XTContext::class.java).newInstance(context.appContext, context)
                } catch (e: Exception) { }
            }
        }

    }

}
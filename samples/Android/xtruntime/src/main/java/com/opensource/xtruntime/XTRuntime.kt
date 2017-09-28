package com.opensource.xtruntime

import org.mozilla.javascript.Context

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRuntime {

    companion object {

        val version = "0.0.1"

        fun main() {
            val context = Context.enter()
            context.optimizationLevel = -1
            val scope = context.initStandardObjects()
            try {
                val result = context.evaluateString(scope, "1+1", "test.js", 1, null)
                System.out.println(result.toString())
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }

    }

}
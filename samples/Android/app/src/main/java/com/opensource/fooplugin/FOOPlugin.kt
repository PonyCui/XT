package com.opensource.fooplugin

import com.eclipsesource.v8.V8Object
import com.opensource.xtruntime.XTRContext

/**
 * Created by cuiminghui on 2017/9/27.
 */
class FOOPlugin(xtrContext: XTRContext) {

    init {
        val v8Object = V8Object(xtrContext.v8Runtime)
        v8Object.registerJavaMethod(this, "sayHello", "sayHello", arrayOf())
        xtrContext.v8Runtime.add("FOOPlugin", v8Object)
        v8Object.release()
    }

    fun sayHello(): String {
        return "FOO >>> Hello, World!"
    }

}
package com.opensource.ext.implementations

import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTContext
import com.opensource.xt.core.XTExtObject

/**
 * Created by cuiminghui on 2018/1/27.
 */
class FooClass: XTExtObject.Implementation() {

    var fooValue: String = ""

    fun callYamiedie(roleA: String, roleB: String): String {
        invokeMethod("handleNativeCall", listOf())
        return "$roleB said: '$roleA Yamiedie'."
    }

}
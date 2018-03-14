package com.opensource.ext.implementations

import com.opensource.xt.core.XTExtObject

/**
 * Created by cuiminghui on 2018/1/27.
 */
class FooClass: XTExtObject.Implementation() {

    var fooValue: String = ""
        set(value) {
            field = value
            System.out.println(value)
        }

    fun callYamiedie(roleA: String, roleB: String): String {
        invokeMethod("handleNativeCall", listOf())
        return "$roleB said: '$roleA Yamiedie'."
    }

}
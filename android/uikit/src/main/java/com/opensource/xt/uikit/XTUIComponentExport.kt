package com.opensource.xt.uikit

import com.eclipsesource.v8.V8Object

/**
 * Created by cuiminghui on 2017/8/31.
 */

abstract class XTUIComponentExport {

    abstract val name: String

    abstract fun exports(): V8Object

}
package com.opensource.xtruntime

import com.eclipsesource.v8.V8Object

/**
 * Created by cuiminghui on 2017/8/31.
 */

abstract class XTRComponentExport {

    abstract val name: String

    abstract fun exports(): V8Object

}
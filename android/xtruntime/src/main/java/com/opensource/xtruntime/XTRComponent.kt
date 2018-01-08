package com.opensource.xtruntime

import com.eclipsesource.v8.V8Object
import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */

abstract class XTRComponentExport {

    abstract val name: String

    abstract fun exports(context: XTRContext): V8Object

}

abstract class XTRComponentInstance {

    var objectUUID: String? = null

}

abstract class XTRComponent {

    open val name: String = ""

    lateinit var xtrContext: XTRContext

    open fun v8Object(): V8Object? {
        return null
    }

}


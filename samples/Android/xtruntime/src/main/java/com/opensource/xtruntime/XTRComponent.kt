package com.opensource.xtruntime

import java.util.*

/**
 * Created by cuiminghui on 2017/8/31.
 */

abstract class XTRComponent {

    open val name: String = ""
    lateinit var xtrContext: XTRContext

}


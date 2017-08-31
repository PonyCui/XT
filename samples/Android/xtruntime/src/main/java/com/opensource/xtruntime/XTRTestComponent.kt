package com.opensource.xtruntime

/**
 * Created by cuiminghui on 2017/8/31.
 */
class XTRTestComponent : XTRComponent() {

    override val name: String = "XTRTest"

    fun create() {
        print(true)
    }

}
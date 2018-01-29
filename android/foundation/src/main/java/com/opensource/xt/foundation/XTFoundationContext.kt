package com.opensource.xt.foundation

import android.content.Context
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTContext

/**
 * Created by cuiminghui on 2018/1/28.
 */
class XTFoundationContext(appContext: Context, attachingContext: XTContext?) : XTContext(appContext, attachingContext) {

    private var isFoundationDidSetup = false

    override fun setup() {
        super.setup()
        if (!isFoundationDidSetup) {
            loadComponents()
            loadScript()
            isFoundationDidSetup = true
        }
    }


    private fun loadComponents() {
        _registeredComponents = mutableMapOf()
        val components: List<XTComponentExport> = listOf(
                XTFData.JSExports(this),
                XTFUserDefaults.JSExports(this)
        )
        components.forEach {
            val obj = it.exports()
            runtime.add(it.name, obj)
            obj.release()
            _registeredComponents.put(it.name, it)
        }
    }

    private fun loadScript() {
        this.appContext.assets.open("xt.foundation.android.min.js")?.let {
            val byteArray = ByteArray(it.available())
            it.read(byteArray)
            String(byteArray).let { this.evaluateScript(it) }
            it.close()
        }
    }

}
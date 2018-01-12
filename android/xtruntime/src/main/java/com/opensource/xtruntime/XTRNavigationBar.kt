package com.opensource.xtruntime

import android.util.AttributeSet
import com.eclipsesource.v8.V8Object
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager

/**
 * Created by cuiminghui on 2018/1/12.
 */
class XTRNavigationBar @JvmOverloads constructor(
        xtrContext: XTRContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTRView(xtrContext, attrs, defStyleAttr), XTRComponentInstance {

    class JSExports(val context: XTRContext): XTRComponentExport() {

        override val name: String = "XTRNavigationBar"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            return exports
        }

        fun create(): String {
            val view = XTRNavigationBar(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

    }

}
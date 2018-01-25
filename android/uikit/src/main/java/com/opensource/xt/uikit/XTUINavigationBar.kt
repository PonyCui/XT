package com.opensource.xt.uikit

import android.support.v4.view.ViewCompat
import android.util.AttributeSet
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager

/**
 * Created by cuiminghui on 2018/1/12.
 */
class XTUINavigationBar @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTUIComponentInstance {

    class JSExports(val context: XTUIContext): XTUIComponentExport() {

        override val name: String = "_XTUINavigationBar"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            return exports
        }

        fun create(): String {
            val view = XTUINavigationBar(context)
            ViewCompat.setElevation(view, 4.0f)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

    }

}
package com.opensource.xt.uikit

import android.graphics.Typeface
import com.eclipsesource.v8.V8Object
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager

/**
 * Created by cuiminghui on 2018/1/9.
 */

class XTUIFont(val pointSize: Double, val fontWeight: String, val fontStyle: String, val familyName: String): XTUIComponentInstance {

    override var objectUUID: String? = null

    val typeface: Typeface

    init {
        var typefaceStyle = Typeface.NORMAL
        if (fontWeight == "700" && fontStyle == "italic") {
            typefaceStyle = Typeface.BOLD_ITALIC
        }
        else if (fontWeight == "700") {
            typefaceStyle = Typeface.BOLD
        }
        else if (fontStyle == "italic") {
            typefaceStyle = Typeface.ITALIC
        }
        typeface = Typeface.create(familyName, typefaceStyle)
    }

    class JSExports(val context: XTUIContext): XTUIComponentExport() {

        override val name: String = "_XTUIFont"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf(Double::class.java, String::class.java, String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_familyName", "xtr_familyName", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_pointSize", "xtr_pointSize", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_fontWeight", "xtr_fontWeight", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_fontStyle", "xtr_fontStyle", arrayOf(String::class.java))
            return exports
        }

        fun xtr_familyName(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUIFont)?.familyName
        }

        fun xtr_pointSize(objectRef: String): Double {
            return (XTMemoryManager.find(objectRef) as? XTUIFont)?.pointSize ?: 0.0
        }

        fun xtr_fontWeight(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUIFont)?.fontWeight ?: "400"
        }

        fun xtr_fontStyle(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUIFont)?.fontStyle ?: "normal"
        }

        fun create(pointSize: Double, fontWeight: String, fontStyle: String, familyName: String): String {
            val font = XTUIFont(pointSize, fontWeight, fontStyle, familyName)
            val managedObject = XTManagedObject(font)
            font.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

    }

}
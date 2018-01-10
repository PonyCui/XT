package com.opensource.xtruntime

import android.graphics.Typeface
import com.eclipsesource.v8.V8Object
import com.opensource.xtmem.XTManagedObject
import com.opensource.xtmem.XTMemoryManager

/**
 * Created by cuiminghui on 2018/1/9.
 */

class XTRFont(val pointSize: Double, val fontWeight: String, val fontStyle: String, val familyName: String): XTRComponentInstance {

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

    companion object: XTRComponentExport() {

        override val name: String = "XTRFont"

        override fun exports(context: XTRContext): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf(Double::class.java, String::class.java, String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_familyName", "xtr_familyName", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_pointSize", "xtr_pointSize", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_fontWeight", "xtr_fontWeight", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_fontStyle", "xtr_fontStyle", arrayOf(String::class.java))
            return exports
        }

        fun create(pointSize: Double, fontWeight: String, fontStyle: String, familyName: String): String {
            val font = XTRFont(pointSize, fontWeight, fontStyle, familyName)
            val managedObject = XTManagedObject(font)
            font.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

    }

}
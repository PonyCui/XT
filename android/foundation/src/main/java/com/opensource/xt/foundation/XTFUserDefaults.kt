package com.opensource.xt.foundation

import android.content.SharedPreferences
import android.preference.Preference
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.utils.V8ObjectUtils
import com.opensource.xt.core.XTComponentExport
import com.opensource.xt.core.XTContext
import org.json.JSONObject

/**
 * Created by cuiminghui on 2018/1/28.
 */
class XTFUserDefaults(val context: XTContext, val suite: String?) {

    val sharedPreference = context.appContext.getSharedPreferences(suite ?: "Default", 0)

    fun setObject(obj: Object, forKey: String) {
        val serializable = JSONObject()
        (obj as? Int)?.let {
            serializable.put("value", it)
        }
        (obj as? Double)?.let {
            serializable.put("value", it)
        }
        (obj as? String)?.let {
            serializable.put("value", it)
        }
        (obj as? Boolean)?.let {
            serializable.put("value", it)
        }
        sharedPreference.edit().putString(forKey, serializable.toString()).apply()
    }

    fun objectForKey(forKey: String): Any {
        sharedPreference.getString(forKey, null)?.let {
            try {
                val serializable = JSONObject(it)
                return serializable.get("value")
            } catch (e: Exception) {}
        }
        return V8.getUndefined()
    }

    class JSExports(val context: XTContext): XTComponentExport() {

        override val name: String = "_XTFUserDefaults"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "xtr_setObject", "xtr_setObject", arrayOf(Object::class.java, String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_objectForKey", "xtr_objectForKey", arrayOf(String::class.java, String::class.java))
            return exports
        }

        fun xtr_setObject(obj: Object, forKey: String, suite: String) {
            XTFUserDefaults(context, suite).setObject(obj, forKey)
        }

        fun xtr_objectForKey(forKey: String, suite: String): Any {
            return XTFUserDefaults(context, suite).objectForKey(forKey)
        }

    }

}
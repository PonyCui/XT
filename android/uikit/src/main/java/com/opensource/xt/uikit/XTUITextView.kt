package com.opensource.xt.uikit

import android.content.Context
import android.graphics.Color
import android.text.Editable
import android.text.InputType
import android.text.TextWatcher
import android.text.method.PasswordTransformationMethod
import android.util.AttributeSet
import android.view.Gravity
import android.view.View.OnFocusChangeListener
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import android.view.inputmethod.InputMethodManager
import android.widget.EditText
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xt.core.XTManagedObject
import com.opensource.xt.core.XTMemoryManager
import com.opensource.xt.core.XTContext


/**
 * Created by cuiminghui on 2017/9/14.
 */
class XTUITextView @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTUIComponentInstance {

    val XTUITextView: XTUITextView.JSExports = xtrContext?.registeredComponents?.get("_XTUITextView") as XTUITextView.JSExports
    val editText = EditText(context)
    val onFocusListener = OnFocusChangeListener { _, _ ->
        if (editText.isFocused) {
            XTUIWindow.firstResponder = this
            val scriptObject = scriptObject() ?: return@OnFocusChangeListener
            (XTContext.invokeMethod(scriptObject, "handleShouldBeginEditing") as? Boolean)?.takeIf { !it }.let {
                XTUITextView.xtr_blur(this.objectUUID ?: "")
                scriptObject.release()
                return@OnFocusChangeListener
            }
            if (clearsOnBeginEditing) {
                editText.editableText?.clear()
            }
            XTContext.invokeMethod(scriptObject, "handleDidBeginEditing")
            scriptObject.release()
        }
        else {
            val scriptObject = scriptObject() ?: return@OnFocusChangeListener
            XTContext.invokeMethod(scriptObject, "handleDidEndEditing")
            scriptObject.release()
        }
        resetLayout()
    }
    var lastResult: String = ""
    var lastCursorStart: Int = 0
    var lastCursorEnd: Int = 0
    var onRevert = false
    val onTextChangeListener = object : TextWatcher {
        override fun afterTextChanged(p0: Editable?) { }
        override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) { }
        override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
            if (!onRevert && (p1 > 0 || p2 > 0 || p3 > 0)){
                val replacementString: Any = if (p1 + p3 <= p0?.length ?: 0) {
                    if (p3 > 0) p0?.substring(p1, p1 + p3) ?: V8.getUndefined() else V8.getUndefined()
                } else {
                    V8.getUndefined()
                }
                scriptObject()?.let { scriptObject ->
                    val v8Object = V8Object(xtrContext.runtime)
                    v8Object.add("location", p1)
                    v8Object.add("length", if (p2 > p3) p3 else p2 - p3)
                    (XTContext.invokeMethod(scriptObject, "handleShouldChange", listOf(
                            v8Object, replacementString
                    )) as? Boolean)?.let {
                        if (!it) {
                            onRevert = true
                            post {
                                editText.editableText.clear()
                                editText.editableText.append(lastResult)
                                editText.setSelection(lastCursorStart, lastCursorEnd)
                                onRevert = false
                            }
                        }
                        else {
                            lastResult = editText.editableText.toString()
                            lastCursorStart = editText.selectionStart
                            lastCursorEnd = editText.selectionEnd
                        }
                    }
                    v8Object.release()
                    scriptObject.release()
                }
            }
        }
    }

    init {
        isFocusableInTouchMode = true
        editText.setSingleLine(false)
        editText.background = null
        editText.setTextColor(Color.BLACK)
        editText.gravity = Gravity.LEFT or Gravity.TOP
        editText.onFocusChangeListener = this.onFocusListener
        editText.addTextChangedListener(onTextChangeListener)
        editText.setOnEditorActionListener { _, _, _ ->
            scriptObject()?.let { scriptObject ->
                (XTContext.invokeMethod(scriptObject, "handleShouldReturn", null) as? Boolean)?.let {
                    scriptObject.release()
                    return@setOnEditorActionListener it
                }
            }
            return@setOnEditorActionListener false
        }
        addView(editText, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
    }

    override fun layoutSubviews() {
        super.layoutSubviews()
        resetLayout()
    }

    fun resetLayout() {
        editText.width = this.width
        editText.height = this.height
    }

    private var mFont: XTUIFont = XTUIFont(14.0, "400", "normal", "")
        set(value) {
            field = value
            editText.textSize = value.pointSize.toFloat()
            editText.typeface = value.typeface
        }

    private var mTextAlignment = 0
        set(value) {
            field = value
            when (value) {
                0 -> {
                    editText.gravity = Gravity.LEFT or Gravity.CENTER_VERTICAL
                }
                1 -> {
                    editText.gravity = Gravity.CENTER_HORIZONTAL or Gravity.CENTER_VERTICAL
                }
                2 -> {
                    editText.gravity = Gravity.RIGHT or Gravity.CENTER_VERTICAL
                }
            }
        }

    private var clearsOnBeginEditing = false

    fun onBlur(force: Boolean = false) {
        if (this.editText.isFocused) {
            if (!force) {
                val scriptObject = this.scriptObject() ?: return
                (XTContext.invokeMethod(scriptObject, "handleShouldEndEditing", null) as? Boolean)?.let {
                    if (!it) {
                        scriptObject.release()
                        return
                    }
                }
                scriptObject.release()
            }
            this.editText.clearFocus()
            val inputMethodManager = xtrContext.appContext.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
            inputMethodManager.hideSoftInputFromWindow(this.windowToken, 0)
        }
    }

    class JSExports(val context: XTUIContext): XTUIComponentExport() {

        override val name: String = "_XTUITextView"

        override fun exports(): V8Object {
            val exports = V8Object(context.runtime)
            exports.registerJavaMethod(this, "create", "create", arrayOf())
            exports.registerJavaMethod(this, "xtr_text", "xtr_text", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setText", "xtr_setText", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_font", "xtr_font", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setFont", "xtr_setFont", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_textColor", "xtr_textColor", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setTextColor", "xtr_setTextColor", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_textAlignment", "xtr_textAlignment", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setTextAlignment", "xtr_setTextAlignment", arrayOf(Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_clearsOnBeginEditing", "xtr_clearsOnBeginEditing", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setClearsOnBeginEditing", "xtr_setClearsOnBeginEditing", arrayOf(Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_editing", "xtr_editing", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_allowAutocapitalization", "xtr_allowAutocapitalization", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setAllowAutocapitalization", "xtr_setAllowAutocapitalization", arrayOf(Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_allowAutocorrection", "xtr_allowAutocorrection", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setAllowAutocorrection", "xtr_setAllowAutocorrection", arrayOf(Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_allowSpellChecking", "xtr_allowSpellChecking", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setAllowSpellChecking", "xtr_setAllowSpellChecking", arrayOf(Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_keyboardType", "xtr_keyboardType", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setKeyboardType", "xtr_setKeyboardType", arrayOf(Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_returnKeyType", "xtr_returnKeyType", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setReturnKeyType", "xtr_setReturnKeyType", arrayOf(Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_secureTextEntry", "xtr_secureTextEntry", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setSecureTextEntry", "xtr_setSecureTextEntry", arrayOf(Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_focus", "xtr_focus", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_blur", "xtr_blur", arrayOf(String::class.java))
            return exports
        }

        fun create(): String {
            val view = XTUITextView(context)
            val managedObject = XTManagedObject(view)
            view.objectUUID = managedObject.objectUUID
            XTMemoryManager.add(managedObject)
            return managedObject.objectUUID
        }

        fun xtr_text(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText?.text?.toString() ?: ""
        }

        fun xtr_setText(value: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText?.editableText?.let {
                it.clear()
                it.append(value)
            }
        }

        fun xtr_font(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUITextView)?.mFont?.objectUUID
        }

        fun xtr_setFont(fontRef: String, objectRef: String) {
            val font = XTMemoryManager.find(fontRef) as? XTUIFont ?: return
            (XTMemoryManager.find(objectRef) as? XTUITextView)?.mFont = font
        }

        fun xtr_textColor(objectRef: String): V8Value {
            return XTUIUtils.fromIntColor((XTMemoryManager.find(objectRef) as? XTUITextView)?.editText?.currentTextColor ?: 0, context.runtime)
        }

        fun xtr_setTextColor(value: V8Object, objectRef: String) {
            XTUIUtils.toColor(value)?.let {
                (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText?.setTextColor(it.intColor())
            }
        }

        fun xtr_textAlignment(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTUITextView)?.mTextAlignment ?: 0
        }

        fun xtr_setTextAlignment(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextView)?.mTextAlignment = value
        }

        fun xtr_clearsOnBeginEditing(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? XTUITextView)?.clearsOnBeginEditing ?: false
        }

        fun xtr_setClearsOnBeginEditing(value: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextView)?.clearsOnBeginEditing = value
        }

        fun xtr_editing(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText?.isFocused ?: false
        }

        fun xtr_allowAutocapitalization(objectRef: String): Boolean {
            val inputType = (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText?.inputType ?: 0
            return inputType and InputType.TYPE_TEXT_FLAG_CAP_SENTENCES > 0
        }

        fun xtr_setAllowAutocapitalization(value: Boolean, objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText ?: return
            if (value) {
                if (editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_SENTENCES <= 0) {
                    editText.inputType = editText.inputType or InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
                }
            }
            else {
                if (editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_SENTENCES > 0) {
                    editText.inputType = editText.inputType xor InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
                }
                if (editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS > 0) {
                    editText.inputType = editText.inputType xor InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS
                }
                if (editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_WORDS > 0) {
                    editText.inputType = editText.inputType xor InputType.TYPE_TEXT_FLAG_CAP_WORDS
                }
            }
        }

        fun xtr_allowAutocorrection(objectRef: String): Boolean {
            val inputType = (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText?.inputType ?: 0
            return inputType and InputType.TYPE_TEXT_FLAG_AUTO_CORRECT > 0
        }

        fun xtr_setAllowAutocorrection(value: Boolean, objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText ?: return
            if (value) {
                if (editText.inputType and InputType.TYPE_TEXT_FLAG_AUTO_CORRECT <= 0) {
                    editText.inputType = editText.inputType or InputType.TYPE_TEXT_FLAG_AUTO_CORRECT
                }
            }
            else {
                editText.inputType = editText.inputType xor InputType.TYPE_TEXT_FLAG_AUTO_CORRECT
            }
        }

        fun xtr_allowSpellChecking(objectRef: String): Boolean {
            val inputType = (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText?.inputType ?: 0
            return inputType and InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS > 0
        }

        fun xtr_setAllowSpellChecking(value: Boolean, objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText ?: return
            if (value) {
                if (editText.inputType and InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS <= 0) {
                    editText.inputType = editText.inputType or InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS
                }
            }
            else {
                editText.inputType = editText.inputType xor InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS
            }
        }

        fun xtr_keyboardType(objectRef: String): Int {
            val inputType = (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText?.inputType ?: 0
            return when {
                inputType and InputType.TYPE_CLASS_TEXT > 0 -> 1
                inputType and InputType.TYPE_CLASS_NUMBER > 0 -> 2
                else -> 0
            }
        }

        fun xtr_setKeyboardType(value: Int, objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText ?: return
            if (editText.inputType and InputType.TYPE_CLASS_TEXT > 0) {
                editText.inputType = editText.inputType xor InputType.TYPE_CLASS_TEXT
            }
            if (editText.inputType and InputType.TYPE_CLASS_NUMBER > 0) {
                editText.inputType = editText.inputType xor InputType.TYPE_CLASS_NUMBER
            }
            if (editText.inputType and InputType.TYPE_NUMBER_FLAG_DECIMAL > 0) {
                editText.inputType = editText.inputType xor InputType.TYPE_NUMBER_FLAG_DECIMAL
            }
            if (editText.inputType and InputType.TYPE_NUMBER_FLAG_SIGNED > 0) {
                editText.inputType = editText.inputType xor InputType.TYPE_NUMBER_FLAG_SIGNED
            }
            when (value) {
                0 -> {
                    editText.inputType = editText.inputType or InputType.TYPE_CLASS_TEXT
                }
                1 -> {
                    editText.inputType = editText.inputType or InputType.TYPE_CLASS_TEXT
                }
                2 -> {
                    if (editText.inputType and InputType.TYPE_CLASS_NUMBER <= 0) {
                        editText.inputType = editText.inputType or
                                InputType.TYPE_CLASS_NUMBER or
                                InputType.TYPE_NUMBER_FLAG_DECIMAL or
                                InputType.TYPE_NUMBER_FLAG_SIGNED
                    }
                }
            }
        }

        fun xtr_returnKeyType(objectRef: String): Int {
            return when ((XTMemoryManager.find(objectRef) as? XTUITextView)?.editText?.imeOptions ?: 0) {
                EditorInfo.IME_ACTION_GO -> 1
                EditorInfo.IME_ACTION_NEXT -> 4
                EditorInfo.IME_ACTION_SEARCH -> 6
                EditorInfo.IME_ACTION_SEND -> 7
                EditorInfo.IME_ACTION_DONE -> 8
                else -> 0
            }
        }

        fun xtr_setReturnKeyType(value: Int, objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText ?: return
            when (value) {
                1 -> editText.imeOptions = EditorInfo.IME_ACTION_GO
                4 -> editText.imeOptions = EditorInfo.IME_ACTION_NEXT
                6 -> editText.imeOptions = EditorInfo.IME_ACTION_SEARCH
                7 -> editText.imeOptions = EditorInfo.IME_ACTION_SEND
                8 -> editText.imeOptions = EditorInfo.IME_ACTION_DONE
                else -> editText.imeOptions = 0
            }
        }

        fun xtr_secureTextEntry(objectRef: String): Boolean {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText ?: return false
            return editText.transformationMethod is PasswordTransformationMethod
        }

        fun xtr_setSecureTextEntry(value: Boolean, objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText ?: return
            if (value) editText.transformationMethod = PasswordTransformationMethod()
            else editText.transformationMethod = null
        }

        fun xtr_focus(objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextView)?.editText ?: return
            editText.requestFocus()
        }

        fun xtr_blur(objectRef: String) {
            val textView = (XTMemoryManager.find(objectRef) as? XTUITextView) ?: return
            textView.onBlur()
        }

    }

}
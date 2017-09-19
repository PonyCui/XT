package com.opensource.xtruntime

import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.text.Editable
import android.text.InputType
import android.text.TextWatcher
import android.text.method.PasswordTransformationMethod
import android.view.Gravity
import android.view.View.OnFocusChangeListener
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import android.view.inputmethod.InputMethodManager
import android.widget.EditText
import org.mozilla.javascript.ScriptableObject
import org.mozilla.javascript.Undefined


/**
 * Created by cuiminghui on 2017/9/14.
 */
class XTRTextView: XTRComponent() {

    override val name: String = "XTRTextView"

    fun createScriptObject(rect: Any, scriptObject: Any): XTRTextView.InnerObject? {
        (scriptObject as? ScriptableObject)?.let {
            return InnerObject(it, xtrContext)
        }
        return null
    }

    class Range(val location: Int, val length: Int)

    class InnerObject(scriptObject: ScriptableObject, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        val editText = EditText(xtrContext.appContext)
        val onFocusListener = OnFocusChangeListener { _, _ ->
            if (editText.isFocused) {
                XTRWindow.firstResponder = this
                (xtrContext.invokeMethod(scriptObject, "handleShouldBeginEditing", arrayOf()) as? Boolean)?.let {
                    if (!it) {
                        this.xtr_blur()
                        return@OnFocusChangeListener
                    }
                }
                if (clearsOnBeginEditing) {
                    editText.editableText?.clear()
                }
                xtrContext.invokeMethod(scriptObject, "handleDidBeginEditing", arrayOf())
            }
            else {
                xtrContext.invokeMethod(scriptObject, "handleDidEndEditing", arrayOf())
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
                        if (p3 > 0) p0?.substring(p1, p1 + p3) ?: Undefined.instance else Undefined.instance
                    } else {
                        Undefined.instance
                    }
                    (xtrContext.invokeMethod(scriptObject , "handleShouldChange", arrayOf(
                            Range(p1, if (p2 > p3) p3 else p2 - p3), replacementString
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
                (xtrContext.invokeMethod(scriptObject, "handleShouldReturn", arrayOf()) as? Boolean)?.let {
                    return@setOnEditorActionListener it
                }
                return@setOnEditorActionListener false
            }
            xtr_setUserInteractionEnabled(true)
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

        fun xtr_text(): Any? {
            return this.editText.text?.toString() ?: Undefined.instance
        }

        fun xtr_setText(value: Any?) {
            (value as? String)?.let { value ->
                this.editText.editableText?.let {
                    it.clear()
                    it.append(value)
                }
            }
        }

        private var xtrFont: XTRFont = XTRFont(14.0, null)
            set(value) {
                field = value
                editText.textSize = value.pointSize.toFloat()
                var typefaceStyle = Typeface.NORMAL
                if (value.fontWeight == "700" && value.fontStyle == "italic") {
                    typefaceStyle = Typeface.BOLD_ITALIC
                }
                else if (value.fontWeight == "700") {
                    typefaceStyle = Typeface.BOLD
                }
                else if (value.fontStyle == "italic") {
                    typefaceStyle = Typeface.ITALIC
                }
                editText.typeface = Typeface.create(value.familyName, typefaceStyle)
            }

        fun xtr_font(): XTRFont {
            return this.xtrFont
        }

        fun xtr_setFont(value: Any?) {
            XTRUtils.toFont(value)?.let {
                xtrFont = it
            }
        }

        fun xtr_textColor(): XTRColor {
            return XTRUtils.fromIntColor(editText.currentTextColor)
        }

        fun xtr_setTextColor(value: Any?) {
            XTRUtils.toColor(value)?.let {
                editText.setTextColor(it.intColor())
            }
        }

        private var xtrTextAlignment = 0
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

        fun xtr_textAlignment(): Int {
            return xtrTextAlignment
        }

        fun xtr_setTextAlignment(value: Any?) {
            (value as? Double)?.let {
                xtrTextAlignment = it.toInt()
            }
        }

        private var clearsOnBeginEditing = false

        fun xtr_clearsOnBeginEditing(): Boolean {
            return this.clearsOnBeginEditing
        }

        fun xtr_setClearsOnBeginEditing(value: Any?) {
            this.clearsOnBeginEditing = value as? Boolean ?: false
        }

        fun xtr_editing(): Boolean {
            return this.editText.isFocused
        }

        fun xtr_allowAutocapitalization(): Boolean {
            return this.editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_SENTENCES > 0
        }

        fun xtr_setAllowAutocapitalization(value: Any?) {
            (value as? Boolean)?.let {
                if (it) {
                    if (this.editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_SENTENCES <= 0) {
                        this.editText.inputType = this.editText.inputType or InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
                    }
                }
                else {
                    if (this.editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_SENTENCES > 0) {
                        this.editText.inputType = this.editText.inputType xor InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
                    }
                    if (this.editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS > 0) {
                        this.editText.inputType = this.editText.inputType xor InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS
                    }
                    if (this.editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_WORDS > 0) {
                        this.editText.inputType = this.editText.inputType xor InputType.TYPE_TEXT_FLAG_CAP_WORDS
                    }
                }
            }
        }

        fun xtr_allowAutocorrection(): Boolean {
            return this.editText.inputType and InputType.TYPE_TEXT_FLAG_AUTO_CORRECT > 0
        }

        fun xtr_setAllowAutocorrection(value: Any?) {
            (value as? Boolean)?.let {
                if (it) {
                    if (this.editText.inputType and InputType.TYPE_TEXT_FLAG_AUTO_CORRECT <= 0) {
                        this.editText.inputType = this.editText.inputType or InputType.TYPE_TEXT_FLAG_AUTO_CORRECT
                    }
                }
                else {
                    this.editText.inputType = this.editText.inputType xor InputType.TYPE_TEXT_FLAG_AUTO_CORRECT
                }
            }
        }

        fun xtr_allowSpellChecking(): Boolean {
            return this.editText.inputType and InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS > 0
        }

        fun xtr_setAllowSpellChecking(value: Any?) {
            (value as? Boolean)?.let {
                if (it) {
                    if (this.editText.inputType and InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS <= 0) {
                        this.editText.inputType = this.editText.inputType or InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS
                    }
                }
                else {
                    this.editText.inputType = this.editText.inputType xor InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS
                }
            }
        }

        fun xtr_keyboardType(): Int {
            return when {
                this.editText.inputType and InputType.TYPE_CLASS_TEXT > 0 -> 1
                this.editText.inputType and InputType.TYPE_CLASS_NUMBER > 0 -> 2
                else -> 0
            }
        }

        fun xtr_setKeyboardType(value: Any?) {
            (value as? Double)?.let {
                if (this.editText.inputType and InputType.TYPE_CLASS_TEXT > 0) {
                    this.editText.inputType = this.editText.inputType xor InputType.TYPE_CLASS_TEXT
                }
                if (this.editText.inputType and InputType.TYPE_CLASS_NUMBER > 0) {
                    this.editText.inputType = this.editText.inputType xor InputType.TYPE_CLASS_NUMBER
                }
                if (this.editText.inputType and InputType.TYPE_NUMBER_FLAG_DECIMAL > 0) {
                    this.editText.inputType = this.editText.inputType xor InputType.TYPE_NUMBER_FLAG_DECIMAL
                }
                if (this.editText.inputType and InputType.TYPE_NUMBER_FLAG_SIGNED > 0) {
                    this.editText.inputType = this.editText.inputType xor InputType.TYPE_NUMBER_FLAG_SIGNED
                }
                when (it.toInt()) {
                    0 -> {
                        this.editText.inputType = this.editText.inputType or InputType.TYPE_CLASS_TEXT
                    }
                    1 -> {
                        this.editText.inputType = this.editText.inputType or InputType.TYPE_CLASS_TEXT
                    }
                    2 -> {
                        if (this.editText.inputType and InputType.TYPE_CLASS_NUMBER <= 0) {
                            this.editText.inputType = this.editText.inputType or
                                    InputType.TYPE_CLASS_NUMBER or
                                    InputType.TYPE_NUMBER_FLAG_DECIMAL or
                                    InputType.TYPE_NUMBER_FLAG_SIGNED
                        }
                    }
                }
            }
        }

        fun xtr_returnKeyType(): Int {
            return when (this.editText.imeOptions) {
                EditorInfo.IME_ACTION_GO -> 1
                EditorInfo.IME_ACTION_NEXT -> 4
                EditorInfo.IME_ACTION_SEARCH -> 6
                EditorInfo.IME_ACTION_SEND -> 7
                EditorInfo.IME_ACTION_DONE -> 8
                else -> 0
            }
        }

        fun xtr_setReturnKeyType(value: Any?) {
            (value as? Double)?.let {
                when (it.toInt()) {
                    1 -> this.editText.imeOptions = EditorInfo.IME_ACTION_GO
                    4 -> this.editText.imeOptions = EditorInfo.IME_ACTION_NEXT
                    6 -> this.editText.imeOptions = EditorInfo.IME_ACTION_SEARCH
                    7 -> this.editText.imeOptions = EditorInfo.IME_ACTION_SEND
                    8 -> this.editText.imeOptions = EditorInfo.IME_ACTION_DONE
                    else -> this.editText.imeOptions = 0
                }
            }
        }

        fun xtr_secureTextEntry(): Boolean {
            return this.editText.transformationMethod is PasswordTransformationMethod
        }

        fun xtr_setSecureTextEntry(value: Any?) {
            (value as? Boolean)?.let {
                if (it) this.editText.transformationMethod = PasswordTransformationMethod()
                else this.editText.transformationMethod = null
            }

        }

        fun xtr_focus() {
            this.editText.requestFocus()
        }

        fun xtr_blur() {
            if (this.editText.isFocused) {
                (xtrContext.invokeMethod(scriptObject, "handleShouldEndEditing", arrayOf()) as? Boolean)?.let {
                    if (!it) {
                        return
                    }
                }
                this.editText.clearFocus()
                val inputMethodManager = xtrContext.appContext.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
                inputMethodManager.hideSoftInputFromWindow(this.windowToken, 0)
            }
        }

    }

}
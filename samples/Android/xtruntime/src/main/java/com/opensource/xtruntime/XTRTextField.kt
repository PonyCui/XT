package com.opensource.xtruntime

import android.graphics.Typeface
import android.text.Editable
import android.text.InputType
import android.text.TextWatcher
import android.text.method.DigitsKeyListener
import android.text.method.PasswordTransformationMethod
import android.view.Gravity
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import org.mozilla.javascript.ScriptableObject
import org.mozilla.javascript.Undefined
import java.util.*
import android.app.Activity
import android.content.Context
import android.graphics.Color
import android.util.AttributeSet
import android.view.KeyEvent
import android.view.View
import android.view.inputmethod.InputMethodManager
import org.mozilla.javascript.NativeJavaObject


/**
 * Created by cuiminghui on 2017/9/14.
 */
class XTRTextField: XTRComponent() {

    override val name: String = "XTRTextField"

    fun createScriptObject(rect: Any, scriptObject: Any): XTRTextField.InnerObject? {
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
            override fun afterTextChanged(p0: Editable?) {
                if (clearViewMode > 0) {
                    resetLayout()
                }
            }
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
            editText.setSingleLine(true)
            editText.background = null
            editText.setTextColor(Color.BLACK)
            editText.gravity = Gravity.LEFT or Gravity.CENTER_VERTICAL
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
            leftView?.frame?.let {
                leftView?.frame = XTRRect(0.0, 0.0, it.width, this.bounds.height)
            }
            rightView?.frame?.let {
                rightView?.frame = XTRRect(this.bounds.width - it.width, 0.0, it.width, this.bounds.height)
            }
            clearView?.frame?.let {
                clearView?.frame = XTRRect(this.bounds.width - it.width, 0.0, it.width, this.bounds.height)
            }
            resetLayout()
        }

        fun resetLayout() {
            val shouldShowLeftView = leftView != null && ((leftViewMode == 1 && editText.isFocused) || (leftViewMode == 2 && !editText.isFocused) || leftViewMode == 3)
            var shouldShowRightView = rightView != null && ((rightViewMode == 1 && editText.isFocused) || (rightViewMode == 2 && !editText.isFocused) || rightViewMode == 3)
            val shouldShowClearView = clearView != null && ((clearViewMode == 1 && editText.isFocused && editText.text.isNotEmpty()) || (clearViewMode == 2 && !editText.isFocused) || clearViewMode == 3)
            if (shouldShowClearView) { shouldShowRightView = false }
            leftView?.xtr_setHidden(!shouldShowLeftView)
            rightView?.xtr_setHidden(!shouldShowRightView)
            clearView?.xtr_setHidden(!shouldShowClearView)
            editText.x = if (shouldShowLeftView) (leftView?.frame?.width?.toFloat() ?: 0.0f) * resources.displayMetrics.density  else 0.0f
            editText.height = this.height
            var rightWidth = if (shouldShowRightView) (rightView?.frame?.width?.toFloat() ?: 0.0f) * resources.displayMetrics.density  else 0.0f
            if (shouldShowClearView) {
                rightWidth = (clearView?.frame?.width?.toFloat() ?: 0.0f) * resources.displayMetrics.density
            }
            editText.width = (this.width - editText.x - rightWidth).toInt()
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

        fun xtr_placeholder(): Any? {
            return this.editText.hint?.toString() ?: Undefined.instance
        }

        fun xtr_setPlaceholder(value: Any?) {
            this.editText.hint = value as? String
        }

        fun xtr_placeholderColor(): XTRColor {
            return XTRUtils.fromIntColor(editText.currentHintTextColor)
        }

        fun xtr_setPlaceholderColor(value: Any?) {
            XTRUtils.toColor(value)?.let {
                editText.setHintTextColor(it.intColor())
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

        private var clearView: XTRView.InnerObject? = null
            set(value) {
                field?.let { it.xtr_removeFromSuperview() }
                field = value
                field?.let { this.xtr_addSubview(it) }
            }

        private fun resetClearView() {
            if (clearView == null) {
                (XTRUtils.toView(xtrContext.invokeMethod(scriptObject, "requestClearView", arrayOf())) as? XTRView.InnerObject)?.let {
                    clearView = it
                }
            }
        }

        private var clearViewMode: Int = 0
            set(value) { resetClearView(); field = value; resetLayout(); }

        fun xtr_clearButtonMode(): Int {
            return this.clearViewMode
        }

        fun xtr_setClearButtonMode(value: Any?) {
            this.clearViewMode = (value as? Double ?: 0.0).toInt()
        }

        fun xtr_onClearButtonTap() {
            (xtrContext.invokeMethod(scriptObject, "handleShouldClear", arrayOf()) as? Boolean)?.let {
                if (!it) { return }
            }
            this.editText.editableText?.clear()
        }

        private var leftView: XTRView.InnerObject? = null
            set(value) {
                field?.let { it.xtr_removeFromSuperview() }
                field = value
                field?.let { this.xtr_addSubview(it) }
                resetLayout()
            }

        fun xtr_leftView(): Any? {
            return XTRUtils.fromObject(xtrContext, this.leftView)
        }

        fun xtr_setLeftView(value: Any?) {
            this.leftView = XTRUtils.toView(value) as? XTRView.InnerObject
        }

        private var leftViewMode: Int = 0
            set(value) { field = value; resetLayout(); }

        fun xtr_leftViewMode(): Int {
            return this.leftViewMode
        }

        fun xtr_setLeftViewMode(value: Any?) {
            this.leftViewMode = (value as? Double ?: 0.0).toInt()
        }

        private var rightView: XTRView.InnerObject? = null
            set(value) {
                field?.let { it.xtr_removeFromSuperview() }
                field = value
                field?.let { this.xtr_addSubview(it) }
                resetLayout()
            }

        fun xtr_rightView(): Any? {
            return XTRUtils.fromObject(xtrContext, this.rightView)
        }

        fun xtr_setRightView(value: Any?) {
            this.rightView = XTRUtils.toView(value) as? XTRView.InnerObject
        }

        private var rightViewMode: Int = 0
            set(value) { field = value; resetLayout(); }

        fun xtr_rightViewMode(): Int {
            return this.rightViewMode
        }

        fun xtr_setRightViewMode(value: Any?) {
            this.rightViewMode = (value as? Double ?: 0.0).toInt()
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
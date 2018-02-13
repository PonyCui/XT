package com.opensource.xt.uikit

import android.content.Context
import android.graphics.Color
import android.text.Editable
import android.text.InputType
import android.text.TextWatcher
import android.text.method.PasswordTransformationMethod
import android.util.AttributeSet
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.View.OnFocusChangeListener
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import android.view.inputmethod.InputMethodManager
import android.widget.EditText
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Object
import com.eclipsesource.v8.V8Value
import com.opensource.xt.core.*


/**
 * Created by cuiminghui on 2017/9/14.
 */
class XTUITextField @JvmOverloads constructor(
        xtrContext: XTUIContext, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : XTUIView(xtrContext, attrs, defStyleAttr), XTComponentInstance {

    val XTUITextField: XTUITextField.JSExports = xtrContext?.registeredComponents?.get("_XTUITextField") as XTUITextField.JSExports
    val editText = EditText(context)
    val onFocusListener = OnFocusChangeListener { _, _ ->
        if (editText.isFocused) {
            XTUIWindow.firstResponder = this
            val scriptObject = scriptObject() ?: return@OnFocusChangeListener
            (XTContext.invokeMethod(scriptObject, "handleShouldBeginEditing") as? Boolean)?.let {
                if (!it) {
                    XTUITextField.xtr_blur(this.objectUUID ?: "")
                    XTContext.release(scriptObject)
                    return@OnFocusChangeListener
                }
            }
            if (clearsOnBeginEditing) {
                editText.editableText?.clear()
            }
            XTContext.invokeMethod(scriptObject, "handleDidBeginEditing")
            XTContext.release(scriptObject)
        }
        else {
            val scriptObject = scriptObject() ?: return@OnFocusChangeListener
            XTContext.invokeMethod(scriptObject, "handleDidEndEditing")
            XTContext.release(scriptObject)
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
                    XTContext.release(v8Object)
                    XTContext.release(scriptObject)
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
            scriptObject()?.let { scriptObject ->
                (XTContext.invokeMethod(scriptObject, "handleShouldReturn", null) as? Boolean)?.let {
                    XTContext.release(scriptObject)
                    return@setOnEditorActionListener it
                }
            }
            return@setOnEditorActionListener false
        }
        addView(editText, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
    }

    override fun layoutSubviews() {
        super.layoutSubviews()
        leftView?.frame?.let {
            leftView?.frame = XTUIRect(0.0, 0.0, it.width, this.bounds.height)
        }
        rightView?.frame?.let {
            rightView?.frame = XTUIRect(this.bounds.width - it.width, 0.0, it.width, this.bounds.height)
        }
        clearView?.frame?.let {
            clearView?.frame = XTUIRect(this.bounds.width - it.width, 0.0, it.width, this.bounds.height)
        }
        resetLayout()
    }

    fun resetLayout() {
        val shouldShowLeftView = leftView != null && ((leftViewMode == 1 && editText.isFocused) || (leftViewMode == 2 && !editText.isFocused) || leftViewMode == 3)
        var shouldShowRightView = rightView != null && ((rightViewMode == 1 && editText.isFocused) || (rightViewMode == 2 && !editText.isFocused) || rightViewMode == 3)
        val shouldShowClearView = clearView != null && ((clearViewMode == 1 && editText.isFocused && editText.text.isNotEmpty()) || (clearViewMode == 2 && !editText.isFocused) || clearViewMode == 3)
        if (shouldShowClearView) { shouldShowRightView = false }
        leftView?.visibility = if (shouldShowLeftView) View.VISIBLE else View.GONE
        rightView?.visibility = if (shouldShowRightView) View.VISIBLE else View.GONE
        clearView?.visibility = if (shouldShowClearView) View.VISIBLE else View.GONE
        editText.x = if (shouldShowLeftView) (leftView?.frame?.width?.toFloat() ?: 0.0f) * resources.displayMetrics.density  else 0.0f
        editText.height = this.height
        var rightWidth = if (shouldShowRightView) (rightView?.frame?.width?.toFloat() ?: 0.0f) * resources.displayMetrics.density  else 0.0f
        if (shouldShowClearView) {
            rightWidth = (clearView?.frame?.width?.toFloat() ?: 0.0f) * resources.displayMetrics.density
        }
        editText.width = (this.width - editText.x - rightWidth).toInt()
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

    private var clearView: XTUIView? = null
        set(value) {
            field?.let { (it.parent as? ViewGroup)?.removeView(it) }
            field = value
            field?.let { this.addView(it, android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT)) }
        }

    private fun resetClearView() {
        if (clearView == null) {
            scriptObject()?.let {
                (XTContext.invokeMethod(it, "requestClearView") as? String)?.let {
                    clearView = (XTMemoryManager.find(it) as? XTUIView)
                }
            }
        }
    }

    private var clearViewMode: Int = 0
        set(value) { resetClearView(); field = value; resetLayout(); }

    fun onClear() {
        var shouldClear = true
        scriptObject()?.let { scriptObject ->
            (XTContext.invokeMethod(scriptObject, "handleShouldClear") as? Boolean)?.let {
                if (!it) {
                    shouldClear = false
                }
            }
            XTContext.release(scriptObject)
        }
        if (shouldClear) {
            editText.editableText?.clear()
        }
    }

    private var leftView: XTUIView? = null
        set(value) {
            field?.let { (it.parent as? ViewGroup)?.removeView(it) }
            field = value
            field?.let { this.addView(it, android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT)) }
            resetLayout()
        }

    private var leftViewMode: Int = 0
        set(value) { field = value; resetLayout(); }


    private var rightView: XTUIView? = null
        set(value) {
            field?.let { (it.parent as? ViewGroup)?.removeView(it) }
            field = value
            field?.let { this.addView(it, android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT)) }
            resetLayout()
        }

    private var rightViewMode: Int = 0
        set(value) { field = value; resetLayout(); }

    override fun onTouchEvent(event: MotionEvent?): Boolean {
        if (this.editText.isFocused && this.clearView?.visibility == View.VISIBLE ) {
            onClear()
        }
        return true
    }

    fun onBlur(force: Boolean = false) {
        if (this.editText.isFocused) {
            if (!force) {
                val scriptObject = this.scriptObject() ?: return
                (XTContext.invokeMethod(scriptObject, "handleShouldEndEditing", null) as? Boolean)?.let {
                    if (!it) {
                        XTContext.release(scriptObject)
                        return
                    }
                }
                XTContext.release(scriptObject)
            }
            this.editText.clearFocus()
            val inputMethodManager = xtrContext.appContext.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
            inputMethodManager.hideSoftInputFromWindow(this.windowToken, 0)
        }
    }
    
    class JSExports(context: XTUIContext): XTUIView.JSExports(context) {

        override val name: String = "_XTUITextField"

        override val viewClass: Class<XTUIView> = XTUITextField::class.java as Class<XTUIView>

        override fun exports(): V8Object {
            val exports = super.exports()
            exports.registerJavaMethod(this, "xtr_text", "xtr_text", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setText", "xtr_setText", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_font", "xtr_font", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setFont", "xtr_setFont", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_textColor", "xtr_textColor", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setTextColor", "xtr_setTextColor", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_textAlignment", "xtr_textAlignment", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setTextAlignment", "xtr_setTextAlignment", arrayOf(Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_placeholder", "xtr_placeholder", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setPlaceholder", "xtr_setPlaceholder", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_placeholderColor", "xtr_placeholderColor", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setPlaceholderColor", "xtr_setPlaceholderColor", arrayOf(V8Object::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_clearsOnBeginEditing", "xtr_clearsOnBeginEditing", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setClearsOnBeginEditing", "xtr_setClearsOnBeginEditing", arrayOf(Boolean::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_editing", "xtr_editing", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_clearButtonMode", "xtr_clearButtonMode", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setClearButtonMode", "xtr_setClearButtonMode", arrayOf(Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_onClearButtonTap", "xtr_onClearButtonTap", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_leftView", "xtr_leftView", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setLeftView", "xtr_setLeftView", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_leftViewMode", "xtr_leftViewMode", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setLeftViewMode", "xtr_setLeftViewMode", arrayOf(Int::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_rightView", "xtr_rightView", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setRightView", "xtr_setRightView", arrayOf(String::class.java, String::class.java))
            exports.registerJavaMethod(this, "xtr_rightViewMode", "xtr_rightViewMode", arrayOf(String::class.java))
            exports.registerJavaMethod(this, "xtr_setRightViewMode", "xtr_setRightViewMode", arrayOf(Int::class.java, String::class.java))
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

        fun xtr_text(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.text?.toString() ?: ""
        }

        fun xtr_setText(value: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.editableText?.let {
                it.clear()
                it.append(value)
            }
        }

        fun xtr_font(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUITextField)?.mFont?.objectUUID
        }

        fun xtr_setFont(fontRef: String, objectRef: String) {
            val font = XTMemoryManager.find(fontRef) as? XTUIFont ?: return
            (XTMemoryManager.find(objectRef) as? XTUITextField)?.mFont = font
        }

        fun xtr_textColor(objectRef: String): V8Value {
            return XTUIUtils.fromIntColor((XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.currentTextColor ?: 0, context.runtime)
        }

        fun xtr_setTextColor(value: V8Object, objectRef: String) {
            XTUIUtils.toColor(value)?.let {
                (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.setTextColor(it.intColor())
            }
        }

        fun xtr_textAlignment(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTUITextField)?.mTextAlignment ?: 0
        }

        fun xtr_setTextAlignment(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextField)?.mTextAlignment = value
        }

        fun xtr_placeholder(objectRef: String): String {
            return (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.hint?.toString() ?: ""
        }

        fun xtr_setPlaceholder(value: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.hint = value
        }

        fun xtr_placeholderColor(objectRef: String): V8Value {
            return XTUIUtils.fromIntColor((XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.currentHintTextColor ?: 0, context.runtime)
        }

        fun xtr_setPlaceholderColor(value: V8Object, objectRef: String) {
            XTUIUtils.toColor(value)?.let {
                (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.setHintTextColor(it.intColor())
            }
        }

        fun xtr_clearsOnBeginEditing(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? XTUITextField)?.clearsOnBeginEditing ?: false
        }

        fun xtr_setClearsOnBeginEditing(value: Boolean, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextField)?.clearsOnBeginEditing = value
        }

        fun xtr_editing(objectRef: String): Boolean {
            return (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.isFocused ?: false
        }

        fun xtr_clearButtonMode(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTUITextField)?.clearViewMode ?: 0
        }

        fun xtr_setClearButtonMode(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextField)?.clearViewMode = value
        }

        fun xtr_onClearButtonTap(objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextField)?.let {
                it.onClear()
            }
        }

        fun xtr_leftView(objectRef: String): String? {
            return (XTMemoryManager.find(objectRef) as? XTUITextField)?.leftView?.objectUUID
        }

        fun xtr_setLeftView(viewRef: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextField)?.leftView = XTMemoryManager.find(viewRef) as? XTUIView
        }

        fun xtr_leftViewMode(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTUITextField)?.leftViewMode ?: 0
        }

        fun xtr_setLeftViewMode(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextField)?.leftViewMode = value
        }

        fun xtr_rightView(objectRef: String): Any? {
            return (XTMemoryManager.find(objectRef) as? XTUITextField)?.rightView?.objectUUID
        }

        fun xtr_setRightView(viewRef: String, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextField)?.rightView = XTMemoryManager.find(viewRef) as? XTUIView
        }

        fun xtr_rightViewMode(objectRef: String): Int {
            return (XTMemoryManager.find(objectRef) as? XTUITextField)?.rightViewMode ?: 0
        }

        fun xtr_setRightViewMode(value: Int, objectRef: String) {
            (XTMemoryManager.find(objectRef) as? XTUITextField)?.rightViewMode = value
        }

        fun xtr_allowAutocapitalization(objectRef: String): Boolean {
            val inputType = (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.inputType ?: 0
            return inputType and InputType.TYPE_TEXT_FLAG_CAP_SENTENCES > 0
        }

        fun xtr_setAllowAutocapitalization(value: Boolean, objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText ?: return
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
            val inputType = (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.inputType ?: 0
            return inputType and InputType.TYPE_TEXT_FLAG_AUTO_CORRECT > 0
        }

        fun xtr_setAllowAutocorrection(value: Boolean, objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText ?: return
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
            val inputType = (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.inputType ?: 0
            return inputType and InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS > 0
        }

        fun xtr_setAllowSpellChecking(value: Boolean, objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText ?: return
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
            val inputType = (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.inputType ?: 0
            return when {
                inputType and InputType.TYPE_CLASS_TEXT > 0 -> 1
                inputType and InputType.TYPE_CLASS_NUMBER > 0 -> 2
                else -> 0
            }
        }

        fun xtr_setKeyboardType(value: Int, objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText ?: return
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
            return when ((XTMemoryManager.find(objectRef) as? XTUITextField)?.editText?.imeOptions ?: 0) {
                EditorInfo.IME_ACTION_GO -> 1
                EditorInfo.IME_ACTION_NEXT -> 4
                EditorInfo.IME_ACTION_SEARCH -> 6
                EditorInfo.IME_ACTION_SEND -> 7
                EditorInfo.IME_ACTION_DONE -> 8
                else -> 0
            }
        }

        fun xtr_setReturnKeyType(value: Int, objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText ?: return
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
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText ?: return false
            return editText.transformationMethod is PasswordTransformationMethod
        }

        fun xtr_setSecureTextEntry(value: Boolean, objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText ?: return
            if (value) editText.transformationMethod = PasswordTransformationMethod()
            else editText.transformationMethod = null

        }

        fun xtr_focus(objectRef: String) {
            val editText = (XTMemoryManager.find(objectRef) as? XTUITextField)?.editText ?: return
            editText.requestFocus()
        }

        fun xtr_blur(objectRef: String) {
            val textField = (XTMemoryManager.find(objectRef) as? XTUITextField) ?: return
            textField.onBlur()
        }

    }

}
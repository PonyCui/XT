//package com.opensource.xtruntime
//
//import android.content.Context
//import android.graphics.Color
//import android.graphics.Typeface
//import android.text.Editable
//import android.text.InputType
//import android.text.TextWatcher
//import android.text.method.PasswordTransformationMethod
//import android.view.Gravity
//import android.view.View.OnFocusChangeListener
//import android.view.ViewGroup
//import android.view.inputmethod.EditorInfo
//import android.view.inputmethod.InputMethodManager
//import android.widget.EditText
//import com.eclipsesource.v8.V8
//import com.eclipsesource.v8.V8Object
//import com.eclipsesource.v8.V8Value
//
//
///**
// * Created by cuiminghui on 2017/9/14.
// */
//class XTRTextField: XTRComponent() {
//
//    override val name: String = "XTRTextField"
//
//    override fun v8Object(): V8Object? {
//        val v8Object = V8Object(xtrContext.runtime)
//        v8Object.registerJavaMethod(this, "createScriptObject", "createScriptObject", arrayOf(V8Object::class.java, V8Object::class.java))
//        return v8Object
//    }
//
//    fun createScriptObject(rect: V8Object, scriptObject: V8Object): V8Object {
//        val view = InnerObject(xtrContext.autoRelease(scriptObject.twin()), xtrContext)
//        XTRUtils.toRect(rect)?.let {
//            view.frame = it
//        }
//        return view.requestV8Object(xtrContext.runtime)
//    }
//
//    class InnerObject(scriptObject: V8Object, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {
//
//        val editText = EditText(xtrContext.appContext)
//        val onFocusListener = OnFocusChangeListener { _, _ ->
//            if (editText.isFocused) {
//                XTRWindow.firstResponder = this
//                (xtrContext.invokeMethod(scriptObject, "handleShouldBeginEditing", null) as? Boolean)?.let {
//                    if (!it) {
//                        this.xtr_blur()
//                        return@OnFocusChangeListener
//                    }
//                }
//                if (clearsOnBeginEditing) {
//                    editText.editableText?.clear()
//                }
//                xtrContext.invokeMethod(scriptObject, "handleDidBeginEditing", null)
//            }
//            else {
//                xtrContext.invokeMethod(scriptObject, "handleDidEndEditing", null)
//            }
//            resetLayout()
//        }
//        var lastResult: String = ""
//        var lastCursorStart: Int = 0
//        var lastCursorEnd: Int = 0
//        var onRevert = false
//        val onTextChangeListener = object : TextWatcher {
//            override fun afterTextChanged(p0: Editable?) {
//                if (clearViewMode > 0) {
//                    resetLayout()
//                }
//            }
//            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) { }
//            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
//                if (!onRevert && (p1 > 0 || p2 > 0 || p3 > 0)){
//                    val replacementString: Any = if (p1 + p3 <= p0?.length ?: 0) {
//                        if (p3 > 0) p0?.substring(p1, p1 + p3) ?: V8.getUndefined() else V8.getUndefined()
//                    } else {
//                        V8.getUndefined()
//                    }
//                    val v8Object = V8Object(scriptObject.runtime)
//                    v8Object.add("location", p1)
//                    v8Object.add("length", if (p2 > p3) p3 else p2 - p3)
//                    (xtrContext.invokeMethod(scriptObject , "handleShouldChange", listOf(
//                        v8Object, replacementString
//                    )) as? Boolean)?.let {
//                        if (!it) {
//                            onRevert = true
//                            post {
//                                editText.editableText.clear()
//                                editText.editableText.append(lastResult)
//                                editText.setSelection(lastCursorStart, lastCursorEnd)
//                                onRevert = false
//                            }
//                        }
//                        else {
//                            lastResult = editText.editableText.toString()
//                            lastCursorStart = editText.selectionStart
//                            lastCursorEnd = editText.selectionEnd
//                        }
//                    }
//                    v8Object.release()
//                }
//            }
//        }
//
//        init {
//            isFocusableInTouchMode = true
//            editText.setSingleLine(true)
//            editText.background = null
//            editText.setTextColor(Color.BLACK)
//            editText.gravity = Gravity.LEFT or Gravity.CENTER_VERTICAL
//            editText.onFocusChangeListener = this.onFocusListener
//            editText.addTextChangedListener(onTextChangeListener)
//            editText.setOnEditorActionListener { _, _, _ ->
//                (xtrContext.invokeMethod(scriptObject, "handleShouldReturn", null) as? Boolean)?.let {
//                    return@setOnEditorActionListener it
//                }
//                return@setOnEditorActionListener false
//            }
//            xtr_setUserInteractionEnabled(true)
//            addView(editText, ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
//        }
//
//        override fun requestV8Object(runtime: V8): V8Object {
//            val v8Object = super<XTRView.InnerObject>.requestV8Object(runtime)
//            v8Object.registerJavaMethod(this, "xtr_text", "xtr_text", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setText", "xtr_setText", arrayOf(String::class.java))
//            v8Object.registerJavaMethod(this, "xtr_font", "xtr_font", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setFont", "xtr_setFont", arrayOf(V8Object::class.java))
//            v8Object.registerJavaMethod(this, "xtr_textColor", "xtr_textColor", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setTextColor", "xtr_setTextColor", arrayOf(V8Object::class.java))
//            v8Object.registerJavaMethod(this, "xtr_textAlignment", "xtr_textAlignment", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setTextAlignment", "xtr_setTextAlignment", arrayOf(Int::class.java))
//            v8Object.registerJavaMethod(this, "xtr_placeholder", "xtr_placeholder", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setPlaceholder", "xtr_setPlaceholder", arrayOf(String::class.java))
//            v8Object.registerJavaMethod(this, "xtr_placeholderColor", "xtr_placeholderColor", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setPlaceholderColor", "xtr_setPlaceholderColor", arrayOf(V8Object::class.java))
//            v8Object.registerJavaMethod(this, "xtr_clearsOnBeginEditing", "xtr_clearsOnBeginEditing", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setClearsOnBeginEditing", "xtr_setClearsOnBeginEditing", arrayOf(Boolean::class.java))
//            v8Object.registerJavaMethod(this, "xtr_editing", "xtr_editing", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_clearButtonMode", "xtr_clearButtonMode", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setClearButtonMode", "xtr_setClearButtonMode", arrayOf(Int::class.java))
//            v8Object.registerJavaMethod(this, "xtr_onClearButtonTap", "xtr_onClearButtonTap", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_leftView", "xtr_leftView", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setLeftView", "xtr_setLeftView", arrayOf(V8Object::class.java))
//            v8Object.registerJavaMethod(this, "xtr_leftViewMode", "xtr_leftViewMode", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setLeftViewMode", "xtr_setLeftViewMode", arrayOf(Int::class.java))
//            v8Object.registerJavaMethod(this, "xtr_rightView", "xtr_rightView", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setRightView", "xtr_setRightView", arrayOf(V8Object::class.java))
//            v8Object.registerJavaMethod(this, "xtr_rightViewMode", "xtr_rightViewMode", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setRightViewMode", "xtr_setRightViewMode", arrayOf(Int::class.java))
//            v8Object.registerJavaMethod(this, "xtr_allowAutocapitalization", "xtr_allowAutocapitalization", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setAllowAutocapitalization", "xtr_setAllowAutocapitalization", arrayOf(Boolean::class.java))
//            v8Object.registerJavaMethod(this, "xtr_allowAutocorrection", "xtr_allowAutocorrection", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setAllowAutocorrection", "xtr_setAllowAutocorrection", arrayOf(Boolean::class.java))
//            v8Object.registerJavaMethod(this, "xtr_allowSpellChecking", "xtr_allowSpellChecking", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setAllowSpellChecking", "xtr_setAllowSpellChecking", arrayOf(Boolean::class.java))
//            v8Object.registerJavaMethod(this, "xtr_keyboardType", "xtr_keyboardType", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setKeyboardType", "xtr_setKeyboardType", arrayOf(Int::class.java))
//            v8Object.registerJavaMethod(this, "xtr_returnKeyType", "xtr_returnKeyType", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setReturnKeyType", "xtr_setReturnKeyType", arrayOf(Int::class.java))
//            v8Object.registerJavaMethod(this, "xtr_secureTextEntry", "xtr_secureTextEntry", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_setSecureTextEntry", "xtr_setSecureTextEntry", arrayOf(Boolean::class.java))
//            v8Object.registerJavaMethod(this, "xtr_focus", "xtr_focus", arrayOf())
//            v8Object.registerJavaMethod(this, "xtr_blur", "xtr_blur", arrayOf())
//            return v8Object
//        }
//
//        override fun layoutSubviews() {
//            super.layoutSubviews()
//            leftView?.frame?.let {
//                leftView?.frame = XTRRect(0.0, 0.0, it.width, this.bounds.height)
//            }
//            rightView?.frame?.let {
//                rightView?.frame = XTRRect(this.bounds.width - it.width, 0.0, it.width, this.bounds.height)
//            }
//            clearView?.frame?.let {
//                clearView?.frame = XTRRect(this.bounds.width - it.width, 0.0, it.width, this.bounds.height)
//            }
//            resetLayout()
//        }
//
//        fun resetLayout() {
//            val shouldShowLeftView = leftView != null && ((leftViewMode == 1 && editText.isFocused) || (leftViewMode == 2 && !editText.isFocused) || leftViewMode == 3)
//            var shouldShowRightView = rightView != null && ((rightViewMode == 1 && editText.isFocused) || (rightViewMode == 2 && !editText.isFocused) || rightViewMode == 3)
//            val shouldShowClearView = clearView != null && ((clearViewMode == 1 && editText.isFocused && editText.text.isNotEmpty()) || (clearViewMode == 2 && !editText.isFocused) || clearViewMode == 3)
//            if (shouldShowClearView) { shouldShowRightView = false }
//            leftView?.xtr_setHidden(!shouldShowLeftView)
//            rightView?.xtr_setHidden(!shouldShowRightView)
//            clearView?.xtr_setHidden(!shouldShowClearView)
//            editText.x = if (shouldShowLeftView) (leftView?.frame?.width?.toFloat() ?: 0.0f) * resources.displayMetrics.density  else 0.0f
//            editText.height = this.height
//            var rightWidth = if (shouldShowRightView) (rightView?.frame?.width?.toFloat() ?: 0.0f) * resources.displayMetrics.density  else 0.0f
//            if (shouldShowClearView) {
//                rightWidth = (clearView?.frame?.width?.toFloat() ?: 0.0f) * resources.displayMetrics.density
//            }
//            editText.width = (this.width - editText.x - rightWidth).toInt()
//        }
//
//        fun xtr_text(): Any? {
//            return this.editText.text?.toString() ?: V8.getUndefined()
//        }
//
//        fun xtr_setText(value: String) {
//            this.editText.editableText?.let {
//                it.clear()
//                it.append(value)
//            }
//        }
//
//        private var xtrFont: XTRFont = XTRFont(14.0, null)
//            set(value) {
//                field = value
//                editText.textSize = value.pointSize.toFloat()
//                var typefaceStyle = Typeface.NORMAL
//                if (value.fontWeight == "700" && value.fontStyle == "italic") {
//                    typefaceStyle = Typeface.BOLD_ITALIC
//                }
//                else if (value.fontWeight == "700") {
//                    typefaceStyle = Typeface.BOLD
//                }
//                else if (value.fontStyle == "italic") {
//                    typefaceStyle = Typeface.ITALIC
//                }
//                editText.typeface = Typeface.create(value.familyName, typefaceStyle)
//            }
//
//        fun xtr_font(): V8Value {
//            return XTRUtils.fromObject(xtrContext, this.xtrFont) as? V8Object ?: V8.getUndefined()
//        }
//
//        fun xtr_setFont(value: V8Object) {
//            XTRUtils.toFont(value)?.let {
//                xtrFont = it
//            }
//        }
//
//        fun xtr_textColor(): V8Value {
//            return XTRUtils.fromObject(xtrContext, XTRUtils.fromIntColor(editText.currentTextColor)) as? V8Object ?: V8.getUndefined()
//        }
//
//        fun xtr_setTextColor(value: V8Object) {
//            XTRUtils.toColor(value)?.let {
//                editText.setTextColor(it.intColor())
//            }
//        }
//
//        private var xtrTextAlignment = 0
//            set(value) {
//                field = value
//                when (value) {
//                    0 -> {
//                        editText.gravity = Gravity.LEFT or Gravity.CENTER_VERTICAL
//                    }
//                    1 -> {
//                        editText.gravity = Gravity.CENTER_HORIZONTAL or Gravity.CENTER_VERTICAL
//                    }
//                    2 -> {
//                        editText.gravity = Gravity.RIGHT or Gravity.CENTER_VERTICAL
//                    }
//                }
//            }
//
//        fun xtr_textAlignment(): Int {
//            return xtrTextAlignment
//        }
//
//        fun xtr_setTextAlignment(value: Int) {
//            xtrTextAlignment = value
//        }
//
//        fun xtr_placeholder(): Any? {
//            return this.editText.hint?.toString() ?: V8.getUndefined()
//        }
//
//        fun xtr_setPlaceholder(value: String) {
//            this.editText.hint = value
//        }
//
//        fun xtr_placeholderColor(): V8Value {
//            return XTRUtils.fromObject(xtrContext, XTRUtils.fromIntColor(editText.currentHintTextColor)) as? V8Object ?: V8.getUndefined()
//        }
//
//        fun xtr_setPlaceholderColor(value: V8Object) {
//            XTRUtils.toColor(value)?.let {
//                editText.setHintTextColor(it.intColor())
//            }
//        }
//
//        private var clearsOnBeginEditing = false
//
//        fun xtr_clearsOnBeginEditing(): Boolean {
//            return this.clearsOnBeginEditing
//        }
//
//        fun xtr_setClearsOnBeginEditing(value: Boolean) {
//            this.clearsOnBeginEditing = value
//        }
//
//        fun xtr_editing(): Boolean {
//            return this.editText.isFocused
//        }
//
//        private var clearView: XTRView.InnerObject? = null
//            set(value) {
//                field?.let { it.xtr_removeFromSuperview() }
//                field = value
//                field?.let { this.xtr_addSubview(it) }
//            }
//
//        private fun resetClearView() {
//            if (clearView == null) {
//                (XTRUtils.toView(xtrContext.invokeMethod(scriptObject, "requestClearView", null)) as? XTRView.InnerObject)?.let {
//                    clearView = it
//                }
//            }
//        }
//
//        private var clearViewMode: Int = 0
//            set(value) { resetClearView(); field = value; resetLayout(); }
//
//        fun xtr_clearButtonMode(): Int {
//            return this.clearViewMode
//        }
//
//        fun xtr_setClearButtonMode(value: Int) {
//            this.clearViewMode = value
//        }
//
//        fun xtr_onClearButtonTap() {
//            (xtrContext.invokeMethod(scriptObject, "handleShouldClear", null) as? Boolean)?.let {
//                if (!it) { return }
//            }
//            this.editText.editableText?.clear()
//        }
//
//        private var leftView: XTRView.InnerObject? = null
//            set(value) {
//                field?.let { it.xtr_removeFromSuperview() }
//                field = value
//                field?.let { this.xtr_addSubview(it) }
//                resetLayout()
//            }
//
//        fun xtr_leftView(): Any? {
//            return XTRUtils.fromObject(xtrContext, this.leftView)
//        }
//
//        fun xtr_setLeftView(value: V8Object) {
//            this.leftView = XTRUtils.toView(value) as? XTRView.InnerObject
//        }
//
//        private var leftViewMode: Int = 0
//            set(value) { field = value; resetLayout(); }
//
//        fun xtr_leftViewMode(): Int {
//            return this.leftViewMode
//        }
//
//        fun xtr_setLeftViewMode(value: Int) {
//            this.leftViewMode = value
//        }
//
//        private var rightView: XTRView.InnerObject? = null
//            set(value) {
//                field?.let { it.xtr_removeFromSuperview() }
//                field = value
//                field?.let { this.xtr_addSubview(it) }
//                resetLayout()
//            }
//
//        fun xtr_rightView(): Any? {
//            return XTRUtils.fromObject(xtrContext, this.rightView)
//        }
//
//        fun xtr_setRightView(value: V8Object) {
//            this.rightView = XTRUtils.toView(value) as? XTRView.InnerObject
//        }
//
//        private var rightViewMode: Int = 0
//            set(value) { field = value; resetLayout(); }
//
//        fun xtr_rightViewMode(): Int {
//            return this.rightViewMode
//        }
//
//        fun xtr_setRightViewMode(value: Int) {
//            this.rightViewMode = value
//        }
//
//        fun xtr_allowAutocapitalization(): Boolean {
//            return this.editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_SENTENCES > 0
//        }
//
//        fun xtr_setAllowAutocapitalization(value: Boolean) {
//            if (value) {
//                if (this.editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_SENTENCES <= 0) {
//                    this.editText.inputType = this.editText.inputType or InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
//                }
//            }
//            else {
//                if (this.editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_SENTENCES > 0) {
//                    this.editText.inputType = this.editText.inputType xor InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
//                }
//                if (this.editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS > 0) {
//                    this.editText.inputType = this.editText.inputType xor InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS
//                }
//                if (this.editText.inputType and InputType.TYPE_TEXT_FLAG_CAP_WORDS > 0) {
//                    this.editText.inputType = this.editText.inputType xor InputType.TYPE_TEXT_FLAG_CAP_WORDS
//                }
//            }
//        }
//
//        fun xtr_allowAutocorrection(): Boolean {
//            return this.editText.inputType and InputType.TYPE_TEXT_FLAG_AUTO_CORRECT > 0
//        }
//
//        fun xtr_setAllowAutocorrection(value: Boolean) {
//            if (value) {
//                if (this.editText.inputType and InputType.TYPE_TEXT_FLAG_AUTO_CORRECT <= 0) {
//                    this.editText.inputType = this.editText.inputType or InputType.TYPE_TEXT_FLAG_AUTO_CORRECT
//                }
//            }
//            else {
//                this.editText.inputType = this.editText.inputType xor InputType.TYPE_TEXT_FLAG_AUTO_CORRECT
//            }
//        }
//
//        fun xtr_allowSpellChecking(): Boolean {
//            return this.editText.inputType and InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS > 0
//        }
//
//        fun xtr_setAllowSpellChecking(value: Boolean) {
//            if (value) {
//                if (this.editText.inputType and InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS <= 0) {
//                    this.editText.inputType = this.editText.inputType or InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS
//                }
//            }
//            else {
//                this.editText.inputType = this.editText.inputType xor InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS
//            }
//        }
//
//        fun xtr_keyboardType(): Int {
//            return when {
//                this.editText.inputType and InputType.TYPE_CLASS_TEXT > 0 -> 1
//                this.editText.inputType and InputType.TYPE_CLASS_NUMBER > 0 -> 2
//                else -> 0
//            }
//        }
//
//        fun xtr_setKeyboardType(value: Int) {
//            if (this.editText.inputType and InputType.TYPE_CLASS_TEXT > 0) {
//                this.editText.inputType = this.editText.inputType xor InputType.TYPE_CLASS_TEXT
//            }
//            if (this.editText.inputType and InputType.TYPE_CLASS_NUMBER > 0) {
//                this.editText.inputType = this.editText.inputType xor InputType.TYPE_CLASS_NUMBER
//            }
//            if (this.editText.inputType and InputType.TYPE_NUMBER_FLAG_DECIMAL > 0) {
//                this.editText.inputType = this.editText.inputType xor InputType.TYPE_NUMBER_FLAG_DECIMAL
//            }
//            if (this.editText.inputType and InputType.TYPE_NUMBER_FLAG_SIGNED > 0) {
//                this.editText.inputType = this.editText.inputType xor InputType.TYPE_NUMBER_FLAG_SIGNED
//            }
//            when (value) {
//                0 -> {
//                    this.editText.inputType = this.editText.inputType or InputType.TYPE_CLASS_TEXT
//                }
//                1 -> {
//                    this.editText.inputType = this.editText.inputType or InputType.TYPE_CLASS_TEXT
//                }
//                2 -> {
//                    if (this.editText.inputType and InputType.TYPE_CLASS_NUMBER <= 0) {
//                        this.editText.inputType = this.editText.inputType or
//                                InputType.TYPE_CLASS_NUMBER or
//                                InputType.TYPE_NUMBER_FLAG_DECIMAL or
//                                InputType.TYPE_NUMBER_FLAG_SIGNED
//                    }
//                }
//            }
//        }
//
//        fun xtr_returnKeyType(): Int {
//            return when (this.editText.imeOptions) {
//                EditorInfo.IME_ACTION_GO -> 1
//                EditorInfo.IME_ACTION_NEXT -> 4
//                EditorInfo.IME_ACTION_SEARCH -> 6
//                EditorInfo.IME_ACTION_SEND -> 7
//                EditorInfo.IME_ACTION_DONE -> 8
//                else -> 0
//            }
//        }
//
//        fun xtr_setReturnKeyType(value: Int) {
//            when (value) {
//                1 -> this.editText.imeOptions = EditorInfo.IME_ACTION_GO
//                4 -> this.editText.imeOptions = EditorInfo.IME_ACTION_NEXT
//                6 -> this.editText.imeOptions = EditorInfo.IME_ACTION_SEARCH
//                7 -> this.editText.imeOptions = EditorInfo.IME_ACTION_SEND
//                8 -> this.editText.imeOptions = EditorInfo.IME_ACTION_DONE
//                else -> this.editText.imeOptions = 0
//            }
//        }
//
//        fun xtr_secureTextEntry(): Boolean {
//            return this.editText.transformationMethod is PasswordTransformationMethod
//        }
//
//        fun xtr_setSecureTextEntry(value: Boolean) {
//            if (value) this.editText.transformationMethod = PasswordTransformationMethod()
//            else this.editText.transformationMethod = null
//
//        }
//
//        fun xtr_focus() {
//            this.editText.requestFocus()
//        }
//
//        fun xtr_blur() {
//            if (this.editText.isFocused) {
//                (xtrContext.invokeMethod(scriptObject, "handleShouldEndEditing", null) as? Boolean)?.let {
//                    if (!it) {
//                        return
//                    }
//                }
//                this.editText.clearFocus()
//                val inputMethodManager = xtrContext.appContext.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
//                inputMethodManager.hideSoftInputFromWindow(this.windowToken, 0)
//            }
//        }
//
//    }
//
//}
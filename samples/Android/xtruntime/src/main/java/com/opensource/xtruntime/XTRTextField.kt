package com.opensource.xtruntime

import android.graphics.Typeface
import android.view.Gravity
import android.view.ViewGroup
import android.widget.EditText
import org.mozilla.javascript.ScriptableObject
import org.mozilla.javascript.Undefined
import java.util.*

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

    class InnerObject(scriptObject: ScriptableObject, xtrContext: XTRContext): XTRView.InnerObject(scriptObject, xtrContext), XTRObject {

        val editText = EditText(xtrContext.appContext)
        val onFocusListener = OnFocusChangeListener { _, _ ->
            if (editText.isFocused) {
                if (clearsOnBeginEditing) {
                    editText.editableText?.clear()
                }
            }
            resetLayout()
        }

        init {
            editText.setSingleLine(true)
            editText.background = null
            editText.gravity = Gravity.LEFT or Gravity.CENTER_VERTICAL
            editText.onFocusChangeListener = this.onFocusListener
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
            val shouldShowRightView = rightView != null && ((rightViewMode == 1 && editText.isFocused) || (rightViewMode == 2 && !editText.isFocused) || rightViewMode == 3)
            val shouldShowClearView = !shouldShowRightView && clearView != null && ((clearViewMode == 1 && editText.isFocused) || (clearViewMode == 2 && !editText.isFocused) || clearViewMode == 3)
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

    }

}
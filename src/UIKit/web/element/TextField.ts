import { ViewElement } from "./View";
import { Rect } from "../../interface/Rect";
import { Font } from "../../interface/Font";
import { Color } from "../../interface/Color";
import { TextAlignment } from "../../interface/Label";
import { TextFieldViewMode, KeyboardType } from "../../interface/TextField";
import { Application } from "../Application";

let measureSpan: HTMLSpanElement = document.createElement("span")

export class TextFieldElement extends ViewElement {

    private inputObject: HTMLInputElement
    private placeholderObject: HTMLSpanElement

    loadContent() {
        super.loadContent();
        this.leftViewWidth = 0;
        this.rightViewWidth = 0;
        this.inputObject = document.createElement("input");
        this.inputObject.style.backgroundColor = "transparent"
        this.inputObject.style.position = "absolute"
        this.inputObject.style.width = "100%"
        this.inputObject.style.height = "100%"
        this.inputObject.style.border = "none"
        this.inputObject.style.outline = "none"
        this.inputObject.style.color = "black"
        this.inputObject.style.fontSize = "14px"
        this.inputObject.addEventListener("focus", () => {
            this.editing = true
            if (this.scriptObject.didBeginEditing) {
                this.scriptObject.didBeginEditing();
            }
        })
        this.inputObject.addEventListener("blur", () => {
            this.editing = false
            if (this.scriptObject.didEndEditing) {
                this.scriptObject.didEndEditing();
            }
        })
        this.nativeObject.appendChild(this.inputObject)
        this.setupInputChangeListener()
        this.placeholderObject = document.createElement("span")
        this.placeholderObject.style.color = "#a0a0a0"
        this.placeholderObject.style.fontSize = "14px"
        this.placeholderObject.style.position = "absolute"
        this.placeholderObject.style.width = "100%"
        this.placeholderObject.style.height = "100%"
        this.nativeObject.appendChild(this.placeholderObject)
        this.setupReturnKeyListenner();
    }

    private _editing = false

    private get editing(): boolean {
        return this._editing;
    }

    private set editing(value: boolean) {
        this._editing = value;
        if (value) {
            if (this.clearsOnBeginEditing) {
                this.inputObject.value = "";
            }
        }
        else {

        }
        this.resetContentRects()
        this.resetFieldViewOpacity()
    }

    private leftViewWidth: number = 0

    public xtr_setLeftViewWidth(value: number) {
        this.leftViewWidth = value;
        this.resetContentRects();
        this.resetFieldViewOpacity();
    }

    private get activeLeftViewWidth(): number {
        switch (this.leftViewMode) {
            case TextFieldViewMode.Never:
                return 0.0;
            case TextFieldViewMode.Always:
                return this.leftViewWidth;
            case TextFieldViewMode.WhileEditing:
                return this.editing ? this.leftViewWidth : 0.0
            case TextFieldViewMode.UnlessEditing:
                return this.editing ? 0.0 : this.leftViewWidth
            default:
                return 0.0
        }
    }

    private leftViewMode: TextFieldViewMode = TextFieldViewMode.Never

    public xtr_leftViewMode(): TextFieldViewMode {
        return this.leftViewMode
    }

    public xtr_setLeftViewMode(value: TextFieldViewMode) {
        this.leftViewMode = value
        this.resetContentRects();
        this.resetFieldViewOpacity();
    }

    private rightViewWidth: number = 0

    public xtr_setRightViewWidth(value: number) {
        this.rightViewWidth = value;
        this.resetContentRects();
        this.resetFieldViewOpacity();
    }

    private get activeRightViewWidth(): number {
        if (this.rightViewWidth === 0.0) {
            switch (this.clearButtonMode) {
                case TextFieldViewMode.Never:
                    return 0.0;
                case TextFieldViewMode.Always:
                    return 36.0;
                case TextFieldViewMode.WhileEditing:
                    return this.editing ? 36.0 : 0.0
                case TextFieldViewMode.UnlessEditing:
                    return this.editing ? 0.0 : 36.0;
                default:
                    return 0.0
            }
        }
        switch (this.rightViewMode) {
            case TextFieldViewMode.Never:
                return 0.0;
            case TextFieldViewMode.Always:
                return this.rightViewWidth;
            case TextFieldViewMode.WhileEditing:
                return this.editing ? this.rightViewWidth : 0.0
            case TextFieldViewMode.UnlessEditing:
                return this.editing ? 0.0 : this.rightViewWidth
            default:
                return 0.0
        }
    }

    private rightViewMode: TextFieldViewMode = TextFieldViewMode.Never

    public xtr_rightViewMode(): TextFieldViewMode {
        return this.rightViewMode
    }

    public xtr_setRightViewMode(value: TextFieldViewMode) {
        this.rightViewMode = value
        this.resetContentRects();
        this.resetFieldViewOpacity();
    }

    private clearButtonMode: TextFieldViewMode = TextFieldViewMode.Never

    public xtr_clearButtonMode(): TextFieldViewMode {
        return this.clearButtonMode
    }

    public xtr_setClearButtonMode(value: TextFieldViewMode) {
        this.clearButtonMode = value
        this.resetContentRects();
        this.resetFieldViewOpacity();
    }

    public xtr_setFrame(value: Rect) {
        super.xtr_setFrame(value);
        this.placeholderObject.style.lineHeight = value.height.toString() + "px"
        this.resetContentRects();
    }

    public xtr_allowAutocapitalization(): Boolean {
        return this.inputObject.getAttribute("autocapitalize") === "off"
    }

    public xtr_setAllowAutocapitalization(value: Boolean) {
        this.inputObject.setAttribute("autocapitalize", value ? "on" : "off")
    }

    public xtr_allowAutocorrection(): Boolean {
        return this.inputObject.getAttribute("autocorrect") === "off"
    }

    public xtr_setAllowAutocorrection(value: Boolean) {
        this.inputObject.setAttribute("autocorrect", value ? "on" : "off")
    }

    public xtr_allowSpellChecking(): Boolean {
        return this.inputObject.getAttribute("spellcheck") === "true"
    }

    public xtr_setAllowSpellChecking(value: Boolean) {
        this.inputObject.setAttribute("spellcheck", value ? "true" : "false")
    }

    private keyboardType: KeyboardType = KeyboardType.Default

    public xtr_keyboardType(): KeyboardType {
        return this.keyboardType
    }

    public xtr_setKeyboardType(value: KeyboardType) {
        this.keyboardType = value;
        switch (this.keyboardType) {
            case KeyboardType.Default:
                this.inputObject.setAttribute("type", "text");
                break;
            case KeyboardType.ASCIICapable:
                this.inputObject.setAttribute("type", "email");
                break;
            case KeyboardType.NumbersAndPunctuation:
                this.inputObject.setAttribute("type", "number");
                break;
        }
    }

    public xtr_returnKeyType() {
        return 0
    }

    public xtr_setReturnKeyType(value: any) { }

    private resetFieldViewOpacity() {
        if (this.scriptObject.leftView) {
            switch (this.leftViewMode) {
                case TextFieldViewMode.Never:
                    this.scriptObject.leftView.hidden = true;
                    break;
                case TextFieldViewMode.Always:
                    this.scriptObject.leftView.hidden = false;
                    break;
                case TextFieldViewMode.WhileEditing:
                    this.scriptObject.leftView.hidden = !this.editing;
                    break;
                case TextFieldViewMode.UnlessEditing:
                    this.scriptObject.leftView.hidden = this.editing;
                    break;
                default:
                    this.scriptObject.leftView.hidden = false;
                    break;
            }
        }
        if (this.scriptObject.rightView) {
            switch (this.rightViewMode) {
                case TextFieldViewMode.Never:
                    this.scriptObject.rightView.hidden = true;
                    break;
                case TextFieldViewMode.Always:
                    this.scriptObject.rightView.hidden = false;
                    break;
                case TextFieldViewMode.WhileEditing:
                    this.scriptObject.rightView.hidden = !this.editing;
                    break;
                case TextFieldViewMode.UnlessEditing:
                    this.scriptObject.rightView.hidden = this.editing;
                    break;
                default:
                    this.scriptObject.rightView.hidden = false;
                    break;
            }
        }
        if (this.scriptObject.rightView === undefined && this.scriptObject._clearView) {
            switch (this.clearButtonMode) {
                case TextFieldViewMode.Never:
                    this.scriptObject._clearView.hidden = true;
                    break;
                case TextFieldViewMode.Always:
                    this.scriptObject._clearView.hidden = false;
                    break;
                case TextFieldViewMode.WhileEditing:
                    this.scriptObject._clearView.hidden = !this.editing;
                    break;
                case TextFieldViewMode.UnlessEditing:
                    this.scriptObject._clearView.hidden = this.editing;
                    break;
                default:
                    this.scriptObject._clearView.hidden = false;
                    break;
            }
        }
        else if (this.scriptObject._clearView) {
            this.scriptObject._clearView.hidden = true;
        }
    }

    public xtr_text(): string {
        return this.inputObject.value || "";
    }

    public xtr_setText(value: string) {
        this.inputObject.value = value
    }

    private font: Font = Font.systemFontOfSize(14.0)

    public xtr_font(): Font {
        return this.font
    }

    public xtr_setFont(value: Font) {
        this.font = value
        this.inputObject.style.fontSize = this.font.pointSize.toString() + "px"
        this.inputObject.style.fontFamily = this.font.familyName || "Arial";
        this.inputObject.style.fontWeight = this.font.fontWeight;
        this.inputObject.style.fontStyle = this.font.fontStyle;
        this.placeholderObject.style.fontSize = this.font.pointSize.toString() + "px"
        this.placeholderObject.style.fontFamily = this.font.familyName || "Arial";
        this.placeholderObject.style.fontWeight = this.font.fontWeight;
        this.placeholderObject.style.fontStyle = this.font.fontStyle;
        this.inputObject.dispatchEvent(new Event("setting"));
    }

    private textColor: Color = Color.blackColor

    public xtr_textColor(): Color {
        return this.textColor
    }

    public xtr_setTextColor(value: Color) {
        this.textColor = value
        this.inputObject.style.color = 'rgba(' + (this.textColor.r * 255).toFixed(0) + ', ' + (this.textColor.g * 255).toFixed(0) + ', ' + (this.textColor.b * 255).toFixed(0) + ', ' + this.textColor.a.toString() + ')'
    }

    private textAlignment: TextAlignment = TextAlignment.Left

    public xtr_textAlignment(): TextAlignment {
        return this.textAlignment
    }

    public xtr_setTextAlignment(value: TextAlignment) {
        this.textAlignment = value;
        switch (value) {
            case TextAlignment.Left:
                this.inputObject.style.textAlign = "left";
                this.placeholderObject.style.textAlign = "left";
                break;
            case TextAlignment.Center:
                this.inputObject.style.textAlign = "center";
                this.placeholderObject.style.textAlign = "center";
                break;
            case TextAlignment.Right:
                this.inputObject.style.textAlign = "right";
                this.placeholderObject.style.textAlign = "right";
                break;
        }
    }

    public xtr_placeholder(): string {
        return this.placeholderObject.innerText
    }

    public xtr_setPlaceholder(value: string) {
        this.placeholderObject.innerText = value;
    }

    private placeholderColor: Color = Color.blackColor

    public xtr_placeholderColor(): Color {
        return this.placeholderColor
    }

    public xtr_setPlaceholderColor(value: Color) {
        this.placeholderColor = value;
        this.placeholderObject.style.color = 'rgba(' + (this.placeholderColor.r * 255).toFixed(0) + ', ' + (this.placeholderColor.g * 255).toFixed(0) + ', ' + (this.placeholderColor.b * 255).toFixed(0) + ', ' + this.placeholderColor.a.toString() + ')'
    }

    private clearsOnBeginEditing: Boolean = false

    public xtr_clearsOnBeginEditing(): Boolean {
        return this.clearsOnBeginEditing
    }

    public xtr_setClearsOnBeginEditing(value: Boolean) {
        this.clearsOnBeginEditing = value;
    }

    public xtr_editing(): Boolean {
        return this.editing
    }

    public xtr_onClearButtonTap() {
        if (this.scriptObject.shouldClear) {
            if (!this.scriptObject.shouldClear()) { return; }
        }
        this.inputObject.value = ""
    }

    public xtr_focus() {
        if (this.scriptObject.shouldBeginEditing) {
            if (!this.scriptObject.shouldBeginEditing()) { return; }
        }
        this.editing = true;
        this.inputObject.focus();
        if (this.scriptObject.didBeginEditing) {
            this.scriptObject.didBeginEditing()
        }
    }

    public xtr_blur() {
        if (this.scriptObject.shouldEndEditing) {
            if (!this.scriptObject.shouldEndEditing()) { return; }
        }
        this.inputObject.blur();
        this.editing = false;
        if (this.scriptObject.didEndEditing) {
            this.scriptObject.didEndEditing()
        }
    }

    private secureTextEntry: Boolean = false

    public xtr_secureTextEntry(): Boolean {
        return this.secureTextEntry
    }

    public xtr_setSecureTextEntry(value: Boolean) {
        this.secureTextEntry = value;
        if (value) {
            this.inputObject.setAttribute("type", "password")
        }
        else {
            this.inputObject.setAttribute("type", "normal")
        }
    }

    private setupReturnKeyListenner() {
        this.inputObject.addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                if (this.scriptObject.shouldReturn) {
                    this.scriptObject.shouldReturn()
                }
            }
        })
    }

    private setupInputChangeListener() {
        this.inputObject.addEventListener('input', () => {
            const currentText = this.inputObject.value;
            this.placeholderObject.style.opacity = currentText.length > 0 ? "0.0" : "1.0"
            this.resetContentRects()
        })
    }

    private resetContentRects() {
        this.inputObject.style.paddingLeft = this.activeLeftViewWidth.toString() + "px"
        this.placeholderObject.style.paddingLeft = this.activeLeftViewWidth.toString() + "px"
        this.inputObject.style.paddingRight = this.activeRightViewWidth.toString() + "px"
        this.placeholderObject.style.paddingRight = this.activeRightViewWidth.toString() + "px"
    }

}
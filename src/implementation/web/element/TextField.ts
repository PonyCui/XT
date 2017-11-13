import { ViewElement } from "./View";
import { Rect } from "../../../interface/Rect";
import { Font } from "../../../interface/Font";
import { Color } from "../../../interface/Color";
import { TextAlignment } from "../../../interface/Label";
import { TextFieldViewMode, KeyboardType } from "../../../interface/TextField";

let measureSpan: HTMLSpanElement = document.createElement("span")

export class TextFieldElement extends ViewElement {

    private inputGroup: SVGGElement
    private inputGroupMask: SVGMaskElement
    private foreignObject: SVGForeignObjectElement
    private inputObject: HTMLInputElement
    private placeholderObject: SVGTextElement

    loadContent() {
        super.loadContent();
        this.leftViewWidth = 0;
        this.rightViewWidth = 0;
        this.contentObject = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.inputGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.inputGroupMask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
        this.inputGroupMask.setAttribute('id', this.objectUUID + ".inputGroup.mask");
        this.inputGroupMask.innerHTML = '';
        const defs = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "defs")[0]
        if (!defs.contains(this.inputGroupMask)) {
            defs.appendChild(this.inputGroupMask)
        }
        this.inputGroup.style.mask = 'url(#' + (this.objectUUID + ".inputGroup.mask") + ')'
        this.foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        this.inputObject = document.createElement("input");
        this.inputObject.style.backgroundColor = "transparent"
        this.inputObject.style.border = "none"
        this.inputObject.style.outline = "none"
        this.inputObject.style.color = "black"
        this.inputObject.style.fontSize = "14px"
        this.foreignObject.appendChild(this.inputObject);
        if (this.shouldSetupChromePatcher()) {
            this.setupChromePatcher();
        }
        this.setupInputChangeListener()
        this.placeholderObject = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.placeholderObject.style.fill = "#a0a0a0"
        this.placeholderObject.style.fontSize = "14px"
        this.placeholderObject.setAttribute("alignment-baseline", "central")
        this.placeholderObject.setAttribute("x", this.shouldSetupIOSPatcher() ? "8" : "0")
        this.inputGroup.appendChild(this.placeholderObject);
        this.inputGroup.appendChild(this.foreignObject)
        this.contentObject.appendChild(this.inputGroup);
        this.setupReturnKeyListenner();
        this.setupShouldChangeListenner();
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

    public get xtr_returnKeyType() {
        return 0
    }

    public set xtr_setReturnKeyType(value: any) { }

    private resetContentRects() {
        const inputWidth = (this.xtr_frame().width - this.activeLeftViewWidth - this.activeRightViewWidth)
        const inputHeight = this.xtr_frame().height
        this.inputGroup.setAttribute("transform", "matrix(1.0, 0.0, 0.0, 1.0, " + (this.activeLeftViewWidth + (this.shouldSetupIOSPatcher() ? 0.0 : 8.0)).toString() + ", 0.0)");
        this.foreignObject.setAttribute('width', inputWidth.toString())
        this.foreignObject.setAttribute('height', inputHeight.toString())
        if (this.scriptObject.leftView) {
            this.scriptObject.leftView.frame = { x: 0, y: (inputHeight - this.scriptObject.leftView.frame.height) / 2.0, width: this.scriptObject.leftView.frame.width, height: this.scriptObject.leftView.frame.height };
        }
        if (this.scriptObject.rightView) {
            this.scriptObject.rightView.frame = { x: this.xtr_frame().width - this.rightViewWidth, y: (inputHeight - this.scriptObject.rightView.frame.height) / 2.0, width: this.scriptObject.rightView.frame.width, height: this.scriptObject.rightView.frame.height };
        }
        if (this.scriptObject._clearView) {
            this.scriptObject._clearView.frame = { x: this.xtr_frame().width - 36, y: 0, width: 36, height: inputHeight };
        }
        if (this.shouldSetupChromePatcher()) {
            this.inputObject.style.width = this.inputObject.style.width || "1000px";
        }
        else {
            this.inputObject.style.width = inputWidth + "px";
        }
        this.inputObject.style.height = inputHeight + "px";
        switch (this.textAlignment) {
            case TextAlignment.Left:
                this.placeholderObject.style.textAnchor = "start"
                this.placeholderObject.setAttribute("x", this.shouldSetupIOSPatcher() ? "8" : "0")
                break;
            case TextAlignment.Center:
                this.placeholderObject.style.textAnchor = "middle"
                this.placeholderObject.setAttribute("x", (inputWidth / 2.0).toString())
                break;
            case TextAlignment.Right:
                this.placeholderObject.style.textAnchor = "end"
                this.placeholderObject.setAttribute("x", (inputWidth - 8).toString())
                break;
        }
        this.placeholderObject.setAttribute("y", (inputHeight / 2).toString())
        this.resetInputGroupMaskPath();
    }

    private resetInputGroupMaskPath() {
        const inputWidth = (this.xtr_frame().width - this.activeLeftViewWidth - this.activeRightViewWidth)
        const inputHeight = this.xtr_frame().height
        const maskPath = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        maskPath.setAttribute("width", inputWidth.toString());
        maskPath.setAttribute("height", inputHeight.toString());
        maskPath.style.fill = "white";
        this.inputGroupMask.innerHTML = '';
        this.inputGroupMask.appendChild(maskPath);
    }

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
        if (this.shouldSetupChromePatcher()) { this.inputObject.dispatchEvent(new Event("setting")); }
    }

    private font: Font = Font.systemFontOfSize(14.0)

    public xtr_font(): Font {
        return this.font
    }

    public xtr_setFont(value: Font | undefined) {
        this.font = value || Font.systemFontOfSize(14.0)
        this.inputObject.style.fontSize = this.font.pointSize.toString()
        this.inputObject.style.fontFamily = this.font.familyName || "Arial";
        this.inputObject.style.fontWeight = this.font.fontWeight;
        this.inputObject.style.fontStyle = this.font.fontStyle;
        this.placeholderObject.style.fontSize = this.font.pointSize.toString()
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
        this.resetContentRects();
        if (this.shouldSetupChromePatcher()) { this.inputObject.dispatchEvent(new Event("setting")); return; }
        switch (value) {
            case TextAlignment.Left:
                this.inputObject.style.textAlign = "left";
                break;
            case TextAlignment.Center:
                this.inputObject.style.textAlign = "center";
                break;
            case TextAlignment.Right:
                this.inputObject.style.textAlign = "right";
                break;
        }
        this.inputObject.dispatchEvent(new Event("setting"));
    }

    public xtr_placeholder(): string {
        return this.placeholderObject.innerHTML
    }

    public xtr_setPlaceholder(value: string) {
        this.placeholderObject.innerHTML = value;
    }

    private placeholderColor: Color = Color.blackColor

    public xtr_placeholderColor(): Color {
        return this.placeholderColor
    }

    public xtr_setPlaceholderColor(value: Color) {
        this.placeholderColor = value;
        this.placeholderObject.style.fill = 'rgba(' + (this.placeholderColor.r * 255).toFixed(0) + ', ' + (this.placeholderColor.g * 255).toFixed(0) + ', ' + (this.placeholderColor.b * 255).toFixed(0) + ', ' + this.placeholderColor.a.toString() + ')'
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
        setTimeout(() => {
            if (this.shouldSetupChromePatcher()) { this.inputObject.dispatchEvent(new Event("setting")); }
        }, 250)
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
        if (this.shouldSetupChromePatcher()) { this.inputObject.dispatchEvent(new Event("setting")); }
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

    private setupShouldChangeListenner() { }

    private shouldSetupChromePatcher(): boolean {
        return navigator.vendor === "Google Inc."
    }

    private shouldSetupIOSPatcher(): boolean {
        return navigator.vendor === "Apple Computer, Inc." && (navigator.userAgent.indexOf("iPhone OS") >= 0 || navigator.userAgent.indexOf("iPad OS") >= 0)
    }

    private setupChromePatcher() {
        if (measureSpan.parentNode === null) {
            measureSpan.style.opacity = "0.0"
            measureSpan.style.position = "absolute"
            measureSpan.style.display = "inline-block"
            measureSpan.style.whiteSpace = "nowrap"
            measureSpan.style.left = "-10000000px"
            measureSpan.style.top = "-10000000px"
            // measureSpan.style.left = "44px"
            // measureSpan.style.top = "20px"
            document.body.appendChild(measureSpan);
        }
        const patcher = () => {
            const groupWidth = (this.xtr_frame().width - this.activeLeftViewWidth - this.activeRightViewWidth - 8)
            const currentText = this.inputObject.value;
            measureSpan.style.fontSize = this.inputObject.style.fontSize
            measureSpan.style.fontFamily = this.inputObject.style.fontFamily || "Arial"
            measureSpan.style.fontWeight = this.inputObject.style.fontWeight
            measureSpan.style.fontStyle = this.inputObject.style.fontStyle
            let textWidth: number;
            if (this.secureTextEntry) {
                let str = "";
                for (let index = 0; index < currentText.length; index++) {
                    str += ")";
                }
                measureSpan.innerText = str;
                textWidth = measureSpan.offsetWidth * 1.05;
            }
            else {
                measureSpan.innerText = currentText;
                textWidth = measureSpan.offsetWidth;
            }
            let inputWidth = parseInt((this.inputObject.style.width || "1000").replace("px", ""))
            if (textWidth > inputWidth / 2) {
                inputWidth *= 2;
                this.inputObject.style.width = inputWidth.toString() + 'px';
            }
            if (this.textAlignment === TextAlignment.Right) {
                if (textWidth < groupWidth) {
                    this.inputObject.style.paddingLeft = (groupWidth - textWidth - 8).toString() + "px";
                    this.inputObject.style.marginLeft = null;
                }
                else {
                    this.inputObject.style.paddingLeft = null;
                    this.inputObject.style.marginLeft = (groupWidth - textWidth - 8).toString() + "px";
                }
            }
            if (this.textAlignment === TextAlignment.Center) {
                if (textWidth < groupWidth) {
                    this.inputObject.style.paddingLeft = ((groupWidth - textWidth) / 2.0).toString() + "px";
                    this.inputObject.style.marginLeft = null;
                }
                else {
                    this.inputObject.style.paddingLeft = null;
                    this.inputObject.style.marginLeft = (groupWidth - textWidth - 8).toString() + "px";
                }
            }
            else {
                if (textWidth > groupWidth) {
                    this.inputObject.style.marginLeft = (groupWidth - textWidth - 8).toString() + "px";
                }
                else {
                    this.inputObject.style.marginLeft = null
                }
            }
        }
        this.inputObject.addEventListener('input', patcher)
        this.inputObject.addEventListener('setting', patcher)
    }

    private setupInputChangeListener() {
        this.inputObject.addEventListener('input', () => {
            const currentText = this.inputObject.value;
            this.placeholderObject.setAttribute("opacity", currentText.length > 0 ? "0.0" : "1.0");
        })
    }

}
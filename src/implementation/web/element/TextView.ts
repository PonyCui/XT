import { ViewElement } from "./View";
import { Font } from "../../../interface/Font";
import { Color } from "../../../interface/Color";
import { Rect } from "../../../interface/Rect";
import { TextAlignment } from "../../../interface/Label";
import { KeyboardType } from "../../../interface/TextField";

let measureSpan: HTMLSpanElement = document.createElement("span")

export class TextViewElement extends ViewElement {

    private inputGroup: SVGGElement
    private inputGroupMask: SVGMaskElement
    private foreignObject: SVGForeignObjectElement
    private inputObject: HTMLTextAreaElement

    loadContent() {
        super.loadContent();
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
        this.inputObject = document.createElement("textarea");
        this.inputObject.style.backgroundColor = "transparent"
        this.inputObject.style.border = "none"
        this.inputObject.style.outline = "none"
        this.inputObject.style.color = "black"
        this.inputObject.style.fontSize = "14px"
        this.foreignObject.appendChild(this.inputObject);
        if (this.shouldSetupChromePatcher()) {
            this.setupChromePatcher();
        }
        this.inputGroup.appendChild(this.foreignObject)
        this.contentObject.appendChild(this.inputGroup);
        this.setupReturnKeyListenner();
    }

    public xtr_setFrame(value: Rect) {
        super.xtr_setFrame(value);
        this.resetContentRects();
    }

    private _editing = false

    private get editing(): boolean {
        return this._editing;
    }

    private set editing(value: boolean) {
        this._editing = value;
        this.resetContentRects()
    }

    public xtr_editing(): Boolean {
        return this.editing
    }

    private resetContentRects() {
        const inputWidth = this.xtr_frame().width
        const inputHeight = this.xtr_frame().height
        this.foreignObject.setAttribute('width', inputWidth.toString())
        this.foreignObject.setAttribute('height', inputHeight.toString())
        if (this.shouldSetupChromePatcher()) {
            this.inputObject.style.height = this.inputObject.style.height || "1000px";
        }
        else {
            this.inputObject.style.height = inputHeight + "px";
        }
        this.inputObject.style.width = inputWidth + "px";
        this.resetInputGroupMaskPath();
    }

    private resetInputGroupMaskPath() {
        const inputWidth = this.xtr_frame().width
        const inputHeight = this.xtr_frame().height
        const maskPath = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        maskPath.setAttribute("width", inputWidth.toString());
        maskPath.setAttribute("height", inputHeight.toString());
        maskPath.style.fill = "white";
        this.inputGroupMask.innerHTML = '';
        this.inputGroupMask.appendChild(maskPath);
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

    public xtr_setFont(value: Font) {
        this.font = value
        this.inputObject.style.fontSize = this.font.pointSize.toString() + "px"
        this.inputObject.style.fontFamily = this.font.familyName || "Arial";
        this.inputObject.style.fontWeight = this.font.fontWeight;
        this.inputObject.style.fontStyle = this.font.fontStyle;
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
    }

    public get xtr_returnKeyType() {
        return 0
    }

    public set xtr_setReturnKeyType(value: any) { }

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

    private shouldSetupChromePatcher(): boolean {
        return navigator.vendor === "Google Inc."
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

    private setupChromePatcher() {
        if (measureSpan.parentNode === null) {
            measureSpan.style.opacity = "0.0"
            measureSpan.style.position = "absolute"
            measureSpan.style.wordWrap = "break-word"
            measureSpan.style.wordBreak = "break-all"
            measureSpan.style.whiteSpace = "pre-wrap"
            measureSpan.style.left = "-10000000px"
            measureSpan.style.top = "-10000000px"
            // measureSpan.style.left = "44px"
            // measureSpan.style.top = "400px"
            document.body.appendChild(measureSpan);
        }
        const patcher = () => {
            const groupHeight = this.xtr_frame().height
            const currentText = this.inputObject.value;
            measureSpan.style.width = this.xtr_frame().width.toString() + "px"
            measureSpan.style.maxWidth = this.xtr_frame().width.toString() + "px"
            measureSpan.style.fontSize = this.inputObject.style.fontSize
            measureSpan.style.fontFamily = this.inputObject.style.fontFamily || "Arial"
            measureSpan.style.fontWeight = this.inputObject.style.fontWeight
            measureSpan.style.fontStyle = this.inputObject.style.fontStyle
            measureSpan.innerText = currentText;
            let textHeight: number = measureSpan.offsetHeight + this.font.pointSize * 1.5;
            let inputHeight = parseInt((this.inputObject.style.height || "1000").replace("px", ""))
            if (textHeight > inputHeight / 2) {
                inputHeight *= 2;
                this.inputObject.style.height = inputHeight.toString() + 'px';
            }
            if (textHeight > groupHeight) {
                this.inputObject.style.marginTop = (groupHeight - textHeight - 8).toString() + "px";
            }
            else {
                this.inputObject.style.marginTop = null
            }
        }
        this.inputObject.addEventListener('input', patcher)
        this.inputObject.addEventListener('setting', patcher)
    }

}
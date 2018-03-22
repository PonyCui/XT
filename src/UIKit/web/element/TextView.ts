import { ViewElement } from "./View";
import { Font } from "../../interface/Font";
import { Color } from "../../interface/Color";
import { Rect } from "../../interface/Rect";
import { TextAlignment } from "../../interface/Label";
import { KeyboardType } from "../../interface/TextField";
import { Application } from "../Application";

let measureSpan: HTMLSpanElement = document.createElement("span")

export class TextViewElement extends ViewElement {

    private inputObject: HTMLTextAreaElement

    loadContent() {
        super.loadContent();
        this.inputObject = document.createElement("textarea");
        this.inputObject.style.backgroundColor = "transparent"
        this.inputObject.style.border = "none"
        this.inputObject.style.outline = "none"
        this.inputObject.style.color = "black"
        this.inputObject.style.fontSize = "14px"
        this.inputObject.style.width = "100%"
        this.inputObject.style.height = "100%"
        this.nativeObject.appendChild(this.inputObject)
        this.setupReturnKeyListenner();
    }

    public xtr_setFrame(value: Rect) {
        super.xtr_setFrame(value);
    }

    private _editing = false

    private get editing(): boolean {
        return this._editing;
    }

    private set editing(value: boolean) {
        this._editing = value;
    }

    public xtr_editing(): Boolean {
        return this.editing
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

    private setupReturnKeyListenner() {
        this.inputObject.addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                if (this.scriptObject.shouldReturn) {
                    this.scriptObject.shouldReturn()
                }
            }
        })
    }

}
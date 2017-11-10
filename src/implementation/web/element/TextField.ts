import { ViewElement } from "./View";
import { Rect } from "../../../interface/Rect";
import { Font } from "../../../interface/Font";
import { Color } from "../../../interface/Color";
import { TextAlignment } from "../../../interface/Label";

let measureSpan: HTMLSpanElement = document.createElement("span")

export class TextFieldElement extends ViewElement {

    inputObject: HTMLInputElement
    private focusing = false

    loadContent() {
        super.loadContent();
        this.contentObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        this.inputObject = document.createElement("input");
        this.inputObject.style.backgroundColor = "transparent"
        this.inputObject.style.border = "none"
        this.inputObject.style.outline = "none"
        this.inputObject.style.color = "black"
        this.inputObject.style.fontSize = "14px"
        this.contentObject.appendChild(this.inputObject);
        if (this.shouldSetupChromePatcher()) {
            this.setupChromePatcher();
        }
    }

    public xtr_setFrame(value: Rect) {
        super.xtr_setFrame(value);
        if (this.contentObject) {
            this.contentObject.setAttribute('width', value.width.toString())
            this.contentObject.setAttribute('height', value.height.toString())
            if (this.shouldSetupChromePatcher()) {
                this.inputObject.style.width = "1000px";
            }
            else {
                this.inputObject.style.width = value.width.toString() + "px";
            }
            this.inputObject.style.height = value.height.toString() + "px";
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

    public xtr_setFont(value: Font | undefined) {
        this.font = value || Font.systemFontOfSize(14.0)
        this.inputObject.style.fontSize = this.font.pointSize.toString()
        this.inputObject.style.fontFamily = this.font.familyName || "Arial";
        this.inputObject.style.fontWeight = this.font.fontWeight;
        this.inputObject.style.fontStyle = this.font.fontStyle;
        this.inputObject.dispatchEvent(new Event("settting"));
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
        if (this.shouldSetupChromePatcher()) { this.inputObject.dispatchEvent(new Event("settting")); return; }
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
        this.inputObject.dispatchEvent(new Event("input"));
    }

    public xtr_focus() {
        this.focusing = true;
        this.inputObject.focus();
        setTimeout(() => {
            if (this.shouldSetupChromePatcher()) { this.inputObject.dispatchEvent(new Event("settting")); }
        }, 250)
        
    }

    public xtr_blur() {
        this.inputObject.blur();
        this.focusing = false;
        if (this.shouldSetupChromePatcher()) { this.inputObject.dispatchEvent(new Event("settting")); }
    }

    private shouldSetupChromePatcher(): boolean {
        return navigator.vendor === "Google Inc."
    }

    private setupChromePatcher() {
        if (measureSpan.parentNode === null) {
            measureSpan.style.opacity = "0.0"
            measureSpan.style.position = "absolute"
            measureSpan.style.display = "inline-block"
            measureSpan.style.whiteSpace = "nowrap"
            measureSpan.style.left = "-10000000px"
            measureSpan.style.top = "-10000000px"
            document.body.appendChild(measureSpan);
        }
        const patcher = () => {
            const currentText = this.inputObject.value;
            measureSpan.style.fontSize = this.inputObject.style.fontSize
            measureSpan.style.fontFamily = this.inputObject.style.fontFamily || "Arial"
            measureSpan.style.fontWeight = this.inputObject.style.fontWeight
            measureSpan.style.fontStyle = this.inputObject.style.fontStyle
            measureSpan.innerText = currentText;
            const textWidth = measureSpan.offsetWidth;
            let inputWidth = parseInt((this.inputObject.style.width || "1000").replace("px", ""))
            if (textWidth > inputWidth / 2) {
                inputWidth *= 2;
                this.inputObject.style.width = inputWidth.toString() + 'px';
            }
            if (this.textAlignment === TextAlignment.Right) {
                if (textWidth < this.xtr_frame().width) {
                    this.inputObject.style.paddingLeft = (this.xtr_frame().width - textWidth - 8).toString() + "px";
                    this.inputObject.style.marginLeft = null;
                }
                else {
                    this.inputObject.style.paddingLeft = null;
                    this.inputObject.style.marginLeft = (this.xtr_frame().width - textWidth - 8).toString() + "px";
                }
            }
            if (this.textAlignment === TextAlignment.Center) {
                if (textWidth < this.xtr_frame().width) {
                    this.inputObject.style.paddingLeft = ((this.xtr_frame().width - textWidth) / 2.0).toString() + "px";
                    this.inputObject.style.marginLeft = null;
                }
                else {
                    this.inputObject.style.paddingLeft = null;
                    this.inputObject.style.marginLeft = (this.xtr_frame().width - textWidth - 8).toString() + "px";
                }
            }
            else {
                if (textWidth > this.xtr_frame().width) {
                    this.inputObject.style.marginLeft = (this.xtr_frame().width - textWidth - 8).toString() + "px";
                }
                else {
                    this.inputObject.style.marginLeft = null
                }
            }
        }
        this.inputObject.addEventListener('input', patcher)
        this.inputObject.addEventListener('settting', patcher)
    }

}
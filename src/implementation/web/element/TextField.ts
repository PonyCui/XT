import { ViewElement } from "./View";
import { Rect } from "../../../interface/Rect";
import { Font } from "../../../interface/Font";
import { Color } from "../../../interface/Color";

let measureContext: CanvasRenderingContext2D | null = null

export class TextFieldElement extends ViewElement {

    inputObject: HTMLInputElement

    loadContent() {
        super.loadContent();
        this.contentObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        this.inputObject = document.createElement("input");
        this.inputObject.style.backgroundColor = "transparent"
        this.inputObject.style.border = "none"
        this.inputObject.style.outline = "none"
        this.inputObject.style.color = "black"
        this.inputObject.style.fontSize = "14px"
        this.inputObject.style.fontFamily = "Arial"
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
                this.inputObject.style.width = "99999px";
            }
            else {
                this.inputObject.style.width = value.width.toString() + "px";
            }
            this.inputObject.style.height = value.height.toString() + "px";
        }
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
    }

    private textColor: Color = Color.blackColor

    public xtr_textColor(): Color {
        return this.textColor
    }

    public xtr_setTextColor(value: Color) {
        this.textColor = value
        this.inputObject.style.color = 'rgba(' + (this.textColor.r * 255).toFixed(0) + ', ' + (this.textColor.g * 255).toFixed(0) + ', ' + (this.textColor.b * 255).toFixed(0) + ', ' + this.textColor.a.toString() + ')'
    }

    public xtr_focus() {
        this.inputObject.focus();
    }

    public xtr_blur() {
        this.inputObject.blur();
    }

    private shouldSetupChromePatcher(): boolean {
        return navigator.vendor === "Google Inc."
    }

    private setupChromePatcher() {
        if (measureContext === null) {
            measureContext = document.createElement("canvas").getContext('2d')
        }
        this.inputObject.addEventListener('input', () => {
            const currentText = this.inputObject.value;
            if (measureContext) {
                measureContext.font = (this.font.pointSize + "px") + " " + (this.font.familyName || "Arial")
                const textWidth: number = measureContext.measureText(currentText).width;
                if (textWidth > this.xtr_frame().width) {
                    this.inputObject.style.marginLeft = (this.xtr_frame().width - textWidth - 20).toString() + "px";
                }
                else {
                    this.inputObject.style.marginLeft = null
                }
            }
        })
    }

}
import { ViewElement } from "./View";
import { Font } from "../../interface/Font";
import { Color } from "../../interface/Color";
import { TextAlignment, LineBreakMode, TextVerticalAlignment } from "../../interface/Label";
import { Rect } from "../../interface/Rect";

export class LabelElement extends ViewElement {

    private foreignObject: SVGForeignObjectElement
    private wrapperObject: HTMLDivElement
    private spanObject: HTMLSpanElement

    loadContent() {
        super.loadContent();
        this.foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        this.wrapperObject = document.createElement("div");
        this.wrapperObject.style.cssText = "display: -webkit-box; display: flex;";
        this.wrapperObject.style.webkitAlignItems = this.wrapperObject.style.webkitBoxAlign = this.wrapperObject.style.alignItems = "center";
        this.wrapperObject.style.webkitBoxAlign = this.wrapperObject.style.webkitJustifyContent = this.wrapperObject.style.justifyContent = "center";
        this.spanObject = document.createElement("span");
        this.spanObject.style.userSelect = "none";
        this.spanObject.style.cursor = "default"
        this.wrapperObject.appendChild(this.spanObject);
        this.foreignObject.appendChild(this.wrapperObject);
        this.contentObject = this.foreignObject;
        this.numberOfLines = 1;
        this.adjustTextAlignment();
        this.xtr_setFont(Font.systemFontOfSize(14.0))
    }

    public xtr_setFrame(value: Rect) {
        super.xtr_setFrame(value);
        this.foreignObject.setAttribute("width", Math.max(0, value.width).toString())
        this.foreignObject.setAttribute("height", Math.max(0, value.height).toString())
        this.wrapperObject.style.width = "100%"
        this.wrapperObject.style.height = "100%"
        this.spanObject.style.width = Math.max(0, value.width).toString() + "px";
        this.spanObject.style.height = Math.max(0, value.height).toString() + "px";
        this.adjustTextAlignment();
    }

    private text: string

    public xtr_text(): string {
        return this.text || "";
    }

    public xtr_setText(value: string) {
        this.text = value;
        this.spanObject.innerText = this.text;
    }

    private font: Font = Font.systemFontOfSize(14.0)

    public xtr_font(): Font {
        return this.font
    }

    public xtr_setFont(value: Font | undefined) {
        this.font = value || Font.systemFontOfSize(14.0)
        this.spanObject.style.fontSize = this.font.pointSize.toString() + "px"
        this.spanObject.style.fontFamily = this.font.familyName || "Arial";
        this.spanObject.style.fontWeight = this.font.fontWeight;
        this.spanObject.style.fontStyle = this.font.fontStyle;
        this.adjustTextAlignment()
    }

    private textColor: Color = Color.blackColor

    public xtr_textColor(): Color {
        return this.textColor
    }

    public xtr_setTextColor(value: Color) {
        this.textColor = value
        this.spanObject.style.color = 'rgba(' + (this.textColor.r * 255).toFixed(0) + ', ' + (this.textColor.g * 255).toFixed(0) + ', ' + (this.textColor.b * 255).toFixed(0) + ', ' + this.textColor.a.toString() + ')'
    }

    private textAlignment: TextAlignment = TextAlignment.Left

    public xtr_textAlignment(): TextAlignment {
        return this.textAlignment
    }

    public xtr_setTextAlignment(value: TextAlignment) {
        this.textAlignment = value
        switch (value) {
            case TextAlignment.Left:
                this.spanObject.style.textAlign = "left";
                break;
            case TextAlignment.Center:
                this.spanObject.style.textAlign = "center";
                break;
            case TextAlignment.Right:
                this.spanObject.style.textAlign = "right";
                break;
        }
    }

    private numberOfLines = 1

    public xtr_numberOfLines(): number {
        return this.numberOfLines
    }

    public xtr_setNumberOfLines(value: number) {
        this.numberOfLines = value
        this.adjustTextAlignment();
    }

    private lineBreakMode: LineBreakMode = LineBreakMode.TruncatingTail

    public xtr_lineBreakMode(): LineBreakMode {
        return this.lineBreakMode
    }

    public xtr_setLineBreakMode(value: LineBreakMode) {
        this.lineBreakMode = value
        this.adjustTextAlignment();
    }

    private letterSpace: number = 0.0

    public xtr_letterSpace(): number {
        return this.letterSpace
    }

    public xtr_setLetterSpace(value: number) {
        this.letterSpace = value
        this.spanObject.style.letterSpacing = value.toString()
    }

    private lineSpace: number = 0.0

    public xtr_lineSpace(): number {
        return this.lineSpace
    }

    public xtr_setLineSpace(value: number) {
        this.lineSpace = value
        this.adjustTextAlignment();
    }

    private adjustTextAlignment() {
        if (this.numberOfLines === 1) {
            this.spanObject.style.lineHeight = this.xtr_frame().height.toString() + "px";
            this.spanObject.style.textOverflow = this.lineBreakMode === LineBreakMode.TruncatingTail ? "ellipsis" : null;
            this.spanObject.style.display = "inline-block";
            this.spanObject.style.overflow = "hidden";
            this.spanObject.style.wordWrap = null;
            this.spanObject.style.wordBreak = null;
            this.spanObject.style.whiteSpace = "nowrap";
        }
        else {
            this.spanObject.style.lineHeight = this.lineSpace > 0 ? (this.font.pointSize + this.lineSpace * 2).toString() + "px" : null;
            this.spanObject.style.textOverflow = this.lineBreakMode === LineBreakMode.TruncatingTail ? "ellipsis" : null;
            this.spanObject.style.display = "block";
            this.spanObject.style.verticalAlign = "middle";
            this.spanObject.style.overflow = "hidden";
            this.spanObject.style.wordWrap = "break-word";
            this.spanObject.style.wordBreak = "break-all";
            this.spanObject.style.whiteSpace = "pre-wrap";
        }
    }

}
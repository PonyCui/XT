import { ViewElement } from "./View";
import huozi from 'huozi'
import { Font } from "../../../interface/Font";
import { Color } from "../../../interface/Color";
import { TextAlignment, LineBreakMode, TextVerticalAlignment } from "../../../interface/Label";
import { StaticTextLayout } from "./TextLayout";

export class LabelElement extends ViewElement {

    loadContent() {
        super.loadContent();
        this.contentObject = document.createElementNS("http://www.w3.org/2000/svg", "g");
    }

    private text: string

    public xtr_text(): string {
        return this.text;
    }

    public xtr_setText(value: string) {
        this.text = value;
        this.resetTextContent();
    }

    private font: Font = Font.systemFontOfSize(14.0)

    public xtr_font(): Font {
        return this.font
    }

    public xtr_setFont(value: Font | undefined) {
        this.font = value || Font.systemFontOfSize(14.0)
        this.resetTextContent();
    }

    private textColor: Color = Color.blackColor

    public xtr_textColor(): Color {
        return this.textColor
    }

    public xtr_setTextColor(value: Color) {
        this.textColor = value
        this.resetTextContent();
    }

    private textAlignment: TextAlignment = TextAlignment.Left

    public xtr_textAlignment(): TextAlignment {
        return this.textAlignment
    }

    public xtr_setTextAlignment(value: TextAlignment) {
        this.textAlignment = value
        this.resetTextContent();
    }

    private numberOfLines = 1

    public xtr_numberOfLines(): number {
        return this.numberOfLines
    }

    public xtr_setNumberOfLines(value: number) {
        this.numberOfLines = value
        this.resetTextContent();
    }

    private lineBreakMode: LineBreakMode = LineBreakMode.TruncatingTail

    public xtr_lineBreakMode(): LineBreakMode {
        return this.lineBreakMode
    }

    public xtr_setLineBreakMode(value: LineBreakMode) {
        this.lineBreakMode = value
        this.resetTextContent();
    }

    private letterSpace: number = 0.0

    public xtr_letterSpace(): number {
        return this.letterSpace
    }

    public xtr_setLetterSpace(value: number) {
        this.letterSpace = value
        this.resetTextContent();
    }

    private lineSpace: number = 0.0

    public xtr_lineSpace(): number {
        return this.lineSpace
    }

    public xtr_setLineSpace(value: number) {
        this.lineSpace = value
        this.resetTextContent();
    }

    private resetTextContent() {
        if (this.text === undefined) { return; }
        const contentObject = this.contentObject as SVGGElement;
        contentObject.innerHTML = '';
        const textLayout: StaticTextLayout = new StaticTextLayout(this.numberOfLines, this.letterSpace, this.lineSpace, this.text, this.font, this.scriptObject.bounds, { left: 0, top: 0, bottom: 0, right: 0 });
        textLayout.textLines(this.scriptObject.bounds, this.textAlignment, TextVerticalAlignment.Center, this.lineBreakMode).forEach(line => {
            const textObject = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textObject.setAttribute('alignment-baseline', 'hanging')
            textObject.style.fontSize = this.font.pointSize.toString()
            textObject.style.fontFamily = this.font.familyName || null;
            textObject.style.fontWeight = this.font.fontWeight;
            textObject.style.fontStyle = this.font.fontStyle;
            textObject.setAttribute('x', line.elements.map((element: any) => {
                return Math.ceil((element.x + line.x)).toString()
            }).join(","))
            textObject.setAttribute('y', Math.ceil(line.y).toString())
            textObject.innerHTML = line.text;
            contentObject.appendChild(textObject);
        })

    }

}
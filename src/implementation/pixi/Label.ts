import { View } from "./View";
import { setNeedsDisplay } from "./Application";
import huozi from 'huozi'
import { StaticTextLayout } from "./TextLayout";
import { Rect, Size, RectZero } from "../../interface/Rect";
import { Font } from "../../interface/Font";
import { Color } from "../../interface/Color";
import { TextAlignment, LineBreakMode, TextVerticalAlignment } from "../../interface/Label";
import { Screen } from "../../interface/Screen";
const PIXI = (window as any).PIXI

export class Label extends View {

    private textContainer: any = new PIXI.Container();

    constructor(rect?: Rect) {
        super(rect);
        this.nativeObject.addChildAt(this.textContainer, 1);
    }

    public layoutSubviews() {
        super.layoutSubviews();
        this.drawText();
    }

    private _text?: string

    public get text(): string | undefined {
        return this._text;
    }

    public set text(value: string | undefined) {
        if (this._text === value) { return; }
        this._text = value;
        this.drawText();
    }

    private _font: Font = new Font(14)

    public get font(): Font {
        return this._font;
    }

    public set font(value: Font) {
        this._font = value;
        this.drawText();
    }

    private _textColor: Color = new Color(0, 0, 0)

    public get textColor(): Color {
        return this._textColor;
    }

    public set textColor(value: Color) {
        if (this._textColor.equals(value)) { return; }
        this._textColor = value;
        this.drawText();
    }

    private _textAlignment: TextAlignment = TextAlignment.Left;

    public get textAlignment() {
        return this._textAlignment;
    }

    public set textAlignment(value: TextAlignment) {
        if (this._textAlignment === value) { return; }
        this._textAlignment = value;
    }

    private _numberOfLines: number = 1;

    public get numberOfLines(): number {
        return this._numberOfLines
    }

    public set numberOfLines(value: number) {
        if (this._numberOfLines === value) { return; }
        this._numberOfLines = value;
        this.drawText();
    }

    private _lineBreakMode: LineBreakMode = LineBreakMode.WordWrapping;

    public get lineBreakMode(): LineBreakMode {
        return this._lineBreakMode
    }

    public set lineBreakMode(value: LineBreakMode) {
        if (this._lineBreakMode === value) { return; }
        this._lineBreakMode = value;
        this.drawText();
    }

    private _lineSpace: number = 12;

    public get lineSpace(): number {
        return this._lineSpace
    }

    public set lineSpace(value: number) {
        if (this._lineSpace === value) { return; }
        this._lineSpace = value;
        this.drawText();
    }

    private _preferredMaxLayoutWidth: number = Infinity;

    public get preferredMaxLayoutWidth(): number {
        return this._preferredMaxLayoutWidth;
    }

    public set preferredMaxLayoutWidth(value: number) {
        if (this._preferredMaxLayoutWidth === value) { return; }
        this._preferredMaxLayoutWidth = value;
        this.setNeedsLayout();
    }

    public intrinsicContentSize(width?: number): Size | undefined {
        if (this.text) {
            const textLayout = new StaticTextLayout(this.numberOfLines, this.lineSpace, this.text, this.font, { x: 0, y: 0, width: width || this.preferredMaxLayoutWidth, height: Infinity }, { left: 0, top: 0, bottom: 0, right: 0 });
            return { width: textLayout.textRect.width, height: textLayout.textRect.height + 2 }
        }
        return undefined;
    }

    private _drawTextImmediate: any;

    drawText() {
        clearImmediate(this._drawTextImmediate);
        this._drawTextImmediate = setImmediate(() => {
            this.textContainer.removeChildren();
            if (this.text) {
                const textStyle = new PIXI.TextStyle({
                    fontSize: Screen.withScale(this.font.pointSize),
                    fontWeight: this.font.fontWeight,
                    fill: this.textColor.rgbHexString(),
                })
                const textLayout = new StaticTextLayout(this.numberOfLines, this.lineSpace, this.text, this.font, this.bounds, { left: 0, top: 0, bottom: 0, right: 0 });
                textLayout.textLines(this.bounds, this.textAlignment, TextVerticalAlignment.Center, this.lineBreakMode).forEach(line => {
                    const text = new PIXI.Text(line.text, textStyle);
                    text.x = 0;
                    text.y = Screen.withScale(line.y);
                    const textBounds = text.getBounds();
                    // textBounds.x *= 375 / window.screen.width;
                    // textBounds.y *= 375 / window.screen.width;
                    // textBounds.width *= 375 / window.screen.width;
                    // textBounds.height *= 375 / window.screen.width;
                    if (textBounds.width > Screen.withScale(this.bounds.width)) {
                        line.elements.forEach((element: any) => {
                            const text = new PIXI.Text(element.character, textStyle);
                            text.x = Screen.withScale(line.x + element.x);
                            text.y = Screen.withScale(line.y);
                            this.textContainer.addChild(text);
                        })
                        return;
                    }
                    else if (this.textAlignment == TextAlignment.Center) {
                        text.x = Math.ceil((Screen.withScale(this.bounds.width) - textBounds.width) / 2.0)
                    }
                    this.textContainer.addChild(text);
                })
            }
            setNeedsDisplay(this)
        })
    }

    textRectForBounds(bounds: Rect): Rect {
        if (this.text) {
            const textStyle = new PIXI.TextStyle({
                fontSize: Screen.withScale(this.font.pointSize),
                fill: this.textColor.rgbHexString(),
            })
            const textLayout = new StaticTextLayout(this.numberOfLines, this.lineSpace, this.text, this.font, this.bounds, { left: 0, top: 0, bottom: 0, right: 0 });
            return textLayout.bounds
        }
        return RectZero
    }

}
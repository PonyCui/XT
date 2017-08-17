import * as I from '../../interface/Abstract'
import { View } from "./View";
import { setNeedsDisplay } from "./Application";
import huozi from 'huozi'
import { StaticTextLayout } from "./TextLayout";
const PIXI = (window as any).PIXI

export class Label extends View {

    private textContainer: any = new PIXI.Container();

    constructor(rect?: I.Rect) {
        super(rect);
        this.nativeObject.addChild(this.textContainer);
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

    private _font: I.Font = new I.Font(14)

    public get font(): I.Font {
        return this._font;
    }

    public set font(value: I.Font) {
        this._font = value;
        this.drawText();
    }

    private _textColor: I.Color = new I.Color(0, 0, 0)

    public get textColor(): I.Color {
        return this._textColor;
    }

    public set textColor(value: I.Color) {
        if (this._textColor.equals(value)) { return; }
        this._textColor = value;
        this.drawText();
    }

    private _textAlignment: I.TextAlignment = I.TextAlignment.Left;

    public get textAlignment() {
        return this._textAlignment;
    }

    public set textAlignment(value: I.TextAlignment) {
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

    private _drawTextImmediate: any;

    drawText() {
        clearImmediate(this._drawTextImmediate);
        this._drawTextImmediate = setImmediate(() => {
            this.textContainer.removeChildren();
            if (this.text) {
                const textStyle = new PIXI.TextStyle({
                    fontSize: I.Screen.withScale(this.font.pointSize),
                    fill: "#ffffff",
                })
                const textLayout = new StaticTextLayout(this.numberOfLines, this.text, this.font, this.bounds, { left: 0, top: 8, bottom: 8, right: 0 });
                textLayout.textLines(this.bounds, this.textAlignment, I.TextVerticalAlignment.Center).forEach(line => {
                    console.log(line);
                    const text = new PIXI.Text(line.text, textStyle);
                    text.x = I.Screen.withScale(line.x);
                    text.y = I.Screen.withScale(line.y);
                    this.textContainer.addChild(text);
                })
            }
            setNeedsDisplay(this)
        })
    }

}
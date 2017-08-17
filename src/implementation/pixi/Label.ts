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
        this._textColor = value;
        this.drawText();
    }

    private _textAlignment: I.TextAlignment = I.TextAlignment.Left;

    public get textAlignment() {
        return this._textAlignment;
    }

    public set textAlignment(value: I.TextAlignment) {
        this._textAlignment = value;
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
                const textLayout = new StaticTextLayout(this.text, this.font, this.bounds);
                textLayout.textLines(this.bounds, I.TextAlignment.Center, I.TextVerticalAlignment.Center).forEach(line => {
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
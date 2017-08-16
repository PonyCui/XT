import * as I from '../../interface/Abstract'
import { UIView } from "./UIView";
import { setNeedsDisplay } from "./UIApplication";
import huozi from 'huozi'
import { UIStaticTextLayout } from "./UITextLayout";
const PIXI = (window as any).PIXI

export class UILabel extends UIView {

    private textContainer: any = new PIXI.Container();

    constructor(rect?: I.CGRect) {
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

    private _font: I.UIFont = new I.UIFont(14)

    public get font(): I.UIFont {
        return this._font;
    }

    public set font(value: I.UIFont) {
        this._font = value;
        this.drawText();
    }

    private _textColor: I.UIColor = new I.UIColor(0, 0, 0)

    public get textColor(): I.UIColor {
        return this._textColor;
    }

    public set textColor(value: I.UIColor) {
        this._textColor = value;
        this.drawText();
    }

    private _textAlignment: I.UITextAlignment = I.UITextAlignment.Left;

    public get textAlignment() {
        return this._textAlignment;
    }

    public set textAlignment(value: I.UITextAlignment) {
        this._textAlignment = value;
    }

    private _drawTextImmediate: any;

    drawText() {
        clearImmediate(this._drawTextImmediate);
        this._drawTextImmediate = setImmediate(() => {
            this.textContainer.removeChildren();
            if (this.text) {
                const textStyle = new PIXI.TextStyle({
                    fontSize: I.UIScreen.withScale(this.font.pointSize),
                    fill: "#ffffff",
                })
                const textLayout = new UIStaticTextLayout(this.text, this.font, this.bounds);
                textLayout.textLines(this.bounds, I.UITextAlignment.Center, I.UITextVerticalAlignment.Center).forEach(line => {
                    const text = new PIXI.Text(line.text, textStyle);
                    text.x = I.UIScreen.withScale(line.x);
                    text.y = I.UIScreen.withScale(line.y);
                    this.textContainer.addChild(text);
                })


                // const textSequence = this.text.split('').map(character => {
                //     return {
                //         fontSize: I.UIScreen.withScale(this.font.pointSize),
                //         character,
                //     }
                // });
                // const layoutSequence = huozi(textSequence, {
                //     gridSize: I.UIScreen.withScale(this.font.pointSize),
                //     column: Math.floor(this.bounds.width / this.font.pointSize),
                //     row: Infinity,
                // });

                // const offsetY = Math.min(0.0, Math.min.apply(null, layoutSequence.map((element: any) => element.y)));
                // let line = { text: "", x: 0, y: 0, }
                // layoutSequence.forEach((element: any) => {
                //     if (line.y != (element.y - offsetY)) {
                //         if (line.text.length > 0) {
                //             const text = new PIXI.Text(line.text, textStyle);
                //             text.x = line.x;
                //             text.y = line.y;
                //             this.textContainer.addChild(text);
                //         }
                //         line = { text: "", x: element.x, y: (element.y - offsetY), };
                //     }
                //     line.text += element.character;
                // });
                // if (line.text.length > 0) {
                //     const text = new PIXI.Text(line.text, textStyle);
                //     text.x = line.x;
                //     text.y = line.y;
                //     this.textContainer.addChild(text);
                // }
            }
            setNeedsDisplay(this)
        })
    }

}
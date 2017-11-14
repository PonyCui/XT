/// <reference path="xtr.d.ts" />

import { View } from "./View";
import { Color } from "../../interface/Color";
import { Rect, RectZero, Size, SizeMake } from "../../interface/Rect";
import { Font } from "../../interface/Font";
import { LabelElement } from "./element/Label";
import { TextMeasurer } from "./TextMeasurer";

export enum TextAlignment {
    Left,
    Center,
    Right,
}

export enum TextVerticalAlignment {
    Top,
    Center,
    Bottom,
}

export enum LineBreakMode {
    WordWrapping = 0,
    TruncatingTail = 4,
}

export class Label extends View {

    nativeObject: any;

    constructor(rect?: Rect, _isChild: boolean = false) {
        super(undefined, true)
        if (_isChild) { return; }
        this.nativeObject = new LabelElement(rect || RectZero, this);
        setImmediate(() => { this.init(); });
    }

    public get text(): string {
        return this.nativeObject.xtr_text();
    }

    public set text(value: string) {
        this.nativeObject.xtr_setText(value);
    }

    public get font(): Font {
        return this.nativeObject.xtr_font();
    }

    public set font(value: Font) {
        this.nativeObject.xtr_setFont(value);
    }

    public get textColor(): Color {
        return this.nativeObject.xtr_textColor();
    }

    public set textColor(value: Color) {
        this.nativeObject.xtr_setTextColor(value);
    }

    public get textAlignment(): TextAlignment {
        return this.nativeObject.xtr_textAlignment();
    }

    public set textAlignment(value: TextAlignment) {
        this.nativeObject.xtr_setTextAlignment(value);
    }

    public get numberOfLines(): number {
        return this.nativeObject.xtr_numberOfLines();
    }

    public set numberOfLines(value: number) {
        this.nativeObject.xtr_setNumberOfLines(value);
    }

    public get lineBreakMode(): LineBreakMode {
        return this.nativeObject.xtr_lineBreakMode();
    }

    public set lineBreakMode(value: LineBreakMode) {
        this.nativeObject.xtr_setLineBreakMode(value);
    }

    public get letterSpace(): number {
        return this.nativeObject.xtr_letterSpace();
    }

    public set letterSpace(value: number) {
        this.nativeObject.xtr_setLetterSpace(value);
    }

    public get lineSpace(): number {
        return this.nativeObject.xtr_lineSpace();
    }

    public set lineSpace(value: number) {
        this.nativeObject.xtr_setLineSpace(value);
    }

    private _preferredMaxLayoutWidth: number = Infinity;

    public get preferredMaxLayoutWidth(): number {
        return this._preferredMaxLayoutWidth;
    }

    public set preferredMaxLayoutWidth(value: number) {
        if (this._preferredMaxLayoutWidth === value) { return; }
        this._preferredMaxLayoutWidth = value;
    }

    public textRectForBounds(bounds: Rect): Rect {
        if (this.text) {
            return TextMeasurer.measureText(this.text, {font: this.font, inRect: this.bounds, letterSpace: this.letterSpace, lineSpace: this.lineSpace, numberOfLines: this.numberOfLines})
        }
        return RectZero
    }

    public intrinsicContentSize(width?: number): Size | undefined {
        if (this.text) {
            const bounds = TextMeasurer.measureText(this.text, {font: this.font, inRect: this.bounds, letterSpace: this.letterSpace, lineSpace: this.lineSpace, numberOfLines: this.numberOfLines})
            return SizeMake(bounds.width, bounds.height)
        }
        return undefined;
    }

}
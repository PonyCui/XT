/// <reference path="xtr.d.ts" />

import { View } from "./View";
import { Font } from "./Font";
import { Color } from "../interface/Color";
import { Rect, RectZero } from "../interface/Rect";

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

    constructor(ref: any) {
        super(ref || _XTUILabel)
    }

    public get text(): string {
        return _XTUILabel.xtr_text(this.objectRef);
    }

    public set text(value: string) {
        _XTUILabel.xtr_setTextObjectRef(value, this.objectRef);
    }

    public get font(): Font {
        return new Font(_XTUILabel.xtr_font(this.objectRef));
    }

    public set font(value: Font) {
        _XTUILabel.xtr_setFontObjectRef(value.objectRef, this.objectRef);
    }

    public get textColor(): Color {
        return _XTUILabel.xtr_textColor(this.objectRef);
    }

    public set textColor(value: Color) {
        _XTUILabel.xtr_setTextColorObjectRef(value, this.objectRef);
    }

    public get textAlignment(): TextAlignment {
        return _XTUILabel.xtr_textAlignment(this.objectRef);
    }

    public set textAlignment(value: TextAlignment) {
        _XTUILabel.xtr_setTextAlignmentObjectRef(value, this.objectRef);
    }

    public get numberOfLines(): number {
        return _XTUILabel.xtr_numberOfLines(this.objectRef);
    }

    public set numberOfLines(value: number) {
        _XTUILabel.xtr_setNumberOfLinesObjectRef(value, this.objectRef);
    }


    public get lineBreakMode(): LineBreakMode {
        return _XTUILabel.xtr_lineBreakMode(this.objectRef);
    }

    public set lineBreakMode(value: LineBreakMode) {
        _XTUILabel.xtr_setLineBreakModeObjectRef(value, this.objectRef);
    }

    public get lineSpace(): number {
        return _XTUILabel.xtr_lineSpace(this.objectRef);
    }

    public set lineSpace(value: number) {
        _XTUILabel.xtr_setLineSpaceObjectRef(value, this.objectRef);
    }

    textRectForBounds(bounds: Rect): Rect {
        return _XTUILabel.xtr_textRectForBoundsObjectRef(bounds, this.objectRef);
    }

}
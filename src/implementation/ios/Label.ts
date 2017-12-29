/// <reference path="xtr.d.ts" />

import { View } from "./View";
import { Font } from "./Font";
import { Color } from "../../interface/Color";
import { Rect, RectZero } from "../../interface/Rect";

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
        super(ref || XTRLabel)
    }

    public get text(): string {
        return XTRLabel.xtr_text(this.objectRef);
    }

    public set text(value: string) {
        XTRLabel.xtr_setTextObjectRef(value, this.objectRef);
    }

    public get font(): Font {
        return new Font(XTRLabel.xtr_font(this.objectRef));
    }

    public set font(value: Font) {
        XTRLabel.xtr_setFontObjectRef(value.objectRef, this.objectRef);
    }

    public get textColor(): Color {
        return XTRLabel.xtr_textColor(this.objectRef);
    }

    public set textColor(value: Color) {
        XTRLabel.xtr_setTextColorObjectRef(value, this.objectRef);
    }

    public get textAlignment(): TextAlignment {
        return XTRLabel.xtr_textAlignment(this.objectRef);
    }

    public set textAlignment(value: TextAlignment) {
        XTRLabel.xtr_setTextAlignmentObjectRef(value, this.objectRef);
    }

    public get numberOfLines(): number {
        return XTRLabel.xtr_numberOfLines(this.objectRef);
    }

    public set numberOfLines(value: number) {
        XTRLabel.xtr_setNumberOfLinesObjectRef(value, this.objectRef);
    }


    public get lineBreakMode(): LineBreakMode {
        return XTRLabel.xtr_lineBreakMode(this.objectRef);
    }

    public set lineBreakMode(value: LineBreakMode) {
        XTRLabel.xtr_setLineBreakModeObjectRef(value, this.objectRef);
    }

    public get lineSpace(): number {
        return XTRLabel.xtr_lineSpace(this.objectRef);
    }

    public set lineSpace(value: number) {
        XTRLabel.xtr_setLineSpaceObjectRef(value, this.objectRef);
    }

    textRectForBounds(bounds: Rect): Rect {
        return XTRLabel.xtr_textRectForBoundsObjectRef(bounds, this.objectRef);
    }

}
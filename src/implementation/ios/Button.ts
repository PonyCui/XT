/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { ImageView, Image } from "./ImageView";
import { Label } from "./Label";
import { Color } from "../../interface/Color";
import { Rect, RectZero } from "../../interface/Rect";
import { Font } from "./Font";

export class Button extends View {

    constructor(rect?: Rect, _isChild: boolean = false) {
        super(undefined, true);
        if (_isChild) { return; }
        this.nativeObject = XTRButton.createScriptObject(rect || RectZero, this);
        objectRefs[this.nativeObjectRef] = this;
        setImmediate(() => { this.init(); });
    }

    public get title(): string | undefined {
        return this.nativeObject.xtr_title();
    }

    public set title(value: string | undefined) {
        this.nativeObject.xtr_setTitle(value);
    }

    public get font(): Font {
        return this.nativeObject.xtr_font();
    }

    public set font(value: Font) {
        this.nativeObject.xtr_setFont(value);
    }

    public get image(): Image {
        return this.nativeObject.xtr_image();
    }

    public set image(value: Image) {
        this.nativeObject.xtr_setImage(value);
    }

    public get color(): Color {
        return this.nativeObject.xtr_color();
    }

    public set color(value: Color) {
        this.nativeObject.xtr_setColor(value);
    }

    public get vertical(): boolean {
        return this.nativeObject.xtr_vertical();
    }

    public set vertical(value: boolean) {
        this.nativeObject.xtr_setVertical(value);
    }

    public get inset(): number {
        return this.nativeObject.xtr_inset();
    }

    public set inset(value: number) {
        this.nativeObject.xtr_setInset(value);
    }

    onHighlighted?: (highligted: boolean) => void
    onTouchUpInside?: () => void

    handleTouchUpInside() {
        this.onTouchUpInside && this.onTouchUpInside();
    }

    handleHighlighted(highligted: boolean) {
        this.onHighlighted && this.onHighlighted(highligted);
    }

}
/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { ImageView, Image } from "./ImageView";
import { Label } from "./Label";
import { Color } from "../../interface/Color";
import { Rect, RectZero } from "../../interface/Rect";
import { Font } from "./Font";

export class Button extends View {

    constructor(ref: any) {
        super(ref || XTRButton)
    }

    public get title(): string | undefined {
        const value = XTRButton.xtr_title(this.objectRef)
        return typeof value === "string" ? value : undefined;
    }

    public set title(value: string | undefined) {
        XTRButton.xtr_setTitleObjectRef(typeof value === "string" ? value : "", this.objectRef);
    }

    public get font(): Font {
        return new Font(XTRButton.xtr_font(this.objectRef));
    }

    public set font(value: Font) {
        XTRButton.xtr_setFontObjectRef(value.objectRef, this.objectRef);
    }

    public get image(): Image | undefined {
        const ref = XTRButton.xtr_image(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new Image(ref);
    }

    public set image(value: Image | undefined) {
        XTRButton.xtr_setImageObjectRef(value ? value.objectRef : "", this.objectRef);
    }

    public get color(): Color {
        return XTRButton.xtr_color(this.objectRef);
    }

    public set color(value: Color) {
        XTRButton.xtr_setColorObjectRef(value, this.objectRef);
    }

    public get vertical(): boolean {
        return XTRButton.xtr_vertical(this.objectRef);
    }

    public set vertical(value: boolean) {
        XTRButton.xtr_setVerticalObjectRef(value, this.objectRef);
    }

    public get inset(): number {
        return XTRButton.xtr_inset(this.objectRef);
    }

    public set inset(value: number) {
        XTRButton.xtr_setInsetObjectRef(value, this.objectRef);
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
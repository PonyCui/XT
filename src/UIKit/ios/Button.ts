/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { ImageView, Image } from "./ImageView";
import { Label } from "./Label";
import { Color } from "../interface/Color";
import { Rect, RectZero } from "../interface/Rect";
import { Font } from "./Font";

export class Button extends View {

    constructor(ref: any) {
        super(ref || _XTUIButton)
    }

    toObject(): any {
        return {
            ...super.toObject(), 
            class: "UI.Button",
            title: this.title,
            font: this.font,
            image: this.image,
            color: this.color,
            vertical: this.vertical,
            inset: this.inset,
        }
    }

    public get title(): string | undefined {
        const value = _XTUIButton.xtr_title(this.objectRef)
        return typeof value === "string" ? value : undefined;
    }

    public set title(value: string | undefined) {
        _XTUIButton.xtr_setTitleObjectRef(typeof value === "string" ? value : "", this.objectRef);
    }

    public get font(): Font {
        return new Font(_XTUIButton.xtr_font(this.objectRef));
    }

    public set font(value: Font) {
        _XTUIButton.xtr_setFontObjectRef(value.objectRef, this.objectRef);
    }

    public get image(): Image | undefined {
        const ref = _XTUIButton.xtr_image(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new Image(ref);
    }

    public set image(value: Image | undefined) {
        _XTUIButton.xtr_setImageObjectRef(value ? value.objectRef : "", this.objectRef);
    }

    public get color(): Color {
        return _XTUIButton.xtr_color(this.objectRef);
    }

    public set color(value: Color) {
        _XTUIButton.xtr_setColorObjectRef(value, this.objectRef);
    }

    public get vertical(): boolean {
        return _XTUIButton.xtr_vertical(this.objectRef);
    }

    public set vertical(value: boolean) {
        _XTUIButton.xtr_setVerticalObjectRef(value, this.objectRef);
    }

    public get inset(): number {
        return _XTUIButton.xtr_inset(this.objectRef);
    }

    public set inset(value: number) {
        _XTUIButton.xtr_setInsetObjectRef(value, this.objectRef);
    }

    handleTouchDown() {
        this.onTouchDown && this.onTouchDown(this);
    }

    public onTouchDown?: (sender: this) => void

    handleTouchDragInside() {
        this.onTouchDragInside && this.onTouchDragInside(this);
    }

    public onTouchDragInside?: (sender: this) => void

    handleTouchDragOutside() {
        this.onTouchDragOutside && this.onTouchDragOutside(this);
    }

    public onTouchDragOutside?: (sender: this) => void

    handleTouchDragEnter() {
        this.onTouchDragEnter && this.onTouchDragEnter(this);
    }

    public onTouchDragEnter?: (sender: this) => void

    handleTouchDragExit() {
        this.onTouchDragExit && this.onTouchDragExit(this);
    }

    public onTouchDragExit?: (sender: this) => void

    handleTouchUpInside() {
        this.onTouchUpInside && this.onTouchUpInside(this);
    }

    public onTouchUpInside?: (sender: this) => void;

    handleTouchUpOutside() {
        this.onTouchUpOutside && this.onTouchUpOutside(this);
    }

    public onTouchUpOutside?: (sender: this) => void

    handleTouchCancel() {
        this.onTouchCancel && this.onTouchCancel(this);
    }

    public onTouchCancel?: (sender: this) => void

    handleHighlighted(highligted: boolean) {
        this.onHighlighted && this.onHighlighted(this, highligted);
    }

    public onHighlighted?: (sender: this, highligted: boolean) => void

}
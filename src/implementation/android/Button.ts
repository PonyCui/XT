/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { ImageView, Image } from "./ImageView";
import { Label } from "./Label";
import { Color } from "../../interface/Color";
import { Rect, RectZero } from "../../interface/Rect";
import { Font } from "../../interface/Font";

export class Button extends View {

    nativeObject: any;
    imageView = new ImageView()
    titleLabel = new Label()

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        super(undefined, undefined, true);
        if (_isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.nativeObject = XTRButton.createScriptObject(rect || RectZero, this);
            this.addSubview(this.imageView);
            this.addSubview(this.titleLabel);
            (window as any).XTRObjCreater.store(this);
            this.init();
        }
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

    willMoveToSuperview(newSuperview: View) {
        super.willMoveToSuperview(newSuperview)
        if (newSuperview) {
            this.color = newSuperview.tintColor
        }
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

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.toString().indexOf("com.opensource.xtruntime.XTRButton$InnerObject") === 0) {
        return new Label(undefined, view);
    }
    return undefined;
})
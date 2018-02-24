/// <reference path="xtr.d.ts" />
import { View, InteractionState } from "./View";
import { ImageView, Image } from "./ImageView";
import { Label } from "./Label";
import { Color } from "../interface/Color";
import { Rect, RectZero } from "../interface/Rect";
import { Font } from "./Font";

export class Button extends View {

    readonly imageView: ImageView
    readonly titleLabel: Label

    constructor(ref?: any) {
        super(ref || _XTUIButton)
        this.titleLabel = new Label(_XTUIButton.xtr_titleLabel(this.objectRef))
        this.imageView = new ImageView(_XTUIButton.xtr_imageView(this.objectRef))
        this.setupTouches();
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

    private setupTouches() {
        this.userInteractionEnabled = true
        this.longPressDuration = 0.15
        this.onTap = () => {
            this.handleTouchUpInside()
        }
        this.onLongPress = (state, viewLocation) => {
            if (state == InteractionState.Began) {
                this.handleHighlighted(true)
                this.handleTouchDown()
            }
            else if (state == InteractionState.Changed) {
                const loc = viewLocation()
                const highlighted = !(loc.x < -44 || loc.x > this.bounds.width + 44 || loc.y < -44 || loc.y > this.bounds.height + 44)
                if (this.highlighted !== highlighted) {
                    this.handleHighlighted(highlighted);
                    highlighted ? this.handleTouchDragEnter() : this.handleTouchDragExit()
                }
                highlighted ? this.handleTouchDragInside() : this.handleTouchDragOutside()
            }
            else if (state == InteractionState.Ended || state == InteractionState.Cancelled) {
                if (state == InteractionState.Ended && this.highlighted) {
                    this.handleTouchUpInside();
                }
                else if (state == InteractionState.Ended) {
                    this.handleTouchUpOutside()
                }
                else {
                    this.handleTouchCancel()
                }
                this.handleHighlighted(false)
            }
        }
    }

    public get title(): string {
        return _XTUIButton.xtr_title(this.objectRef);
    }

    public set title(value: string) {
        _XTUIButton.xtr_setTitle(value, this.objectRef);
    }

    public get font(): Font {
        return new Font(_XTUIButton.xtr_font(this.objectRef));
    }

    public set font(value: Font) {
        _XTUIButton.xtr_setFont(value.objectRef, this.objectRef);
    }

    public get image(): Image | undefined {
        const imageRef = _XTUIButton.xtr_image(this.objectRef)
        return typeof imageRef === "string" ? new Image(imageRef) : undefined;
    }

    public set image(value: Image | undefined) {
        _XTUIButton.xtr_setImage(value ? value.objectRef : "", this.objectRef);
    }

    public get color(): Color {
        return _XTUIButton.xtr_color(this.objectRef);
    }

    public set color(value: Color) {
        _XTUIButton.xtr_setColor(value, this.objectRef);
    }

    public get vertical(): boolean {
        return _XTUIButton.xtr_vertical(this.objectRef);
    }

    public set vertical(value: boolean) {
        _XTUIButton.xtr_setVertical(value, this.objectRef);
    }

    public get inset(): number {
        return _XTUIButton.xtr_inset(this.objectRef);
    }

    public set inset(value: number) {
        _XTUIButton.xtr_setInset(value, this.objectRef);
    }

    didMoveToSuperview() {
        this.tintColorDidChange()
    }

    highlighted: boolean = false

    handleTouchDown() {
        this.onTouchDown && this.onTouchDown();
    }

    public onTouchDown?: () => void

    handleTouchDragInside() {
        this.onTouchDragInside && this.onTouchDragInside();
    }

    public onTouchDragInside?: () => void

    handleTouchDragOutside() {
        this.onTouchDragOutside && this.onTouchDragOutside();
    }

    public onTouchDragOutside?: () => void

    handleTouchDragEnter() {
        this.onTouchDragEnter && this.onTouchDragEnter();
    }

    public onTouchDragEnter?: () => void

    handleTouchDragExit() {
        this.onTouchDragExit && this.onTouchDragExit();
    }

    public onTouchDragExit?: () => void

    handleTouchUpInside() {
        this.onTouchUpInside && this.onTouchUpInside();
    }

    public onTouchUpInside?: () => void;

    handleTouchUpOutside() {
        this.onTouchUpOutside && this.onTouchUpOutside();
    }

    public onTouchUpOutside?: () => void

    handleTouchCancel() {
        this.onTouchCancel && this.onTouchCancel();
    }

    public onTouchCancel?: () => void

    handleHighlighted(highligted: boolean) {
        this.highlighted = highligted
        if (this.onHighlighted) {
            this.onHighlighted && this.onHighlighted(highligted);
        }
        else {
            View.animationWithDuration(0.10, () => {
                this.imageView.alpha = highligted ? 0.25 : 1.0
                this.titleLabel.alpha = highligted ? 0.25 : 1.0
            })
        }
    }

    public onHighlighted?: (highligted: boolean) => void

}
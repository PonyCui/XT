import { InteractionState } from '../../main.android';
/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { ImageView, Image } from "./ImageView";
import { Label } from "./Label";
import { Color } from "../../interface/Color";
import { Rect, RectZero } from "../../interface/Rect";
import { Font } from "./Font";

export class Button extends View {

    readonly imageView: ImageView
    readonly titleLabel: Label

    constructor(ref?: any) {
        super(ref || XTRButton)
        this.titleLabel = new Label(XTRButton.xtr_titleLabel(this.objectRef))
        this.imageView = new ImageView(XTRButton.xtr_imageView(this.objectRef))
        this.setupTouches();
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
            }
            else if (state == InteractionState.Changed) {
                const loc = viewLocation()
                const highlighted = !(loc.x < -44 || loc.x > this.bounds.width + 44 || loc.y < -44 || loc.y > this.bounds.height + 44)
                if (this.highlighted !== highlighted) {
                    this.handleHighlighted(highlighted);
                }
            }
            else if (state == InteractionState.Ended || state == InteractionState.Cancelled) {
                if (state == InteractionState.Ended && this.highlighted) {
                    this.handleTouchUpInside();
                }
                this.handleHighlighted(false)
            }
        }
    }

    public get title(): string {
        return XTRButton.xtr_title(this.objectRef);
    }

    public set title(value: string) {
        XTRButton.xtr_setTitle(value, this.objectRef);
    }

    public get font(): Font {
        return new Font(XTRButton.xtr_font(this.objectRef));
    }

    public set font(value: Font) {
        XTRButton.xtr_setFont(value.objectRef, this.objectRef);
    }

    public get image(): Image | undefined {
        const imageRef = XTRButton.xtr_image(this.objectRef)
        return typeof imageRef === "string" ? new Image(imageRef) : undefined;
    }

    public set image(value: Image | undefined) {
        XTRButton.xtr_setImage(value ? value.objectRef : "", this.objectRef);
    }

    public get color(): Color {
        return XTRButton.xtr_color(this.objectRef);
    }

    public set color(value: Color) {
        XTRButton.xtr_setColor(value, this.objectRef);
    }

    public get vertical(): boolean {
        return XTRButton.xtr_vertical(this.objectRef);
    }

    public set vertical(value: boolean) {
        XTRButton.xtr_setVertical(value, this.objectRef);
    }

    public get inset(): number {
        return XTRButton.xtr_inset(this.objectRef);
    }

    public set inset(value: number) {
        XTRButton.xtr_setInset(value, this.objectRef);
    }

    willMoveToSuperview(newSuperview: View) {
        super.willMoveToSuperview(newSuperview)
        if (newSuperview) {
            this.color = newSuperview.tintColor
        }
    }

    highlighted: boolean = false
    onHighlighted?: (highligted: boolean) => void
    onTouchUpInside?: () => void

    handleTouchUpInside() {
        this.onTouchUpInside && this.onTouchUpInside();
    }

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

}
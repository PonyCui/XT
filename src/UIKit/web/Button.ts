import { InteractionState } from '../interface/View';
import { View } from "./View";
import { Label } from "./Label";
import { ImageView, Image } from "./ImageView";
import { Rect, RectZero, SizeMake } from "../interface/Rect";
import { TextAlignment, LineBreakMode } from "../interface/Label";
import { Font } from "../interface/Font";
import { Color } from "../interface/Color";

export class Button extends View {

    private imageView: ImageView = new ImageView();
    private titleLabel: Label = new Label();

    constructor() {
        super()
        this.titleLabel.numberOfLines = 1;
        this.titleLabel.textAlignment = TextAlignment.Center
        this.titleLabel.lineBreakMode = LineBreakMode.TruncatingTail
        this.titleLabel.textColor = this.tintColor
        this.titleLabel.font = new Font(17)
        this.longPressDuration = 0.15;
        this.addSubview(this.imageView);
        this.addSubview(this.titleLabel);
        this.addTouches();
        this.resetContentLayout();
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

    tintColorDidChange() {
        this.titleLabel.textColor = this.color || this.tintColor;
    }

    private addTouches() {
        this.userInteractionEnabled = true;
        this.onTap = () => { this.onTouchUpInside && this.onTouchUpInside() }
        this.onLongPress = (state, viewLocation) => {
            if (state == InteractionState.Began) {
                this.titleLabel.alpha = 0.25
                this.imageView.alpha = 0.25;
                this.highlighted = true;
                this.onHighlighted && this.onHighlighted(true)
            }
            else if (state == InteractionState.Changed) {
                const loc = viewLocation()
                if (loc.x < -44.0 || loc.y < -44.0 || loc.x > this.bounds.width + 44.0 || loc.y > this.bounds.height + 44.0) {
                    if (this.highlighted) {
                        this.highlighted = false
                        View.animationWithDuration(0.15, () => {
                            this.titleLabel.alpha = 1.0
                            this.imageView.alpha = 1.0;
                        });
                        this.onHighlighted && this.onHighlighted(false)
                    }
                }
                else {
                    if (!this.highlighted) {
                        this.highlighted = true;
                        this.titleLabel.alpha = 0.25;
                        this.imageView.alpha = 0.25;
                        this.onHighlighted && this.onHighlighted(true)
                    }
                }
            }
            else if (state == InteractionState.Ended) {
                this.highlighted = false
                View.animationWithDuration(0.15, () => {
                    this.titleLabel.alpha = 1.0
                    this.imageView.alpha = 1.0;
                });
                this.onHighlighted && this.onHighlighted(false)
                const loc = viewLocation()
                if (loc.x > -44.0 && loc.y > -44.0 && loc.x < this.bounds.width + 44.0 && loc.y < this.bounds.height + 44.0) {
                    this.onTouchUpInside && this.onTouchUpInside()
                }
            }
            else if (state == InteractionState.Cancelled) {
                this.highlighted = false
                View.animationWithDuration(0.15, () => {
                    this.titleLabel.alpha = 1.0
                    this.imageView.alpha = 1.0;
                });
                this.onHighlighted && this.onHighlighted(false)
            }
        }
        this.nativeObject.xtr_setHoverMode(true)
    }

    layoutSubviews() {
        super.layoutSubviews();
        this.resetContentLayout();
    }

    private highlighted: boolean = false

    public onHighlighted?: (highligted: boolean) => void = undefined

    public onTouchUpInside?: () => void = undefined;

    public onHover?: (hovered: boolean) => void = undefined

    private _color: Color = this.tintColor

    public get color(): Color {
        return this._color || this.tintColor;
    }

    public set color(value: Color) {
        this._color = value;
        this.titleLabel.textColor = value || this.tintColor;
    }

    public get title(): string | undefined {
        return this.titleLabel.text
    }

    public set title(value: string | undefined) {
        this.titleLabel.text = value || ""
        this.resetContentLayout();
    }

	public get font(): Font {
		return this.titleLabel.font;
	}

	public set font(value: Font) {
        this.titleLabel.font = value;
	}

    public get image(): Image | undefined {
        return this.imageView.image;
    }

    public set image(value: Image | undefined) {
        this.imageView.image = value;
        this.resetContentLayout();
    }

    private _vertical: boolean = false

    public get vertical() {
        return this._vertical;
    }

    public set vertical(value: boolean) {
        if (this._vertical === value) { return; }
        this._vertical = value;
        this.resetContentLayout();
    }

    private _inset: number = 4.0;

    public get inset() {
        return this._inset;
    }

    public set inset(value: number) {
        if (this._inset === value) { return; }
        this._inset = value;
        this.resetContentLayout();
    }

    private resetContentLayout() {
        if (this.imageView.image === undefined) {
            const textSize = this.titleLabel.intrinsicContentSize(this.bounds.width);
            if (textSize) {
                this.titleLabel.frame = {
                    x: (this.bounds.width - textSize.width) / 2,
                    y: (this.bounds.height - textSize.height) / 2 + 2,
                    width: textSize.width,
                    height: textSize.height
                }; 
            }
            else {
                this.titleLabel.frame = RectZero;
            }
            this.imageView.frame = RectZero;
        }
        else {
            const textSize = this.titleLabel.intrinsicContentSize(this.bounds.width);
            const imageSize = this.imageView.intrinsicContentSize(this.bounds.width) || SizeMake(0, 0);
            if (this.vertical) {
                if (textSize && textSize.height > 0) {
                    const contentHeight = imageSize.height + textSize.height + this.inset;
                    this.imageView.frame = {
                        x: (this.bounds.width - imageSize.width) / 2,
                        y: (this.bounds.height - contentHeight) / 2,
                        width: imageSize.width,
                        height: imageSize.height
                    };
                    this.titleLabel.frame = {
                        x: (this.bounds.width - textSize.width) / 2,
                        y: (this.bounds.height - contentHeight) / 2 + imageSize.height + this.inset,
                        width: textSize.width,
                        height: textSize.height
                    }; 
                }
                else {
                    this.imageView.frame = { x: (this.bounds.width - imageSize.width) / 2, y: (this.bounds.height - imageSize.height) / 2, width: imageSize.width, height: imageSize.height }
                }
            }
            else {
                if (textSize && textSize.width > 0) {
                    const contentWidth = imageSize.width + textSize.width + this.inset;
                    this.imageView.frame = {
                        x: (this.bounds.width - contentWidth) / 2,
                        y: (this.bounds.height - imageSize.height) / 2,
                        width: imageSize.width,
                        height: imageSize.height
                    };
                    this.titleLabel.frame = {
                        x: (this.bounds.width - contentWidth) / 2 + imageSize.width + this.inset,
                        y: (this.bounds.height - textSize.height) / 2,
                        width: textSize.width,
                        height: textSize.height
                    };
                }
                else {
                    this.imageView.frame = { x: (this.bounds.width - imageSize.width) / 2, y: (this.bounds.height - imageSize.height) / 2, width: imageSize.width, height: imageSize.height }
                }
            }
        }
    }

}
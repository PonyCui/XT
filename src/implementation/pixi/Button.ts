import { InteractionState } from '../../interface/View';
import { View } from "./View";
import { Label } from "./Label";
import { ImageView, Image } from "./ImageView";
import { Rect, RectZero } from "../../interface/Rect";
import { TextAlignment, LineBreakMode } from "../../interface/Label";
import { Font } from "../../interface/Font";
import { Color } from "../../interface/Color";

export class Button extends View {

    private readonly imageView: ImageView;
    readonly titleLabel: Label

    constructor(rect: Rect) {
        super(rect)
        this.imageView = new ImageView();
        this.titleLabel = new Label();
        this.titleLabel.numberOfLines = 1;
        this.titleLabel.textAlignment = TextAlignment.Center
        this.titleLabel.lineBreakMode = LineBreakMode.TruncatingTail
        this.titleLabel.textColor = this.tintColor
        this.titleLabel.font = new Font(17)
        this.longPressDuration = 150;
        this.addSubview(this.imageView);
        this.addSubview(this.titleLabel);
        this.addTouches();
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
                this.onHighlighted && this.onHighlighted(true)
            }
            else if (state == InteractionState.Changed) {
                if (viewLocation) {
                    if (viewLocation.x < -44.0 || viewLocation.y < -44.0 || viewLocation.x > this.bounds.width + 44.0 || viewLocation.y > this.bounds.height + 44.0) {
                        View.animationWithDuration(0.15, () => {
                            this.titleLabel.alpha = 1.0
                            this.imageView.alpha = 1.0;
                        });
                        this.onHighlighted && this.onHighlighted(false)
                    }
                    else {
                        this.titleLabel.alpha = 0.25;
                        this.imageView.alpha = 0.25;
                        this.onHighlighted && this.onHighlighted(true)
                    }
                }
            }
            else if (state == InteractionState.Ended) {
                View.animationWithDuration(0.15, () => {
                    this.titleLabel.alpha = 1.0
                    this.imageView.alpha = 1.0;
                });
                this.onHighlighted && this.onHighlighted(false)
                if (viewLocation && viewLocation.x > -44.0 && viewLocation.y > -44.0 && viewLocation.x < this.bounds.width + 44.0 && viewLocation.y < this.bounds.height + 44.0) {
                    this.onTouchUpInside && this.onTouchUpInside()
                }
            }
        }
    }

    layoutSubviews() {
        super.layoutSubviews();
        this.resetContentLayout();
    }

    public onHighlighted?: (highligted: boolean) => void

    public onTouchUpInside?: () => void = undefined;

    private _color: Color | undefined = undefined

    public get color(): Color | undefined {
        return this._color;
    }

    public set color(value: Color | undefined) {
        this._color = value;
        this.titleLabel.textColor = value || this.tintColor;
    }

    public get title(): string | undefined {
        return this.titleLabel.text
    }

    public set title(value: string | undefined) {
        this.titleLabel.text = value
        this.resetContentLayout();
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
                    y: (this.bounds.height - textSize.height) / 2,
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
            if (this.vertical) {
                const textSize = this.titleLabel.intrinsicContentSize(this.bounds.width);
                if (textSize && textSize.height > 0) {
                    const contentHeight = this.imageView.image.size.height + textSize.height + this.inset;
                    this.imageView.frame = {
                        x: (this.bounds.width - this.imageView.image.size.width) / 2,
                        y: (this.bounds.height - contentHeight) / 2,
                        width: this.imageView.image.size.width,
                        height: this.imageView.image.size.height
                    };
                    this.titleLabel.frame = {
                        x: (this.bounds.width - textSize.width) / 2,
                        y: (this.bounds.height - contentHeight) / 2 + this.imageView.image.size.height + this.inset,
                        width: textSize.width,
                        height: textSize.height
                    }; 
                }
                else {
                    this.imageView.frame = { x: (this.bounds.width - this.imageView.image.size.width) / 2, y: (this.bounds.height - this.imageView.image.size.height) / 2, width: this.imageView.image.size.width, height: this.imageView.image.size.height }
                }
            }
            else {
                const textSize = this.titleLabel.intrinsicContentSize(this.bounds.width);
                if (textSize && textSize.width > 0) {
                    const contentWidth = this.imageView.image.size.width + textSize.width + this.inset;
                    this.imageView.frame = {
                        x: (this.bounds.width - contentWidth) / 2,
                        y: (this.bounds.height - this.imageView.image.size.height) / 2,
                        width: this.imageView.image.size.width,
                        height: this.imageView.image.size.height
                    };
                    this.titleLabel.frame = {
                        x: (this.bounds.width - contentWidth) / 2 + this.imageView.image.size.width + this.inset,
                        y: (this.bounds.height - textSize.height) / 2,
                        width: textSize.width,
                        height: textSize.height
                    };
                }
                else {
                    this.imageView.frame = { x: (this.bounds.width - this.imageView.image.size.width) / 2, y: (this.bounds.height - this.imageView.image.size.height) / 2, width: this.imageView.image.size.width, height: this.imageView.image.size.height }
                }
            }
        }
    }

}
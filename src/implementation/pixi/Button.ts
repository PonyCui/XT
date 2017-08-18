import { InteractionState } from '../../interface/View';
import { View } from "./View";
import { Label } from "./Label";
import { Rect, TextAlignment, Font, Color, LineBreakMode } from "../../interface/Abstract";

export class Button extends View {

    readonly titleLabel: Label

    constructor(rect: Rect) {
        super(rect)
        this.titleLabel = new Label(rect);
        this.titleLabel.numberOfLines = 1;
        this.titleLabel.textAlignment = TextAlignment.Center
        this.titleLabel.lineBreakMode = LineBreakMode.TruncatingTail
        this.titleLabel.textColor = this.tintColor
        this.titleLabel.font = new Font(17)
        this.longPressDuration = 150;
        this.addSubview(this.titleLabel);
        this.addTouches();
    }

    tintColorDidChange() {
        this.titleLabel.textColor = this.color || this.tintColor;
    }

    private addTouches() {
        this.userInteractionEnabled = true;
        this.onTap = () => { this.onTouchUpInisde && this.onTouchUpInisde() }
        this.onLongPress = (state, viewLocation) => {
            if (state == InteractionState.Began) {
                this.titleLabel.alpha = 0.25
                this.onHighlighted && this.onHighlighted(true)
            }
            else if (state == InteractionState.Changed) {
                if (viewLocation) {
                    if (viewLocation.x < -44.0 || viewLocation.y < -44.0 || viewLocation.x > this.bounds.width + 44.0 || viewLocation.y > this.bounds.height + 44.0) {
                        View.animationWithDuration(0.15, () => {
                            this.titleLabel.alpha = 1.0
                        });
                        this.onHighlighted && this.onHighlighted(false)
                    }
                    else {
                        this.titleLabel.alpha = 0.25;
                        this.onHighlighted && this.onHighlighted(true)
                    }
                }
            }
            else if (state == InteractionState.Ended) {
                View.animationWithDuration(0.15, () => {
                    this.titleLabel.alpha = 1.0
                });
                this.onHighlighted && this.onHighlighted(false)
                if (viewLocation && viewLocation.x > -44.0 && viewLocation.y > -44.0 && viewLocation.x < this.bounds.width + 44.0 && viewLocation.y < this.bounds.height + 44.0) {
                    this.onTouchUpInisde && this.onTouchUpInisde()
                }
            }
        }
    }

    layoutSubviews() {
        super.layoutSubviews();
        this.titleLabel.frame = this.bounds;
    }

    public onHighlighted?: (highligted: boolean) => void

    public onTouchUpInisde?: () => void = undefined;

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
    }

}
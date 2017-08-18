import { InteractionState } from '../../interface/View';
import { View } from "./View";
import { Label } from "./Label";
import { Rect, TextAlignment, Font } from "../../interface/Abstract";

export class Button extends View {

    readonly titleLabel: Label

    constructor(rect: Rect) {
        super(rect)
        this.titleLabel = new Label(rect);
        this.titleLabel.textAlignment = TextAlignment.Center
        this.titleLabel.textColor = this.tintColor
        this.titleLabel.font = new Font(17)
        this.addSubview(this.titleLabel);
        this.addTouches();
    }

    private addTouches() {
        this.userInteractionEnabled = true;
        this.onTap = () => { this.onTouchUpInisde && this.onTouchUpInisde() }
        this.onLongPress = (state, viewLocation) => {
            if (state == InteractionState.Began) {
                this.alpha = 0.25
                this.onHighlighted && this.onHighlighted(true)
            }
            else if (state == InteractionState.Changed) {
                if (viewLocation) {
                    if (viewLocation.x < -44.0 || viewLocation.y < -44.0 || viewLocation.x > this.bounds.width + 44.0 || viewLocation.y > this.bounds.height + 44.0) {
                        this.alpha = 1.0;
                        this.onHighlighted && this.onHighlighted(false)
                    }
                    else {
                        this.alpha = 0.25;
                        this.onHighlighted && this.onHighlighted(true)
                    }
                }
            }
            else if (state == InteractionState.Ended) {
                this.alpha = 1.0
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

}
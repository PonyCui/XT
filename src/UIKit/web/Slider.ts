import { View } from "./View";
import { RectMake, SizeMake } from "../interface/Rect";
import { Color } from "../interface/Color";
import { InteractionState } from "../interface/View";

export class Slider extends View {

    private tintView = new View()
    private backView = new View()
    private thumbView = new View()

    constructor() {
        super()
        this.setupViews()
        this.addTouches()
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.Slider",
            value: this.value,
        }
    }

    private setupViews() {
        const tintColor = this.tintColor
        this.tintView.userInteractionEnabled = false
        this.tintView.backgroundColor = tintColor
        this.backView.userInteractionEnabled = false
        this.backView.backgroundColor = new Color(tintColor.r, tintColor.g, tintColor.b, tintColor.a * 0.3)
        this.thumbView.userInteractionEnabled = true
        this.thumbView.frame = RectMake(0, 0, 28, 28)
        this.thumbView.cornerRadius = 14
        this.thumbView.shadowColor = new Color(0, 0, 0, 0.1)
        this.thumbView.shadowRadius = 2
        this.thumbView.shadowOffset = SizeMake(0, 2)
        this.thumbView.shadowOpacity = 1.0
        this.thumbView.backgroundColor = Color.whiteColor
        this.thumbView.borderColor = new Color(0xE5 / 0xFF, 0xE5 / 0xFF, 0xE5 / 0xFF)
        this.thumbView.borderWidth = 0.5
        this.addSubview(this.backView)
        this.addSubview(this.tintView)
        this.addSubview(this.thumbView)
    }

    private startValue = this.value

    private addTouches() {
        this.thumbView.onPan = (state, _, __, ___, translation) => {
            if (state == InteractionState.Began) {
                this.startValue = this.value
            }
            else {
                this.value = Math.max(0.0, Math.min(1.0, this.startValue + translation.x / this.bounds.width))
                this.onValueChanged && this.onValueChanged(this)
            }
        }
    }

    tintColorDidChange() {
        super.tintColorDidChange()
        const tintColor = this.tintColor
        this.tintView.backgroundColor = tintColor
        this.backView.backgroundColor = new Color(tintColor.r, tintColor.g, tintColor.b, tintColor.a * 0.3)
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.backView.frame = RectMake(0, (this.bounds.height - 2) / 2.0, this.bounds.width, 2)
        this.tintView.frame = RectMake(0, (this.bounds.height - 2) / 2.0, this.bounds.width * this._value, 2)
        this.thumbView.frame = RectMake((this.bounds.width - 28) * this._value, (this.bounds.height - 28) / 2.0, 28, 28)
    }

    onValueChanged?: (sender: this) => void

    private _value: number = 0.5

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = Math.max(0.0, Math.min(value));
        this.layoutSubviews()
    }

    setValue(value: number, animated: boolean) {
        if (animated) {
            View.animationWithBouncinessAndSpeed(0.0, 16.0, () => {
                this.value = value
            })
        }
        else {
            this.value = value
        }
    }

}
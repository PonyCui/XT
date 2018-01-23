import { View } from "./View";
import { RectMake, SizeMake } from "../../interface/Rect";
import { Color } from "../../interface/Color";

export class Switch extends View {

    private contentView = new View()
    private tintView = new View()
    private thumbView = new View()

    constructor() {
        super()
        this.setupViews()
        this.addTouches()
        this.addSubview(this.contentView)
    }

    private setupViews() {
        this.tintView.userInteractionEnabled = false
        this.tintView.frame = RectMake(0, 0, 51, 31)
        this.tintView.cornerRadius = 15.5
        this.tintView.borderWidth = 1.5
        this.thumbView.userInteractionEnabled = false
        this.thumbView.frame = RectMake(0, 1.5, 28, 28)
        this.thumbView.cornerRadius = 14
        this.thumbView.shadowColor = new Color(0, 0, 0, 0.1)
        this.thumbView.shadowRadius = 2
        this.thumbView.shadowOffset = SizeMake(0, 2)
        this.thumbView.shadowOpacity = 1.0
        this.thumbView.backgroundColor = Color.whiteColor
        this.thumbView.borderColor = new Color(0xE5 / 0xFF, 0xE5 / 0xFF, 0xE5 / 0xFF)
        this.thumbView.borderWidth = 0.5
        this.resetStyle()
        this.contentView.addSubview(this.tintView)
        this.contentView.addSubview(this.thumbView)
    }

    private addTouches() {
        this.onTap = () => {
            this.setOn(!this.on, true)
            this.onValueChanged && this.onValueChanged()
        }
    }

    private resetStyle() {
        if (!this.on) {
            this.thumbView.frame = RectMake(1.5, 1.5, 28, 28)
            this.tintView.borderColor = new Color(0xE5 / 0xFF, 0xE5 / 0xFF, 0xE5 / 0xFF)
            this.tintView.backgroundColor = Color.clearColor
        }
        else {
            this.thumbView.frame = RectMake(21.5, 1.5, 28, 28)
            this.tintView.borderColor = this.tintColor
            this.tintView.backgroundColor = this.tintColor
        }
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.contentView.frame = RectMake((this.bounds.width - 51) / 2.0, (this.bounds.height - 31) / 2.0, 51, 31)
    }

    private _on: boolean = false

    public get on(): boolean {
        return this._on
    }

    public set on(value: boolean) {
        this._on = value;
        this.resetStyle()
    }

    onValueChanged?: () => void

    setOn(value: boolean, animated: boolean) {
        if (animated) {
            View.animationWithBouncinessAndSpeed(0.0, 16.0, () => {
                this.on = value
            })
        }
        else {
            this.on = value
        }
    }

    handleValueChanged() {
        this.onValueChanged && this.onValueChanged()
    }

}
import { View } from "./View";

export class Slider extends View {

    constructor(ref: any = undefined) {
        super(ref || XTRSlider)
    }

    public get value(): number {
        return XTRSlider.xtr_value(this.objectRef);
    }

    public set value(value: number) {
        this.setValue(value, false)
    }

    onValueChanged?: () => void

    setValue(value: number, animated: boolean) {
        XTRSlider.xtr_setValue(value, animated, this.objectRef)
    }

    handleValueChanged() {
        this.onValueChanged && this.onValueChanged()
    }

}
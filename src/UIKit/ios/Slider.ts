import { View } from "./View";

export class Slider extends View {

    constructor(ref: any = undefined) {
        super(ref || _XTUISlider)
    }

    public get value(): number {
        return _XTUISlider.xtr_value(this.objectRef);
    }

    public set value(value: number) {
        this.setValue(value, false)
    }

    onValueChanged?: () => void

    setValue(value: number, animated: boolean) {
        _XTUISlider.xtr_setValueAnimatedObjectRef(value, animated, this.objectRef)
    }

    handleValueChanged() {
        this.onValueChanged && this.onValueChanged()
    }

}
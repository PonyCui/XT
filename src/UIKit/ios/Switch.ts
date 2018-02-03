import { View } from "./View";

export class Switch extends View {

    constructor(ref: any = undefined) {
        super(ref || _XTUISwitch)
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.Switch",
            on: this.on,
        }
    }

    public get on(): boolean {
        return _XTUISwitch.xtr_on(this.objectRef);
    }

    public set on(value: boolean) {
        this.setOn(value, false)
    }

    onValueChanged?: () => void

    setOn(value: boolean, animated: boolean) {
        _XTUISwitch.xtr_setOnAnimatedObjectRef(value, animated, this.objectRef)
    }

    handleValueChanged() {
        this.onValueChanged && this.onValueChanged()
    }

}
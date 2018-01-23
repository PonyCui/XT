import { View } from "./View";

export class Switch extends View {

    constructor(ref: any = undefined) {
        super(ref || XTRSwitch)
    }

    public get on(): boolean {
        return XTRSwitch.xtr_on(this.objectRef);
    }

    public set on(value: boolean) {
        this.setOn(value, false)
    }

    onValueChanged?: () => void

    setOn(value: boolean, animated: boolean) {
        XTRSwitch.xtr_setOn(value, animated, this.objectRef)
    }

    handleValueChanged() {
        this.onValueChanged && this.onValueChanged()
    }

}
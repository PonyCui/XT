import { View } from "./View";
import { Color } from "../interface/Color";

export enum HRViewPosition {
    Top,
    Middle,
    Bottom,
    Left,
    VMiddle,
    Right,
}

export class HRView extends View {

    constructor(ref?: any) {
        super(ref || _XTUIHRView)
    }

    toObject(): any {
        return {
            ...super.toObject(), 
            class: "UI.HRView",
            position: this.position,
            color: this.color,
        }
    }

	public get position(): HRViewPosition  {
		return _XTUIHRView.xtr_position(this.objectRef)
	}

	public set position(value: HRViewPosition ) {
		_XTUIHRView.xtr_setPosition(value, this.objectRef)
	}

    public get color(): Color {
        return _XTUIHRView.xtr_color(this.objectRef)
    }

    public set color(value: Color) {
        _XTUIHRView.xtr_setColor(value, this.objectRef)
    }

}
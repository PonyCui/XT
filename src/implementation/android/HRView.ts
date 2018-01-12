import { View } from "./View";
import { Color } from "../../interface/Color";

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
        super(ref || XTRHRView)
    }

	public get position(): HRViewPosition  {
		return XTRHRView.xtr_position(this.objectRef)
	}

	public set position(value: HRViewPosition ) {
		XTRHRView.xtr_setPosition(value, this.objectRef)
	}

    public get color(): Color {
        return XTRHRView.xtr_color(this.objectRef)
    }

    public set color(value: Color) {
        XTRHRView.xtr_setColor(value, this.objectRef)
    }

}
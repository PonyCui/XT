import { View } from "./View";
import { Color } from "../../interface/Color";
import { HRViewElement } from "./element/HRView";

export enum HRViewPosition {
    Top,
    Middle,
    Bottom,
    Left,
    VMiddle,
    Right,
}

export class HRView extends View {

    constructor() {
        super(HRViewElement)
        this.position = HRViewPosition.Bottom
        this.color = Color.blackColor
    }

	public get position(): HRViewPosition  {
		return this.nativeObject.xtr_position();
	}

	public set position(value: HRViewPosition ) {
        this.nativeObject.xtr_setPosition(value)
	}
    
    public get color(): Color {
        return this.nativeObject.xtr_color()
    }

    public set color(value: Color) {
        this.nativeObject.xtr_setColor(value)
    }

}
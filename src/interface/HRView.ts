import { View } from "./View";
import { Color } from "./Color";

export enum HRViewPosition {
    Top,
    Middle,
    Bottom,
    Left,
    VMiddle,
    Right,
}

export class HRView extends View {

    position: HRViewPosition = HRViewPosition.Bottom
    color: Color = Color.blackColor

}
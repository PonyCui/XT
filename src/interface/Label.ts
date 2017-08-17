import { View } from "./View";
import { Color } from "./Color";
import { Font } from "./Font";

export enum TextAlignment {
    Left,
    Center,
    Right,
}

export enum TextVerticalAlignment {
    Top,
    Center,
    Bottom,
}

export class Label extends View {

    text?: string;
    font?: Font;
    textColor: Color = new Color(0, 0, 0);
    textAlignment: TextAlignment;

}
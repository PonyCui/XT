import { UIView } from "./UIView";
import { UIColor } from "./UIColor";
import { UIFont } from "./UIFont";

export enum UITextAlignment {
    Left,
    Center,
    Right,
}

export enum UITextVerticalAlignment {
    Top,
    Center,
    Bottom,
}

export class UILabel extends UIView {

    text?: string;
    font?: UIFont;
    textColor: UIColor = new UIColor(0, 0, 0);
    textAlignment: UITextAlignment;

}
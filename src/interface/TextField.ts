import { View } from './View'
import { Font } from './Font';
import { Color } from './Color';
import { TextAlignment } from './Label';

export enum TextFieldViewMode {
    Never,
    WhileEditing,
    UnlessEditing,
    Always,
}

export class TextField extends View {

    text?: string;
    font?: Font;
    textColor: Color = new Color(0, 0, 0);
    textAlignment: TextAlignment = TextAlignment.Left;
    placeholder?: string;
    placeholderColor?: Color = Color.colorWithWhite(0.3, 1.0)
    clearsOnBeginEditing: Boolean = false
    readonly editing: Boolean = false
    clearButtonMode: TextFieldViewMode = TextFieldViewMode.Never
    leftView?: View
    leftViewMode: TextFieldViewMode = TextFieldViewMode.Never
    rightView?: View
    rightViewMode: TextFieldViewMode = TextFieldViewMode.Never

    // TextField Delegate
    shouldBeginEditing?: () => Boolean = undefined
    didBeginEditing?: () => void = undefined
    shouldEndEditing?: () => Boolean = undefined
    didEndEditing?: () => void = undefined
    shouldChange?: (inRange: { location: number, length: number }, replacementString: string) => Boolean = undefined
    shouldClear?: () => Boolean = undefined
    shouldReturn?: () => Boolean = undefined

}
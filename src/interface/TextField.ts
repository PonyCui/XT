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

export enum KeyboardType {
    Default = 0,
    ASCIICapable = 1,
    NumbersAndPunctuation = 2,
}

export enum ReturnKeyType {
    Default = 0,
    Go = 1,
    Next = 4,
    Search = 6,
    Send = 7,
    Done = 9,
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

    // TextInput
    allowAutocapitalization: Boolean = true
    allowAutocorrection: Boolean = true
    allowSpellChecking: Boolean = true
    keyboardType: KeyboardType = KeyboardType.Default
    returnKeyType: ReturnKeyType = ReturnKeyType.Default
    enablesReturnKeyAutomatically: Boolean = false
    secureTextEntry: Boolean = false

    // TextField Delegate
    shouldBeginEditing?: () => Boolean = undefined
    didBeginEditing?: () => void = undefined
    shouldEndEditing?: () => Boolean = undefined
    didEndEditing?: () => void = undefined
    shouldChange?: (inRange: { location: number, length: number }, replacementString: string) => Boolean = undefined
    shouldClear?: () => Boolean = undefined
    shouldReturn?: () => Boolean = undefined

    // methods
    focus(): void { }
    blur(): void { }

}
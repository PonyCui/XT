import { View } from './View'
import { Font } from './Font';
import { Color } from './Color';
import { TextAlignment } from './Label';
import { KeyboardType, ReturnKeyType } from './TextField';
import { Rect } from './Rect';

export class TextView extends View {

    text: string;
    font: Font;
    textColor: Color = new Color(0, 0, 0);
    textAlignment: TextAlignment = TextAlignment.Left;
    readonly editing: Boolean = false

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

    // methods
    focus(): void { }
    blur(): void { }

}
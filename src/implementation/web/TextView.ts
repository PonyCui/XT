import { View } from './View'
import { TextAlignment } from './Label';
import { Font } from '../../interface/Font';
import { Color } from '../../interface/Color';
import { KeyboardType, ReturnKeyType } from '../../interface/TextField';
import { Rect, RectZero } from '../../interface/Rect';
import { TextViewElement } from './element/TextView';
import { Touchable, Touch, Event, TouchManager } from '../libraries/touch/TouchManager';
import { WindowElement } from './element/Window';

export class TextView extends View {

    nativeObject: any;

    constructor() {
        super(TextViewElement)
        this.userInteractionEnabled = true;
        this.onTap = () => {
            this.focus();
        }
        this.clipsToBounds = true;
    }

    touchesBegan(touches: Touch[], event: Event): void {
        super.touchesBegan(touches, event);
        if (this.editing) {
            WindowElement._allowDefault = true;
        }
    }

    touchesMoved(touches: Touch[], event: Event): void {
        super.touchesMoved(touches, event);
    }

    touchesEnded(touches: Touch[], event: Event): void {
        super.touchesEnded(touches, event);
        if (this.editing) {
            WindowElement._allowDefault = true;
        }
    }

    public get text(): string {
        return this.nativeObject.xtr_text();
    }

    public set text(value: string) {
        this.nativeObject.xtr_setText(value);
    }

    public get font(): Font | undefined {
        return this.nativeObject.xtr_font();
    }

    public set font(value: Font | undefined) {
        this.nativeObject.xtr_setFont(value);
    }

    public get textColor(): Color {
        return this.nativeObject.xtr_textColor();
    }

    public set textColor(value: Color) {
        this.nativeObject.xtr_setTextColor(value);
    }

    public get textAlignment(): TextAlignment {
        return this.nativeObject.xtr_textAlignment();
    }

    public set textAlignment(value: TextAlignment) {
        this.nativeObject.xtr_setTextAlignment(value);
    }

    public get editing(): Boolean {
        return this.nativeObject.xtr_editing();
    }

    // TextInput
    public get allowAutocapitalization(): Boolean {
        return this.nativeObject.xtr_allowAutocapitalization();
    }

    public set allowAutocapitalization(value: Boolean) {
        this.nativeObject.xtr_setAllowAutocapitalization(value);
    }

    public get allowAutocorrection(): Boolean {
        return this.nativeObject.xtr_allowAutocorrection();
    }

    public set allowAutocorrection(value: Boolean) {
        this.nativeObject.xtr_setAllowAutocorrection(value);
    }

    public get allowSpellChecking(): Boolean {
        return this.nativeObject.xtr_allowSpellChecking();
    }

    public set allowSpellChecking(value: Boolean) {
        this.nativeObject.xtr_setAllowSpellChecking(value);
    }

    public get keyboardType(): KeyboardType {
        return this.nativeObject.xtr_keyboardType();
    }

    public set keyboardType(value: KeyboardType) {
        this.nativeObject.xtr_setKeyboardType(value);
    }

    public get returnKeyType(): ReturnKeyType {
        return this.nativeObject.xtr_returnKeyType();
    }

    public set returnKeyType(value: ReturnKeyType) {
        this.nativeObject.xtr_setReturnKeyType(value);
    }
    
    enablesReturnKeyAutomatically: Boolean = false
    secureTextEntry: Boolean = false

    // TextField Delegate
    shouldBeginEditing?: () => Boolean = undefined
    didBeginEditing?: () => void = undefined
    shouldEndEditing?: () => Boolean = undefined
    didEndEditing?: () => void = undefined
    shouldChange?: (inRange: { location: number, length: number }, replacementString: string) => Boolean = undefined

    // methods
    focus(): void {
        this.nativeObject.xtr_focus();
    }

    blur(): void {
        this.nativeObject.xtr_blur();
    }

}
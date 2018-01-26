import { View } from './View'
import { TextAlignment } from './Label'; import { Color } from '../interface/Color';
import { Font } from './Font';
import { KeyboardType, ReturnKeyType } from '../interface/TextField';
import { Rect, RectZero } from '../interface/Rect';
;

export class TextView extends View {

    constructor(ref?: any) {
        super(ref || _XTUITextView)
    }

    public get text(): string {
        return _XTUITextView.xtr_text(this.objectRef);
    }

    public set text(value: string) {
        _XTUITextView.xtr_setText(value, this.objectRef);
    }

    public get font(): Font {
        return new Font(_XTUITextView.xtr_font(this.objectRef));
    }

    public set font(value: Font) {
        _XTUITextView.xtr_setFont(value.objectRef, this.objectRef);
    }

    public get textColor(): Color {
        return _XTUITextView.xtr_textColor(this.objectRef);
    }

    public set textColor(value: Color) {
        _XTUITextView.xtr_setTextColor(value, this.objectRef);
    }

    public get textAlignment(): TextAlignment {
        return _XTUITextView.xtr_textAlignment(this.objectRef);
    }

    public set textAlignment(value: TextAlignment) {
        _XTUITextView.xtr_setTextAlignment(value, this.objectRef);
    }

    public get editing(): Boolean {
        return _XTUITextView.xtr_editing(this.objectRef);
    }

    public get allowAutocapitalization(): Boolean {
        return _XTUITextView.xtr_allowAutocapitalization(this.objectRef);
    }

    public set allowAutocapitalization(value: Boolean) {
        _XTUITextView.xtr_setAllowAutocapitalization(value, this.objectRef);
    }

    public get allowAutocorrection(): Boolean {
        return _XTUITextView.xtr_allowAutocorrection(this.objectRef);
    }

    public set allowAutocorrection(value: Boolean) {
        _XTUITextView.xtr_setAllowAutocorrection(value, this.objectRef);
    }

    public get allowSpellChecking(): Boolean {
        return _XTUITextView.xtr_allowSpellChecking(this.objectRef);
    }

    public set allowSpellChecking(value: Boolean) {
        _XTUITextView.xtr_setAllowSpellChecking(value, this.objectRef);
    }

    public get keyboardType(): KeyboardType {
        return _XTUITextView.xtr_keyboardType(this.objectRef);
    }

    public set keyboardType(value: KeyboardType) {
        _XTUITextView.xtr_setKeyboardType(value, this.objectRef);
    }

    public get returnKeyType(): ReturnKeyType {
        return _XTUITextView.xtr_returnKeyType(this.objectRef);
    }

    public set returnKeyType(value: ReturnKeyType) {
        _XTUITextView.xtr_setReturnKeyType(value, this.objectRef);
    }

    public get enablesReturnKeyAutomatically(): Boolean {
        return false
    }

    public set enablesReturnKeyAutomatically(value: Boolean) { }

    public get secureTextEntry(): Boolean {
        return _XTUITextView.xtr_secureTextEntry(this.objectRef);
    }

    public set secureTextEntry(value: Boolean) {
        if (value) {
            this.allowAutocapitalization = false
            this.allowAutocorrection = false
            this.allowSpellChecking = false
        }
        _XTUITextView.xtr_setSecureTextEntry(value, this.objectRef);
    }

    shouldBeginEditing?: () => Boolean = undefined
    didBeginEditing?: () => void = undefined
    shouldEndEditing?: () => Boolean = undefined
    didEndEditing?: () => void = undefined
    shouldChange?: (inRange: { location: number, length: number }, replacementString: string) => Boolean = undefined
    shouldClear?: () => Boolean = undefined
    shouldReturn?: () => Boolean = undefined

    handleShouldBeginEditing(): Boolean {
        if (this.shouldBeginEditing) {
            return this.shouldBeginEditing()
        }
        return true
    }

    handleDidBeginEditing() {
        this.didBeginEditing && this.didBeginEditing()
    }

    handleShouldEndEditing(): Boolean {
        if (this.shouldEndEditing) {
            return this.shouldEndEditing()
        }
        return true
    }

    handleDidEndEditing() {
        this.didEndEditing && this.didEndEditing()
    }

    handleShouldChange(inRange: { location: number, length: number }, replacementString: string): Boolean {
        if (this.shouldChange) {
            return this.shouldChange(inRange, replacementString)
        }
        return true
    }

    handleShouldClear(): Boolean {
        if (this.shouldClear) {
            return this.shouldClear()
        }
        return true
    }

    handleShouldReturn(): Boolean {
        if (this.shouldReturn) {
            return this.shouldReturn()
        }
        return true
    }

    focus(): void {
        _XTUITextView.xtr_focus(this.objectRef);
    }

    blur(): void {
        _XTUITextView.xtr_blur(this.objectRef);
    }

}
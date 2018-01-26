/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero } from '../interface/Rect';
import { Font } from './Font';
import { Color } from '../interface/Color';
import { TextAlignment } from '../interface/Label';
import { TextFieldViewMode, KeyboardType, ReturnKeyType } from '../interface/TextField';

export class TextView extends View {

    constructor(ref: any) {
        super(ref || _XTUITextView)
    }

    public get text(): string {
        return _XTUITextView.xtr_text(this.objectRef);
    }

    public set text(value: string) {
        _XTUITextView.xtr_setTextObjectRef(value, this.objectRef);
    }

    public get font(): Font {
        return new Font(_XTUITextView.xtr_font(this.objectRef));
    }

    public set font(value: Font) {
        _XTUITextView.xtr_setFontObjectRef(value.objectRef, this.objectRef);
    }

    public get textColor(): Color {
        return _XTUITextView.xtr_textColor(this.objectRef);
    }

    public set textColor(value: Color) {
        _XTUITextView.xtr_setTextColorObjectRef(value, this.objectRef);
    }

    public get textAlignment(): TextAlignment {
        return _XTUITextView.xtr_textAlignment(this.objectRef);
    }

    public set textAlignment(value: TextAlignment) {
        _XTUITextView.xtr_setTextAlignmentObjectRef(value, this.objectRef);
    }

    public get editing(): Boolean {
        return _XTUITextView.xtr_editing(this.objectRef);
    }

    public get allowAutocapitalization(): Boolean {
        return _XTUITextView.xtr_allowAutocapitalization(this.objectRef);
    }

    public set allowAutocapitalization(value: Boolean) {
        _XTUITextView.xtr_setAllowAutocapitalizationObjectRef(value, this.objectRef);
    }

    public get allowAutocorrection(): Boolean {
        return _XTUITextView.xtr_allowAutocorrection(this.objectRef);
    }

    public set allowAutocorrection(value: Boolean) {
        _XTUITextView.xtr_setAllowAutocorrectionObjectRef(value, this.objectRef);
    }

    public get allowSpellChecking(): Boolean {
        return _XTUITextView.xtr_allowSpellChecking(this.objectRef);
    }

    public set allowSpellChecking(value: Boolean) {
        _XTUITextView.xtr_setAllowSpellCheckingObjectRef(value, this.objectRef);
    }

    public get keyboardType(): KeyboardType {
        return _XTUITextView.xtr_keyboardType(this.objectRef);
    }

    public set keyboardType(value: KeyboardType) {
        _XTUITextView.xtr_setKeyboardTypeObjectRef(value, this.objectRef);
    }

    public get returnKeyType(): ReturnKeyType {
        return _XTUITextView.xtr_returnKeyType(this.objectRef);
    }

    public set returnKeyType(value: ReturnKeyType) {
        _XTUITextView.xtr_setReturnKeyTypeObjectRef(value, this.objectRef);
    }

    public get enablesReturnKeyAutomatically(): Boolean {
        return _XTUITextView.xtr_enablesReturnKeyAutomatically(this.objectRef);
    }

    public set enablesReturnKeyAutomatically(value: Boolean) {
        _XTUITextView.xtr_setEnablesReturnKeyAutomaticallyObjectRef(value, this.objectRef);
    }

    public get secureTextEntry(): Boolean {
        return _XTUITextView.xtr_secureTextEntry(this.objectRef);
    }

    public set secureTextEntry(value: Boolean) {
        _XTUITextView.xtr_setSecureTextEntryObjectRef(value, this.objectRef);
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
        if (!this.handleShouldEndEditing()) { return }
        _XTUITextView.xtr_blur(this.objectRef);
    }

}
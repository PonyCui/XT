/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';
import { Font } from './Font';
import { Color } from '../../interface/Color';
import { TextAlignment } from '../../interface/Label';
import { TextFieldViewMode, KeyboardType, ReturnKeyType } from '../../interface/TextField';

export class TextView extends View {

    constructor(ref: any) {
        super(ref || XTRTextView)
    }

    public get text(): string {
        return XTRTextView.xtr_text(this.objectRef);
    }

    public set text(value: string) {
        XTRTextView.xtr_setTextObjectRef(value, this.objectRef);
    }

    public get font(): Font {
        return new Font(XTRTextView.xtr_font(this.objectRef));
    }

    public set font(value: Font) {
        XTRTextView.xtr_setFontObjectRef(value.objectRef, this.objectRef);
    }

    public get textColor(): Color {
        return XTRTextView.xtr_textColor(this.objectRef);
    }

    public set textColor(value: Color) {
        XTRTextView.xtr_setTextColorObjectRef(value, this.objectRef);
    }

    public get textAlignment(): TextAlignment {
        return XTRTextView.xtr_textAlignment(this.objectRef);
    }

    public set textAlignment(value: TextAlignment) {
        XTRTextView.xtr_setTextAlignmentObjectRef(value, this.objectRef);
    }

    public get editing(): Boolean {
        return XTRTextView.xtr_editing(this.objectRef);
    }

    public get allowAutocapitalization(): Boolean {
        return XTRTextView.xtr_allowAutocapitalization(this.objectRef);
    }

    public set allowAutocapitalization(value: Boolean) {
        XTRTextView.xtr_setAllowAutocapitalizationObjectRef(value, this.objectRef);
    }

    public get allowAutocorrection(): Boolean {
        return XTRTextView.xtr_allowAutocorrection(this.objectRef);
    }

    public set allowAutocorrection(value: Boolean) {
        XTRTextView.xtr_setAllowAutocorrectionObjectRef(value, this.objectRef);
    }

    public get allowSpellChecking(): Boolean {
        return XTRTextView.xtr_allowSpellChecking(this.objectRef);
    }

    public set allowSpellChecking(value: Boolean) {
        XTRTextView.xtr_setAllowSpellCheckingObjectRef(value, this.objectRef);
    }

    public get keyboardType(): KeyboardType {
        return XTRTextView.xtr_keyboardType(this.objectRef);
    }

    public set keyboardType(value: KeyboardType) {
        XTRTextView.xtr_setKeyboardTypeObjectRef(value, this.objectRef);
    }

    public get returnKeyType(): ReturnKeyType {
        return XTRTextView.xtr_returnKeyType(this.objectRef);
    }

    public set returnKeyType(value: ReturnKeyType) {
        XTRTextView.xtr_setReturnKeyTypeObjectRef(value, this.objectRef);
    }

    public get enablesReturnKeyAutomatically(): Boolean {
        return XTRTextView.xtr_enablesReturnKeyAutomatically(this.objectRef);
    }

    public set enablesReturnKeyAutomatically(value: Boolean) {
        XTRTextView.xtr_setEnablesReturnKeyAutomaticallyObjectRef(value, this.objectRef);
    }

    public get secureTextEntry(): Boolean {
        return XTRTextView.xtr_secureTextEntry(this.objectRef);
    }

    public set secureTextEntry(value: Boolean) {
        XTRTextView.xtr_setSecureTextEntryObjectRef(value, this.objectRef);
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
        XTRTextView.xtr_focus(this.objectRef);
    }

    blur(): void {
        if (!this.handleShouldEndEditing()) { return }
        XTRTextView.xtr_blur(this.objectRef);
    }

}
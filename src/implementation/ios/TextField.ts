/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';
import { Font } from './Font';
import { Color } from '../../interface/Color';
import { TextAlignment } from '../../interface/Label';
import { TextFieldViewMode, KeyboardType, ReturnKeyType } from '../../interface/TextField';

export class TextField extends View {

    constructor(ref: any) {
        super(ref || _XTUITextField)
    }

    public get text(): string {
        return _XTUITextField.xtr_text(this.objectRef);
    }

    public set text(value: string) {
        _XTUITextField.xtr_setTextObjectRef(value, this.objectRef);
    }

    public get font(): Font {
        return new Font(_XTUITextField.xtr_font(this.objectRef));
    }

    public set font(value: Font) {
        _XTUITextField.xtr_setFontObjectRef(value.objectRef, this.objectRef);
    }

    public get textColor(): Color {
        return _XTUITextField.xtr_textColor(this.objectRef);
    }

    public set textColor(value: Color) {
        _XTUITextField.xtr_setTextColorObjectRef(value, this.objectRef);
    }

    public get textAlignment(): TextAlignment {
        return _XTUITextField.xtr_textAlignment(this.objectRef);
    }

    public set textAlignment(value: TextAlignment) {
        _XTUITextField.xtr_setTextAlignmentObjectRef(value, this.objectRef);
    }

    public get placeholder(): string | undefined {
        const value = _XTUITextField.xtr_placeholder(this.objectRef)
        return typeof value === "string" ? value : undefined;
    }

    public set placeholder(value: string | undefined) {
        _XTUITextField.xtr_setPlaceholderObjectRef(value || "", this.objectRef);
    }

    public get placeholderColor(): Color {
        return _XTUITextField.xtr_placeholderColor(this.objectRef);
    }

    public set placeholderColor(value: Color) {
        _XTUITextField.xtr_setPlaceholderColorObjectRef(value, this.objectRef);
    }

    public get clearsOnBeginEditing(): Boolean {
        return _XTUITextField.xtr_clearsOnBeginEditing(this.objectRef);
    }

    public set clearsOnBeginEditing(value: Boolean) {
        _XTUITextField.xtr_setClearsOnBeginEditingObjectRef(value, this.objectRef);
    }

    public get editing(): Boolean {
        return _XTUITextField.xtr_editing(this.objectRef);
    }

    public get clearButtonMode(): TextFieldViewMode {
        return _XTUITextField.xtr_clearButtonMode(this.objectRef);
    }

    public set clearButtonMode(value: TextFieldViewMode) {
        _XTUITextField.xtr_setClearButtonModeObjectRef(value, this.objectRef);
    }

    public get leftView(): View | undefined {
        const ref = _XTUITextField.xtr_leftView(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new View(ref);
    }

    public set leftView(view: View | undefined) {
        _XTUITextField.xtr_setLeftViewObjectRef(view ? view.objectRef : "", this.objectRef);
    }

    public get leftViewMode(): TextFieldViewMode {
        return _XTUITextField.xtr_leftViewMode(this.objectRef);
    }

    public set leftViewMode(value: TextFieldViewMode) {
        _XTUITextField.xtr_setLeftViewModeObjectRef(value, this.objectRef);
    }

    public get rightView(): View | undefined {
        const ref = _XTUITextField.xtr_rightView(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new View(ref);
    }

    public set rightView(view: View | undefined) {
        _XTUITextField.xtr_setRightViewObjectRef(view ? view.objectRef : "", this.objectRef);
    }

    public get rightViewMode(): TextFieldViewMode {
        return _XTUITextField.xtr_rightViewMode(this.objectRef);
    }

    public set rightViewMode(value: TextFieldViewMode) {
        _XTUITextField.xtr_setRightViewModeObjectRef(value, this.objectRef);
    }

    public get allowAutocapitalization(): Boolean {
        return _XTUITextField.xtr_allowAutocapitalization(this.objectRef);
    }

    public set allowAutocapitalization(value: Boolean) {
        _XTUITextField.xtr_setAllowAutocapitalizationObjectRef(value, this.objectRef);
    }

    public get allowAutocorrection(): Boolean {
        return _XTUITextField.xtr_allowAutocorrection(this.objectRef);
    }

    public set allowAutocorrection(value: Boolean) {
        _XTUITextField.xtr_setAllowAutocorrectionObjectRef(value, this.objectRef);
    }

    public get allowSpellChecking(): Boolean {
        return _XTUITextField.xtr_allowSpellChecking(this.objectRef);
    }

    public set allowSpellChecking(value: Boolean) {
        _XTUITextField.xtr_setAllowSpellCheckingObjectRef(value, this.objectRef);
    }

    public get keyboardType(): KeyboardType {
        return _XTUITextField.xtr_keyboardType(this.objectRef);
    }

    public set keyboardType(value: KeyboardType) {
        _XTUITextField.xtr_setKeyboardTypeObjectRef(value, this.objectRef);
    }

    public get returnKeyType(): ReturnKeyType {
        return _XTUITextField.xtr_returnKeyType(this.objectRef);
    }

    public set returnKeyType(value: ReturnKeyType) {
        _XTUITextField.xtr_setReturnKeyTypeObjectRef(value, this.objectRef);
    }

    public get enablesReturnKeyAutomatically(): Boolean {
        return _XTUITextField.xtr_enablesReturnKeyAutomatically(this.objectRef);
    }

    public set enablesReturnKeyAutomatically(value: Boolean) {
        _XTUITextField.xtr_setEnablesReturnKeyAutomaticallyObjectRef(value, this.objectRef);
    }

    public get secureTextEntry(): Boolean {
        return _XTUITextField.xtr_secureTextEntry(this.objectRef);
    }

    public set secureTextEntry(value: Boolean) {
        _XTUITextField.xtr_setSecureTextEntryObjectRef(value, this.objectRef);
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
        _XTUITextField.xtr_focus(this.objectRef);
    }

    blur(): void {
        if (!this.handleShouldEndEditing()) { return }
        _XTUITextField.xtr_blur(this.objectRef);
    }

}
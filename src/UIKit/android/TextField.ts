/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero, RectMake } from '../interface/Rect';
import { Font } from './Font';
import { Color } from '../interface/Color';
import { TextAlignment } from '../interface/Label';
import { TextFieldViewMode, KeyboardType, ReturnKeyType } from '../interface/TextField';
import { Button } from './Button';
import { Image } from './ImageView';

export class TextField extends View {

    constructor(ref?: any) {
        super(ref || _XTUITextField)
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.TextField",
            text: this.text,
            font: this.font,
            textColor: this.textColor,
            textAlignment: this.textAlignment,
            placeholder: this.placeholder,
            placeholderColor: this.placeholderColor,
            clearsOnBeginEditing: this.clearsOnBeginEditing,
            editing: this.editing,
            clearButtonMode: this.clearButtonMode,
            leftView: this.leftView,
            leftViewMode: this.leftViewMode,
            rightView: this.rightView,
            rightViewMode: this.rightViewMode,
            allowAutocapitalization: this.allowAutocapitalization,
            allowAutocorrection: this.allowAutocorrection,
            allowSpellChecking: this.allowSpellChecking,
            keyboardType: this.keyboardType,
            returnKeyType: this.returnKeyType,
            enablesReturnKeyAutomatically: this.enablesReturnKeyAutomatically,
            secureTextEntry: this.secureTextEntry,
        }
    }

    public get text(): string {
        return _XTUITextField.xtr_text(this.objectRef);
    }

    public set text(value: string) {
        _XTUITextField.xtr_setText(value, this.objectRef);
    }

    public get font(): Font {
        return new Font(_XTUITextField.xtr_font(this.objectRef));
    }

    public set font(value: Font) {
        _XTUITextField.xtr_setFont(value.objectRef, this.objectRef);
    }

    public get textColor(): Color {
        return _XTUITextField.xtr_textColor(this.objectRef);
    }

    public set textColor(value: Color) {
        _XTUITextField.xtr_setTextColor(value, this.objectRef);
    }

    public get textAlignment(): TextAlignment {
        return _XTUITextField.xtr_textAlignment(this.objectRef);
    }

    public set textAlignment(value: TextAlignment) {
        _XTUITextField.xtr_setTextAlignment(value, this.objectRef);
    }

    public get placeholder(): string {
        return _XTUITextField.xtr_placeholder(this.objectRef);
    }

    public set placeholder(value: string) {
        _XTUITextField.xtr_setPlaceholder(value, this.objectRef);
    }

    public get placeholderColor(): Color {
        return _XTUITextField.xtr_placeholderColor(this.objectRef);
    }

    public set placeholderColor(value: Color) {
        _XTUITextField.xtr_setPlaceholderColor(value, this.objectRef);
    }

    public get clearsOnBeginEditing(): Boolean {
        return _XTUITextField.xtr_clearsOnBeginEditing(this.objectRef);
    }

    public set clearsOnBeginEditing(value: Boolean) {
        _XTUITextField.xtr_setClearsOnBeginEditing(value, this.objectRef);
    }

    public get editing(): Boolean {
        return _XTUITextField.xtr_editing(this.objectRef);
    }

    requestClearView(): String {
        const view = new Button()
        view.frame = RectMake(0, 0, 36, 44)
        view.image = Image.fromBase64('iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABjUExURUdwTKqqqo+OlZGRto+OlZOTmY+OlY+OlJCQlpCQlZGOlpGRnZCQmY+OlJCOlJCOlI+OlI+OlJCOlI+OlJCOlI+OlI+PlI+OlI+OlI+OlI+PlI+OlP///4+OlI+PlY+PlI+OlI/lPb8AAAAgdFJOUwAG4AfzLcP7VS5mFR7Zob+l/Y/eiPd89vXum/AB+HuJvx1C8wAAASxJREFUOMuVlUeigzAMRAWYXkMnEKL7n/LzaRaOKZoVwm+hMpYBjrLHLI2FiNNstOFCdl4gUZGf0VHyQkWvJNKARvlBjarSUMnQwRM54ZH0TTyV6R9IgRcShA1NvJS552A4eCNnq+2LtyrXflb3aLX0N5F/mp6ed638TuZpyhm9rSFwt8ANwHrLuf3PON/D1ppCb2VdbwqsZj/Mp1A6pJvzWdiZhEEmVEzdJ8kFO7uQEJBDH2oSrYDn7h/ksIYMNayGxAxS1LAaElOI8YRVSIxB9dTGqiQKDspIgFEWo1mPRzA+H6xN7dL/2AU6ahdiwubXhO3BhAdrA7X2oFqbXpi2ozX3jXJhIPo8voaMy81ZGYxFxFlvnKXJWcWcBc95NliP0VJfvT1xtVIN/AEiR40jdo0zSQAAAABJRU5ErkJggg==', 3.0)
        view.onTap = () => {
            _XTUITextField.xtr_onClearButtonTap(this.objectRef)
        }
        return view.objectRef
    }

    public get clearButtonMode(): TextFieldViewMode {
        return _XTUITextField.xtr_clearButtonMode(this.objectRef);
    }

    public set clearButtonMode(value: TextFieldViewMode) {
        _XTUITextField.xtr_setClearButtonMode(value, this.objectRef);
    }

    public get leftView(): View | undefined {
        const viewRef = _XTUITextField.xtr_leftView(this.objectRef)
        if (typeof viewRef !== "string") { return undefined }
        return new View(viewRef);
    }

    public set leftView(view: View | undefined) {
        _XTUITextField.xtr_setLeftView(view ? view.objectRef : "", this.objectRef);
    }

    public get leftViewMode(): TextFieldViewMode {
        return _XTUITextField.xtr_leftViewMode(this.objectRef);
    }

    public set leftViewMode(value: TextFieldViewMode) {
        _XTUITextField.xtr_setLeftViewMode(value, this.objectRef);
    }

    public get rightView(): View | undefined {
        const viewRef = _XTUITextField.xtr_rightView(this.objectRef)
        if (typeof viewRef !== "string") { return undefined }
        return new View(viewRef);
    }

    public set rightView(view: View | undefined) {
        _XTUITextField.xtr_setRightView(view ? view.objectRef : "", this.objectRef);
    }

    public get rightViewMode(): TextFieldViewMode {
        return _XTUITextField.xtr_rightViewMode(this.objectRef, this.objectRef);
    }

    public set rightViewMode(value: TextFieldViewMode) {
        _XTUITextField.xtr_setRightViewMode(value, this.objectRef);
    }

    public get allowAutocapitalization(): Boolean {
        return _XTUITextField.xtr_allowAutocapitalization(this.objectRef);
    }

    public set allowAutocapitalization(value: Boolean) {
        _XTUITextField.xtr_setAllowAutocapitalization(value, this.objectRef);
    }

    public get allowAutocorrection(): Boolean {
        return _XTUITextField.xtr_allowAutocorrection(this.objectRef);
    }

    public set allowAutocorrection(value: Boolean) {
        _XTUITextField.xtr_setAllowAutocorrection(value, this.objectRef);
    }

    public get allowSpellChecking(): Boolean {
        return _XTUITextField.xtr_allowSpellChecking(this.objectRef);
    }

    public set allowSpellChecking(value: Boolean) {
        _XTUITextField.xtr_setAllowSpellChecking(value, this.objectRef);
    }

    public get keyboardType(): KeyboardType {
        return _XTUITextField.xtr_keyboardType(this.objectRef);
    }

    public set keyboardType(value: KeyboardType) {
        _XTUITextField.xtr_setKeyboardType(value, this.objectRef);
    }

    public get returnKeyType(): ReturnKeyType {
        return _XTUITextField.xtr_returnKeyType(this.objectRef);
    }

    public set returnKeyType(value: ReturnKeyType) {
        _XTUITextField.xtr_setReturnKeyType(value, this.objectRef);
    }

    public get enablesReturnKeyAutomatically(): Boolean {
        return false
    }

    public set enablesReturnKeyAutomatically(value: Boolean) { }

    public get secureTextEntry(): Boolean {
        return _XTUITextField.xtr_secureTextEntry(this.objectRef);
    }

    public set secureTextEntry(value: Boolean) {
        if (value) {
            this.allowAutocapitalization = false
            this.allowAutocorrection = false
            this.allowSpellChecking = false
        }
        _XTUITextField.xtr_setSecureTextEntry(value, this.objectRef);
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
        _XTUITextField.xtr_blur(this.objectRef);
    }

}
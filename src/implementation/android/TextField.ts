/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero, RectMake } from '../../interface/Rect';
import { Font } from './Font';
import { Color } from '../../interface/Color';
import { TextAlignment } from '../../interface/Label';
import { TextFieldViewMode, KeyboardType, ReturnKeyType } from '../../interface/TextField';
import { Button } from './Button';
import { Image } from './ImageView';

export class TextField extends View {

    constructor(ref?: any) {
        super(ref || XTRTextField)
    }

    public get text(): string {
        return XTRTextField.xtr_text(this.objectRef);
    }

    public set text(value: string) {
        XTRTextField.xtr_setText(value, this.objectRef);
    }

    public get font(): Font {
        return new Font(XTRTextField.xtr_font(this.objectRef));
    }

    public set font(value: Font) {
        XTRTextField.xtr_setFont(value.objectRef, this.objectRef);
    }

    public get textColor(): Color {
        return XTRTextField.xtr_textColor(this.objectRef);
    }

    public set textColor(value: Color) {
        XTRTextField.xtr_setTextColor(value, this.objectRef);
    }

    public get textAlignment(): TextAlignment {
        return XTRTextField.xtr_textAlignment(this.objectRef);
    }

    public set textAlignment(value: TextAlignment) {
        XTRTextField.xtr_setTextAlignment(value, this.objectRef);
    }

    public get placeholder(): string {
        return XTRTextField.xtr_placeholder(this.objectRef);
    }

    public set placeholder(value: string) {
        XTRTextField.xtr_setPlaceholder(value, this.objectRef);
    }

    public get placeholderColor(): Color {
        return XTRTextField.xtr_placeholderColor(this.objectRef);
    }

    public set placeholderColor(value: Color) {
        XTRTextField.xtr_setPlaceholderColor(value, this.objectRef);
    }

    public get clearsOnBeginEditing(): Boolean {
        return XTRTextField.xtr_clearsOnBeginEditing(this.objectRef);
    }

    public set clearsOnBeginEditing(value: Boolean) {
        XTRTextField.xtr_setClearsOnBeginEditing(value, this.objectRef);
    }

    public get editing(): Boolean {
        return XTRTextField.xtr_editing(this.objectRef);
    }

    requestClearView(): String {
        const view = new Button()
        view.frame = RectMake(0, 0, 36, 0)
        Image.fromBase64('iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABjUExURUdwTKqqqo+OlZGRto+OlZOTmY+OlY+OlJCQlpCQlZGOlpGRnZCQmY+OlJCOlJCOlI+OlI+OlJCOlI+OlJCOlI+OlI+PlI+OlI+OlI+OlI+PlI+OlP///4+OlI+PlY+PlI+OlI/lPb8AAAAgdFJOUwAG4AfzLcP7VS5mFR7Zob+l/Y/eiPd89vXum/AB+HuJvx1C8wAAASxJREFUOMuVlUeigzAMRAWYXkMnEKL7n/LzaRaOKZoVwm+hMpYBjrLHLI2FiNNstOFCdl4gUZGf0VHyQkWvJNKARvlBjarSUMnQwRM54ZH0TTyV6R9IgRcShA1NvJS552A4eCNnq+2LtyrXflb3aLX0N5F/mp6ed638TuZpyhm9rSFwt8ANwHrLuf3PON/D1ppCb2VdbwqsZj/Mp1A6pJvzWdiZhEEmVEzdJ8kFO7uQEJBDH2oSrYDn7h/ksIYMNayGxAxS1LAaElOI8YRVSIxB9dTGqiQKDspIgFEWo1mPRzA+H6xN7dL/2AU6ahdiwubXhO3BhAdrA7X2oFqbXpi2ozX3jXJhIPo8voaMy81ZGYxFxFlvnKXJWcWcBc95NliP0VJfvT1xtVIN/AEiR40jdo0zSQAAAABJRU5ErkJggg==', 3.0, (it) => {
            view.image = it
        })
        view.onTap = () => {
            XTRTextField.xtr_onClearButtonTap(this.objectRef)
        }
        return view.objectRef
    }

    public get clearButtonMode(): TextFieldViewMode {
        return XTRTextField.xtr_clearButtonMode(this.objectRef);
    }

    public set clearButtonMode(value: TextFieldViewMode) {
        XTRTextField.xtr_setClearButtonMode(value, this.objectRef);
    }

    public get leftView(): View | undefined {
        const viewRef = XTRTextField.xtr_leftView(this.objectRef)
        if (typeof viewRef !== "string") { return undefined }
        return new View(viewRef);
    }

    public set leftView(view: View | undefined) {
        XTRTextField.xtr_setLeftView(view ? view.objectRef : "", this.objectRef);
    }

    public get leftViewMode(): TextFieldViewMode {
        return XTRTextField.xtr_leftViewMode(this.objectRef);
    }

    public set leftViewMode(value: TextFieldViewMode) {
        XTRTextField.xtr_setLeftViewMode(value, this.objectRef);
    }

    public get rightView(): View | undefined {
        const viewRef = XTRTextField.xtr_rightView(this.objectRef)
        if (typeof viewRef !== "string") { return undefined }
        return new View(viewRef);
    }

    public set rightView(view: View | undefined) {
        XTRTextField.xtr_setRightView(view ? view.objectRef : "", this.objectRef);
    }

    public get rightViewMode(): TextFieldViewMode {
        return XTRTextField.xtr_rightViewMode(this.objectRef, this.objectRef);
    }

    public set rightViewMode(value: TextFieldViewMode) {
        XTRTextField.xtr_setRightViewMode(value, this.objectRef);
    }

    public get allowAutocapitalization(): Boolean {
        return XTRTextField.xtr_allowAutocapitalization(this.objectRef);
    }

    public set allowAutocapitalization(value: Boolean) {
        XTRTextField.xtr_setAllowAutocapitalization(value, this.objectRef);
    }

    public get allowAutocorrection(): Boolean {
        return XTRTextField.xtr_allowAutocorrection(this.objectRef);
    }

    public set allowAutocorrection(value: Boolean) {
        XTRTextField.xtr_setAllowAutocorrection(value, this.objectRef);
    }

    public get allowSpellChecking(): Boolean {
        return XTRTextField.xtr_allowSpellChecking(this.objectRef);
    }

    public set allowSpellChecking(value: Boolean) {
        XTRTextField.xtr_setAllowSpellChecking(value, this.objectRef);
    }

    public get keyboardType(): KeyboardType {
        return XTRTextField.xtr_keyboardType(this.objectRef);
    }

    public set keyboardType(value: KeyboardType) {
        XTRTextField.xtr_setKeyboardType(value, this.objectRef);
    }

    public get returnKeyType(): ReturnKeyType {
        return XTRTextField.xtr_returnKeyType(this.objectRef);
    }

    public set returnKeyType(value: ReturnKeyType) {
        XTRTextField.xtr_setReturnKeyType(value, this.objectRef);
    }

    public get enablesReturnKeyAutomatically(): Boolean {
        return false
    }

    public set enablesReturnKeyAutomatically(value: Boolean) { }

    public get secureTextEntry(): Boolean {
        return XTRTextField.xtr_secureTextEntry(this.objectRef);
    }

    public set secureTextEntry(value: Boolean) {
        if (value) {
            this.allowAutocapitalization = false
            this.allowAutocorrection = false
            this.allowSpellChecking = false
        }
        XTRTextField.xtr_setSecureTextEntry(value, this.objectRef);
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
        XTRTextField.xtr_focus(this.objectRef);
    }

    blur(): void {
        XTRTextField.xtr_blur(this.objectRef);
    }

}
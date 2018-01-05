/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero, RectMake } from '../../interface/Rect';
import { Font } from '../../interface/Font';
import { Color } from '../../interface/Color';
import { TextAlignment } from '../../interface/Label';
import { TextFieldViewMode, KeyboardType, ReturnKeyType } from '../../interface/TextField';
import { Button } from './Button';
import { Image } from './ImageView';
import { TextFieldElement } from './element/TextField';
import { Touchable, Touch, Event, TouchManager } from '../libraries/touch/TouchManager';
import { WindowElement } from './element/Window';

export class TextField extends View {

    nativeObject: any;

    constructor() {
        super(TextFieldElement)
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
        if (this.nativeObject.selectObject !== undefined) {
            WindowElement._allowDefault = true;
        }
    }

    touchesMoved(touches: Touch[], event: Event): void {
        super.touchesMoved(touches, event);
        if (this.editing) {
            if (this._touchingClearView) {
                WindowElement._allowDefault = false;
            }
            else {
                WindowElement._allowDefault = true;
            }
        }
    }

    touchesEnded(touches: Touch[], event: Event): void {
        super.touchesEnded(touches, event);
        if (this.editing) {
            if (this._touchedClearView) {
                WindowElement._allowDefault = false;
            }
            else {
                WindowElement._allowDefault = true;
            }
        }
    }

    public get text(): string {
        return this.nativeObject.xtr_text();
    }

    public set text(value: string) {
        this.nativeObject.xtr_setText(value);
    }

    public get font(): Font {
        return this.nativeObject.xtr_font();
    }

    public set font(value: Font) {
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

    public get placeholder(): string {
        return this.nativeObject.xtr_placeholder();
    }

    public set placeholder(value: string) {
        this.nativeObject.xtr_setPlaceholder(value);
    }

    public get placeholderColor(): Color {
        return this.nativeObject.xtr_placeholderColor();
    }

    public set placeholderColor(value: Color) {
        this.nativeObject.xtr_setPlaceholderColor(value);
    }

    public get clearsOnBeginEditing(): Boolean {
        return this.nativeObject.xtr_clearsOnBeginEditing();
    }

    public set clearsOnBeginEditing(value: Boolean) {
        this.nativeObject.xtr_setClearsOnBeginEditing(value);
    }

    public get editing(): Boolean {
        return this.nativeObject.xtr_editing();
    }

    private _clearView: View | undefined;
    private _touchingClearView = false;
    private _touchedClearView = false;

    private addClearView() {
        if (this._clearView === undefined) {
            const view = new Button()
            view.frame = RectMake(0, 0, 36, 0)
            Image.fromBase64('iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABjUExURUdwTKqqqo+OlZGRto+OlZOTmY+OlY+OlJCQlpCQlZGOlpGRnZCQmY+OlJCOlJCOlI+OlI+OlJCOlI+OlJCOlI+OlI+PlI+OlI+OlI+OlI+PlI+OlP///4+OlI+PlY+PlI+OlI/lPb8AAAAgdFJOUwAG4AfzLcP7VS5mFR7Zob+l/Y/eiPd89vXum/AB+HuJvx1C8wAAASxJREFUOMuVlUeigzAMRAWYXkMnEKL7n/LzaRaOKZoVwm+hMpYBjrLHLI2FiNNstOFCdl4gUZGf0VHyQkWvJNKARvlBjarSUMnQwRM54ZH0TTyV6R9IgRcShA1NvJS552A4eCNnq+2LtyrXflb3aLX0N5F/mp6ed638TuZpyhm9rSFwt8ANwHrLuf3PON/D1ppCb2VdbwqsZj/Mp1A6pJvzWdiZhEEmVEzdJ8kFO7uQEJBDH2oSrYDn7h/ksIYMNayGxAxS1LAaElOI8YRVSIxB9dTGqiQKDspIgFEWo1mPRzA+H6xN7dL/2AU6ahdiwubXhO3BhAdrA7X2oFqbXpi2ozX3jXJhIPo8voaMy81ZGYxFxFlvnKXJWcWcBc95NliP0VJfvT1xtVIN/AEiR40jdo0zSQAAAABJRU5ErkJggg==', 3.0, (it) => {
                view.image = it
            })
            view.onHighlighted = (highlighted) => {
                this._touchingClearView = highlighted
            }
            view.onTouchUpInside = () => {
                this._touchedClearView = true;
                setTimeout(() => { this._touchedClearView = false }, 500)
                this.nativeObject.xtr_onClearButtonTap()
            }
            this.addSubview(view)
            this._clearView = view;
            this.nativeObject.resetContentRects();
            this.nativeObject.resetFieldViewOpacity();
        }
    }

    public get clearButtonMode(): TextFieldViewMode {
        return this.nativeObject.xtr_clearButtonMode();
    }

    public set clearButtonMode(value: TextFieldViewMode) {
        this.nativeObject.xtr_setClearButtonMode(value);
        this.addClearView();
    }

    private _leftView: View | undefined;

    public get leftView(): View | undefined {
        return this._leftView;
    }

    public set leftView(view: View | undefined) {
        if (this._leftView) {
            this._leftView.removeFromSuperview();
        }
        this._leftView = view;
        if (this._leftView) {
            this.addSubview(this._leftView);
            this.nativeObject.xtr_setLeftViewWidth(this._leftView.frame.width);
        }
        else {
            this.nativeObject.xtr_setLeftViewWidth(0);
        }
    }

    public get leftViewMode(): TextFieldViewMode {
        return this.nativeObject.xtr_leftViewMode();
    }

    public set leftViewMode(value: TextFieldViewMode) {
        this.nativeObject.xtr_setLeftViewMode(value);
    }

    private _rightView: View | undefined;

    public get rightView(): View | undefined {
        return this._rightView;
    }

    public set rightView(view: View | undefined) {
        if (this._rightView) {
            this._rightView.removeFromSuperview();
        }
        this._rightView = view;
        if (this._rightView) {
            this.addSubview(this._rightView);
            this.nativeObject.xtr_setRightViewWidth(this._rightView.frame.width);
        }
        else {
            this.nativeObject.xtr_setRightViewWidth(0);
        }
    }

    public get rightViewMode(): TextFieldViewMode {
        return this.nativeObject.xtr_rightViewMode();
    }

    public set rightViewMode(value: TextFieldViewMode) {
        this.nativeObject.xtr_setRightViewMode(value);
    }

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

    public get enablesReturnKeyAutomatically(): Boolean {
        return false
    }

    public set enablesReturnKeyAutomatically(value: Boolean) { }

    public get secureTextEntry(): Boolean {
        return this.nativeObject.xtr_secureTextEntry;
    }

    public set secureTextEntry(value: Boolean) {
        this.nativeObject.xtr_setSecureTextEntry(value);
    }

    shouldBeginEditing?: () => Boolean = undefined
    didBeginEditing?: () => void = undefined
    shouldEndEditing?: () => Boolean = undefined
    didEndEditing?: () => void = undefined
    shouldChange?: (inRange: { location: number, length: number }, replacementString: string) => Boolean = undefined
    shouldClear?: () => Boolean = undefined
    shouldReturn?: () => Boolean = undefined

    focus(): void {
        this.nativeObject.xtr_focus();
    }

    blur(): void {
        this.nativeObject.xtr_blur();
    }

    // Private Methods

    private setOptions(options: string[], defaultValue: string = "") {
        this.nativeObject.setOptions(options, defaultValue)
    }

}
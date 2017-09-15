/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero } from '../../interface/Rect';
import { Font } from '../../interface/Font';
import { Color } from '../../interface/Color';
import { TextAlignment } from '../../interface/Label';
import { TextFieldViewMode, KeyboardType, ReturnKeyType } from '../../interface/TextField';

export class TextView extends View {

    nativeObject: any;

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        super(undefined, undefined, true)
        if (_isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.nativeObject = XTRTextView.createScriptObject(rect || RectZero, this);
            (window as any).XTRObjCreater.store(this);
            this.init();
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
        return this.nativeObject.xtr_enablesReturnKeyAutomatically();
    }

    public set enablesReturnKeyAutomatically(value: Boolean) {
        this.nativeObject.xtr_setEnablesReturnKeyAutomatically(value);
    }

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
        this.nativeObject.xtr_focus();
    }

    blur(): void {
        if (!this.handleShouldEndEditing()) { return }
        this.nativeObject.xtr_blur();
    }

}

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.constructor.toString() === "[object XTRTextViewConstructor]") {
        return new TextView(undefined, view);
    }
    return undefined;
})
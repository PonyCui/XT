/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero } from "../../interface/Rect";
import { ViewController } from "./ViewController";

export class Window extends View {

    constructor(rect?: Rect, _isChild: boolean = false) {
        super(undefined, true)
        if (_isChild) { return; }
        this.objectRef = XTRWindow.createScriptObject(rect || RectZero, this);
        objectRefs[this.objectRef] = this;
        setImmediate(() => { this.init(); });
    }

    public get rootViewController(): ViewController | undefined {
        return this.nativeObject.xtr_rootViewController();
    }

    public set rootViewController(value: ViewController | undefined) {
        this.nativeObject.xtr_setRootViewController(value);
    }

    makeKeyAndVisible(): void {
        this.nativeObject.xtr_makeKeyAndVisible();
    }

    handleKeyboardShow(frame: Rect, duration: number) {
        this.rootViewController && this.rootViewController.keyboardWillShow(frame, duration)
    }

    handleKeyboardHide(duration: number) {
        this.rootViewController && this.rootViewController.keyboardWillHide(duration)
    }

    endEditing(): void {
        this.nativeObject.xtr_endEditing();
    }

}
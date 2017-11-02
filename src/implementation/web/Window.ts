/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero } from "../../interface/Rect";
import { ViewElement } from './element/View';
import { Application } from './Application';
// import { ViewController } from "./ViewController";

export class Window extends View {

    nativeObject: any;

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        super(undefined, undefined, true)
        if (_isChild) { return; }
        this.nativeObject = new ViewElement(rect || RectZero, this);
        setImmediate(() => { this.init(); });
    }

    // public get rootViewController(): ViewController | undefined {
    //     return this.nativeObject.xtr_rootViewController();
    // }

    // public set rootViewController(value: ViewController | undefined) {
    //     this.nativeObject.xtr_setRootViewController(value);
    //     (this as any).rootViewControllerRef = value;
    // }

    makeKeyAndVisible(): void {
        const application = Application.sharedApplication();
        if (application) {
            application.keyWindow = this;
        }
    }

    // handleKeyboardShow(frame: Rect, duration: number) {
    //     this.rootViewController && this.rootViewController.keyboardWillShow(frame, duration)
    // }

    // handleKeyboardHide(duration: number) {
    //     this.rootViewController && this.rootViewController.keyboardWillHide(duration)
    // }

    // endEditing(): void {
    //     this.nativeObject.xtr_endEditing();
    // }

}
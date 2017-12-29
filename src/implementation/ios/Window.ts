/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero } from "../../interface/Rect";
import { ViewController } from "./ViewController";

export class Window extends View {

    constructor(ref: any) {
        super(ref || XTRWindow)
    }

    public get rootViewController(): ViewController | undefined {
        return XTRWindow.xtr_rootViewController(this.objectRef);
    }

    public set rootViewController(value: ViewController | undefined) {
        XTRWindow.xtr_setRootViewControllerObjectRef(value, this.objectRef);
    }

    makeKeyAndVisible(): void {
        XTRWindow.xtr_makeKeyAndVisible(this.objectRef);
    }

    handleKeyboardShow(frame: Rect, duration: number) {
        this.rootViewController && this.rootViewController.keyboardWillShow(frame, duration)
    }

    handleKeyboardHide(duration: number) {
        this.rootViewController && this.rootViewController.keyboardWillHide(duration)
    }

    endEditing(): void {
        XTRWindow.xtr_endEditing(this.objectRef);
    }

}
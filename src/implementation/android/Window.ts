/// <reference path="xtr.d.ts" />
import { Rect, RectZero } from "../../interface/Rect";
import { View } from "./View";
import { ViewController } from "./ViewController";

export class Window extends View {

    nativeObject: any;

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        super(undefined, undefined, true)
        if (_isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.nativeObject = XTRWindow.createScriptObject(rect || RectZero, this);
            (window as any).XTRObjCreater.store(this);
            this.init();
        }
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

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.toString().indexOf("com.opensource.xtruntime.XTRWindow$InnerObject") === 0) {
        return new Window(undefined, view);
    }
    return undefined;
})
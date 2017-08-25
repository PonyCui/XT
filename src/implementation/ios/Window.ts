/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero } from "../../interface/Rect";
// import { ViewController } from "./ViewController";

export class Window extends View {

    nativeObject: any;

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        super(undefined, undefined, true)
        if (_isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
        }
        else {
            this.nativeObject = XTRWindow.createScriptObject(rect || RectZero, this);
        }
    }

    // rootViewController?: ViewController
    makeKeyAndVisible(): void {
        this.nativeObject.xtr_makeKeyAndVisible();
    }

}

if ((window as any).viewClasses === undefined) {
    (window as any).viewClasses = [];
}
(window as any).viewClasses.push((view: any) => {
    if (view.constructor.toString() === "[object XTRWindowConstructor]") {
        return new Window(undefined, view);
    }
    return undefined;
})
/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero } from "../../interface/Rect";
import { ViewController } from "./ViewController";

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
            (window as any).XTRObjCreater.store(this);
        }
    }

    public get rootViewController(): ViewController | undefined {
        return this.nativeObject.xtr_rootViewController();
    }

    public set rootViewController(value: ViewController | undefined) {
        this.nativeObject.xtr_setRootViewController(value);
        (this as any).rootViewControllerRef = value;
    }

    makeKeyAndVisible(): void {
        this.nativeObject.xtr_makeKeyAndVisible();
    }

}

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.constructor.toString() === "[object XTRWindowConstructor]") {
        return new Window(undefined, view);
    }
    return undefined;
})
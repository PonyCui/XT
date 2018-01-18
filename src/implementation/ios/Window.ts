/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero } from "../../interface/Rect";
import { ViewController } from "./ViewController";

export class Window extends View {

    constructor(ref: any) {
        super(ref || XTRWindow)
    }

    public get rootViewController(): ViewController | undefined {
        const ref = XTRWindow.xtr_rootViewController(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new ViewController(ref);
    }

    public set rootViewController(value: ViewController | undefined) {
        XTRWindow.xtr_setRootViewControllerObjectRef(value ? value.objectRef : "", this.objectRef);
    }

    makeKeyAndVisible(): void {
        XTRWindow.xtr_makeKeyAndVisible(this.objectRef);
    }

    endEditing(): void {
        XTRWindow.xtr_endEditing(this.objectRef);
    }

    public get firstResponder(): View | undefined {
        const ref = XTRWindow.xtr_firstResponder(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new View(ref)
    }

}

(window as any)._Window = Window
/// <reference path="xtr.d.ts" />
import { Rect, RectZero } from "../interface/Rect";
import { View } from "./View";
import { ViewController } from "./ViewController";
import { TouchManager } from "../libraries/touch/TouchManager";

export class Window extends View {

    constructor(ref: any) {
        super(ref || _XTUIWindow)
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.Window",
            rootViewController: this.rootViewController,
            firstResponder: this.firstResponder,
        }
    }

    public get bounds(): Rect {
        return _XTUIWindow.xtr_bounds(this.objectRef);
    }

    public get rootViewController(): ViewController | undefined {
        const vcRef = _XTUIWindow.xtr_rootViewController(this.objectRef)
        if (typeof vcRef !== "string") { return undefined }
        return new ViewController(vcRef)
    }

    public set rootViewController(value: ViewController | undefined) {
        if (value) {
            _XTUIWindow.xtr_setRootViewController(value.objectRef, this.objectRef)
        }
    }

    makeKeyAndVisible(): void {
        _XTUIWindow.xtr_makeKeyAndVisible(this.objectRef);
    }

    endEditing(): void {
        _XTUIWindow.xtr_endEditing(this.objectRef);
    }

    public get firstResponder(): View | undefined {
        const ref = _XTUIWindow.xtr_firstResponder(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new View(ref)
    }

}
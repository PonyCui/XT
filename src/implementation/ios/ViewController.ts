/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { Color } from "../../interface/Color";
import { Rect } from "../../interface/Rect";
import { DeviceOrientation } from "../../interface/Device";
import { Releasable } from "../../interface/Releasable";

export interface NavigationControllerInterface extends ViewController {
    pushViewController(viewController: ViewController, animated?: boolean): void
    popViewController(animated?: boolean): ViewController | undefined
    popToViewController(viewController: ViewController, animated?: boolean): ViewController[]
    popToRootViewController(animated?: boolean): ViewController[]
}

export class ViewController implements Releasable {

    retain(): this {
        XTMemoryManager_Retain(this.objectRef)
        return this
    }

    release(): this {
        XTMemoryManager_Release(this.objectRef)
        return this
    }
   
    protected objectRef: any;

    constructor(ref: string | Object | Function | undefined, ...args: any[]) {
        if (typeof ref === "string") {
            this.objectRef = ref;
            if (objectRefs[ref]) {
                objectRefs[ref] = this;
            }
        }
        else if (typeof ref === "function") {
            let args = [];
            for (let index = 0; index < arguments.length; index++) {
                if (index > 0) {
                    args.push(arguments[index])
                }
            }
            this.objectRef = ref.apply(this, args)
        }
        else if (typeof ref === "object") {
            this.objectRef = (ref as any).create()
        }
        else {
            this.objectRef = XTRViewController.create()
        }
    }

    init() { }

    public get view() {
        return XTRViewController.xtr_view(this.objectRef);
    }

    public set view(value: View) {
        XTRViewController.xtr_setViewObjectRef(value, this.objectRef);
    }

    loadView(): void {
        this.view = new View();
        this.view.backgroundColor = Color.whiteColor
        this.view.userInteractionEnabled = true;
    }

    viewDidLoad(): void { }
    viewWillAppear(): void { }
    viewDidAppear(): void { }
    viewWillDisappear(): void { }
    viewDidDisappear(): void { }
    viewWillLayoutSubviews(): void { }
    viewDidLayoutSubviews(): void { }

    public get parentViewController(): ViewController | undefined {
        return XTRViewController.xtr_parentViewController(this.objectRef);
    }

    public get childViewControllers(): ViewController[] {
        return XTRViewController.xtr_childViewControllers(this.objectRef);
    }

    addChildViewController(childController: ViewController): void {
        XTRViewController.xtr_addChildViewControllerObjectRef(childController, this.objectRef);
    }

    removeFromParentViewController(): void {
        XTRViewController.xtr_removeFromParentViewController(this.objectRef);
    }

    willMoveToParentViewController(parent?: ViewController): void { }
    didMoveToParentViewController(parent?: ViewController): void { }

    public get navigationController(): NavigationControllerInterface | undefined {
        const returnValue = XTRViewController.xtr_navigationController(this.objectRef);
        if (typeof returnValue === "string") {
            return new (window as any).XTRNavigationController(undefined, returnValue)
        }
        else {
            return returnValue;
        }
    }

    keyboardWillShow(frame: Rect, duration: number): void {
        this.childViewControllers.forEach(t => t.keyboardWillShow(frame, duration))
    }

    keyboardWillHide(duration: number): void {
        this.childViewControllers.forEach(t => t.keyboardWillHide(duration))
    }

    supportOrientations: DeviceOrientation[] = [DeviceOrientation.Portrait]

}
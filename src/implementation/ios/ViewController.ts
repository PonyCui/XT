/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { Color } from "../../interface/Color";
import { Rect } from "../../interface/Rect";
import { DeviceOrientation } from "../../interface/Device";

export interface NavigationControllerInterface extends ViewController {
    pushViewController(viewController: ViewController, animated?: boolean): void
    popViewController(animated?: boolean): ViewController | undefined
    popToViewController(viewController: ViewController, animated?: boolean): ViewController[]
    popToRootViewController(animated?: boolean): ViewController[]
}

export class ViewController {

    nativeObjectRef: any;

    public set nativeObject(value: any) { }

    public get nativeObject(): any {
        return xtrRequestNativeObject(this.nativeObjectRef);
    }

    constructor(isChild: boolean = false) {
        if (isChild) { return; }
        this.nativeObjectRef = XTRViewController.create(this);
        objectRefs[this.nativeObjectRef] = this;
        setImmediate(() => { this.init(); });
    }

    init() { }

    public get view() {
        return this.nativeObject.xtr_view();
    }

    public set view(value: View) {
        this.nativeObject.xtr_setView(value);
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
        return this.nativeObject.xtr_parentViewController();
    }

    public get childViewControllers(): ViewController[] {
        return this.nativeObject.xtr_childViewControllers();
    }

    addChildViewController(childController: ViewController): void {
        this.nativeObject.xtr_addChildViewController(childController);
    }

    removeFromParentViewController(): void {
        this.nativeObject.xtr_removeFromParentViewController();
    }

    willMoveToParentViewController(parent?: ViewController): void { }
    didMoveToParentViewController(parent?: ViewController): void { }

    public get navigationController(): NavigationControllerInterface | undefined {
        return this.nativeObject.xtr_navigationController();
    }

    keyboardWillShow(frame: Rect, duration: number): void {
        this.childViewControllers.forEach(t => t.keyboardWillShow(frame, duration))
    }

    keyboardWillHide(duration: number): void {
        this.childViewControllers.forEach(t => t.keyboardWillHide(duration))
    }

    supportOrientations: DeviceOrientation[] = [DeviceOrientation.Portrait]

}
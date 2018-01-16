/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { NavigationBar } from './NavigationBar';
import { Color } from "../../interface/Color";
import { Rect, InsetsMake, Insets } from "../../interface/Rect";
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

    public objectRef: any;

    constructor(ref: string | Object | Function | undefined, ...args: any[]) {
        if (typeof ref === "string") {
            if (objectRefs[ref]) {
                return objectRefs[ref]
            }
            this.objectRef = ref;
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
        objectRefs[this.objectRef] = this;
    }

    private _title: string = ""

    public get title(): string {
        return this._title
    }

    public set title(value: string) {
        this._title = value
        this.navigationBar.title = value
    }

    public get view() {
        return new View(XTRViewController.xtr_view(this.objectRef));
    }

    public set view(value: View) {
        XTRViewController.xtr_setViewObjectRef(value.objectRef, this.objectRef);
    }

    public get safeAreaInsets(): Insets {
        return XTRViewController.xtr_safeAreaInsets(this.objectRef);
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
        const ref = XTRViewController.xtr_parentViewController(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new ViewController(ref);
    }

    public get childViewControllers(): ViewController[] {
        return XTRViewController.xtr_childViewControllers(this.objectRef).map((ref: string) => {
            return new ViewController(ref)
        });
    }

    addChildViewController(childController: ViewController): void {
        XTRViewController.xtr_addChildViewControllerObjectRef(childController.objectRef, this.objectRef);
    }

    removeFromParentViewController(): void {
        XTRViewController.xtr_removeFromParentViewController(this.objectRef);
    }

    _willMoveToParentViewController(parent?: string): void {
        this.willMoveToParentViewController(
            typeof parent === "string" ? new ViewController(parent) : undefined
        )
    }

    willMoveToParentViewController(parent?: ViewController): void { }

    _didMoveToParentViewController(parent?: string): void {
        this.didMoveToParentViewController(
            typeof parent === "string" ? new ViewController(parent) : undefined
        )
    }

    didMoveToParentViewController(parent?: ViewController): void { }

    public get navigationController(): NavigationControllerInterface | undefined {
        const ref = XTRViewController.xtr_navigationController(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new (window as any)._NavigationControllerInterface(undefined, ref)
    }

    keyboardWillShow(frame: Rect, duration: number): void {
        this.childViewControllers.forEach(t => t.keyboardWillShow(frame, duration))
    }

    keyboardWillHide(duration: number): void {
        this.childViewControllers.forEach(t => t.keyboardWillHide(duration))
    }

    supportOrientations: DeviceOrientation[] = [DeviceOrientation.Portrait]

    public set navigationBar(value: NavigationBar) {
        XTRViewController.xtr_setNavigationBarObjectRef(value.objectRef, this.objectRef)
    }

    public get navigationBar(): NavigationBar {
        let ref = XTRViewController.xtr_navigationBar(this.objectRef)
        if (typeof ref !== "string") {
            this.navigationBar = new NavigationBar();
            ref = XTRViewController.xtr_navigationBar(this.objectRef)
        }
        return new NavigationBar(ref)
    }

    showNavigationBar(animated: boolean = false): void {
        if (this.navigationBar === undefined) {
            this.navigationBar = new NavigationBar()
        }
        XTRViewController.xtr_showNavigationBarObjectRef(animated, this.objectRef)
    }

    hideNavigationBar(animated: boolean = false): void {
        XTRViewController.xtr_hideNavigationBar(animated, this.objectRef)
    }

}
/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { Rect, RectMake } from "../../interface/Rect";
import { Color } from "../../interface/Color";
import { DeviceOrientation } from "../../interface/Device";
import { Device } from "./Device";
import { TransformMatrix } from "../../interface/TransformMatrix";
import { Releasable } from "../../interface/Releasable";

export interface NavigationControllerInterface extends ViewController {
    pushViewController(viewController: ViewController, animated?: boolean): void
    popViewController(animated?: boolean): ViewController | undefined
    popToViewController(viewController: ViewController, animated?: boolean): ViewController[]
    popToRootViewController(animated?: boolean): ViewController[]
}

export class ViewController implements Releasable {

    retain(): this {
        XTMemoryManager.retain(this.objectRef)
        return this
    }

    release(): this {
        XTMemoryManager.release(this.objectRef)
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
        this.loadView()
    }

    public get view() {
        return new View(XTRViewController.xtr_view(this.objectRef));
    }

    public set view(value: View) {
        XTRViewController.xtr_setView(value.objectRef, this.objectRef);
    }

    loadView(): void {
        const view = new View();
        view.backgroundColor = Color.whiteColor
        view.userInteractionEnabled = true;
        this.view = view;
    }

    viewDidLoad(): void { }
    viewWillAppear(): void { this.childViewControllers.map(v => v.viewWillAppear()) }
    viewDidAppear(): void { this.childViewControllers.map(v => v.viewDidAppear()) }
    viewWillDisappear(): void { this.childViewControllers.map(v => v.viewWillDisappear()) }
    viewDidDisappear(): void { this.childViewControllers.map(v => v.viewDidDisappear()) }
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
        XTRViewController.xtr_addChildViewController(childController.objectRef, this.objectRef);
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

    // public get navigationController(): NavigationControllerInterface | undefined {
    //     return this.nativeObject.xtr_navigationController();
    // }

    // keyboardWillShow(frame: Rect, duration: number): void {
    //     this.childViewControllers.slice().forEach(t => t.keyboardWillShow(frame, duration))
    // }

    // keyboardWillHide(duration: number): void {
    //     this.childViewControllers.slice().forEach(t => t.keyboardWillHide(duration))
    // }

    // supportOrientations: DeviceOrientation[] = [DeviceOrientation.Portrait]

    // orientationDidChange(sender: any) {
    //     this.childViewControllers.slice().forEach(t => t.orientationDidChange(sender))
    //     if (this.supportOrientations.indexOf(Device.current.orientation) >= 0) {
    //         if (this.parentViewController && (this.parentViewController as any).className === "NavigationController") {
    //             if (Device.current.orientation === DeviceOrientation.Portrait) {
    //                 if (!this.parentViewController) { return; }
    //                 const superViewFrame = this.parentViewController.view.frame;
    //                 this.view.frame = RectMake(0, 0, superViewFrame.width, superViewFrame.height)
    //                 this.view.transform = new TransformMatrix()
    //                 sender.handleStatusBarHidden && sender.handleStatusBarHidden(false);
    //             }
    //             else if (Device.current.orientation === DeviceOrientation.LandscapeLeft) {
    //                 sender.handleStatusBarHidden && sender.handleStatusBarHidden(true);
    //                 setTimeout(() => {
    //                     if (!this.parentViewController) { return; }
    //                     const superViewFrame = this.parentViewController.view.frame;
    //                     View.animationWithBouncinessAndSpeed(1.0, 8.0, () => {
    //                         this.view.frame = RectMake((superViewFrame.width - superViewFrame.height) / 2.0, (superViewFrame.height - superViewFrame.width) / 2.0, superViewFrame.height, superViewFrame.width)
    //                         this.view.transform = TransformMatrix.postRotate(new TransformMatrix(), -90 * Math.PI / 180)
    //                     });
    //                 }, 500)
    //             }
    //             else if (Device.current.orientation === DeviceOrientation.LandscapeRight) {
    //                 sender.handleStatusBarHidden && sender.handleStatusBarHidden(true);
    //                 setTimeout(() => {
    //                     if (!this.parentViewController) { return; }
    //                     const superViewFrame = this.parentViewController.view.frame;
    //                     View.animationWithBouncinessAndSpeed(1.0, 8.0, () => {
    //                         this.view.frame = RectMake((superViewFrame.width - superViewFrame.height) / 2.0, (superViewFrame.height - superViewFrame.width) / 2.0, superViewFrame.height, superViewFrame.width)
    //                         this.view.transform = TransformMatrix.postRotate(new TransformMatrix(), 90 * Math.PI / 180)
    //                     });
    //                 }, 500)
    //             }
    //         }
    //     }
    // }

}
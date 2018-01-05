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
        throw new Error("Method not implemented.");
    }
    release(): this {
        throw new Error("Method not implemented.");
    }

    addOwner(owner: any): this {
        return this;
    }

    nativeObject: any;

    public get objectUUID(): string {
        return "" + this.nativeObject.objectUUID
    }

    constructor(nativeObject?: any, isChild: boolean = false) {
        if (isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.nativeObject = XTRViewController.createScriptObject(this);
            (window as any).XTRObjCreater.store(this);
            this.loadView();
        }
    }

    public get view() {
        return this.nativeObject.xtr_view();
    }

    public set view(value: View) {
        this.nativeObject.xtr_setView(value);
        (this as any).viewRef = value;
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
        return this.nativeObject.xtr_parentViewController();
    }

    public get childViewControllers(): ViewController[] {
        const value = this.nativeObject.xtr_childViewControllers()
        let arr = [];
        for (let index = 0; index < value.length; index++) {
            arr.push(value[index]);
        }
        return arr;
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
        this.childViewControllers.slice().forEach(t => t.keyboardWillShow(frame, duration))
    }

    keyboardWillHide(duration: number): void {
        this.childViewControllers.slice().forEach(t => t.keyboardWillHide(duration))
    }

    supportOrientations: DeviceOrientation[] = [DeviceOrientation.Portrait]

    orientationDidChange(sender: any) {
        this.childViewControllers.slice().forEach(t => t.orientationDidChange(sender))
        if (this.supportOrientations.indexOf(Device.current.orientation) >= 0) {
            if (this.parentViewController && (this.parentViewController as any).className === "NavigationController") {
                if (Device.current.orientation === DeviceOrientation.Portrait) {
                    if (!this.parentViewController) { return; }
                    const superViewFrame = this.parentViewController.view.frame;
                    this.view.frame = RectMake(0, 0, superViewFrame.width, superViewFrame.height)
                    this.view.transform = new TransformMatrix()
                    sender.handleStatusBarHidden && sender.handleStatusBarHidden(false);
                }
                else if (Device.current.orientation === DeviceOrientation.LandscapeLeft) {
                    sender.handleStatusBarHidden && sender.handleStatusBarHidden(true);
                    setTimeout(() => {
                        if (!this.parentViewController) { return; }
                        const superViewFrame = this.parentViewController.view.frame;
                        View.animationWithBouncinessAndSpeed(1.0, 8.0, () => {
                            this.view.frame = RectMake((superViewFrame.width - superViewFrame.height) / 2.0, (superViewFrame.height - superViewFrame.width) / 2.0, superViewFrame.height, superViewFrame.width)
                            this.view.transform = TransformMatrix.postRotate(new TransformMatrix(), -90 * Math.PI / 180)
                        });
                    }, 500)
                }
                else if (Device.current.orientation === DeviceOrientation.LandscapeRight) {
                    sender.handleStatusBarHidden && sender.handleStatusBarHidden(true);
                    setTimeout(() => {
                        if (!this.parentViewController) { return; }
                        const superViewFrame = this.parentViewController.view.frame;
                        View.animationWithBouncinessAndSpeed(1.0, 8.0, () => {
                            this.view.frame = RectMake((superViewFrame.width - superViewFrame.height) / 2.0, (superViewFrame.height - superViewFrame.width) / 2.0, superViewFrame.height, superViewFrame.width)
                            this.view.transform = TransformMatrix.postRotate(new TransformMatrix(), 90 * Math.PI / 180)
                        });
                    }, 500)
                }
            }
        }
    }

}

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((target: any) => {
    if (target.toString().indexOf("com.opensource.xtruntime.XTRViewController$InnerObject") === 0) {
        return new ViewController(target);
    }
    return undefined;
})
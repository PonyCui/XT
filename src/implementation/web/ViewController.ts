/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { Rect, RectMake } from "../../interface/Rect";
import { Color } from "../../interface/Color";
import { DeviceOrientation } from "../../interface/Device";
// import { Device } from "./Device";
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
        return this
    }

    vcID: string = performance.now().toString();

    title?: string = undefined

    constructor() {
        this.loadView()
    }

    private _view: View

    public get view(): View {
        if (this._view === undefined) {
            this.loadView();
        }
        return this._view;
    }

    public set view(value: View) {
        if (this._view === undefined) {
            this._view = value;
            this._view.viewDelegate = this;
            this.viewDidLoad();
        }
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

    private _parentViewController: ViewController | undefined;
    private _childViewControllers: ViewController[] = []

    public get parentViewController(): ViewController | undefined {
        return this._parentViewController
    }

    public get childViewControllers(): ViewController[] {
        return this._childViewControllers
    }

    addChildViewController(childController: ViewController): void {
        if (childController.parentViewController !== undefined) { throw Error("ViewController has been added to another ViewController as a child.") }
        childController.willMoveToParentViewController(this)
        childController._parentViewController = this;
        this._childViewControllers.push(childController);
        childController.didMoveToParentViewController(this)
    }

    removeFromParentViewController(): void {
        if (this._parentViewController !== undefined) {
            this.willMoveToParentViewController(undefined)
            this._parentViewController._childViewControllers = this._parentViewController._childViewControllers.filter(t => t !== this)
            this._parentViewController = undefined;
            this.didMoveToParentViewController(undefined)
        }
    }

    willMoveToParentViewController(parent?: ViewController): void { }
    didMoveToParentViewController(parent?: ViewController): void { }

    public get navigationController(): NavigationControllerInterface | undefined {
        if ((this as any).className === "XTRNavigationController") {
            return this as any
        }
        return this.parentViewController ? this.parentViewController.navigationController as any : undefined
    }

    keyboardWillShow(frame: Rect, duration: number): void {
        this.childViewControllers.slice().forEach(t => t.keyboardWillShow(frame, duration))
    }

    keyboardWillHide(duration: number): void {
        this.childViewControllers.slice().forEach(t => t.keyboardWillHide(duration))
    }

    supportOrientations: DeviceOrientation[] = [DeviceOrientation.Portrait]

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
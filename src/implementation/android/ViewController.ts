/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { Rect, RectMake, Insets, InsetsMake } from "../../interface/Rect";
import { Color } from "../../interface/Color";
import { DeviceOrientation } from "../../interface/Device";
import { Device } from "./Device";
import { TransformMatrix } from "../../interface/TransformMatrix";
import { Releasable } from "../../interface/Releasable";
import { NavigationBar, NavigationBarDelegate } from "./NavigationBar";
import { Screen } from "./Screen";
import { ScrollView } from "./ScrollView";

export interface NavigationControllerInterface extends ViewController {
    pushViewController(viewController: ViewController, animated?: boolean): void
    popViewController(animated?: boolean): ViewController | undefined
    popToViewController(viewController: ViewController, animated?: boolean): ViewController[]
    popToRootViewController(animated?: boolean): ViewController[]
}

export enum KeyboardAvoidingMode {
    None,
    Pan,
}

export class ViewController implements Releasable, NavigationBarDelegate {

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
            this.objectRef = _XTUIViewController.create()
        }
        objectRefs[this.objectRef] = this;
        this.loadView()
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
        return new View(_XTUIViewController.xtr_view(this.objectRef));
    }

    public set view(value: View) {
        _XTUIViewController.xtr_setView(value.objectRef, this.objectRef);
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
        const ref = _XTUIViewController.xtr_parentViewController(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new ViewController(ref);
    }

    public get childViewControllers(): ViewController[] {
        return _XTUIViewController.xtr_childViewControllers(this.objectRef).map((ref: string) => {
            return new ViewController(ref)
        });
    }

    addChildViewController(childController: ViewController): void {
        _XTUIViewController.xtr_addChildViewController(childController.objectRef, this.objectRef);
    }

    removeFromParentViewController(): void {
        _XTUIViewController.xtr_removeFromParentViewController(this.objectRef);
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

    didMoveToParentViewController(parent?: ViewController): void {
        console.log("didMoveToParentViewController");
        
        this.navigationBar.reload()
    }

    public get navigationController(): NavigationControllerInterface | undefined {
        const ref = _XTUIViewController.xtr_navigationController(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new (window as any)._NavigationControllerInterface(undefined, ref);
    }

    public set navigationBar(value: NavigationBar) {
        _XTUIViewController.xtr_setNavigationBar(value.objectRef, this.objectRef)
    }

    public get navigationBar(): NavigationBar {
        let ref = _XTUIViewController.xtr_navigationBar(this.objectRef)
        if (typeof ref !== "string") {
            this.navigationBar = new NavigationBar();
            this.navigationBar.delegate = this
            return this.navigationBar
        }
        return new NavigationBar(ref)
    }

    showNavigationBar(animated: boolean = false): void {
        if (this.navigationBar === undefined) {
            this.navigationBar = new NavigationBar()
        }
        this.reloadNavigationBar()
        _XTUIViewController.xtr_showNavigationBar(animated, this.objectRef)
    }

    hideNavigationBar(animated: boolean = false): void {
        _XTUIViewController.xtr_hideNavigationBar(animated, this.objectRef)
    }

    onBack(): void {
        if (this.navigationController) {
            this.navigationController.popViewController(true)
        }
    }

    reloadNavigationBar() {
        this.navigationBar.reload()
    }

    shouldShowBackButton() {
        return this.navigationController && this.navigationController.childViewControllers.indexOf(this) > 0 ? true : false
    }

    public get safeAreaInsets(): Insets {
        return InsetsMake(0, 0, 0, 0);
    }

    keyboardAvoidingMode(): KeyboardAvoidingMode { return KeyboardAvoidingMode.None }

    makeKeyboardAvoiding(keyboardHeight: number, keyboardDuration: number) {
        if (this.keyboardAvoidingMode() == KeyboardAvoidingMode.Pan && this.view.window) {
            const firstResponder = this.view.window.firstResponder
            if (firstResponder && firstResponder.isDescendantOfView(this.view)) {
                let targetScrollView: ScrollView | undefined = undefined
                const firstResponderWindowRect: any = firstResponder.frame
                var currentView = firstResponder.superview
                while (currentView instanceof View) {
                    firstResponderWindowRect.x += currentView.frame.x
                    firstResponderWindowRect.y += currentView.frame.y
                    if (currentView instanceof ScrollView) {
                        targetScrollView = currentView
                        break
                    }
                    currentView = currentView.superview
                }
                if (targetScrollView) {
                    View.animationWithDuration(keyboardDuration, () => {
                        targetScrollView && targetScrollView.scrollRectToVisible({ ...firstResponderWindowRect, height: firstResponderWindowRect.height + keyboardHeight }, false)
                    })
                }
                else {
                    const windowBounds = this.view.window.bounds
                    const adjustHeight = Math.max(0.0, (firstResponderWindowRect.y + firstResponderWindowRect.height) - ((windowBounds.height) - keyboardHeight))
                    View.animationWithDuration(keyboardDuration, () => {
                        this.view.transform = new TransformMatrix(1.0, 0.0, 0.0, 1.0, 0.0, -adjustHeight)
                    })
                }
            }
        }
    }

    keyboardWillShow(frame: Rect, duration: number): void {
        this.childViewControllers.forEach(t => t.keyboardWillShow(frame, duration))
        this.makeKeyboardAvoiding(frame.height, duration)
    }

    keyboardWillHide(duration: number): void {
        this.childViewControllers.forEach(t => t.keyboardWillHide(duration))
        this.makeKeyboardAvoiding(0, duration)
    }

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
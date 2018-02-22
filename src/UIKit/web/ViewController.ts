/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { Rect, RectMake, Insets, InsetsMake } from "../interface/Rect";
import { Color } from "../interface/Color";
import { DeviceOrientation } from "../interface/Device";
// import { Device } from "./Device";
import { TransformMatrix } from "../interface/TransformMatrix";
import { Releasable } from "../interface/Releasable";
import { NavigationBar } from "./NavigationBar";

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

export class ViewController implements Releasable {

    retain(): this {
        return this
    }

    release(): this {
        return this
    }

    vcID: string = performance.now().toString();

    private _title: string = ""

    public get title(): string {
        return this._title
    }

    public set title(value: string) {
        this._title = value
        this.navigationBar.title = value
    }

    constructor() { }

    toObject(): any {
        return {
            class: "UI.ViewController",
            title: this.title,
            view: this.view,
            safeAreaInsets: this.safeAreaInsets,
            keyboardAvoidingMode: this.keyboardAvoidingMode,
            supportOrientations: this.supportOrientations,
            navigationBar: this.navigationBar,
        }
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

    static safeAreaInsets: Insets | undefined = undefined
    safeAreaInsets: Insets = ViewController.safeAreaInsets || InsetsMake(0, 0, 0, 0)

    loadView(): void {
        const view = new View();
        view.backgroundColor = Color.whiteColor
        view.userInteractionEnabled = true;
        this.view = view;
    }

    viewDidLoad(): void { }
    viewWillAppear(): void { this.childViewControllers.map(v => v.viewWillAppear()) }
    viewDidAppear(): void {
        this.childViewControllers.map(v => v.viewDidAppear())
        if (NavigationBar.resetNavigationBar) {
            NavigationBar.resetNavigationBar(this.navigationBar, this)
        }
    }
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
        if (childController.parentViewController !== undefined) { childController.removeFromParentViewController() }
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
        if ((this as any).className === "_XTUINavigationController") {
            return this as any
        }
        return this.parentViewController ? this.parentViewController.navigationController as any : undefined
    }

    keyboardAvoidingMode(): KeyboardAvoidingMode { return KeyboardAvoidingMode.None }

    keyboardWillShow(frame: Rect, duration: number): void {
        this.childViewControllers.forEach(t => t.keyboardWillShow(frame, duration))
    }

    keyboardWillHide(duration: number): void {
        this.childViewControllers.forEach(t => t.keyboardWillHide(duration))
    }

    supportOrientations: DeviceOrientation[] = [DeviceOrientation.Portrait]

    navigationBar: NavigationBar = new NavigationBar(this)
    showNavigationBar(animated: boolean = false): void { this.navigationBar.show = true }
    hideNavigationBar(animated: boolean = false): void { this.navigationBar.show = false }

}
import { View } from "./View";
import { Rect } from "../../interface/Rect";
import { Color } from "../../interface/Color";

export class ViewController {

    view: View

    constructor() {
        this.loadView();
        ((view) => {
            const originMethod = view.layoutSubviews
            view.layoutSubviews = () => {
                this.viewWillLayoutSubviews();
                originMethod.call(view);
                this.viewDidLayoutSubviews();
            }
        })(this.view);
        this.viewDidLoad();
    }

    loadView(): void {
        this.view = new View();
        this.view.backgroundColor = Color.whiteColor
        this.view.userInteractionEnabled = true;
    }

    viewDidLoad(): void { }
    viewWillAppear(): void { this.childViewControllers.map(v => v.viewWillAppear()) }
    viewDidAppear(): void { this.childViewControllers.map(v => v.viewDidAppear()) }
    viewWillDisappear(): void { this.childViewControllers.map(v => v.viewWillDisappear()) }
    viewDidDisappear(): void { this.childViewControllers.map(v => v.viewDidDisappear()) }
    viewWillLayoutSubviews(): void { this.childViewControllers.map(v => v.viewWillLayoutSubviews()) }
    viewDidLayoutSubviews(): void { this.childViewControllers.map(v => v.viewDidLayoutSubviews()) }

    parentViewController?: ViewController

    private _childViewControllers: ViewController[] = []

    public get childViewControllers() {
        return this._childViewControllers.slice();
    }

    public set childViewControllers(value: ViewController[]) {
        this._childViewControllers = value.slice();
    }

    addChildViewController(childController: ViewController): void {
        if (childController.parentViewController === undefined && this._childViewControllers.indexOf(childController) < 0) {
            childController.willMoveToParentViewController(this);
            this._childViewControllers.push(childController)
            childController.parentViewController = this;
            childController.didMoveToParentViewController(this);
        }
        else {
            throw "ChildController has been add to other ViewController."
        }
    }

    removeFromParentViewController(): void {
        if (this.parentViewController !== undefined) {
            this.willMoveToParentViewController(undefined);
            this.parentViewController.childViewControllers = this.parentViewController.childViewControllers.filter(v => v !== this)
            this.parentViewController = undefined
            this.didMoveToParentViewController(undefined);
        }
    }

    willMoveToParentViewController(parent?: ViewController) {

    }

    didMoveToParentViewController(parent?: ViewController) {

    }

    public get navigationController(): any {
        var current = this.parentViewController
        while (current !== undefined) {
            if ((current as any).XTClassName === "NavigationController") {
                return current
            }
            current = current.parentViewController
        }
        return undefined;
    }

    keyboardWillShow(frame: Rect, duration: number): void { }
    keyboardWillHide(duration: number): void { }

}
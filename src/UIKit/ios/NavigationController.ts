/// <reference path="xtr.d.ts" />
import { ViewController } from "./ViewController";

export class NavigationController extends ViewController {

    constructor(rootViewController?: ViewController, ref?: any) {
        super(ref || _XTUINavigationController)
        if (rootViewController) {
            _XTUINavigationController.xtr_setViewControllersAnimatedObjectRef([rootViewController.objectRef], false, this.objectRef);
        }
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.NavigationController",
        }
    }

    pushViewController(viewController: ViewController, animated: boolean = true): void {
        _XTUINavigationController.xtr_pushViewControllerAnimatedObjectRef(viewController.objectRef, animated, this.objectRef);
    }

    popViewController(animated: boolean = true): ViewController | undefined {
        const ref = _XTUINavigationController.xtr_popViewControllerObjectRef(animated, this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new ViewController(ref);
    }

    popToViewController(viewController: ViewController, animated: boolean = true): ViewController[] {
        return _XTUINavigationController.xtr_popToViewControllerObjectRef(viewController.objectRef, animated, this.objectRef).map((ref: string) => {
            return new ViewController(ref);
        });
    }

    popToRootViewController(animated: boolean = true): ViewController[] {
        return _XTUINavigationController.xtr_popToRootViewControllerObjectRef(animated, this.objectRef).map((ref: string) => {
            return new ViewController(ref);
        });
    }

}
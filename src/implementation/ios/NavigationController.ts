/// <reference path="xtr.d.ts" />
import { ViewController } from "./ViewController";

export class NavigationController extends ViewController {

    constructor(rootViewController?: ViewController, ref?: any) {
        super(ref || XTRNavigationController)
        if (rootViewController) {
            XTRNavigationController.xtr_setViewControllersAnimatedObjectRef([rootViewController.objectRef], false, this.objectRef);
        }
    }

    pushViewController(viewController: ViewController, animated: boolean = true): void {
        XTRNavigationController.xtr_pushViewControllerAnimatedObjectRef(viewController.objectRef, animated, this.objectRef);
    }

    popViewController(animated: boolean = true): ViewController | undefined {
        const ref = XTRNavigationController.xtr_popViewControllerObjectRef(animated, this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new ViewController(ref);
    }

    popToViewController(viewController: ViewController, animated: boolean = true): ViewController[] {
        return XTRNavigationController.xtr_popToViewControllerObjectRef(viewController.objectRef, animated, this.objectRef).map((ref: string) => {
            return new ViewController(ref);
        });
    }

    popToRootViewController(animated: boolean = true): ViewController[] {
        return XTRNavigationController.xtr_popToRootViewControllerObjectRef(animated, this.objectRef).map((ref: string) => {
            return new ViewController(ref);
        });
    }

}

(window as any)._NavigationControllerInterface = NavigationController
/// <reference path="xtr.d.ts" />
import { ViewController } from "./ViewController";

export class NavigationController extends ViewController {

    constructor(rootViewController?: ViewController, ref?: any) {
        super(ref || XTRNavigationController)
        if (rootViewController) {
            XTRNavigationController.xtr_setViewControllersAnimatedObjectRef([rootViewController], false, this.objectRef);
        }
    }

    pushViewController(viewController: ViewController, animated: boolean = true): void {
        XTRNavigationController.xtr_pushViewControllerAnimatedObjectRef(viewController, animated, this.objectRef);
    }

    popViewController(animated: boolean = true): ViewController | undefined {
        return XTRNavigationController.xtr_popViewControllerObjectRef(animated, this.objectRef);
    }

    popToViewController(viewController: ViewController, animated: boolean = true): ViewController[] {
        return XTRNavigationController.xtr_popToViewControllerObjectRef(viewController, animated, this.objectRef);
    }

    popToRootViewController(animated: boolean = true): ViewController[] {
        return XTRNavigationController.xtr_popToRootViewControllerObjectRef(animated, this.objectRef);
    }

}

(window as any).XTRNavigationController = NavigationController;
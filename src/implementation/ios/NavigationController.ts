/// <reference path="xtr.d.ts" />
import { ViewController } from "./ViewController";

export class NavigationController extends ViewController {

    constructor(rootViewController?: ViewController, nativeObjectRef?: string, isChild: boolean = false) {
        super(true);
        if (isChild) { return; }
        this.nativeObjectRef = nativeObjectRef || XTRNavigationController.create(this);
        objectRefs[this.nativeObjectRef] = this;
        if (rootViewController) {
            this.nativeObject.xtr_setViewControllersAnimated([rootViewController], false);
        }
    }

    pushViewController(viewController: ViewController, animated: boolean = true): void {
        this.nativeObject.xtr_pushViewControllerAnimated(viewController, animated);
    }

    popViewController(animated: boolean = true): ViewController | undefined {
        return this.nativeObject.xtr_popViewController(animated);
    }

    popToViewController(viewController: ViewController, animated: boolean = true): ViewController[] {
        return this.nativeObject.xtr_popToViewController(viewController, animated);
    }

    popToRootViewController(animated: boolean = true): ViewController[] {
        return this.nativeObject.xtr_popToRootViewController(animated);
    }

}

(window as any).XTRNavigationController = NavigationController;
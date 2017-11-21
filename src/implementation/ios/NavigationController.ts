/// <reference path="xtr.d.ts" />
import { ViewController } from "./ViewController";

export class NavigationController extends ViewController {

    constructor(rootViewController?: ViewController, isChild: boolean = false) {
        super(true);
        if (isChild) { return; }
        this.nativeObjectRef = XTRNavigationController.create(this);
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

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((target: any) => {
    if (target.constructor.toString() === "[object XTRNavigationControllerConstructor]") {
        return new NavigationController(undefined, target);
    }
    return undefined;
})
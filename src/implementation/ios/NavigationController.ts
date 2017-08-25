/// <reference path="xtr.d.ts" />
import { ViewController } from "./ViewController";

export class NavigationController extends ViewController {

    nativeObject: any;

    constructor(rootViewController?: ViewController, nativeObject?: any, isChild: boolean = false) {
        super(nativeObject, true);
        if (isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
        }
        else {
            this.nativeObject = XTRNavigationController.create(this);
            (window as any).objectCreater.store(this);
            if (rootViewController) {
                this.nativeObject.xtr_setViewControllersAnimated([rootViewController], false);
            }
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

if ((window as any).objectClasses === undefined) {
    (window as any).objectClasses = [];
}
(window as any).objectClasses.push((target: any) => {
    if (target.constructor.toString() === "[object XTRNavigationControllerConstructor]") {
        return new NavigationController(undefined, target);
    }
    return undefined;
})
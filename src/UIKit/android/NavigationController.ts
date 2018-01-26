import { ViewController } from "./ViewController";
import { View } from "./View";
import { Color } from "../interface/Color";

export class NavigationController extends ViewController {

    nativeObject: any;
    className = "NavigationController"

    constructor(rootViewController?: ViewController, ref?: any) {
        super(ref || _XTUINavigationController)
        if (rootViewController) {
            _XTUINavigationController.xtr_setRootViewController(rootViewController.objectRef, this.objectRef);
        }
    }

    loadView(): void {
        this.view = new View();
    }

    pushViewController(viewController: ViewController, animated: boolean = true): void {
        viewController.willMoveToParentViewController(this)
        _XTUINavigationController.xtr_pushViewController(viewController.objectRef, animated, this.objectRef)
        viewController.didMoveToParentViewController(this)
    }

    popViewController(animated: boolean = true): ViewController | undefined {
        const ref = _XTUINavigationController.xtr_popViewController(animated, this.objectRef)
        if (typeof ref !== "string") { return undefined }
        const target = new ViewController(ref)
        target.willMoveToParentViewController(undefined)
        target.didMoveToParentViewController(undefined)
        return target;
    }

    popToViewController(viewController: ViewController, animated: boolean = true): ViewController[] {
        return _XTUINavigationController.xtr_popToViewController(viewController.objectRef, animated, this.objectRef).map((ref: string) => {
            const target = new ViewController(ref)
            target.willMoveToParentViewController(undefined)
            target.didMoveToParentViewController(undefined)
            return target;
        })
    }

    popToRootViewController(animated: boolean = true): ViewController[] {
        return _XTUINavigationController.xtr_popToViewController(this.childViewControllers[0].objectRef, animated, this.objectRef).map((ref: string) => {
            const target = new ViewController(ref)
            target.willMoveToParentViewController(undefined)
            target.didMoveToParentViewController(undefined)
            return target;
        })
    }

}

(window as any)._NavigationControllerInterface = NavigationController
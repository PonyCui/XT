import { ViewController } from "./ViewController";
import { View } from "./View";
import { Color } from "../../interface/Color";

export class NavigationController extends ViewController {

    nativeObject: any;
    className = "NavigationController"

    constructor(rootViewController?: ViewController, ref?: any) {
        super(ref || XTRNavigationController)
        if (rootViewController) {
            XTRNavigationController.xtr_setRootViewController(rootViewController.objectRef, this.objectRef);
        }
    }

    loadView(): void {
        this.view = new View();
    }

    pushViewController(viewController: ViewController, animated: boolean = true): void {
        XTRNavigationController.xtr_pushViewController(viewController.objectRef, animated, this.objectRef)
    }

    popViewController(animated: boolean = true): ViewController | undefined {
        const ref = XTRNavigationController.xtr_popViewController(animated, this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new ViewController(ref);
    }

    popToViewController(viewController: ViewController, animated: boolean = true): ViewController[] {
        return XTRNavigationController.xtr_popToViewController(viewController.objectRef, animated, this.objectRef).map((ref: string) => {
            return new ViewController(ref);
        })
    }

    popToRootViewController(animated: boolean = true): ViewController[] {
        return XTRNavigationController.xtr_popToViewController(this.childViewControllers[0].objectRef, animated, this.objectRef).map((ref: string) => {
            return new ViewController(ref);
        })
    }

}

(window as any)._NavigationControllerInterface = NavigationController
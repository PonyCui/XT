import { ViewController } from "./ViewController";
import { View } from "./View";
import { Color } from "../../interface/Color";

export class NavigationController extends ViewController {

    nativeObject: any;
    className = "NavigationController"

    constructor(rootViewController?: ViewController, nativeObject?: any, isChild: boolean = false) {
        super(nativeObject, true);
        if (isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.nativeObject = XTRNavigationController.createScriptObject(this);
            (window as any).XTRObjCreater.store(this);
            this.loadView();
            if (rootViewController) {
                this.nativeObject.xtr_setViewControllersAnimated([rootViewController], false);
            }
        }
    }

    loadView(): void {
        this.view = new View();
        this.view.userInteractionEnabled = true;
    }

    pushViewController(viewController: ViewController, animated: boolean = true): void {
        this.nativeObject.xtr_pushViewController(viewController, animated)
    }

    popViewController(animated: boolean = true): ViewController | undefined {
        return this.nativeObject.xtr_popViewController(animated)
    }

    popToViewController(viewController: ViewController, animated: boolean = true): ViewController[] {
        return this.nativeObject.xtr_popToViewController(viewController, animated)
    }

    popToRootViewController(animated: boolean = true): ViewController[] {
        return this.nativeObject.xtr_popToRootViewController(animated)
    }

}

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((target: any) => {
    if (target.toString().indexOf("com.opensource.xtruntime.XTRNavigationController$InnerObject") === 0) {
        return new NavigationController(undefined, target);
    }
    return undefined;
})
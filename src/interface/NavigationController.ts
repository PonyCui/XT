import { ViewController } from "./ViewController";

export class NavigationController extends ViewController {

    constructor(rootViewController?: ViewController, ref?: any) { super() }
    pushViewController(viewController: ViewController, animated: boolean = true): void { }
    popViewController(animated: boolean = true): ViewController | undefined { return undefined }
    popToViewController(viewController: ViewController, animated: boolean = true): ViewController[] { return [] }
    popToRootViewController(animated: boolean = true): ViewController[] { return [] }

}
import { View } from "./View";
import { Rect } from "./Rect";
import { DeviceOrientation } from "./Device";
import { Releasable } from "./Releasable";

interface NavigationControllerInterface extends ViewController {
    pushViewController(viewController: ViewController, animated?: boolean): void
    popViewController(animated?: boolean): ViewController | undefined
    popToViewController(viewController: ViewController, animated?: boolean): ViewController[]
    popToRootViewController(animated?: boolean): ViewController[]
}

export class ViewController implements Releasable {

    addOwner(owner: any): this { return this }

    title?: string
    readonly view: View
    loadView(): void { }
    viewDidLoad(): void { }
    viewWillAppear(): void { }
    viewDidAppear(): void { }
    viewWillDisappear(): void { }
    viewDidDisappear(): void { }
    viewWillLayoutSubviews(): void { }
    viewDidLayoutSubviews(): void { }

    readonly parentViewController?: ViewController
    childViewControllers: ViewController[]
    addChildViewController(childController: ViewController): void { }
    removeFromParentViewController(): void { }
    willMoveToParentViewController(parent?: ViewController): void { }
    didMoveToParentViewController(parent?: ViewController): void { }

    keyboardWillShow(frame: Rect, duration: number): void { }
    keyboardWillHide(duration: number): void { }

    supportOrientations: DeviceOrientation[] = [DeviceOrientation.Portrait]
    readonly navigationController?: NavigationControllerInterface

}
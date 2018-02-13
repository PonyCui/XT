import { View } from "./View";
import { Rect, Insets } from "./Rect";
import { DeviceOrientation } from "./Device";
import { Releasable } from "./Releasable";
import { NavigationBar } from "./NavigationBar";

interface NavigationControllerInterface extends ViewController {
    pushViewController(viewController: ViewController, animated?: boolean): void
    popViewController(animated?: boolean): ViewController | undefined
    popToViewController(viewController: ViewController, animated?: boolean): ViewController[]
    popToRootViewController(animated?: boolean): ViewController[]
}

export enum KeyboardAvoidingMode {
    None,
    Pan,
}

export class ViewController implements Releasable {

    retain(): this {
        throw new Error("Method not implemented.");
    }

    release(): this {
        throw new Error("Method not implemented.");
    }

    constructor(ref: string | Object | Function | undefined = undefined, ...args: any[]) { throw "" }

    title?: string
    readonly view: View
    readonly safeAreaInsets: Insets

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

    presentViewController(viewController: ViewController, animated: boolean = true): void { }
    dismissViewController(animated: boolean = true): void { }

    keyboardAvoidingMode(): KeyboardAvoidingMode { return KeyboardAvoidingMode.None }
    keyboardWillShow(frame: Rect, duration: number): void { }
    keyboardWillHide(duration: number): void { }

    supportOrientations: DeviceOrientation[] = [DeviceOrientation.Portrait]
    readonly navigationController?: NavigationControllerInterface

    readonly navigationBar: NavigationBar
    showNavigationBar(animated: boolean = false): void { }
    hideNavigationBar(animated: boolean = false): void { }

}
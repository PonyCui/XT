import { ViewController } from "./ViewController";
import { View } from "./View";

export class NavigationController extends ViewController {

    XTClassName = "NavigationController"

    constructor(rootViewController: ViewController) {
        super()
        this.addChildViewController(rootViewController);
        this.view.addSubview(rootViewController.view);
        this.activePanTouches();
    }

    activePanTouches() {
        let screenPanStarted = false;
        let targetController: ViewController | undefined = undefined
        let xTime: number = 0;
        let xPosition: number = 0;
        let xVolecity: number = 0;
        this.view.nativeObject.on("touchstart", (event: any) => {
            if (event.data.originalEvent.touches) {
                const x = event.data.originalEvent.touches[0].pageX;
                if (x < 44.0 && this.childViewControllers.length > 1) {
                    screenPanStarted = true;
                    this.view.nativeObject.interactiveChildren = false;
                    targetController = this.childViewControllers[this.childViewControllers.length - 1]
                }
            }
        })
        this.view.nativeObject.on("touchmove", (event: any) => {
            if (screenPanStarted && targetController && event.data.originalEvent.touches) {
                const x = event.data.originalEvent.touches[0].pageX;
                xVolecity = (x - xPosition) / (event.data.originalEvent.timeStamp - xTime);
                xPosition = x;
                xTime = event.data.originalEvent.timeStamp;
                targetController.view.frame = { ...targetController.view.frame, x }
            }
        })
        const onEnd = () => {
            if (screenPanStarted && targetController) {
                setTimeout(() => { this.view.nativeObject.interactiveChildren = true }, 150);
                if ((xPosition > this.view.bounds.width * 0.5 && xVolecity > 0.0) || xVolecity > 1.0) {
                    this.popViewController(true);
                }
                else {
                    View.animationWithBouncinessAndSpeed(1.0, 24.0, () => {
                        if (targetController) {
                            targetController.view.frame = { ...targetController.view.frame, x: 0 }
                        }
                    })
                }
                screenPanStarted = false
                targetController = undefined
            }
        }
        this.view.nativeObject.on("touchcancel", () => {
            onEnd();
        })
        this.view.nativeObject.on("touchend", () => {
            onEnd();
        })
        this.view.nativeObject.on("touchendoutside", () => {
            onEnd();
        })
    }

    pushViewController(viewController: ViewController, animated: boolean = true): void {
        this.addChildViewController(viewController);
        this.view.addSubview(viewController.view);
        viewController.view.frame = this.view.bounds;
        if (animated === true) {
            viewController.viewWillAppear();
            viewController.view.frame = { x: this.view.bounds.width, y: 0, width: viewController.view.frame.width, height: viewController.view.frame.height }
            View.animationWithBouncinessAndSpeed(1.0, 16.0, () => {
                viewController.view.frame = { x: 0, y: 0, width: viewController.view.frame.width, height: viewController.view.frame.height }
            }, () => {
                viewController.viewDidAppear();
            })
        }
        else {
            viewController.viewWillAppear();
            viewController.viewDidAppear();
        }
    }

    popViewController(animated: boolean = true): ViewController | undefined {
        const viewControllers = this.childViewControllers;
        if (viewControllers.length > 1) {
            const targetViewController = viewControllers[viewControllers.length - 1]
            if (animated) {
                targetViewController.viewWillDisappear();
                View.animationWithBouncinessAndSpeed(1.0, 16.0, () => {
                    targetViewController.view.frame = { x: this.view.bounds.width, y: 0, width: targetViewController.view.frame.width, height: targetViewController.view.frame.height }
                }, () => {
                    targetViewController.viewDidDisappear();
                    targetViewController.view.removeFromSuperview();
                    targetViewController.removeFromParentViewController();
                })
            }
            else {
                targetViewController.viewWillDisappear();
                targetViewController.viewDidDisappear();
                targetViewController.view.removeFromSuperview();
                targetViewController.removeFromParentViewController();
            }
            return targetViewController;
        }
        return undefined
    }

    popToViewController(viewController: ViewController, animated: boolean = true): ViewController[] {
        const viewControllers = this.childViewControllers;
        const idx = viewControllers.indexOf(viewController);
        if (idx >= 0) {
            const targetViewControllers = viewControllers.slice(idx + 1);
            if (animated) {
                targetViewControllers.forEach(v => {
                    v.viewWillDisappear();
                });
                View.animationWithBouncinessAndSpeed(1.0, 16.0, () => {
                    targetViewControllers[targetViewControllers.length - 1].view.frame = { x: this.view.bounds.width, y: 0, width: targetViewControllers[targetViewControllers.length - 1].view.frame.width, height: targetViewControllers[targetViewControllers.length - 1].view.frame.height }
                }, () => {
                    targetViewControllers.forEach(v => {
                        v.viewDidDisappear();
                        v.view.removeFromSuperview();
                        v.removeFromParentViewController();
                    });
                })
            }
            else {
                targetViewControllers.forEach(v => {
                    v.viewWillDisappear();
                    v.viewDidDisappear();
                    v.view.removeFromSuperview();
                    v.removeFromParentViewController();
                });
            }
        }
        return []
    }

    popToRootViewController(animated: boolean = true): ViewController[] {
        const viewControllers = this.childViewControllers;
        if (viewControllers.length > 1) {
            return this.popToViewController(viewControllers[0], animated)
        }
        return []
    }

    viewWillLayoutSubviews() {
        this.childViewControllers.forEach(v => v.view.frame = this.view.bounds)
    }


}
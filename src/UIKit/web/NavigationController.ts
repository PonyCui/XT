import { ViewController } from "./ViewController";
import { View } from "./View";
import { Color } from "../interface/Color";
import { RectMake } from "../interface/Rect";

export class NavigationController extends ViewController {

    className = "_XTUINavigationController"

    private _isBody: boolean = false

    public get isBody(): boolean {
        return this._isBody;
    }

    public set isBody(value: boolean) {
        this._isBody = value;
        if (this.isBody) {
            document.title = this.childViewControllers[0].title || ""
            window.location.href = window.location.href.split('#')[0] + "#" + this.childViewControllers[0].vcID;
        }
    }

    private runAfterAnimated?: () => void = undefined

    constructor(rootViewController?: ViewController) {
        super();
        if (rootViewController) {
            this.pushViewController(rootViewController, false)
        }
        this.setupHashChangeListener();
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.NavigationController",
        }
    }

    setupHashChangeListener() {
        window.addEventListener('hashchange', () => {
            if (!this.isBody) { return }
            if (this.childViewControllers[this.childViewControllers.length - 1].vcID === window.location.hash.replace('#', '')) { return }
            let found = false
            for (let index = 0; index < this.childViewControllers.length - 1; index++) {
                let element = this.childViewControllers[index];
                if (element.vcID === window.location.hash.replace('#', '')) {
                    found = true
                    if (this.isAnimating) {
                        this.runAfterAnimated = () => { this.popToViewController(element, false); this.runAfterAnimated = undefined; }
                    }
                    else {
                        this.popToViewController(element, false)
                    }
                    break;
                }
            }
            if (!found) {
                window.history.back()
            }
        })
    }

    loadView(): void {
        this.view = new View();
        this.view.userInteractionEnabled = true;
    }

    private isAnimating = false

    pushViewController(viewController: ViewController, animated: boolean = true): void {
        if (this.isAnimating) { return; }
        const fromViewController: ViewController | undefined = this.childViewControllers.length > 0 ? this.childViewControllers[this.childViewControllers.length - 1] : undefined
        const toViewController: ViewController = viewController instanceof NavigationController ? viewController.childViewControllers[0] : viewController
        this.addChildViewController(toViewController);
        this.view.addSubview(toViewController.view);
        fromViewController && fromViewController.viewWillDisappear()
        toViewController.viewWillAppear()
        if (animated) {
            this.isAnimating = true
            if (fromViewController) {
                fromViewController.view.frame = this.view.bounds;
            }
            toViewController.view.frame = RectMake(this.view.bounds.width, 0.0, this.view.bounds.width, this.view.bounds.height);
            View.animationWithBouncinessAndSpeed(1.0, 24.0, () => {
                if (fromViewController) {
                    fromViewController.view.frame = RectMake(-this.view.bounds.width * 0.25, 0.0, this.view.bounds.width, this.view.bounds.height);
                }
                toViewController.view.frame = this.view.bounds;
            }, () => {
                this.isAnimating = false
                this.runAfterAnimated && this.runAfterAnimated();
                fromViewController && fromViewController.viewDidDisappear()
                toViewController.viewDidAppear()
            })
        }
        else {
            toViewController.view.frame = this.view.bounds;
            fromViewController && fromViewController.viewDidDisappear()
            toViewController.viewDidAppear()
        }
        if (this.isBody) {
            document.title = viewController.title || ""
            window.location.href = window.location.href.split('#')[0] + "#" + toViewController.vcID;
        }
    }

    popViewController(animated: boolean = true): ViewController | undefined {
        if (this.isAnimating) { return undefined; }
        if (this.childViewControllers.length <= 1) { return undefined }
        const fromViewController: ViewController = this.childViewControllers[this.childViewControllers.length - 1]
        const toViewController: ViewController = this.childViewControllers[this.childViewControllers.length - 2]
        fromViewController.viewWillDisappear()
        toViewController.viewWillAppear()
        if (animated) {
            this.isAnimating = true
            fromViewController.view.frame = this.view.bounds;
            toViewController.view.frame = RectMake(-this.view.bounds.width * 0.25, 0.0, this.view.bounds.width, this.view.bounds.height);
            View.animationWithDuration(0.25, () => {
                fromViewController.view.frame = RectMake(this.view.bounds.width, 0.0, this.view.bounds.width, this.view.bounds.height);
                toViewController.view.frame = this.view.bounds;
            }, () => {
                fromViewController.view.removeFromSuperview();
                fromViewController.removeFromParentViewController();
                this.isAnimating = false
                this.runAfterAnimated && this.runAfterAnimated();
                fromViewController.viewDidDisappear()
                toViewController.viewDidAppear()
            })
        }
        else {
            toViewController.view.frame = this.view.bounds
            fromViewController.view.removeFromSuperview();
            fromViewController.removeFromParentViewController();
            fromViewController.viewDidDisappear()
            toViewController.viewDidAppear()
        }
        if (this.isBody) {
            document.title = toViewController.title || ""
            window.location.href = window.location.href.split('#')[0] + "#" + toViewController.vcID;
        }
    }

    popToViewController(viewController: ViewController, animated: boolean = true): ViewController[] {
        if (this.isAnimating) { return []; }
        if (this.childViewControllers.length <= 1) { return [] }
        const targetIdx = this.childViewControllers.indexOf(viewController);
        if (targetIdx < 0) { return [] }
        const fromViewController: ViewController | undefined = this.childViewControllers[this.childViewControllers.length - 1]
        const targetViewControllers: ViewController[] = this.childViewControllers.filter((it, idx) => idx > targetIdx);
        const toViewController: ViewController = viewController
        targetViewControllers.forEach(it => it.viewWillDisappear())
        toViewController.viewWillAppear()
        if (animated) {
            this.isAnimating = true
            fromViewController.view.frame = this.view.bounds;
            toViewController.view.frame = RectMake(-this.view.bounds.width * 0.25, 0.0, this.view.bounds.width, this.view.bounds.height);
            View.animationWithDuration(0.25, () => {
                fromViewController.view.frame = RectMake(this.view.bounds.width, 0.0, this.view.bounds.width, this.view.bounds.height);
                toViewController.view.frame = this.view.bounds;
            }, () => {
                targetViewControllers.forEach(it => {
                    it.view.removeFromSuperview();
                    it.removeFromParentViewController();
                })
                this.isAnimating = false
                this.runAfterAnimated && this.runAfterAnimated();
                targetViewControllers.forEach(it => it.viewDidDisappear())
                toViewController.viewDidAppear()
            })
        }
        else {
            toViewController.view.frame = this.view.bounds
            targetViewControllers.forEach(it => {
                it.view.removeFromSuperview();
                it.removeFromParentViewController();
                targetViewControllers.forEach(it => it.viewDidDisappear())
                toViewController.viewDidAppear()
            })
        }
        if (this.isBody) {
            document.title = toViewController.title || ""
            window.location.href = window.location.href.split('#')[0] + "#" + toViewController.vcID;
        }
        return targetViewControllers
    }

    popToRootViewController(animated: boolean = true): ViewController[] {
        if (this.isAnimating) { return []; }
        if (this.childViewControllers.length <= 1) { return [] }
        return this.popToViewController(this.childViewControllers[0])
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews();
        this.childViewControllers.forEach((it) => {
            it.view.frame = this.view.bounds
        })
    }

}
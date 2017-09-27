/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { Rect } from "../../interface/Rect";
import { Color } from "../../interface/Color";

export interface NavigationControllerInterface extends ViewController {
    pushViewController(viewController: ViewController, animated?: boolean): void
    popViewController(animated?: boolean): ViewController | undefined
    popToViewController(viewController: ViewController, animated?: boolean): ViewController[]
    popToRootViewController(animated?: boolean): ViewController[]
}

export class ViewController {

    nativeObject: any;

    public get objectUUID(): string {
        return "" + this.nativeObject.objectUUID
    }

    constructor(nativeObject?: any, isChild: boolean = false) {
        if (isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.nativeObject = XTRViewController.createScriptObject(this);
            (window as any).XTRObjCreater.store(this);
            this.loadView();
        }
    }

    public get view() {
        return this.nativeObject.xtr_view();
    }

    public set view(value: View) {
        this.nativeObject.xtr_setView(value);
        (this as any).viewRef = value;
    }

    loadView(): void {
        this.view = new View();
        this.view.backgroundColor = Color.whiteColor
        this.view.userInteractionEnabled = true;
    }

    viewDidLoad(): void { }
    viewWillAppear(): void { this.childViewControllers.map(v => v.viewWillAppear()) }
    viewDidAppear(): void { this.childViewControllers.map(v => v.viewDidAppear()) }
    viewWillDisappear(): void { this.childViewControllers.map(v => v.viewWillDisappear()) }
    viewDidDisappear(): void { this.childViewControllers.map(v => v.viewDidDisappear()) }
    viewWillLayoutSubviews(): void { }
    viewDidLayoutSubviews(): void { }

    public get parentViewController(): ViewController | undefined {
        return this.nativeObject.xtr_parentViewController();
    }

    public get childViewControllers(): ViewController[] {
        const value = this.nativeObject.xtr_childViewControllers()
        let arr = [];
        for (let index = 0; index < value.length; index++) {
            arr.push(value[index]);
        }
        return arr;
    }

    addChildViewController(childController: ViewController): void {
        this.nativeObject.xtr_addChildViewController(childController);
    }

    removeFromParentViewController(): void {
        this.nativeObject.xtr_removeFromParentViewController();
    }

    willMoveToParentViewController(parent?: ViewController): void { }
    didMoveToParentViewController(parent?: ViewController): void { }

    public get navigationController(): NavigationControllerInterface | undefined {
        return this.nativeObject.xtr_navigationController();
    }

    keyboardWillShow(frame: Rect, duration: number): void {
        console.log(this.childViewControllers.length)
        this.childViewControllers.slice().forEach(t => t.keyboardWillShow(frame, duration))
    }
    
    keyboardWillHide(duration: number): void {
        this.childViewControllers.slice().forEach(t => t.keyboardWillHide(duration))
    }

}

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((target: any) => {
    if (target.toString().indexOf("com.opensource.xtruntime.XTRViewController$InnerObject") === 0) {
        return new ViewController(target);
    }
    return undefined;
})
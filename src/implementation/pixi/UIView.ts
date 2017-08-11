import * as I from '../../interface/Abstract'
const PIXI = (window as any).PIXI

export class UIView extends I.UIView {

    public nativeObject: any;
    public nativeGraphics: any;
    public nativeContainer: any;
    private _frame: I.CGRect = I.CGRectZero;
    private _backgroundColor?: I.UIColor = undefined;
    private _cornerRadius: number = 0;
    public bounds: I.CGRect = I.CGRectZero;

    constructor(rect?: I.CGRect) {
        super(rect || I.CGRectZero);
        this.nativeObject = new PIXI.Container();
        this.nativeObject.XTView = this;
        this.nativeGraphics = new PIXI.Graphics();
        this.nativeObject.addChild(this.nativeGraphics);
        this.nativeContainer = new PIXI.Container();
        this.nativeObject.addChild(this.nativeContainer);
        if (typeof rect === "object") {
            this.frame = rect;
            this.bounds = I.CGRectMake(0, 0, rect.width, rect.height);
        }
    }

    public get alpha() {
        return this.nativeObject.alpha;
    }

    public set alpha(value: number) {
        this.nativeObject.alpha = value;
    }

    public get hidden() {
        return !this.nativeObject.visible;
    }

    public set hidden(value: boolean) {
        this.nativeObject.visible = !value;
    }

    public get frame() {
        return this._frame;
    }

    public set frame(value: I.CGRect | any) {
        this._frame = value;
        this.nativeObject.hitArea = new PIXI.Rectangle(0, 0, value.width, value.height);
        this.nativeContainer.hitArea = this.nativeObject.hitArea;
        this.nativeObject.x = value.x;
        this.nativeObject.y = value.y;
    }

    public get backgroundColor() {
        return this._backgroundColor;
    }

    public set backgroundColor(value: I.UIColor | any) {
        this._backgroundColor = value;
        this.draw();
    }

    public get cornerRadius() {
        return this._cornerRadius;
    }

    public set cornerRadius(value: number) {
        this._cornerRadius = value;
        this.draw();
    }

    private draw() {
        if (this.nativeGraphics === undefined) {
            return;
        }
        this.nativeGraphics.clear();
        this.drawBackground();
    }

    private drawBackground() {
        if (this.backgroundColor instanceof I.UIColor) {
            this.nativeGraphics.beginFill(this.backgroundColor.rgbHexNumber(), this.backgroundColor.a);
            if (this.cornerRadius > 0) {
                this.nativeGraphics.drawRoundedRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, this.cornerRadius);
            }
            else {
                this.nativeGraphics.drawRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
            }
        }
    }

    // Mark: View Hierarchy

    public get superview(): UIView | undefined {
        if (this.nativeContainer.parent !== undefined && this.nativeContainer.parent.XTView instanceof UIView) {
            return this.nativeContainer.parent.XTView;
        }
        return undefined
    }

    public get subviews(): UIView[] {
        return this.nativeContainer.children.map((item: any) => item.XTView);
    }

    public get window(): any {
        let current = this.superview
        while (current !== undefined && (current as any).XTClassName !== "UIWindow") {
            current = current.superview;
        }
        return current;
    }

    public removeFromSuperview() {
        if (this.nativeContainer.parent !== undefined) {
            this.nativeContainer.parent.XTView.willRemoveSubview(this);
            this.willMoveToSuperview(undefined);
            this.willMoveToWindow(undefined);
            this.nativeContainer.parent.removeChild(this.nativeObject);
            this.didMoveToSuperview();
            this.didMoveToWindow();
        }
    }

    public insertSubviewAtIndex(subview: UIView, atIndex: number) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChildAt(subview.nativeObject, atIndex);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
    }

    public exchangeSubviewAtIndex(index1: number, index2: number) {
        const child1 = this.nativeContainer.getChildAt(index1);
        const child2 = this.nativeContainer.getChildAt(index2);
        this.nativeContainer.swapChildren(child1, child2);
    }

    public addSubview(subview: UIView) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChild(subview.nativeObject);
        this.didAddSubview(subview);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
    }

    public insertSubviewBelow(subview: UIView, siblingSubview: UIView) {
        const siblingIndex = this.subviews.indexOf(siblingSubview);
        if (siblingIndex >= 0) {
            this.insertSubviewAtIndex(subview, siblingIndex);
        }
    }

    public insertSubviewAbove(subview: UIView, siblingSubview: UIView) {
        const siblingIndex = this.subviews.indexOf(siblingSubview);
        if (siblingIndex >= 0 && siblingIndex == this.subviews.length - 1) {
            this.addSubview(subview)
        }
        else if (siblingIndex >= 0) {
            this.insertSubviewAtIndex(subview, siblingIndex + 1);
        }
    }

    public bringSubviewToFront(subview: UIView) {
        const currentIndex = this.subviews.indexOf(subview)
        if (currentIndex < this.subviews.length - 1 && this.subviews.length > 1) {
            this.exchangeSubviewAtIndex(this.subviews.length - 1, currentIndex);
        }
    }

    public sendSubviewToBack(subview: UIView) {
        const currentIndex = this.subviews.indexOf(subview)
        if (currentIndex > 0 && this.subviews.length > 1) {
            this.exchangeSubviewAtIndex(0, currentIndex);
        }
    }

    didAddSubview(subview: UIView) { }
    willRemoveSubview(subview: UIView) { }
    willMoveToSuperview(newSuperview?: UIView) { }
    didMoveToSuperview() { }
    willMoveToWindow(newWindow?: any) { }
    didMoveToWindow() { }

}
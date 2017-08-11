import * as I from '../../interface/Abstract'
const PIXI = (window as any).PIXI

export class UIView extends I.UIView {

    public nativeObject: any;
    public nativeGraphics: any;


    private _backgroundColor?: I.UIColor = undefined;
    private _cornerRadius: number = 0;


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
        }
    }

    // Mark: View Geometry

    private _frame: I.CGRect = I.CGRectZero;

    public get frame() {
        return this._frame;
    }

    public set frame(value: I.CGRect | any) {
        this._frame = value;
        this.bounds = { x: 0, y: 0, width: value.width, height: value.height };
        this.nativeObject.hitArea = new PIXI.Rectangle(0, 0, value.width, value.height);
        this.nativeContainer.hitArea = this.nativeObject.hitArea;
        this.nativeObject.x = value.x;
        this.nativeObject.y = value.y;
    }

    private _bounds: I.CGRect = I.CGRectZero;

    public get bounds() {
        return this._bounds;
    }

    public set bounds(value: I.CGRect | any) {
        if (!I.CGRectEqual(this._bounds, value)) {
            this._bounds = value;
            this.draw();
        }
    }

    public get center() {
        return { x: this.frame.x + this.frame.width / 2.0, y: this.frame.y + this.frame.height / 2.0 }
    }

    public set center(value: I.CGPoint) {
        const newFrame = this.frame;
        newFrame.x = value.x - newFrame.width / 2.0;
        newFrame.y = value.y - newFrame.height / 2.0;
        this.frame = newFrame;
    }

    private _transform: I.CGTransformMatrix | undefined;

    public get transform(): I.CGTransformMatrix | undefined {
        return this._transform
    }

    public set transform(value: I.CGTransformMatrix | undefined) {
        this._transform = value;
        if (value) {
            const transform = new PIXI.Transform();
            const matrix = new PIXI.Matrix();
            matrix.fromArray([value.a, value.b, value.tx, value.c, value.d, value.ty]);
            transform.setFromMatrix(matrix);
            this.nativeObject.setTransform(this.frame.x, this.frame.y, transform.scale.x, transform.scale.y, transform.rotation, transform.skew.x, transform.skew.y, transform.pivot.x, transform.pivot.y);
        }
        else {
            // this.nativeObject.setTransform(0,0,0.5,0.5,0.0,0.0,0.0,0.0,0.0);
        }
    }

    // Mark: View Rendering

    private _clipsToBounds = false

    public get clipsToBounds() {
        return this._clipsToBounds;
    }

    public set clipsToBounds(value: boolean) {
        this._clipsToBounds = value;
        this.applyMask();
    }

    private applyMask() {
        if (this.clipsToBounds) {
            if (this.maskView === undefined) {
                this.maskView = new UIView(this.bounds)
                this.maskView.backgroundColor = new I.UIColor(1, 1, 1)
            }
            this.addSubview(this.maskView);
            this.nativeObject.mask = this.maskView.nativeGraphics;
        }
        else {
            if (this.maskView !== undefined) {
                this.maskView.removeFromSuperview();
            }
            this.nativeObject.mask = undefined;
        }
    }

    public get backgroundColor() {
        return this._backgroundColor;
    }

    public set backgroundColor(value: I.UIColor | any) {
        this._backgroundColor = value;
        this.draw();
    }

    opaque: boolean = false

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

    private _maskView: UIView | undefined

    public get maskView(): UIView | undefined {
        return this._maskView;
    }

    public set maskView(value: UIView | undefined) {
        if (this._maskView !== undefined) {
            this._maskView.removeFromSuperview();
        }
        this._maskView = value;
        this.applyMask();
    }

    private _tintColor: I.UIColor = new I.UIColor(0.0, 122.0 / 255.0, 1.0)

    public get tintColor() {
        return this._tintColor;
    }

    public set tintColor(value: I.UIColor) {
        this._tintColor = value
        this.tintColorDidChange();
    }

    tintColorDidChange() {
        this.subviews.forEach((subview: UIView) => { subview.tintColorDidChange() });
    }

    // Mark: View Layer-Back Rendering
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
                if (this.cornerRadius == Math.min(this.bounds.width, this.bounds.height) / 2.0) {
                    if (this.bounds.width > this.bounds.height) {
                        this.nativeGraphics.drawCircle(this.bounds.x + this.bounds.height / 2.0, this.bounds.y + this.bounds.height / 2.0, Math.min(this.bounds.width, this.bounds.height) / 2.0);
                        this.nativeGraphics.drawCircle(this.bounds.x + this.bounds.width - this.bounds.height / 2.0, this.bounds.y + this.bounds.height / 2.0, Math.min(this.bounds.width, this.bounds.height) / 2.0);
                        this.nativeGraphics.drawRect(this.bounds.x + this.bounds.height / 2.0, this.bounds.y, this.bounds.width - this.bounds.height, this.bounds.height);
                    }
                    else if (this.bounds.width < this.bounds.height) {
                        this.nativeGraphics.drawCircle(this.bounds.x + this.bounds.width / 2.0, this.bounds.y + this.bounds.width / 2.0, Math.min(this.bounds.width, this.bounds.height) / 2.0);
                        this.nativeGraphics.drawCircle(this.bounds.x + this.bounds.width / 2.0, this.bounds.y + this.bounds.height - this.bounds.width / 2.0, Math.min(this.bounds.width, this.bounds.height) / 2.0);
                        this.nativeGraphics.drawRect(this.bounds.x, this.bounds.y + this.bounds.width / 2.0, this.bounds.width, this.bounds.height - this.bounds.width);
                    }
                    else {
                        this.nativeGraphics.drawCircle(this.bounds.x + this.bounds.width / 2.0, this.bounds.y + this.bounds.height / 2.0, Math.min(this.bounds.width, this.bounds.height) / 2.0);
                    }
                }
                else {
                    this.nativeGraphics.drawRoundedRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, this.cornerRadius);
                }
            }
            else {
                this.nativeGraphics.drawRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
            }
        }
    }

    // Mark: View Hierarchy
    public nativeContainer: any;

    public get superview(): UIView | undefined {
        let parent: any = undefined;
        if (this.nativeContainer.parent && this.nativeContainer.parent.parent && this.nativeContainer.parent.parent.parent) {
            parent = this.nativeContainer.parent.parent.parent
        }
        if (parent !== undefined && parent.XTView instanceof UIView) {
            return parent.XTView;
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
        if (this.superview !== undefined) {
            this.nativeContainer.parent.XTView.willRemoveSubview(this);
            this.willMoveToSuperview(undefined);
            this.willMoveToWindow(undefined);
            this.nativeObject.parent.removeChild(this.nativeObject);
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

    public didAddSubview(subview: UIView) { }
    public willRemoveSubview(subview: UIView) { }
    public willMoveToSuperview(newSuperview?: UIView) { }
    public didMoveToSuperview() { }
    public willMoveToWindow(newWindow?: any) { }
    public didMoveToWindow() { }

    public isDescendantOfView(view: UIView) {
        let current: UIView | undefined = this;
        while (current !== undefined) {
            if (current === view) {
                return true
            }
            current = current.superview;
        }
        return false
    }

    private layoutTimer?: any = undefined

    public setNeedsLayout() {
        if (this.layoutTimer !== undefined) {
            clearImmediate(this.layoutTimer)
        }
        this.layoutTimer = setImmediate(() => {
            this.layoutSubviews();
        });
    }

    public layoutIfNeeded() {
        this.layoutSubviews();
    }

    public layoutSubviews() { }

}
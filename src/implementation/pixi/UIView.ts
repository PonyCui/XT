import * as I from '../../interface/Abstract'
import { setNeedsDisplay } from './UIApplication'
const PIXI = (window as any).PIXI

export class UIView extends I.UIView {

    public nativeObject: any;
    public nativeGraphics: any;

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
        this.nativeObject.hitArea = new PIXI.Rectangle(0, 0, I.UIScreen.withScale(value.width), I.UIScreen.withScale(value.height));
        this.nativeContainer.hitArea = this.nativeObject.hitArea;
        this.nativeObject.x = I.UIScreen.withScale(value.x);
        this.nativeObject.y = I.UIScreen.withScale(value.y);
        setNeedsDisplay();
    }

    private _bounds: I.CGRect = I.CGRectZero;

    public get bounds() {
        return this._bounds;
    }

    public set bounds(value: I.CGRect | any) {
        if (!I.CGRectEqual(this._bounds, value)) {
            this._bounds = value;
            this.draw();
            setNeedsDisplay();
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
            this.nativeObject.setTransform(this.frame.x, this.frame.y, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0);
        }
        setNeedsDisplay();
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
        setNeedsDisplay();
    }

    private _backgroundColor?: I.UIColor = undefined;

    public get backgroundColor() {
        return this._backgroundColor;
    }

    public set backgroundColor(value: I.UIColor | any) {
        if (this._backgroundColor instanceof I.UIColor && this._backgroundColor.equals(value)) { return; }
        this._backgroundColor = value;
        this.draw();
        setNeedsDisplay();
    }

    opaque: boolean = false

    public get alpha() {
        return this.nativeObject.alpha;
    }

    public set alpha(value: number) {
        if (this.nativeObject.alpha === value) { return; }
        this.nativeObject.alpha = value;
        setNeedsDisplay();
    }

    public get hidden() {
        return !this.nativeObject.visible;
    }

    public set hidden(value: boolean) {
        if (this.nativeObject.visible === value) { return; }
        this.nativeObject.visible = !value;
        setNeedsDisplay();
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
        setNeedsDisplay();
    }

    private _tintColor: I.UIColor = new I.UIColor(0.0, 122.0 / 255.0, 1.0)

    public get tintColor() {
        return this._tintColor;
    }

    public set tintColor(value: I.UIColor) {
        if (this._tintColor instanceof I.UIColor && this._tintColor.equals(value)) { return; }
        this._tintColor = value;
        this.tintColorDidChange();
        setNeedsDisplay();
    }

    tintColorDidChange() {
        this.subviews.forEach((subview: UIView) => { subview.tintColorDidChange() });
    }

    // Mark: View Layer-Back Rendering

    private _cornerRadius: number = 0;

    public get cornerRadius() {
        return this._cornerRadius;
    }

    public set cornerRadius(value: number) {
        if (this._cornerRadius === value) { return; }
        this._cornerRadius = value;
        this.draw();
        setNeedsDisplay();
    }

    private _borderWidth: number = 0;

    public get borderWidth() {
        return this._borderWidth;
    }

    public set borderWidth(value: number) {
        if (this._borderWidth === value) { return; }
        this._borderWidth = value;
        this.draw();
        setNeedsDisplay();
    }

    private _borderColor: I.UIColor | undefined = undefined;

    public get borderColor() {
        return this._borderColor;
    }

    public set borderColor(value: I.UIColor | undefined) {
        if (this._borderColor === value) { return; }
        this._borderColor = value;
        this.draw();
        setNeedsDisplay();
    }

    private draw() {
        if (this.nativeGraphics === undefined) {
            return;
        }
        this.nativeGraphics.clear();
        this.drawGraphics();
    }

    private drawGraphics() {
        if (this.backgroundColor instanceof I.UIColor) {
            this.nativeGraphics.beginFill(this.backgroundColor.rgbHexNumber(), this.backgroundColor.a);
            if (this.borderWidth > 0 && this.borderColor instanceof I.UIColor) {
                this.nativeGraphics.lineStyle(I.UIScreen.withScale(this.borderWidth), this.borderColor.rgbHexNumber(), this.borderColor.a);
            }
            const scaledBounds = {
                x: I.UIScreen.withScale(this.bounds.x),
                y: I.UIScreen.withScale(this.bounds.y),
                width: I.UIScreen.withScale(this.bounds.width),
                height: I.UIScreen.withScale(this.bounds.height),
            }
            if (this.cornerRadius > 0) {
                if (this.cornerRadius == Math.min(this.bounds.width, this.bounds.height) / 2.0) {
                    if (scaledBounds.width > scaledBounds.height) {
                        this.nativeGraphics.drawCircle(scaledBounds.x + scaledBounds.height / 2.0, scaledBounds.y + scaledBounds.height / 2.0, Math.min(scaledBounds.width, scaledBounds.height) / 2.0);
                        this.nativeGraphics.drawCircle(scaledBounds.x + scaledBounds.width - scaledBounds.height / 2.0, scaledBounds.y + scaledBounds.height / 2.0, Math.min(scaledBounds.width, scaledBounds.height) / 2.0);
                        this.nativeGraphics.drawRect(scaledBounds.x + scaledBounds.height / 2.0, scaledBounds.y, scaledBounds.width - scaledBounds.height, scaledBounds.height);
                    }
                    else if (scaledBounds.width < scaledBounds.height) {
                        this.nativeGraphics.drawCircle(scaledBounds.x + scaledBounds.width / 2.0, scaledBounds.y + scaledBounds.width / 2.0, Math.min(scaledBounds.width, scaledBounds.height) / 2.0);
                        this.nativeGraphics.drawCircle(scaledBounds.x + scaledBounds.width / 2.0, scaledBounds.y + scaledBounds.height - scaledBounds.width / 2.0, Math.min(scaledBounds.width, scaledBounds.height) / 2.0);
                        this.nativeGraphics.drawRect(scaledBounds.x, scaledBounds.y + scaledBounds.width / 2.0, scaledBounds.width, scaledBounds.height - scaledBounds.width);
                    }
                    else {
                        this.nativeGraphics.drawCircle(scaledBounds.x + scaledBounds.width / 2.0, scaledBounds.y + scaledBounds.height / 2.0, Math.min(scaledBounds.width, scaledBounds.height) / 2.0);
                    }
                }
                else {
                    this.nativeGraphics.drawRoundedRect(scaledBounds.x, scaledBounds.y, scaledBounds.width, scaledBounds.height, I.UIScreen.withScale(this.cornerRadius));
                }
            }
            else {
                this.nativeGraphics.drawRect(scaledBounds.x, scaledBounds.y, scaledBounds.width, scaledBounds.height);
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
            setNeedsDisplay();
        }
    }

    public insertSubviewAtIndex(subview: UIView, atIndex: number) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChildAt(subview.nativeObject, atIndex);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
        setNeedsDisplay();
    }

    public exchangeSubviewAtIndex(index1: number, index2: number) {
        const child1 = this.nativeContainer.getChildAt(index1);
        const child2 = this.nativeContainer.getChildAt(index2);
        this.nativeContainer.swapChildren(child1, child2);
        setNeedsDisplay();
    }

    public addSubview(subview: UIView) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChild(subview.nativeObject);
        this.didAddSubview(subview);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
        setNeedsDisplay();
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

    // Mark: View Interactive

    private _userInteractionEnabled: boolean = false

    public get userInteractionEnabled() {
        return this._userInteractionEnabled;
    }

    public set userInteractionEnabled(value: boolean) {
        this._userInteractionEnabled = value;
        this.nativeObject.interactive = value;
    }

    private _onTap: () => void
    private _maybeTap = false
    private _firstTapPoint = { x: 0, y: 0 }

    private activeTap() {
        if (this._onTap !== undefined) {
            this.activeTouch();
            const onTap = () => {
                if (this._maybeTap === true) {
                    this._onTap && this._onTap();
                }
            }
            this.nativeObject.on('click', onTap)
            this.nativeObject.on('tap', onTap)
        }
    }

    private activeTouch() {
        this.nativeObject.on('pointerdown', this.handleTouchStart.bind(this))
        this.nativeObject.on('pointermove', this.handleTouchMove.bind(this))
        this.nativeObject.on('pointerup', this.handleTouchEnd.bind(this))
    }

    private handleTouchStart(event: any) {
        if (this._onTap !== undefined) {
            this._maybeTap = true;
            this._firstTapPoint = { ...event.data.global };
        }
    }

    private handleTouchMove(event: any) {
        if (this._maybeTap === true) {
            if (event.data.global.x - this._firstTapPoint.x > 12 || event.data.global.y - this._firstTapPoint.y > 12) {
                this._maybeTap = false;
            }
        }
    }

    private handleTouchEnd() {

    }

    public get onTap() {
        return this._onTap;
    }

    public set onTap(value: () => void) {
        this._onTap = value;
        this.activeTap();
    }

}
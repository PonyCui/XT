declare function require(name: string): any;
import * as I from '../../interface/Abstract'
import { setNeedsDisplay } from './UIApplication'
const PIXI = (window as any).PIXI
const AutoLayout = require("autolayout");

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
            this.setNeedsLayout();
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
    public tag?: number;

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

    public viewWithTag(tag: number): UIView | undefined {
        if (this.tag !== undefined && this.tag === tag) {
            return this;
        }
        else {
            const target = this.subviews.filter(item => item.viewWithTag(tag));
            if (target.length > 0) {
                return target[0];
            }
        }
        return undefined
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

    public layoutSubviews() {
        if (this._constraints.length > 0) {
            let viewMapping: { [key: string]: UIView } = {}
            this._constraints.forEach(item => {
                if (item.firstItem !== undefined) { viewMapping[(item.firstItem as any)._layoutID] = item.firstItem as any }
                if (item.secondItem !== undefined) { viewMapping[(item.secondItem as any)._layoutID] = item.secondItem as any }
            })
            const view = new AutoLayout.View({
                constraints: this._constraints.map(item => item.toALObject()),
                width: this.bounds.width,
                height: this.bounds.height,
            });
            for (const layoutID in view.subViews) {
                const value = view.subViews[layoutID];
                if (viewMapping[layoutID] !== undefined) {
                    viewMapping[layoutID].frame = {
                        x: value.left,
                        y: value.top,
                        width: value.width,
                        height: value.height,
                    }
                }
            }
        }
    }

    // Mark: View LayoutConstraint

    private _layoutID: string = UIView.generateLayoutUUID();

    private static generateLayoutUUID(): string {
        var s: any[] = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }

    private _constraints: I.NSLayoutConstraint[] = [];

    public get constraints(): I.NSLayoutConstraint[] {
        return []
    }

    addConstraint(constraint: I.NSLayoutConstraint) {
        this._constraints.push(constraint);
        this.setNeedsLayout();
    }

    addConstraints(constraints: I.NSLayoutConstraint[]) {
        constraints.forEach(constraint => this._constraints.push(constraint));
        this.setNeedsLayout();
    }

    removeConstraint(constraint: I.NSLayoutConstraint) {
        const idx = this._constraints.indexOf(constraint);
        if (idx >= 0) {
            this._constraints.splice(idx, 1);
        }
        this.setNeedsLayout();
    }

    removeAllConstraints() {
        this._constraints = [];
        this.setNeedsLayout();
    }

    // Mark: View Interactive

    private _userInteractionEnabled: boolean = false

    public get userInteractionEnabled() {
        return this._userInteractionEnabled;
    }

    public set userInteractionEnabled(value: boolean) {
        this._userInteractionEnabled = value;
        this.nativeObject.interactive = value;
    }

    private _onTap?: () => void;
    private _onDoubleTap?: () => void;
    private _onLongPress?: (state: any, viewLocation?: I.CGPoint, absLocation?: I.CGPoint) => void;
    private _onPan?: (state: any, viewLocation?: I.CGPoint, absLocation?: I.CGPoint) => void;
    private _isTapActived = false;
    private _isTouchActived = false;
    private _maybeTap = false;
    private _maybeLongPress = false;
    private _maybePan = false;
    private _isLongPress = false;
    private _isPan = false;
    private _firstTapped = false;
    private _firstTapPoint = { x: 0, y: 0 }
    private _secondTapped = false;

    private activeTap() {
        if (this._isTapActived === true) { return; }
        if (this._onTap !== undefined || this._onDoubleTap !== undefined) {
            this.activeTouch();
            const onTap = () => {
                if (this._onDoubleTap !== undefined) {
                    if (this._firstTapped !== true && this._maybeTap === true) {
                        this._firstTapped = true;
                        setTimeout(() => {
                            if (this._onTap !== undefined && this._secondTapped === false && this._maybeTap === true) {
                                if (this._isLongPress === false) {
                                    this._onTap && this._onTap();
                                }
                            }
                            this._firstTapped = false;
                        }, 250);
                    }
                    else if (this._firstTapped === true && this._maybeTap === true) {
                        this._secondTapped = true;
                        if (this._isLongPress === false) {
                            this._onDoubleTap && this._onDoubleTap();
                        }
                    }
                }
                else if (this._maybeTap === true) {
                    if (this._isLongPress === false) {
                        this._onTap && this._onTap();
                    }
                }
            }
            this.nativeObject.on('click', onTap);
            this.nativeObject.on('tap', onTap);
            this._isTapActived = true;
        }
    }

    private activeTouch() {
        if (this._isTouchActived === true) { return; }
        this.nativeObject.on('pointerdown', this.handleTouchStart.bind(this))
        this.nativeObject.on('pointermove', this.handleTouchMove.bind(this))
        this.nativeObject.on('pointerup', this.handleTouchEnd.bind(this))
        this.nativeObject.on('pointerupoutside', this.handleTouchEnd.bind(this))
        this._isTouchActived = true;
    }

    private requestTouchPointInView(event: any): I.CGPoint {
        const absPoint = {
            x: I.UIScreen.outScale(event.data.global.x),
            y: I.UIScreen.outScale(event.data.global.y),
        }
        let viewPoint = {
            x: absPoint.x,
            y: absPoint.y,
        }
        let currentView: UIView | undefined = this;
        while (currentView.superview !== undefined) {
            viewPoint.x -= currentView.frame.x;
            viewPoint.y -= currentView.frame.y;
            currentView = currentView.superview;
        }
        return viewPoint;
    }

    private requestTouchPointInWindow(event: any): I.CGPoint {
        const absPoint = {
            x: I.UIScreen.outScale(event.data.global.x),
            y: I.UIScreen.outScale(event.data.global.y),
        }
        return absPoint;
    }

    private handleTouchStart(event: any) {
        if (this._onPan !== undefined) {
            this._maybePan = true;
            this._isPan = false;
        }
        if (this._onLongPress !== undefined) {
            this._maybeLongPress = true;
            this._isLongPress = false;
            setTimeout(() => {
                if (this._maybeLongPress === true) {
                    this._isLongPress = true;
                    this._onLongPress && this._onLongPress(I.UIView.InteractionState.Began);
                }
            }, 300);
        }
        if (this._onTap !== undefined || this._onDoubleTap !== undefined) {
            this._maybeTap = true;
            this._firstTapPoint = { ...event.data.global };
            this._secondTapped = false;
        }
    }

    private handleTouchMove(event: any) {
        if (this._isLongPress === true) {
            this._maybePan = false;
            this._onLongPress && this._onLongPress(I.UIView.InteractionState.Changed, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
        }
        else if (this._isPan === true) {
            this._onPan && this._onPan(I.UIView.InteractionState.Changed, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
        }
        else if (this._maybePan === true) {
            if (event.data.global.x - this._firstTapPoint.x > I.UIScreen.withScale(8) || event.data.global.y - this._firstTapPoint.y > I.UIScreen.withScale(8)) {
                this._isPan = true;
                this._maybeTap = false;
                this._maybeLongPress = false;
                this._onPan && this._onPan(I.UIView.InteractionState.Began, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
            }
        }
        else if (this._maybeTap === true || this._maybeLongPress === true) {
            if (event.data.global.x - this._firstTapPoint.x > I.UIScreen.withScale(12) || event.data.global.y - this._firstTapPoint.y > I.UIScreen.withScale(12)) {
                this._maybeTap = false;
                this._maybeLongPress = false;
            }
        }
    }

    private handleTouchEnd(event: any) {
        if (this._isLongPress !== true) {
            this._maybeLongPress = false;
        }
        if (this._isPan === true) {
            this._onPan && this._onPan(I.UIView.InteractionState.Ended, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
            this._maybePan = false;
            this._isPan = false;
        }
        else if (this._isLongPress === true) {
            this._onLongPress && this._onLongPress(I.UIView.InteractionState.Ended, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
            this._maybeTap = false;
            this._isLongPress = false;
        }
    }

    public set onTap(value: () => void) {
        this._onTap = value;
        this.activeTap();
    }

    public set onDoubleTap(value: () => void) {
        this._onDoubleTap = value;
        this.activeTap();
    }

    public set onLongPress(value: (state: any, viewLocation?: I.CGPoint, absLocation?: I.CGPoint) => void) {
        this._onLongPress = value;
        this.activeTouch();
    }

    public set onPan(value: (state: any, viewLocation?: I.CGPoint, absLocation?: I.CGPoint) => void) {
        this._onPan = value;
        this.activeTouch();
    }

}
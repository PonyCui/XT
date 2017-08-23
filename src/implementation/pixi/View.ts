import { View as IView } from '../../interface/View';
import { Screen } from '../../interface/Screen';
declare function require(name: string): any;
import { setNeedsDisplay, displayPause, displayNow } from './Application'
import * as Rebound from 'rebound'
import { Rect, RectZero, RectEqual, Point, Size } from "../../interface/Rect";
import { TransformMatrix } from "../../interface/TransformMatrix";
import { Color } from "../../interface/Color";
import { LayoutConstraint } from "../../interface/LayoutConstraint";
const PIXI = (window as any).PIXI
const AutoLayout = require("autolayout");
let requestAnimationFrame = (window as any).requestAnimationFrame || (window as any).mozRequestAnimationFrame || (window as any).webkitRequestAnimationFrame || (window as any).msRequestAnimationFrame;
if (requestAnimationFrame === undefined) {
    requestAnimationFrame = (trigger: () => void) => {
        setTimeout(trigger, 16);
    }
}

export class View extends IView {

    public nativeObject: any;
    public nativeGraphics: any;

    constructor(rect?: Rect) {
        super(rect || RectZero);
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

    private _frame: Rect = RectZero;
    public _frameChanged = false
    public _forceRender = false

    public get frame() {
        return this._frame;
    }

    public set frame(value: Rect | any) {
        if (RectEqual(this._frame, value)) { return; }
        if (View._animationEnabled) {
            if (this._frame.x != value.x) { View.addAnimation(this, "frameX", this._frame.x, value.x); }
            if (this._frame.y != value.y) { View.addAnimation(this, "frameY", this._frame.y, value.y); }
            if (this._frame.width != value.width) { View.addAnimation(this, "frameWidth", this._frame.width, value.width); }
            if (this._frame.height != value.height) { View.addAnimation(this, "frameHeight", this._frame.height, value.height); }
            return;
        }
        this._frame = value;
        this._frameChanged = true;
        this.bounds = { x: 0, y: 0, width: value.width, height: value.height };
        this.nativeObject.hitArea = new PIXI.Rectangle(0, 0, Screen.withScale(value.width), Screen.withScale(value.height));
        this.nativeContainer.hitArea = this.nativeObject.hitArea;
        this.nativeObject.x = Screen.withScale(value.x);
        this.nativeObject.y = Screen.withScale(value.y);
        setNeedsDisplay(this);
    }

    private set frameX(value: number) {
        this.frame = { ...this.frame, x: value };
    }

    private set frameY(value: number) {
        this.frame = { ...this.frame, y: value };
    }

    private set frameWidth(value: number) {
        this.frame = { ...this.frame, width: value };
    }

    private set frameHeight(value: number) {
        this.frame = { ...this.frame, height: value };
    }

    private _bounds: Rect = RectZero;

    public get bounds() {
        return this._bounds;
    }

    public set bounds(value: Rect | any) {
        if (RectEqual(this._bounds, value)) { return; }
        if (View._animationEnabled) {
            if (this._bounds.x != value.x) { View.addAnimation(this, "boundsX", this._bounds.x, value.x); }
            if (this._bounds.y != value.y) { View.addAnimation(this, "boundsY", this._bounds.y, value.y); }
            if (this._bounds.width != value.width) { View.addAnimation(this, "boundsWidth", this._bounds.width, value.width); }
            if (this._bounds.height != value.height) { View.addAnimation(this, "boundsHeight", this._bounds.height, value.height); }
            return;
        }
        this._bounds = value;
        this.applyMask();
        this.draw();
        setNeedsDisplay(this);
        this.setNeedsLayout();
    }

    private set boundsX(value: number) {
        this.bounds = { ...this.bounds, x: value };
    }

    private set boundsY(value: number) {
        this.bounds = { ...this.bounds, y: value };
    }

    private set boundsWidth(value: number) {
        this.bounds = { ...this.bounds, width: value };
    }

    private set boundsHeight(value: number) {
        this.bounds = { ...this.bounds, height: value };
    }

    public get center() {
        return { x: this.frame.x + this.frame.width / 2.0, y: this.frame.y + this.frame.height / 2.0 }
    }

    public set center(value: Point) {
        const newFrame = this.frame;
        newFrame.x = value.x - newFrame.width / 2.0;
        newFrame.y = value.y - newFrame.height / 2.0;
        this.frame = newFrame;
    }

    private _transform: TransformMatrix | undefined;

    public get transform(): TransformMatrix | undefined {
        return this._transform
    }

    public set transform(value: TransformMatrix | undefined) {
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
        setNeedsDisplay(this);
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
                this.maskView = new View(this.bounds)
                this.maskView.backgroundColor = new Color(1, 1, 1)
            }
            else {
                this.maskView.frame = this.bounds;
                this.maskView.removeFromSuperview();
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
        setNeedsDisplay(this);
    }

    private _backgroundColor?: Color = undefined;

    public get backgroundColor() {
        return this._backgroundColor;
    }

    public set backgroundColor(value: Color | undefined) {
        if (this._backgroundColor instanceof Color && this._backgroundColor.equals(value)) { return; }
        if (View._animationEnabled && this._backgroundColor && value) {
            if (this._backgroundColor.a != value.a) { View.addAnimation(this, "backgroundColorA", this._backgroundColor.a, value.a); }
            if (this._backgroundColor.r != value.r) { View.addAnimation(this, "backgroundColorR", this._backgroundColor.r, value.r); }
            if (this._backgroundColor.g != value.g) { View.addAnimation(this, "backgroundColorG", this._backgroundColor.g, value.g); }
            if (this._backgroundColor.b != value.b) { View.addAnimation(this, "backgroundColorB", this._backgroundColor.b, value.b); }
            return;
        }
        this._backgroundColor = value;
        this.draw();
        setNeedsDisplay(this);
    }

    private set backgroundColorA(value: number) {
        if (this.backgroundColor) {
            this.backgroundColor = new Color(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, value);
        }
    }

    private set backgroundColorR(value: number) {
        if (this.backgroundColor) {
            this.backgroundColor = new Color(value, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
        }
    }

    private set backgroundColorG(value: number) {
        if (this.backgroundColor) {
            this.backgroundColor = new Color(this.backgroundColor.r, value, this.backgroundColor.b, this.backgroundColor.a);
        }
    }

    private set backgroundColorB(value: number) {
        if (this.backgroundColor) {
            this.backgroundColor = new Color(this.backgroundColor.r, this.backgroundColor.g, value, this.backgroundColor.a);
        }
    }

    private _opaque: boolean = false

    public set opaque(value: boolean) {
        this._opaque = value;
    }

    public get opaque() {
        if (this._opaque === true) {
            return true;
        }
        else if (this.backgroundColor && this.backgroundColor.a >= 1 && !this.hidden && this.alpha >= 1 && this.cornerRadius == 0) {
            return true;
        }
        return this._opaque;
    }

    public get alpha() {
        return this.nativeObject.alpha;
    }

    public set alpha(value: number) {
        if (this.nativeObject.alpha === value) { return; }
        if (View._animationEnabled) {
            View.addAnimation(this, "alpha", this.nativeObject.alpha, value);
            return;
        }
        this.nativeObject.alpha = value;
        setNeedsDisplay(this);
    }

    public get hidden() {
        return !this.nativeObject.visible;
    }

    public set hidden(value: boolean) {
        if (this.nativeObject.visible === !value) { return; }
        this.nativeObject.visible = !value;
        setNeedsDisplay(this);
    }

    private _maskView: View | undefined

    public get maskView(): View | undefined {
        return this._maskView;
    }

    public set maskView(value: View | undefined) {
        if (this._maskView !== undefined) {
            this._maskView.removeFromSuperview();
        }
        this._maskView = value;
        this.applyMask();
        setNeedsDisplay(this);
    }

    private _tintColor: Color = new Color(0.0, 122.0 / 255.0, 1.0)

    public get tintColor() {
        return this._tintColor;
    }

    public set tintColor(value: Color) {
        if (this._tintColor instanceof Color && this._tintColor.equals(value)) { return; }
        this._tintColor = value;
        this.tintColorDidChange();
        setNeedsDisplay(this);
    }

    tintColorDidChange() {
        this.subviews.forEach((subview: View) => { subview.tintColorDidChange() });
    }

    // Mark: View Layer-Back Rendering

    private _cornerRadius: number = 0;

    public get cornerRadius() {
        return this._cornerRadius;
    }

    public set cornerRadius(value: number) {
        if (this._cornerRadius === value) { return; }
        if (View._animationEnabled) {
            View.addAnimation(this, "cornerRadius", this._cornerRadius, value);
            return;
        }
        this._cornerRadius = value;
        this.draw();
        setNeedsDisplay(this);
    }

    private _borderWidth: number = 0;

    public get borderWidth() {
        return this._borderWidth;
    }

    public set borderWidth(value: number) {
        if (this._borderWidth === value) { return; }
        if (View._animationEnabled) {
            View.addAnimation(this, "borderWidth", this._borderWidth, value);
            return;
        }
        this._borderWidth = value;
        this.draw();
        setNeedsDisplay(this);
    }

    private _borderColor: Color | undefined = undefined;

    public get borderColor() {
        return this._borderColor;
    }

    public set borderColor(value: Color | undefined) {
        if (this._borderColor === value) { return; }
        if (View._animationEnabled && this._borderColor && value) {
            if (this._borderColor.a != value.a) { View.addAnimation(this, "borderColorA", this._borderColor.a, value.a); }
            if (this._borderColor.r != value.r) { View.addAnimation(this, "borderColorR", this._borderColor.r, value.r); }
            if (this._borderColor.g != value.g) { View.addAnimation(this, "borderColorG", this._borderColor.g, value.g); }
            if (this._borderColor.b != value.b) { View.addAnimation(this, "borderColorB", this._borderColor.b, value.b); }
            return;
        }
        this._borderColor = value;
        this.draw();
        setNeedsDisplay(this);
    }

    private set borderColorA(value: number) {
        if (this.borderColor) {
            this.borderColor = new Color(this.borderColor.r, this.borderColor.g, this.borderColor.b, value);
        }
    }

    private set borderColorR(value: number) {
        if (this.borderColor) {
            this.borderColor = new Color(value, this.borderColor.g, this.borderColor.b, this.borderColor.a);
        }
    }

    private set borderColorG(value: number) {
        if (this.borderColor) {
            this.borderColor = new Color(this.borderColor.r, value, this.borderColor.b, this.borderColor.a);
        }
    }

    private set borderColorB(value: number) {
        if (this.borderColor) {
            this.borderColor = new Color(this.borderColor.r, this.borderColor.g, value, this.borderColor.a);
        }
    }

    private draw() {
        if (this.nativeGraphics === undefined || this.bounds.width == 0 || this.bounds.height == 0) {
            return;
        }
        this.nativeGraphics.clear();
        this.drawGraphics();
    }

    private drawGraphics() {
        if (this.backgroundColor instanceof Color) {
            this.nativeGraphics.beginFill(this.backgroundColor.rgbHexNumber(), this.backgroundColor.a);
            if (this.borderWidth > 0 && this.borderColor instanceof Color) {
                this.nativeGraphics.lineStyle(Screen.withScale(this.borderWidth), this.borderColor.rgbHexNumber(), this.borderColor.a);
            }
            const scaledBounds = {
                x: Screen.withScale(this.bounds.x),
                y: Screen.withScale(this.bounds.y),
                width: Screen.withScale(this.bounds.width),
                height: Screen.withScale(this.bounds.height),
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
                    this.nativeGraphics.drawRoundedRect(scaledBounds.x, scaledBounds.y, scaledBounds.width, scaledBounds.height, Screen.withScale(this.cornerRadius));
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

    public get superview(): View | undefined {
        let parent: any = undefined;
        if (this.nativeContainer.parent && this.nativeContainer.parent.parent && this.nativeContainer.parent.parent.parent) {
            parent = this.nativeContainer.parent.parent.parent
        }
        if (parent !== undefined && parent.XTView instanceof View) {
            return parent.XTView;
        }
        return undefined
    }

    public get subviews(): View[] {
        return this.nativeContainer.children.map((item: any) => item.XTView);
    }

    public get window(): any {
        let current = this.superview
        while (current !== undefined && (current as any).XTClassName !== "Window") {
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
            setNeedsDisplay(this);
        }
    }

    public insertSubviewAtIndex(subview: View, atIndex: number) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChildAt(subview.nativeObject, atIndex);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
        setNeedsDisplay(this);
    }

    public exchangeSubviewAtIndex(index1: number, index2: number) {
        const child1 = this.nativeContainer.getChildAt(index1);
        const child2 = this.nativeContainer.getChildAt(index2);
        this.nativeContainer.swapChildren(child1, child2);
        setNeedsDisplay(this);
    }

    public addSubview(subview: View) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChild(subview.nativeObject);
        this.didAddSubview(subview);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
        setNeedsDisplay(this);
    }

    public insertSubviewBelow(subview: View, siblingSubview: View) {
        const siblingIndex = this.subviews.indexOf(siblingSubview);
        if (siblingIndex >= 0) {
            this.insertSubviewAtIndex(subview, siblingIndex);
        }
    }

    public insertSubviewAbove(subview: View, siblingSubview: View) {
        const siblingIndex = this.subviews.indexOf(siblingSubview);
        if (siblingIndex >= 0 && siblingIndex == this.subviews.length - 1) {
            this.addSubview(subview)
        }
        else if (siblingIndex >= 0) {
            this.insertSubviewAtIndex(subview, siblingIndex + 1);
        }
    }

    public bringSubviewToFront(subview: View) {
        const currentIndex = this.subviews.indexOf(subview)
        if (currentIndex < this.subviews.length - 1 && this.subviews.length > 1) {
            this.exchangeSubviewAtIndex(this.subviews.length - 1, currentIndex);
        }
    }

    public sendSubviewToBack(subview: View) {
        const currentIndex = this.subviews.indexOf(subview)
        if (currentIndex > 0 && this.subviews.length > 1) {
            this.exchangeSubviewAtIndex(0, currentIndex);
        }
    }

    public didAddSubview(subview: View) { }
    public willRemoveSubview(subview: View) { }
    public willMoveToSuperview(newSuperview?: View) { }
    public didMoveToSuperview() { }
    public willMoveToWindow(newWindow?: any) { }
    public didMoveToWindow() { }

    public isDescendantOfView(view: View) {
        let current: View | undefined = this;
        while (current !== undefined) {
            if (current === view) {
                return true
            }
            current = current.superview;
        }
        return false
    }

    public viewWithTag(tag: number): View | undefined {
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
            let viewMapping: { [key: string]: View } = {}
            this._constraints.forEach(item => {
                if (item.firstItem !== undefined) { viewMapping[(item.firstItem as any)._layoutID] = item.firstItem as any }
                if (item.secondItem !== undefined) { viewMapping[(item.secondItem as any)._layoutID] = item.secondItem as any }
            })
            const view = new AutoLayout.View({
                constraints: this._constraints.map(item => (item as any).toALObject()),
                width: this.bounds.width,
                height: this.bounds.height,
            });
            for (const layoutID in view.subViews) {
                const value = view.subViews[layoutID];
                if ((value.width == 0 || value.height == 0) && viewMapping[layoutID] !== undefined) {
                    const intrinsticSize = viewMapping[layoutID].intrinsicContentSize(value.width != 0 ? value.width : undefined);
                    if (intrinsticSize !== undefined) {
                        value.intrinsicWidth = intrinsticSize.width;
                        value.intrinsicHeight = intrinsticSize.height;
                    }
                }
            }
            for (const layoutID in view.subViews) {
                const value = view.subViews[layoutID];
                if (viewMapping[layoutID] !== undefined) {
                    if (viewMapping[layoutID] == this) { continue; }
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

    private _layoutID: string = View.generateLayoutUD();

    private static generateLayoutUD(): string {
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

    private _constraints: LayoutConstraint[] = [];

    public get constraints(): LayoutConstraint[] {
        return []
    }

    public intrinsicContentSize(width?: number): Size | undefined {
        return undefined;
    }

    public addConstraint(constraint: LayoutConstraint) {
        this._constraints.push(constraint);
        this.setNeedsLayout();
    }

    public addConstraints(constraints: LayoutConstraint[]) {
        constraints.forEach(constraint => this._constraints.push(constraint));
        this.setNeedsLayout();
    }

    public removeConstraint(constraint: LayoutConstraint) {
        const idx = this._constraints.indexOf(constraint);
        if (idx >= 0) {
            this._constraints.splice(idx, 1);
        }
        this.setNeedsLayout();
    }

    public removeAllConstraints() {
        this._constraints = [];
        this.setNeedsLayout();
    }

    // Mark: View Interactive

    public longPressDuration: number = 250;

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
    private _onLongPress?: (state: any, viewLocation?: Point, absLocation?: Point) => void;
    private _onPan?: (state: any, viewLocation?: Point, absLocation?: Point) => void;
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

    private requestTouchPointInView(event: any): Point {
        const absPoint = {
            x: Screen.outScale(event.data.global.x),
            y: Screen.outScale(event.data.global.y),
        }
        let viewPoint = {
            x: absPoint.x,
            y: absPoint.y,
        }
        let currentView: View | undefined = this;
        while (currentView.superview !== undefined) {
            viewPoint.x -= currentView.frame.x;
            viewPoint.y -= currentView.frame.y;
            currentView = currentView.superview;
        }
        return viewPoint;
    }

    private requestTouchPointInWindow(event: any): Point {
        const absPoint = {
            x: Screen.outScale(event.data.global.x),
            y: Screen.outScale(event.data.global.y),
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
                    this._onLongPress && this._onLongPress(IView.InteractionState.Began);
                }
            }, this.longPressDuration);
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
            this._onLongPress && this._onLongPress(IView.InteractionState.Changed, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
        }
        else if (this._isPan === true) {
            this._onPan && this._onPan(IView.InteractionState.Changed, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
        }
        else if (this._maybePan === true) {
            if (event.data.global.x - this._firstTapPoint.x > Screen.withScale(8) || event.data.global.y - this._firstTapPoint.y > Screen.withScale(8)) {
                this._isPan = true;
                this._maybeTap = false;
                this._maybeLongPress = false;
                this._onPan && this._onPan(IView.InteractionState.Began, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
            }
        }
        else if (this._maybeTap === true || this._maybeLongPress === true) {
            if (event.data.global.x - this._firstTapPoint.x > Screen.withScale(12) || event.data.global.y - this._firstTapPoint.y > Screen.withScale(12)) {
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
            this._onPan && this._onPan(IView.InteractionState.Ended, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
            this._maybePan = false;
            this._isPan = false;
        }
        else if (this._isLongPress === true) {
            this._onLongPress && this._onLongPress(IView.InteractionState.Ended, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
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

    public set onLongPress(value: (state: any, viewLocation?: Point, absLocation?: Point) => void) {
        this._onLongPress = value;
        this.activeTouch();
    }

    public set onPan(value: (state: any, viewLocation?: Point, absLocation?: Point) => void) {
        this._onPan = value;
        this.activeTouch();
    }

    // Mark: View Animation
    static _animationEnabled = false;
    private static _animationViews: View[] = [];
    private _animationProps: { [key: string]: { from: number, to: number } } = {};

    private static commonAnimation(animations: () => void, runAnimation: (startTime: number, animationViewProps: { view: View, propName: string, from: number, to: number }[]) => void) {
        View._animationEnabled = true;
        animations();
        let animationViewProps: { view: View, propName: string, from: number, to: number }[] = [];
        View._animationViews.forEach(view => {
            for (var propName in view._animationProps) {
                var element = view._animationProps[propName];
                animationViewProps.push({ view, propName, from: element.from, to: element.to });
            }
            view._animationProps = {};
        })
        const startTime = performance.now();
        const runnable = () => {
            displayPause();
            if (!runAnimation(startTime, animationViewProps)) {
                requestAnimationFrame(runnable);
            }
            displayNow();
        }
        runnable();
        View._animationViews = [];
        View._animationEnabled = false;
    }

    static animationWithDuration(duration: number, animations: () => void, completion?: () => void) {
        this.commonAnimation(animations, (startTime, animationViewProps) => {
            const currentTime = performance.now();
            const delta = currentTime - startTime;
            animationViewProps.forEach(item => {
                const currentValue = (item.to - item.from) * Math.min(1.0, delta / (duration * 1000));
                (item.view as any)[item.propName] = item.from + currentValue;
            })
            if (delta < (duration * 1000)) {
                return false;
            }
            else {
                completion && completion();
                return true;
            }
        })
    }

    static animationWithBouncinessAndSpeed(bounciness: number, speed: number, animations: () => void, completion?: () => void) {
        const springSystem = new Rebound.SpringSystem();
        let rested = false;
        this.commonAnimation(animations, (startTime, animationViewProps) => {
            animationViewProps.forEach(item => {
                const spring = springSystem.createSpringWithBouncinessAndSpeed(bounciness, speed);
                spring.addListener({
                    onSpringUpdate: (spring) => {
                        (item.view as any)[item.propName] = spring.getCurrentValue();
                    },
                    onSpringAtRest: () => {
                        if (!rested) {
                            rested = true;
                            completion && completion();
                        }
                    }
                });
                spring.setCurrentValue(item.from);
                spring.setEndValue(item.to);
            })
            return true;
        })
    }

    static addAnimation(view: View, propName: string, from: number, to: number) {
        if (View._animationViews.indexOf(view) < 0) { View._animationViews.push(view); }
        view._animationProps[propName] = { from, to }
    }

}
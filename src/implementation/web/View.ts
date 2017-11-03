/// <reference path="xtr.d.ts" />
import { SwipeDirection, InteractionState } from '../../interface/View';
import { Window } from '../../interface/Window'
import { Rect, Point, Size, RectZero } from "../../interface/Rect";
import { Color } from "../../interface/Color";
import { TransformMatrix } from "../../interface/TransformMatrix";
import { LayoutConstraint } from "../../interface/LayoutConstraint";
import { ViewElement } from './element/View';
declare function require(name: string): any;
const AutoLayout = require("autolayout");

export class View {

    nativeObject: any;

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        if (_isChild) { return; }
        this.nativeObject = new ViewElement(rect || RectZero, this);
        setImmediate(() => { this.init(); });
    }

    init() { }

    // Mark: View Geometry
    private _frame: Rect;

    public get frame(): Rect {
        return this.nativeObject.xtr_frame();
    }

    public set frame(value: Rect) {
        this.nativeObject.xtr_setFrame(value);
    }

    private _bounds: Rect;

    public get bounds(): Rect {
        return this.nativeObject.xtr_bounds();
    }

    public set bounds(value: Rect) {
        this.nativeObject.xtr_setBounds(value);
    }

    private _center: Point;

    public get center(): Point {
        return this.nativeObject.xtr_center();
    }

    public set center(value: Point) {
        this.nativeObject.xtr_setCenter(value);
    }

    public get transform(): TransformMatrix {
        return this.nativeObject.xtr_transform();
    }

    public set transform(value: TransformMatrix) {
        this.nativeObject.xtr_setTransform(value);
    }

    // Mark: View Rendering

    public get clipsToBounds(): boolean {
        return this.nativeObject.xtr_clipsToBounds();
    }

    public set clipsToBounds(value: boolean) {
        this.nativeObject.xtr_setClipsToBounds(value);
    }

    public get backgroundColor(): Color | undefined {
        return this.nativeObject.xtr_backgroundColor()
    }

    public set backgroundColor(value: Color | undefined) {
        this.nativeObject.xtr_setBackgroundColor(value);
    }

    public get alpha(): number {
        return this.nativeObject.xtr_alpha();
    }

    public set alpha(value: number) {
        this.nativeObject.xtr_setAlpha(value);
    }

    opaque: boolean = false;

    public get hidden(): boolean {
        return this.nativeObject.xtr_hidden();
    }

    public set hidden(value: boolean) {
        this.nativeObject.xtr_setHidden(value);
    }

    public get contentMode(): number | undefined {
        return this.nativeObject.xtr_contentMode();
    }

    public set contentMode(value: number | undefined) {
        this.nativeObject.xtr_setContentMode(value);
    }

    private _maskView: View | undefined

    public get maskView(): View | undefined {
        console.info("TODO: maskView")
        return this._maskView;
    }

    public set maskView(value: View | undefined) {
        console.info("TODO: maskView")
        this._maskView = value;
    }

    private _tintColor: Color

    public get tintColor(): Color {
        const value = this._tintColor || (this.superview ? this.superview.tintColor : undefined)
        if (value instanceof Object) {
            return new Color(value.r, value.g, value.b, value.a)
        }
        return new Color(0.0, 122.0 / 255.0, 1.0);
    }

    public set tintColor(value: Color) {
        this._tintColor = value;
        this.tintColorDidChange();
    }

    tintColorDidChange() {
        this.subviews.forEach(t => t.tintColorDidChange())
    }

    setNeedsDisplay() { }

    // Mark: View Layer-Back Rendering

    public get cornerRadius(): number {
        return this.nativeObject.xtr_cornerRadius();
    }

    public set cornerRadius(value: number) {
        this.nativeObject.xtr_setCornerRadius(value);
    }

    public get borderWidth(): number {
        return this.nativeObject.xtr_borderWidth();
    }

    public set borderWidth(value: number) {
        this.nativeObject.xtr_setBorderWidth(value);
    }

    public get borderColor(): Color | undefined {
        return this.nativeObject.xtr_borderColor()
    }

    public set borderColor(value: Color | undefined) {
        this.nativeObject.xtr_setBorderColor(value);
    }

    // private _shadowColor: Color | undefined;

    // public get shadowColor(): Color | undefined {
    //     const value = this.nativeObject.xtr_shadowColor();
    //     if (value instanceof Object) {
    //         return new Color(value.r, value.g, value.b, value.a)
    //     }
    //     return undefined;
    // }

    // public set shadowColor(value: Color | undefined) {
    //     this.nativeObject.xtr_setShadowColor(value);
    // }

    // private _shadowOpacity: number;

    // public get shadowOpacity(): number {
    //     return this.nativeObject.xtr_shadowOpacity();
    // }

    // public set shadowOpacity(value: number) {
    //     this.nativeObject.xtr_setShadowOpacity(value);
    // }

    // private _shadowOffset: Size | undefined;

    // public get shadowOffset(): Size | undefined {
    //     return this.nativeObject.xtr_shadowOffset();
    // }

    // public set shadowOffset(value: Size | undefined) {
    //     this.nativeObject.xtr_setShadowOffset(value);
    // }

    // private _shadowRadius: number;

    // public get shadowRadius(): number {
    //     return this.nativeObject.xtr_shadowRadius();
    // }

    // public set shadowRadius(value: number) {
    //     this.nativeObject.xtr_setShadowRadius(value);
    // }

    // Mark: View Hierarchy

    public get tag(): number | undefined {
        return this.nativeObject.xtr_tag();
    }

    public set tag(value: number | undefined) {
        this.nativeObject.xtr_setTag(value);
    }

    public get superview(): View | undefined {
        const viewElement = this.nativeObject.xtr_superview()
        if (viewElement) {
            return viewElement.scriptObject;
        }
        return undefined;
    }

    public get subviews(): View[] {
        return this.nativeObject.xtr_subviews().map((t: ViewElement) => t.scriptObject);
    }

    window?: Window

    removeFromSuperview() {
        if (this.superview) { this.superview.willRemoveSubview(this) }
        this.willMoveToWindow(undefined)
        this.willMoveToSuperview(undefined)
        this.window = undefined
        this.nativeObject.xtr_removeFromSuperview();
        this.didMoveToSuperview()
        this.didMoveToWindow()
    }

    insertSubviewAtIndex(subview: View, atIndex: number) {
        subview.willMoveToSuperview(this)
        this.nativeObject.xtr_insertSubviewAtIndexAtIndex(subview.nativeObject, atIndex)
        this.didAddSubview(subview)
        subview.didMoveToSuperview()
    }

    exchangeSubviewAtIndex(index1: number, index2: number) {
        this.nativeObject.xtr_exchangeSubviewAtIndexIndex2(index1, index2)
    }

    addSubview(subview: View) {
        if ((this as any).className === "XTRWindow") {
            subview.window = this as any
        }
        else {
            subview.window = this.window
        }
        subview.willMoveToWindow(this.window)
        subview.willMoveToSuperview(this)
        this.nativeObject.xtr_addSubview(subview.nativeObject)
        this.didAddSubview(subview)
        subview.didMoveToSuperview()
        subview.didMoveToWindow()
    }

    insertSubviewBelow(subview: View, siblingSubview: View) {
        if ((this as any).className === "XTRWindow") {
            subview.window = this as any
        }
        else {
            subview.window = this.window
        }
        subview.willMoveToWindow(this.window)
        subview.willMoveToSuperview(this)
        this.nativeObject.xtr_insertSubviewBelowSiblingSubview(subview.nativeObject, siblingSubview.nativeObject);
        this.didAddSubview(subview)
        subview.didMoveToSuperview()
        subview.didMoveToWindow()
    }

    insertSubviewAbove(subview: View, siblingSubview: View) {
        if ((this as any).className === "XTRWindow") {
            subview.window = this as any
        }
        else {
            subview.window = this.window
        }
        subview.willMoveToWindow(this.window)
        subview.willMoveToSuperview(this)
        this.nativeObject.xtr_insertSubviewAboveSiblingSubview(subview.nativeObject, siblingSubview.nativeObject);
        this.didAddSubview(subview)
        subview.didMoveToSuperview()
        subview.didMoveToWindow()
    }

    bringSubviewToFront(subview: View) {
        this.nativeObject.xtr_bringSubviewToFront(subview.nativeObject);
    }

    sendSubviewToBack(subview: View) {
        this.nativeObject.xtr_sendSubviewToBack(subview.nativeObject);
    }

    didAddSubview(subview: View) { }
    willRemoveSubview(subview: View) { }
    willMoveToSuperview(newSuperview?: View) { }
    didMoveToSuperview() { }
    willMoveToWindow(newWindow?: Window) { }
    didMoveToWindow() { }

    isDescendantOfView(view: View) {
        return this.nativeObject.xtr_isDescendantOfView(view.nativeObject);
    }

    viewWithTag(tag: number): View | undefined {
        const viewElement = this.nativeObject.xtr_viewWithTag(tag);
        if (viewElement) {
            return viewElement.scriptObject
        }
        return undefined
    }

    setNeedsLayout() { this.layoutSubviews() }
    
    layoutIfNeeded() { this.layoutSubviews() }

    layoutSubviews() {
        if (this._constraints.length > 0) {
            let viewMapping: { [key: string]: View } = {}
            this._constraints.forEach(item => {
                if (item.firstItem !== undefined) { viewMapping[(item.firstItem as any).nativeObject.objectUUID] = item.firstItem as any }
                if (item.secondItem !== undefined) { viewMapping[(item.secondItem as any).nativeObject.objectUUID] = item.secondItem as any }
            })
            const view = new AutoLayout.View({
                constraints: this._constraints.map(item => (item as any).toALObject()),
                width: this.bounds.width,
                height: this.bounds.height,
            });
            for (const layoutID in view.subViews) {
                const value = view.subViews[layoutID];
                if (viewMapping[layoutID] !== undefined) {
                    const intrinsticSize = viewMapping[layoutID].intrinsicContentSize(value.width != 0 ? value.width : undefined);
                    if (intrinsticSize !== undefined && intrinsticSize !== null) {
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

    private _constraints: LayoutConstraint[] = [];

    public get constraints(): LayoutConstraint[] {
        return this._constraints.slice();
    }

    public intrinsicContentSize(width?: number): Size | undefined {
        return undefined;// this.nativeObject.xtr_intrinsicContentSize(width || Infinity);
    }

    public addConstraint(constraint: LayoutConstraint) {
        this._constraints.push(constraint);
    }

    public addConstraints(constraints: LayoutConstraint[]) {
        constraints.forEach(constraint => this._constraints.push(constraint));
    }

    public removeConstraint(constraint: LayoutConstraint) {
        const idx = this._constraints.indexOf(constraint);
        if (idx >= 0) {
            this._constraints.splice(idx, 1);
        }
    }

    public removeAllConstraints() {
        this._constraints = [];
    }

    // Mark: View Interactive
    // static InteractionState = InteractionState
    // static SwipeDirection = SwipeDirection

    // public get userInteractionEnabled(): boolean {
    //     return this.nativeObject.xtr_userInteractionEnabled();
    // }

    // public set userInteractionEnabled(value: boolean) {
    //     this.nativeObject.xtr_setUserInteractionEnabled(value);
    // }


    // public get longPressDuration(): number {
    //     return this.nativeObject.xtr_longPressDuration();
    // }

    // public set longPressDuration(value: number) {
    //     this.nativeObject.xtr_setLongPressDuration(value);
    //     this.nativeObject.xtr_activeLongPress();
    // }

    // private _onTap?: () => void

    // public get onTap() {
    //     return this._onTap;
    // }

    // public set onTap(value: (() => void) | undefined) {
    //     this._onTap = value;
    //     this.nativeObject.xtr_activeTap();
    // }

    // handleTap() {
    //     this.onTap && this.onTap();
    // }

    // private _onDoubleTap?: () => void

    // public get onDoubleTap() {
    //     return this._onDoubleTap;
    // }

    // public set onDoubleTap(value: (() => void) | undefined) {
    //     this._onDoubleTap = value;
    //     this.nativeObject.xtr_activeDoubleTap();
    // }

    // handleDoubleTap() {
    //     this.onDoubleTap && this.onDoubleTap();
    // }

    // private _onLongPress?: (state: InteractionState, viewLocation?: Point, absLocation?: Point) => void

    // public get onLongPress() {
    //     return this._onLongPress;
    // }

    // public set onLongPress(value: ((state: InteractionState, viewLocation?: Point, absLocation?: Point) => void) | undefined) {
    //     this._onLongPress = value;
    //     this.nativeObject.xtr_activeLongPress();
    // }

    // handleLongPress(state: number, viewLocation: Point, absLocation: Point) {
    //     if (state === 1) {
    //         this.onLongPress && this.onLongPress(InteractionState.Began, viewLocation, absLocation);
    //     }
    //     else if (state === 2) {
    //         this.onLongPress && this.onLongPress(InteractionState.Changed, viewLocation, absLocation);
    //     }
    //     else if (state === 3 || state === 4 || state === 5) {
    //         this.onLongPress && this.onLongPress(InteractionState.Ended, viewLocation, absLocation);
    //     }
    // }

    // private _onPan?: (state: InteractionState, viewLocation?: Point, absLocation?: Point) => void

    // public get onPan() {
    //     return this._onPan;
    // }

    // public set onPan(value: ((state: InteractionState, viewLocation?: Point, absLocation?: Point) => void) | undefined) {
    //     this._onPan = value;
    //     this.nativeObject.xtr_activePan();
    // }

    // handlePan(state: number, viewLocation: Point, absLocation: Point) {
    //     if (state === 1) {
    //         this.onPan && this.onPan(InteractionState.Began, viewLocation, absLocation);
    //     }
    //     else if (state === 2) {
    //         this.onPan && this.onPan(InteractionState.Changed, viewLocation, absLocation);
    //     }
    //     else if (state === 3 || state === 4 || state === 5) {
    //         this.onPan && this.onPan(InteractionState.Ended, viewLocation, absLocation);
    //     }
    // }

    // Mark: View Animation
    // static animationWithDuration(duration: number, animations: () => void, completion?: () => void) {
    //     XTRView.xtr_animationWithDurationAnimationCompletion(duration, animations, completion);
    // }

    // static animationWithBouncinessAndSpeed(damping: number, velocity: number, animations: () => void, completion?: () => void) { }

    // static animationWithDurationDampingVelocity(duration: number, damping: number, velocity: number, animations: () => void, completion?: () => void) {
    //     XTRView.xtr_animationWithBouncinessAndSpeedDampingVelocityAnimationCompletion(duration, damping, velocity, animations, completion);
    // }

}
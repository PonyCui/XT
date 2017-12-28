/// <reference path="xtr.d.ts" />
import { SwipeDirection, InteractionState } from '../../interface/View';
import { Rect, Point, Size, RectZero } from "../../interface/Rect";
import { Color } from "../../interface/Color";
import { TransformMatrix } from "../../interface/TransformMatrix";
import { LayoutConstraint } from "./LayoutConstraint";
import { Releasable } from '../../interface/Releasable';

export class View implements Releasable {

    retain(): this {
        XTMemoryManager_Retain(this.objectRef)
        return this
    }

    release(): this {
        XTMemoryManager_Release(this.objectRef)
        return this
    }

    addOwner(owner: any): this {
        // xtrAddOwner(this, owner);
        return this;
    }

    objectRef: any;

    constructor(rect?: Rect | string, _isChild: boolean = false) {
        if (_isChild) { return; }
        if (typeof rect === "string") {
            this.objectRef = rect;
            objectRefs[this.objectRef] = this;
        }
        else {
            this.objectRef = XTRView.create(rect || RectZero);
            objectRefs[this.objectRef] = this;
            setImmediate(() => { this.init(); });
        }
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
        const value = this.nativeObject.xtr_transform();
        if (value instanceof Object) {
            return new TransformMatrix(value.a, value.b, value.c, value.d, value.tx, value.ty)
        }
        return new TransformMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
    }

    public set transform(value: TransformMatrix) {
        this.nativeObject.xtr_setTransform(value);
    }

    // Mark: View Rendering
    private _clipsToBounds: boolean;

    public get clipsToBounds(): boolean {
        return this.nativeObject.xtr_clipsToBounds();
    }

    public set clipsToBounds(value: boolean) {
        this.nativeObject.xtr_setClipsToBounds(value);
    }

    private _backgroundColor?: Color;

    public get backgroundColor(): Color | undefined {
        const value = this.nativeObject.xtr_backgroundColor();
        if (value instanceof Object) {
            return new Color(value.r, value.g, value.b, value.a)
        }
        return undefined;
    }

    public set backgroundColor(value: Color | undefined) {
        this.nativeObject.xtr_setBackgroundColor(value);
    }

    private _alpha: number;

    public get alpha(): number {
        return this.nativeObject.xtr_alpha();
    }

    public set alpha(value: number) {
        this.nativeObject.xtr_setAlpha(value);
    }

    private _opaque: boolean;

    public get opaque(): boolean {
        return this.nativeObject.xtr_opaque();
    }

    public set opaque(value: boolean) {
        this.nativeObject.xtr_setOpaque(value);
    }

    private _hidden: boolean;

    public get hidden(): boolean {
        return this.nativeObject.xtr_hidden();
    }

    public set hidden(value: boolean) {
        this.nativeObject.xtr_setHidden(value);
    }

    private _contentMode: number | undefined;

    public get contentMode(): number | undefined {
        return this.nativeObject.xtr_contentMode();
    }

    public set contentMode(value: number | undefined) {
        this.nativeObject.xtr_setContentMode(value);
    }

    private _maskView: View | undefined

    public get maskView(): View | undefined {
        return this.nativeObject.xtr_maskView();
    }

    public set maskView(value: View | undefined) {
        this.nativeObject.xtr_setMaskView(value);
    }

    private _tintColor: Color

    public get tintColor(): Color {
        const value = this.nativeObject.xtr_tintColor();
        if (value instanceof Object) {
            return new Color(value.r, value.g, value.b, value.a)
        }
        return new Color(0.0, 122.0 / 255.0, 1.0);
    }

    public set tintColor(value: Color) {
        this.nativeObject.xtr_setTintColor(value);
    }

    tintColorDidChange() { }

    setNeedsDisplay() { }

    // Mark: View Layer-Back Rendering
    private _cornerRadius: number;

    public get cornerRadius(): number {
        return this.nativeObject.xtr_cornerRadius();
    }

    public set cornerRadius(value: number) {
        this.nativeObject.xtr_setCornerRadius(value);
    }

    private _borderWidth: number;

    public get borderWidth(): number {
        return this.nativeObject.xtr_borderWidth();
    }

    public set borderWidth(value: number) {
        this.nativeObject.xtr_setBorderWidth(value);
    }

    private _borderColor: Color | undefined;

    public get borderColor(): Color | undefined {
        const value = this.nativeObject.xtr_borderColor();
        if (value instanceof Object) {
            return new Color(value.r, value.g, value.b, value.a)
        }
        return undefined;
    }

    public set borderColor(value: Color | undefined) {
        this.nativeObject.xtr_setBorderColor(value);
    }

    private _shadowColor: Color | undefined;

    public get shadowColor(): Color | undefined {
        const value = this.nativeObject.xtr_shadowColor();
        if (value instanceof Object) {
            return new Color(value.r, value.g, value.b, value.a)
        }
        return undefined;
    }

    public set shadowColor(value: Color | undefined) {
        this.nativeObject.xtr_setShadowColor(value);
    }

    private _shadowOpacity: number;

    public get shadowOpacity(): number {
        return this.nativeObject.xtr_shadowOpacity();
    }

    public set shadowOpacity(value: number) {
        this.nativeObject.xtr_setShadowOpacity(value);
    }

    private _shadowOffset: Size | undefined;

    public get shadowOffset(): Size | undefined {
        return this.nativeObject.xtr_shadowOffset();
    }

    public set shadowOffset(value: Size | undefined) {
        this.nativeObject.xtr_setShadowOffset(value);
    }

    private _shadowRadius: number;

    public get shadowRadius(): number {
        return this.nativeObject.xtr_shadowRadius();
    }

    public set shadowRadius(value: number) {
        this.nativeObject.xtr_setShadowRadius(value);
    }

    // Mark: View Hierarchy
    private _tag: number | undefined;

    public get tag(): number | undefined {
        return this.nativeObject.xtr_tag();
    }

    public set tag(value: number | undefined) {
        this.nativeObject.xtr_setTag(value);
    }

    public get superview(): View | undefined {
        return this.nativeObject.xtr_superview();
    }

    public get subviews(): View[] {
        return this.nativeObject.xtr_subviews();
    }

    window?: Window

    removeFromSuperview() {
        this.nativeObject.xtr_removeFromSuperview();
    }

    insertSubviewAtIndex(subview: View, atIndex: number) {
        this.nativeObject.xtr_insertSubviewAtIndexAtIndex(subview, atIndex)
    }

    exchangeSubviewAtIndex(index1: number, index2: number) {
        this.nativeObject.xtr_exchangeSubviewAtIndexIndex2(index1, index2)
    }

    addSubview(subview: View) {
        this.nativeObject.xtr_addSubview(subview)
    }

    insertSubviewBelow(subview: View, siblingSubview: View) {
        this.nativeObject.xtr_insertSubviewBelowSiblingSubview(subview, siblingSubview);
    }

    insertSubviewAbove(subview: View, siblingSubview: View) {
        this.nativeObject.xtr_insertSubviewAboveSiblingSubview(subview, siblingSubview);
    }

    bringSubviewToFront(subview: View) {
        this.nativeObject.xtr_bringSubviewToFront(subview);
    }

    sendSubviewToBack(subview: View) {
        this.nativeObject.xtr_sendSubviewToBack(subview);
    }

    didAddSubview(subview: View) { }
    willRemoveSubview(subview: View) { }

    willMoveToSuperview(newSuperview?: View) { }
    didMoveToSuperview() { }
    willMoveToWindow(newWindow?: Window) { }
    didMoveToWindow() { }

    isDescendantOfView(view: View) {
        return this.nativeObject.xtr_isDescendantOfView(view);
    }

    viewWithTag(tag: number): View | undefined {
        return this.nativeObject.xtr_viewWithTag(tag);
    }

    setNeedsLayout() { this.nativeObject.xtr_setNeedsLayout() }
    layoutIfNeeded() { this.nativeObject.xtr_layoutIfNeeded() }
    layoutSubviews() { }

    // Mark: View LayoutConstraint

    public get constraints(): LayoutConstraint[] {
        return this.nativeObject.xtr_constraints();
    }

    addConstraint(constraint: LayoutConstraint) {
        this.nativeObject.xtr_addConstraint(constraint);
    }

    addConstraints(constraints: LayoutConstraint[]) {
        this.nativeObject.xtr_addConstraints(constraints);
    }

    removeConstraint(constraint: LayoutConstraint) {
        this.nativeObject.xtr_removeConstraint();
    }

    removeAllConstraints() {
        this.nativeObject.xtr_removeAllConstraints();
    }

    // Mark: View Interactive
    static InteractionState = InteractionState
    static SwipeDirection = SwipeDirection

    public get userInteractionEnabled(): boolean {
        return this.nativeObject.xtr_userInteractionEnabled();
    }

    public set userInteractionEnabled(value: boolean) {
        this.nativeObject.xtr_setUserInteractionEnabled(value);
    }


    public get longPressDuration(): number {
        return this.nativeObject.xtr_longPressDuration();
    }

    public set longPressDuration(value: number) {
        this.nativeObject.xtr_setLongPressDuration(value);
        this.nativeObject.xtr_activeLongPress();
    }

    private _onTap?: () => void

    public get onTap() {
        return this._onTap;
    }

    public set onTap(value: (() => void) | undefined) {
        this._onTap = value;
        this.nativeObject.xtr_activeTap();
    }

    handleTap() {
        this.onTap && this.onTap();
    }

    private _onDoubleTap?: () => void

    public get onDoubleTap() {
        return this._onDoubleTap;
    }

    public set onDoubleTap(value: (() => void) | undefined) {
        this._onDoubleTap = value;
        this.nativeObject.xtr_activeDoubleTap();
    }

    handleDoubleTap() {
        this.onDoubleTap && this.onDoubleTap();
    }

    private _onLongPress?: (state: InteractionState, viewLocation?: Point, absLocation?: Point) => void

    public get onLongPress() {
        return this._onLongPress;
    }

    public set onLongPress(value: ((state: InteractionState, viewLocation?: Point, absLocation?: Point) => void) | undefined) {
        this._onLongPress = value;
        this.nativeObject.xtr_activeLongPress();
    }

    handleLongPress(state: number, viewLocation: Point, absLocation: Point) {
        if (state === 1) {
            this.onLongPress && this.onLongPress(InteractionState.Began, viewLocation, absLocation);
        }
        else if (state === 2) {
            this.onLongPress && this.onLongPress(InteractionState.Changed, viewLocation, absLocation);
        }
        else if (state === 3 || state === 4 || state === 5) {
            this.onLongPress && this.onLongPress(InteractionState.Ended, viewLocation, absLocation);
        }
    }

    private _onPan?: (state: InteractionState, viewLocation?: Point, absLocation?: Point) => void

    public get onPan() {
        return this._onPan;
    }

    public set onPan(value: ((state: InteractionState, viewLocation?: Point, absLocation?: Point) => void) | undefined) {
        this._onPan = value;
        this.nativeObject.xtr_activePan();
    }

    handlePan(state: number, viewLocation: Point, absLocation: Point) {
        if (state === 1) {
            this.onPan && this.onPan(InteractionState.Began, viewLocation, absLocation);
        }
        else if (state === 2) {
            this.onPan && this.onPan(InteractionState.Changed, viewLocation, absLocation);
        }
        else if (state === 3 || state === 4 || state === 5) {
            this.onPan && this.onPan(InteractionState.Ended, viewLocation, absLocation);
        }
    }

    // Mark: View Animation
    static animationWithDuration(duration: number, animations: () => void, completion?: () => void) {
        XTRView.xtr_animationWithDurationAnimationCompletion(duration, animations, completion);
    }

    static animationWithBouncinessAndSpeed(damping: number, velocity: number, animations: () => void, completion?: () => void) { }

    static animationWithDurationDampingVelocity(duration: number, damping: number, velocity: number, animations: () => void, completion?: () => void) {
        XTRView.xtr_animationWithBouncinessAndSpeedDampingVelocityAnimationCompletion(duration, damping, velocity, animations, completion);
    }

}
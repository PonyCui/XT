/// <reference path="xtr.d.ts" />
import { SwipeDirection, InteractionState } from '../interface/View';
import { Rect, Point, Size, RectZero } from "../interface/Rect";
import { Color } from "../interface/Color";
import { TransformMatrix } from "../interface/TransformMatrix";
import { LayoutConstraint } from "./LayoutConstraint";
import { Releasable } from '../interface/Releasable';
const AutoLayout = require("autolayout");

export class View implements Releasable {

    retain(owner: any = undefined): this {
        _XTRetain(this.objectRef, owner && owner.objectRef ? owner.objectRef : undefined)
        return this
    }

    release(): this {
        _XTRelease(this.objectRef)
        return this
    }

    public objectRef: any;

    static findByRef<T extends View>(ref: string): T {
        return objectRefs[ref] || new this(ref)
    }

    constructor(ref: string | Object | Function | undefined = undefined, ...args: any[]) {
        if (typeof ref === "string") {
            if (objectRefs[ref]) {
                return objectRefs[ref]
            }
            this.objectRef = ref
        }
        else if (typeof ref === "function") {
            let args = [];
            for (let index = 0; index < arguments.length; index++) {
                if (index > 0) {
                    args.push(arguments[index])
                }
            }
            this.objectRef = ref.apply(this, args)
        }
        else if (typeof ref === "object") {
            this.objectRef = (ref as any).create()
        }
        else {
            this.objectRef = _XTUIView.create()
        }
        objectRefs[this.objectRef] = this;
    }

    toString(): string {
        return JSON.stringify(this.toObject())
    }

    toObject(): any {
        return {
            class: "UI.View",
            frame: this.frame,
            transform: this.transform,
            clipsToBounds: this.clipsToBounds,
            backgroundColor: this.backgroundColor,
            alpha: this.alpha,
            opaque: this.opaque,
            hidden: this.hidden,
            cornerRadius: this.cornerRadius,
            borderWidth: this.borderWidth,
            borderColor: this.borderColor,
            shadowColor: this.shadowColor,
            shadowOpacity: this.shadowOpacity,
            shadowOffset: this.shadowOffset,
            shadowRadius: this.shadowRadius,
            tag: this.tag,
            subviews: this.subviews.map(it => it.toObject()),
            userInteractionEnabled: this.userInteractionEnabled,
        }
    }

    // Mark: View Geometry

    public get frame(): Rect {
        return _XTUIView.xtr_frame(this.objectRef);
    }

    public set frame(value: Rect) {
        _XTUIView.xtr_setFrameObjectRef(value, this.objectRef);
    }

    public get bounds(): Rect {
        return _XTUIView.xtr_bounds(this.objectRef);
    }

    public set bounds(value: Rect) {
        _XTUIView.xtr_setBoundsObjectRef(value, this.objectRef);
    }

    public get center(): Point {
        return _XTUIView.xtr_center(this.objectRef);
    }

    public set center(value: Point) {
        _XTUIView.xtr_setCenterObjectRef(value, this.objectRef);
    }

    public get transform(): TransformMatrix {
        const value = _XTUIView.xtr_transform(this.objectRef);
        if (value instanceof Object) {
            return new TransformMatrix(value.a, value.b, value.c, value.d, value.tx, value.ty)
        }
        return new TransformMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
    }

    public set transform(value: TransformMatrix) {
        _XTUIView.xtr_setTransformObjectRef(value, this.objectRef);
    }

    // Mark: View Rendering

    public get clipsToBounds(): boolean {
        return _XTUIView.xtr_clipsToBounds(this.objectRef);
    }

    public set clipsToBounds(value: boolean) {
        _XTUIView.xtr_setClipsToBoundsObjectRef(value, this.objectRef);
    }

    public get backgroundColor(): Color {
        return _XTUIView.xtr_backgroundColor(this.objectRef)
    }

    public set backgroundColor(value: Color) {
        _XTUIView.xtr_setBackgroundColorObjectRef(value, this.objectRef);
    }

    public get alpha(): number {
        return _XTUIView.xtr_alpha(this.objectRef);
    }

    public set alpha(value: number) {
        _XTUIView.xtr_setAlphaObjectRef(value, this.objectRef);
    }

    public get opaque(): boolean {
        return _XTUIView.xtr_opaque(this.objectRef);
    }

    public set opaque(value: boolean) {
        _XTUIView.xtr_setOpaqueObjectRef(value, this.objectRef);
    }

    public get hidden(): boolean {
        return _XTUIView.xtr_hidden(this.objectRef);
    }

    public set hidden(value: boolean) {
        _XTUIView.xtr_setHiddenObjectRef(value, this.objectRef);
    }

    public get contentMode(): number {
        return _XTUIView.xtr_contentMode(this.objectRef);
    }

    public set contentMode(value: number) {
        _XTUIView.xtr_setContentModeObjectRef(value, this.objectRef);
    }

    public get maskView(): View | undefined {
        const ref = _XTUIView.xtr_maskView(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return View.findByRef(ref);
    }

    public set maskView(value: View | undefined) {
        _XTUIView.xtr_setMaskViewObjectRef(value ? value.objectRef : "", this.objectRef);
    }

    public get tintColor(): Color {
        const value = _XTUIView.xtr_tintColor(this.objectRef);
        if (value instanceof Object) {
            return new Color(value.r, value.g, value.b, value.a)
        }
        return new Color(0.0, 122.0 / 255.0, 1.0);
    }

    public set tintColor(value: Color) {
        _XTUIView.xtr_setTintColorObjectRef(value, this.objectRef);
    }

    tintColorDidChange() { }

    setNeedsDisplay() { }

    // Mark: View Layer-Back Rendering

    public get cornerRadius(): number {
        return _XTUIView.xtr_cornerRadius(this.objectRef);
    }

    public set cornerRadius(value: number) {
        _XTUIView.xtr_setCornerRadiusObjectRef(value, this.objectRef);
    }

    public get borderWidth(): number {
        return _XTUIView.xtr_borderWidth(this.objectRef);
    }

    public set borderWidth(value: number) {
        _XTUIView.xtr_setBorderWidthObjectRef(value, this.objectRef);
    }

    public get borderColor(): Color {
        const value = _XTUIView.xtr_borderColor(this.objectRef);
        return new Color(value.r, value.g, value.b, value.a)
    }

    public set borderColor(value: Color) {
        _XTUIView.xtr_setBorderColorObjectRef(value, this.objectRef);
    }

    public get shadowColor(): Color {
        const value = _XTUIView.xtr_shadowColor(this.objectRef);
        return new Color(value.r, value.g, value.b, value.a)
    }

    public set shadowColor(value: Color) {
        _XTUIView.xtr_setShadowColorObjectRef(value, this.objectRef);
    }

    public get shadowOpacity(): number {
        return _XTUIView.xtr_shadowOpacity(this.objectRef);
    }

    public set shadowOpacity(value: number) {
        _XTUIView.xtr_setShadowOpacityObjectRef(value, this.objectRef);
    }

    public get shadowOffset(): Size {
        return _XTUIView.xtr_shadowOffset(this.objectRef);
    }

    public set shadowOffset(value: Size) {
        _XTUIView.xtr_setShadowOffsetObjectRef(value, this.objectRef);
    }

    public get shadowRadius(): number {
        return _XTUIView.xtr_shadowRadius(this.objectRef);
    }

    public set shadowRadius(value: number) {
        _XTUIView.xtr_setShadowRadiusObjectRef(value, this.objectRef);
    }

    // Mark: View Hierarchy

    public get tag(): number {
        return _XTUIView.xtr_tag(this.objectRef);
    }

    public set tag(value: number) {
        _XTUIView.xtr_setTagObjectRef(value, this.objectRef);
    }

    public get superview(): View | undefined {
        const ref = _XTUIView.xtr_superview(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return View.findByRef(ref);
    }

    public get subviews(): View[] {
        return _XTUIView.xtr_subviews(this.objectRef).map((ref: string) => {
            return View.findByRef(ref);
        });
    }

    public get window(): any | undefined {
        const ref = _XTUIView.xtr_window(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return (UI as any).Window.findByRef(ref);
    }

    removeFromSuperview() {
        _XTUIView.xtr_removeFromSuperview(this.objectRef);
    }

    insertSubviewAtIndex(subview: View, atIndex: number) {
        _XTUIView.xtr_insertSubviewAtIndexAtIndexObjectRef(subview.objectRef, atIndex, this.objectRef)
    }

    exchangeSubviewAtIndex(index1: number, index2: number) {
        _XTUIView.xtr_exchangeSubviewAtIndexIndex2ObjectRef(index1, index2, this.objectRef)
    }

    addSubview(subview: View) {
        _XTUIView.xtr_addSubviewObjectRef(subview.objectRef, this.objectRef)
    }

    insertSubviewBelow(subview: View, siblingSubview: View) {
        _XTUIView.xtr_insertSubviewBelowSiblingSubviewObjectRef(subview.objectRef, siblingSubview.objectRef, this.objectRef);
    }

    insertSubviewAbove(subview: View, siblingSubview: View) {
        _XTUIView.xtr_insertSubviewAboveSiblingSubviewObjectRef(subview.objectRef, siblingSubview.objectRef, this.objectRef);
    }

    bringSubviewToFront(subview: View) {
        _XTUIView.xtr_bringSubviewToFrontObjectRef(subview.objectRef, this.objectRef);
    }

    sendSubviewToBack(subview: View) {
        _XTUIView.xtr_sendSubviewToBackObjectRef(subview.objectRef, this.objectRef);
    }

    private _didAddSubview(subviewRef: string) { this.didAddSubview(View.findByRef<View>(subviewRef)) }
    private _willRemoveSubview(subviewRef: string) { this.willRemoveSubview(View.findByRef(subviewRef)) }
    private _willMoveToSuperview(newSuperviewRef?: string) { this.willMoveToSuperview(newSuperviewRef ? View.findByRef(newSuperviewRef) : undefined) }
    private _didMoveToSuperview() { this.didMoveToSuperview() }
    private _willMoveToWindow(newWindowRef?: string) { this.willMoveToWindow(newWindowRef ? (UI as any).Window.findByRef(newWindowRef) as any : undefined) }
    private _didMoveToWindow() { this.didMoveToWindow() }

    didAddSubview(subview: View) { }
    willRemoveSubview(subview: View) { }
    willMoveToSuperview(newSuperview?: View) { }
    didMoveToSuperview() { }
    willMoveToWindow(newWindow?: Window) { }
    didMoveToWindow() { }

    isDescendantOfView(view: View) {
        return _XTUIView.xtr_isDescendantOfViewObjectRef(view.objectRef, this.objectRef);
    }

    viewWithTag(tag: number): View | undefined {
        const ref = _XTUIView.xtr_viewWithTagObjectRef(tag, this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return View.findByRef(ref);
    }

    setNeedsLayout() { _XTUIView.xtr_setNeedsLayout(this.objectRef) }
    layoutIfNeeded() { _XTUIView.xtr_layoutIfNeeded(this.objectRef) }
    layoutSubviews() {
        if (this._constraints.length > 0) {
            let viewMapping: { [key: string]: View } = {}
            this._constraints.forEach(item => {
                if (item.firstItem !== undefined) { viewMapping[(item.firstItem as any).objectRef] = item.firstItem as any }
                if (item.secondItem !== undefined) { viewMapping[(item.secondItem as any).objectRef] = item.secondItem as any }
            })
            let constraints = this._constraints.map(item => (item as any).toALObject())
            AutoLayout.VisualFormat.parse("HV:|[_]|", { extended: true }).forEach((it: any) => constraints.push(it))
            const view = new AutoLayout.View({
                constraints,
                width: this.bounds.width,
                height: this.bounds.height,
            });
            for (const layoutID in view.subViews) {
                const value = view.subViews[layoutID];
                if (viewMapping[layoutID] !== undefined && (value.width <= 0 || value.height <= 0)) {
                    const intrinsticSize = viewMapping[layoutID].intrinsicContentSize(value.width != 0 ? value.width : undefined);
                    if (intrinsticSize !== undefined && intrinsticSize !== null) {
                        value.intrinsicWidth = value.width > 0 ? undefined : intrinsticSize.width;
                        value.intrinsicHeight = value.height > 0 ? undefined : intrinsticSize.height;
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
        return this._constraints;
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
    static InteractionState = InteractionState
    static SwipeDirection = SwipeDirection

    public get userInteractionEnabled(): boolean {
        return _XTUIView.xtr_userInteractionEnabled(this.objectRef);
    }

    public set userInteractionEnabled(value: boolean) {
        _XTUIView.xtr_setUserInteractionEnabledObjectRef(value, this.objectRef);
    }


    public get longPressDuration(): number {
        return _XTUIView.xtr_longPressDuration(this.objectRef);
    }

    public set longPressDuration(value: number) {
        _XTUIView.xtr_setLongPressDurationObjectRef(value, this.objectRef);
        _XTUIView.xtr_activeLongPress(this.objectRef);
    }

    private _onTap?: () => void

    public get onTap() {
        return this._onTap;
    }

    public set onTap(value: (() => void) | undefined) {
        this._onTap = value;
        _XTUIView.xtr_activeTap(this.objectRef);
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
        _XTUIView.xtr_activeDoubleTap(this.objectRef);
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
        _XTUIView.xtr_activeLongPress(this.objectRef);
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

    public set onPan(value: ((state: InteractionState, viewLocation?: Point, absLocation?: Point, velocity?: Point, translation?: Point) => void) | undefined) {
        this._onPan = value;
        _XTUIView.xtr_activePan(this.objectRef);
    }

    handlePan(state: number, viewLocation: Point, absLocation: Point, velocity: Point, translation: Point) {
        if (state === 1) {
            this.onPan && this.onPan(InteractionState.Began, viewLocation, absLocation, velocity, translation);
        }
        else if (state === 2) {
            this.onPan && this.onPan(InteractionState.Changed, viewLocation, absLocation, velocity, translation);
        }
        else if (state === 3 || state === 4 || state === 5) {
            this.onPan && this.onPan(InteractionState.Ended, viewLocation, absLocation, velocity, translation);
        }
    }

    // Mark: View Animation

    static animationWithDuration(duration: number, animations: () => void, completion?: () => void) {
        _XTUIView.xtr_animationWithDurationAnimationCompletion(duration, animations, completion);
    }

    static springAnimationDuration = 0.5

    static animationWithBouncinessAndSpeed(bounciness: number, velocity: number, animations: () => void, completion?: () => void) {
        _XTUIView.xtr_animationWithBouncinessBouncinessVelocityAnimationCompletion(this.springAnimationDuration, bounciness, velocity, animations, completion);
    }

}
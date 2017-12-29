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

    public objectRef: any;

    constructor(ref: string | Object | Function | undefined = undefined, ...args: any[]) {
        if (typeof ref === "string") {
            this.objectRef = ref;
            if (objectRefs[ref]) {
                objectRefs[ref] = this;
            }
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
            this.objectRef = XTRView.create()
        }
    }

    // Mark: View Geometry

    public get frame(): Rect {
        return XTRView.xtr_frame(this.objectRef);
    }

    public set frame(value: Rect) {
        XTRView.xtr_setFrameObjectRef(value, this.objectRef);
    }

    public get bounds(): Rect {
        return XTRView.xtr_bounds(this.objectRef);
    }

    public set bounds(value: Rect) {
        XTRView.xtr_setBoundsObjectRef(value, this.objectRef);
    }

    public get center(): Point {
        return XTRView.xtr_center(this.objectRef);
    }

    public set center(value: Point) {
        XTRView.xtr_setCenterObjectRef(value, this.objectRef);
    }

    public get transform(): TransformMatrix {
        const value = XTRView.xtr_transform(this.objectRef);
        if (value instanceof Object) {
            return new TransformMatrix(value.a, value.b, value.c, value.d, value.tx, value.ty)
        }
        return new TransformMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
    }

    public set transform(value: TransformMatrix) {
        XTRView.xtr_setTransformObjectRef(value, this.objectRef);
    }

    // Mark: View Rendering

    public get clipsToBounds(): boolean {
        return XTRView.xtr_clipsToBounds(this.objectRef);
    }

    public set clipsToBounds(value: boolean) {
        XTRView.xtr_setClipsToBoundsObjectRef(value, this.objectRef);
    }

    public get backgroundColor(): Color | undefined {
        const value = XTRView.xtr_backgroundColor(this.objectRef);
        if (value instanceof Object) {
            return new Color(value.r, value.g, value.b, value.a)
        }
        return undefined;
    }

    public set backgroundColor(value: Color | undefined) {
        XTRView.xtr_setBackgroundColorObjectRef(value, this.objectRef);
    }

    public get alpha(): number {
        return XTRView.xtr_alpha(this.objectRef);
    }

    public set alpha(value: number) {
        XTRView.xtr_setAlphaObjectRef(value, this.objectRef);
    }

    public get opaque(): boolean {
        return XTRView.xtr_opaque(this.objectRef);
    }

    public set opaque(value: boolean) {
        XTRView.xtr_setOpaqueObjectRef(value, this.objectRef);
    }

    public get hidden(): boolean {
        return XTRView.xtr_hidden(this.objectRef);
    }

    public set hidden(value: boolean) {
        XTRView.xtr_setHiddenObjectRef(value, this.objectRef);
    }

    public get contentMode(): number | undefined {
        return XTRView.xtr_contentMode(this.objectRef);
    }

    public set contentMode(value: number | undefined) {
        XTRView.xtr_setContentModeObjectRef(value, this.objectRef);
    }

    public get maskView(): View | undefined {
        const ref = XTRView.xtr_maskView(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new View(ref);
    }

    public set maskView(value: View | undefined) {
        XTRView.xtr_setMaskViewObjectRef(value ? value.objectRef : undefined, this.objectRef);
    }

    public get tintColor(): Color {
        const value = XTRView.xtr_tintColor(this.objectRef);
        if (value instanceof Object) {
            return new Color(value.r, value.g, value.b, value.a)
        }
        return new Color(0.0, 122.0 / 255.0, 1.0);
    }

    public set tintColor(value: Color) {
        XTRView.xtr_setTintColorObjectRef(value, this.objectRef);
    }

    tintColorDidChange() { }

    setNeedsDisplay() { }

    // Mark: View Layer-Back Rendering

    public get cornerRadius(): number {
        return XTRView.xtr_cornerRadius(this.objectRef);
    }

    public set cornerRadius(value: number) {
        XTRView.xtr_setCornerRadiusObjectRef(value, this.objectRef);
    }

    public get borderWidth(): number {
        return XTRView.xtr_borderWidth(this.objectRef);
    }

    public set borderWidth(value: number) {
        XTRView.xtr_setBorderWidthObjectRef(value, this.objectRef);
    }

    public get borderColor(): Color | undefined {
        const value = XTRView.xtr_borderColor(this.objectRef);
        if (value instanceof Object) {
            return new Color(value.r, value.g, value.b, value.a)
        }
        return undefined;
    }

    public set borderColor(value: Color | undefined) {
        XTRView.xtr_setBorderColorObjectRef(value, this.objectRef);
    }

    public get shadowColor(): Color | undefined {
        const value = XTRView.xtr_shadowColor(this.objectRef);
        if (value instanceof Object) {
            return new Color(value.r, value.g, value.b, value.a)
        }
        return undefined;
    }

    public set shadowColor(value: Color | undefined) {
        XTRView.xtr_setShadowColorObjectRef(value, this.objectRef);
    }

    public get shadowOpacity(): number {
        return XTRView.xtr_shadowOpacity(this.objectRef);
    }

    public set shadowOpacity(value: number) {
        XTRView.xtr_setShadowOpacityObjectRef(value, this.objectRef);
    }

    public get shadowOffset(): Size | undefined {
        return XTRView.xtr_shadowOffset(this.objectRef);
    }

    public set shadowOffset(value: Size | undefined) {
        XTRView.xtr_setShadowOffsetObjectRef(value, this.objectRef);
    }

    public get shadowRadius(): number {
        return XTRView.xtr_shadowRadius(this.objectRef);
    }

    public set shadowRadius(value: number) {
        XTRView.xtr_setShadowRadiusObjectRef(value, this.objectRef);
    }

    // Mark: View Hierarchy

    public get tag(): number | undefined {
        return XTRView.xtr_tag(this.objectRef);
    }

    public set tag(value: number | undefined) {
        XTRView.xtr_setTagObjectRef(value, this.objectRef);
    }

    public get superview(): View | undefined {
        const ref = XTRView.xtr_superview(this.objectRef)
        if (!ref) { return undefined }
        return new View(ref);
    }

    public get subviews(): View[] {
        return XTRView.xtr_subviews(this.objectRef).map((ref: string) => {
            return new View(ref);
        });
    }

    window?: Window

    removeFromSuperview() {
        XTRView.xtr_removeFromSuperview(this.objectRef);
    }

    insertSubviewAtIndex(subview: View, atIndex: number) {
        XTRView.xtr_insertSubviewAtIndexAtIndexObjectRef(subview, atIndex, this.objectRef)
    }

    exchangeSubviewAtIndex(index1: number, index2: number) {
        XTRView.xtr_exchangeSubviewAtIndexIndex2ObjectRef(index1, index2, this.objectRef)
    }

    addSubview(subview: View) {
        XTRView.xtr_addSubviewObjectRef(subview, this.objectRef)
    }

    insertSubviewBelow(subview: View, siblingSubview: View) {
        XTRView.xtr_insertSubviewBelowSiblingSubviewObjectRef(subview, siblingSubview, this.objectRef);
    }

    insertSubviewAbove(subview: View, siblingSubview: View) {
        XTRView.xtr_insertSubviewAboveSiblingSubviewObjectRef(subview, siblingSubview, this.objectRef);
    }

    bringSubviewToFront(subview: View) {
        XTRView.xtr_bringSubviewToFrontObjectRef(subview, this.objectRef);
    }

    sendSubviewToBack(subview: View) {
        XTRView.xtr_sendSubviewToBackObjectRef(subview, this.objectRef);
    }

    didAddSubview(subview: View) { }
    willRemoveSubview(subview: View) { }
    willMoveToSuperview(newSuperview?: View) { }
    didMoveToSuperview() { }
    willMoveToWindow(newWindow?: Window) { }
    didMoveToWindow() { }

    isDescendantOfView(view: View) {
        return XTRView.xtr_isDescendantOfViewObjectRef(view, this.objectRef);
    }

    viewWithTag(tag: number): View | undefined {
        const ref = XTRView.xtr_viewWithTagObjectRef(tag, this.objectRef)
        if (!ref) { return undefined }
        return new View(ref);
    }

    setNeedsLayout() { XTRView.xtr_setNeedsLayout() }
    layoutIfNeeded() { XTRView.xtr_layoutIfNeeded() }
    layoutSubviews() { }

    // Mark: View LayoutConstraint

    public get constraints(): LayoutConstraint[] {
        return XTRView.xtr_constraints(this.objectRef).map((ref: string) => {
            return objectRefs[ref] // todo
        });
    }

    addConstraint(constraint: LayoutConstraint) {
        // XTRView.xtr_addConstraint(constraint);
    }

    addConstraints(constraints: LayoutConstraint[]) {
        // XTRView.xtr_addConstraints(constraints);
    }

    removeConstraint(constraint: LayoutConstraint) {
        // XTRView.xtr_removeConstraint();
    }

    removeAllConstraints() {
        // XTRView.xtr_removeAllConstraints(this.objectRef);
    }

    // Mark: View Interactive
    static InteractionState = InteractionState
    static SwipeDirection = SwipeDirection

    public get userInteractionEnabled(): boolean {
        return XTRView.xtr_userInteractionEnabled(this.objectRef);
    }

    public set userInteractionEnabled(value: boolean) {
        XTRView.xtr_setUserInteractionEnabledObjectRef(value, this.objectRef);
    }


    public get longPressDuration(): number {
        return XTRView.xtr_longPressDuration(this.objectRef);
    }

    public set longPressDuration(value: number) {
        XTRView.xtr_setLongPressDurationObjectRef(value, this.objectRef);
        XTRView.xtr_activeLongPress(this.objectRef);
    }

    private _onTap?: () => void

    public get onTap() {
        return this._onTap;
    }

    public set onTap(value: (() => void) | undefined) {
        this._onTap = value;
        XTRView.xtr_activeTap(this.objectRef);
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
        XTRView.xtr_activeDoubleTap(this.objectRef);
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
        XTRView.xtr_activeLongPress(this.objectRef);
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
        XTRView.xtr_activePan(this.objectRef);
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
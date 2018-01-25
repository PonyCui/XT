import { Rect, RectMake, Point, PointMake, Size, RectZero } from '../../interface/Rect'
import { Color } from '../../interface/Color'
import { Window } from './Window'
import { TransformMatrix } from '../../interface/TransformMatrix'
import { LayoutConstraint } from "../../interface/LayoutConstraint";
import { Touchable, Touch, Event, TouchManager } from '../libraries/touch/TouchManager';
import { CoordinateOwner, isPointInside, convertPointToChildView } from '../libraries/coordinate/CoordinateManager';
import { GestureOwner, GestureRecongnizer, GestureManager, GestureRecognizerState } from '../libraries/touch/GestureManager';
import { TapGestureRecognizer } from '../libraries/touch/TapGestureRecognizer';
import { LongPressGestureRecognizer } from '../libraries/touch/LongPressGestureRecognizer';
import { PanGestureRecognizer } from '../libraries/touch/PanGestureRecognizer';
import { Releasable } from '../../interface/Releasable';
declare function require(name: string): any;
const AutoLayout = require("autolayout");

export enum InteractionState {
    Began,
    Changed,
    Ended,
    Cancelled,
}

export enum SwipeDirection {
    ToLeft,
    ToRight,
    ToTop,
    ToBottom,
}

export class View implements Touchable, CoordinateOwner, GestureOwner, Releasable {

    retain(): this {
        XTMemoryManager.retain(this.objectRef)
        return this
    }

    release(): this {
        XTMemoryManager.release(this.objectRef)
        return this
    }

    public objectRef: any;

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

    // Mark: View Geometry

    _cachingFrame?: Rect

    public get frame(): Rect {
        if (this._cachingFrame) { return { ...this._cachingFrame } }
        return _XTUIView.xtr_frame(this.objectRef);
    }

    public set frame(value: Rect) {
        if (this._cachingFrame && this._cachingFrame.x == value.x && this._cachingFrame.y == value.y && this._cachingFrame.width == value.width && this._cachingFrame.height == value.height) {
            return
        }
        this._cachingFrame = value
        _XTUIView.xtr_setFrame(value, this.objectRef);
    }

    private handleFrameChange() {
        this._cachingFrame = undefined
    }

    public get bounds(): Rect {
        if (this._cachingFrame) { return { ...this._cachingFrame, x: 0, y: 0 } }
        return _XTUIView.xtr_bounds(this.objectRef);
    }

    public set bounds(value: Rect) {
        return;
    }

    public get center() {
        return { x: this.frame.x + this.frame.width / 2.0, y: this.frame.y + this.frame.height / 2.0 }
    }

    public set center(value: Point) {
        const newFrame = { ...this.frame };
        newFrame.x = value.x - newFrame.width / 2.0;
        newFrame.y = value.y - newFrame.height / 2.0;
        this.frame = newFrame;
    }

    _cachingTransform?: TransformMatrix

    public get transform(): TransformMatrix {
        if (this._cachingTransform) { return this._cachingTransform }
        return _XTUIView.xtr_transform(this.objectRef)
    }

    public set transform(value: TransformMatrix) {
        this._cachingTransform = value
        _XTUIView.xtr_setTransform(value, this.objectRef)
    }

    private handleTransformChange() {
        this._cachingTransform = undefined
    }

    // Mark: View Rendering

    public get clipsToBounds(): boolean {
        return _XTUIView.xtr_clipsToBounds(this.objectRef);
    }

    public set clipsToBounds(value: boolean) {
        _XTUIView.xtr_setClipsToBounds(value, this.objectRef);
    }

    public get backgroundColor(): Color {
        return _XTUIView.xtr_backgroundColor(this.objectRef);
    }

    public set backgroundColor(value: Color) {
        _XTUIView.xtr_setBackgroundColor(value, this.objectRef);
    }

    public get alpha(): number {
        return _XTUIView.xtr_alpha(this.objectRef);
    }

    public set alpha(value: number) {
        _XTUIView.xtr_setAlpha(value, this.objectRef);
    }


    public get opaque(): boolean {
        return _XTUIView.xtr_opaque(this.objectRef);
    }

    public set opaque(value: boolean) {
        _XTUIView.xtr_setOpaque(value, this.objectRef);
    }

    public get hidden(): boolean {
        return _XTUIView.xtr_hidden(this.objectRef);
    }

    public set hidden(value: boolean) {
        _XTUIView.xtr_setHidden(value, this.objectRef);
    }

    contentMode?: any; // todo
    maskView?: View // todo

    public get tintColor(): Color {
        return _XTUIView.xtr_tintColor(this.objectRef);
    }

    public set tintColor(value: Color) {
        _XTUIView.xtr_setTintColor(value, this.objectRef);
    }

    tintColorDidChange() { }

    setNeedsDisplay() { }

    // Mark: View Layer-Back Rendering

    public get cornerRadius(): number {
        return _XTUIView.xtr_cornerRadius(this.objectRef);
    }

    public set cornerRadius(value: number) {
        _XTUIView.xtr_setCornerRadius(value, this.objectRef);
    }


    public get borderWidth(): number {
        return _XTUIView.xtr_borderWidth(this.objectRef);
    }

    public set borderWidth(value: number) {
        _XTUIView.xtr_setBorderWidth(value, this.objectRef);
    }

    public get borderColor(): Color {
        return _XTUIView.xtr_borderColor(this.objectRef);
    }

    public set borderColor(value: Color) {
        _XTUIView.xtr_setBorderColor(value, this.objectRef);
    }

    shadowColor?: Color; // todo
    shadowOpacity: number; // todo
    shadowOffset?: Size; // todo
    shadowRadius: number; // todo

    // Mark: View Hierarchy

    public get tag(): number {
        return _XTUIView.xtr_tag(this.objectRef);
    }

    public set tag(value: number) {
        _XTUIView.xtr_setTag(value, this.objectRef);
    }

    private _cachingSuperview: View | null | undefined = undefined

    public get superview(): View | undefined {
        if (this._cachingSuperview !== undefined) { return this._cachingSuperview === null ? undefined : this._cachingSuperview }
        const viewRef = _XTUIView.xtr_superview(this.objectRef)
        if (typeof viewRef !== "string") { return undefined }
        this._cachingSuperview = new View(viewRef)
        return this._cachingSuperview
    }

    public get subviews(): View[] {
        return _XTUIView.xtr_subviews(this.objectRef).map((viewRef: any) => {
            if (typeof viewRef !== "string") { return undefined }
            return new View(viewRef)
        })
    }

    public get window(): Window | undefined {
        const ref = _XTUIView.xtr_window(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return new (window as any)._Window(ref)
    }

    removeFromSuperview() {
        _XTUIView.xtr_removeFromSuperview(this.objectRef);
    }

    insertSubviewAtIndex(subview: View, atIndex: number) {
        _XTUIView.xtr_insertSubviewAtIndex(subview.objectRef, atIndex, this.objectRef)
    }

    exchangeSubviewAtIndex(index1: number, index2: number) {
        _XTUIView.exchangeSubviewAtIndex(index1, index2, this.objectRef)
    }

    addSubview(subview: View) {
        _XTUIView.xtr_addSubview(subview.objectRef, this.objectRef)
    }

    insertSubviewBelow(subview: View, siblingSubview: View) {
        _XTUIView.xtr_insertSubviewBelow(subview.objectRef, siblingSubview.objectRef, this.objectRef);
    }

    insertSubviewAbove(subview: View, siblingSubview: View) {
        _XTUIView.xtr_insertSubviewAbove(subview.objectRef, siblingSubview.objectRef, this.objectRef);
    }

    bringSubviewToFront(subview: View) {
        _XTUIView.xtr_bringSubviewToFront(subview.objectRef, this.objectRef)
    }

    sendSubviewToBack(subview: View) {
        _XTUIView.xtr_sendSubviewToBack(subview.objectRef, this.objectRef)
    }

    private _didAddSubview(subviewRef: View) { this.didAddSubview(new View(subviewRef)) }
    private _willRemoveSubview(subviewRef: View) { this.willRemoveSubview(new View(subviewRef)) }
    private _willMoveToSuperview(newSuperviewRef?: View) { this.willMoveToSuperview(newSuperviewRef ? new View(newSuperviewRef) : undefined) }
    private _didMoveToSuperview() { this.didMoveToSuperview() }
    private _willMoveToWindow(newWindowRef?: Window) { this.willMoveToWindow(newWindowRef ? new View(newWindowRef) as any : undefined) }
    private _didMoveToWindow() { this.didMoveToWindow() }

    didAddSubview(subview: View) { }
    willRemoveSubview(subview: View) { }
    willMoveToSuperview(newSuperview?: View) {
        this._cachingSuperview = newSuperview
    }
    didMoveToSuperview() { }
    willMoveToWindow(newWindow?: Window) { }
    didMoveToWindow() { }

    isDescendantOfView(view: View) { return _XTUIView.xtr_isDescendantOfView(view.objectRef, this.objectRef) }
    viewWithTag(tag: number): View | undefined {
        const viewRef = _XTUIView.xtr_viewWithTag(tag, this.objectRef)
        if (typeof viewRef !== "string") { return undefined }
        return new View(viewRef)
    }

    setNeedsLayout() { _XTUIView.xtr_setNeedsLayout(this.objectRef) }

    protected recursiveSetNeedLayout() {
        let current: View | undefined = this
        while (current) {
            current.setNeedsLayout()
            current = current.superview
        }
    }

    layoutIfNeeded() { _XTUIView.xtr_layoutIfNeeded(this.objectRef) }

    layoutSubviews() {
        if (this._constraints.length > 0) {
            let viewMapping: { [key: string]: View } = {}
            this._constraints.forEach(item => {
                if (item.firstItem !== undefined) { viewMapping[(item.firstItem as any).objectRef] = item.firstItem as any }
                if (item.secondItem !== undefined) { viewMapping[(item.secondItem as any).objectRef] = item.secondItem as any }
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
        return this._constraints;
    }

    public intrinsicContentSize(width?: number): Size | undefined {
        return _XTUIView.xtr_intrinsicContentSize(width || Infinity, this.objectRef);
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

    gestureRecongnizers: GestureRecongnizer[] = []

    public get userInteractionEnabled(): boolean {
        return _XTUIView.xtr_userInteractionEnabled(this.objectRef);
    }

    public set userInteractionEnabled(value: boolean) {
        _XTUIView.xtr_setUserInteractionEnabled(value, this.objectRef);
    }

    multipleTouchEnabled: boolean = false

    hitTest(point: { x: number; y: number; }): Touchable | undefined {
        let target = undefined;
        if (this.hidden !== true && this.alpha > 0.0 && this.userInteractionEnabled == true && isPointInside(point, this)) {
            target = this
            let subviews = this.subviews;
            for (let index = subviews.length - 1; index >= 0; index--) {
                let subview = subviews[index];
                if (subview instanceof View) {
                    let subTarget = subview.hitTest(convertPointToChildView(point, this, subview))
                    if (subTarget) {
                        target = subTarget;
                        break;
                    }
                }
            }
        }
        return target
    }

    touchManager = new TouchManager(this)

    handlePointerDown(pid: string, timestamp: number, point: { x: number, y: number }) {
        this.touchManager.handlePointerDown(pid, timestamp, point.x, point.y)
    }

    handlePointersMove(timestamp: number, points: { [key: string]: { x: number, y: number } }, velocities: { [key: string]: { x: number, y: number } }) {
        this.touchManager.handlePointersMove(timestamp, points, velocities)
    }

    handlePointerUp(pid: string, timestamp: number, point: { x: number, y: number }, velocity: { x: number, y: number }) {
        this.touchManager.handlePointerUp(pid, timestamp, point.x, point.y, velocity.x, velocity.y)
    }

    touchesBegan(touches: Touch[], event: Event): void {
        this.touchTimestamp = touches[0].timestamp
        GestureManager.onTouchesBegan(this, touches, event)
    }

    touchesMoved(touches: Touch[], event: Event): void {
        this.touchTimestamp = touches[0].timestamp
        GestureManager.onTouchesMoved(this, touches, event)
    }

    touchesEnded(touches: Touch[], event: Event): void {
        this.touchTimestamp = touches[0].timestamp
        GestureManager.onTouchesEnded(this, touches, event)
    }

    touchesCancelled(touches: Touch[], event: Event): void {
        this.touchTimestamp = touches[0].timestamp
        GestureManager.onTouchesCancelled(this, touches, event)
    }

    private _longPressDuration = 0.5
    private _existsSingleTap = false
    private _existsDoubleTap = false
    private _validDoubleTap = false
    protected touchTimestamp: number = 0

    public get longPressDuration(): number {
        return this._longPressDuration;
    }

    public set longPressDuration(value: number) {
        this._longPressDuration = value;
        this.gestureRecongnizers.forEach(t => {
            if (t instanceof LongPressGestureRecognizer) { t.minimumPressDuration = value }
        });
    }

    public set onTap(value: (() => void) | undefined) {
        this._existsSingleTap = true
        const tapGesture = new TapGestureRecognizer();
        tapGesture.owner = this
        tapGesture.fire = () => {
            if (this._existsDoubleTap) {
                this._validDoubleTap = false
                setTimeout(() => {
                    if (!this._validDoubleTap) {
                        value && value();
                    }
                }, 400)
            }
            else {
                value && value();
            }
        };
        this.gestureRecongnizers.push(tapGesture);
    }

    public set onDoubleTap(value: (() => void) | undefined) {
        this._existsDoubleTap = true
        const tapGesture = new TapGestureRecognizer();
        tapGesture.owner = this
        tapGesture.tapsRequired = 2
        tapGesture.fire = () => {
            if (this._existsSingleTap) {
                this._validDoubleTap = true
            }
            value && value();
        };
        this.gestureRecongnizers.push(tapGesture);
    }

    public set onLongPress(value: ((state: InteractionState, viewLocation: () => Point, absLocation: Point) => void) | undefined) {
        const longPressGesture = new LongPressGestureRecognizer();
        longPressGesture.owner = this
        longPressGesture.minimumPressDuration = this._longPressDuration
        longPressGesture.fire = (state, absLocation) => {
            let interactionState = InteractionState.Began;
            switch (state) {
                case GestureRecognizerState.Began:
                    interactionState = InteractionState.Began;
                    break;
                case GestureRecognizerState.Changed:
                    interactionState = InteractionState.Changed;
                    break;
                case GestureRecognizerState.Ended:
                    interactionState = InteractionState.Ended;
                    break;
                case GestureRecognizerState.Cancelled:
                    interactionState = InteractionState.Cancelled;
                    break;
            }
            value && value(interactionState, longPressGesture.locationInView.bind(longPressGesture), absLocation);
        };
        this.gestureRecongnizers.push(longPressGesture);
    }

    public set onPan(value: ((state: InteractionState, viewLocation: () => Point, absLocation: Point, velocity: Point, translation: Point) => void) | undefined) {
        const panGesture = new PanGestureRecognizer();
        panGesture.owner = this
        panGesture.fire = (state, absLocation) => {
            let interactionState = InteractionState.Began;
            switch (state) {
                case GestureRecognizerState.Began:
                    interactionState = InteractionState.Began;
                    break;
                case GestureRecognizerState.Changed:
                    interactionState = InteractionState.Changed;
                    break;
                case GestureRecognizerState.Ended:
                    interactionState = InteractionState.Ended;
                    break;
                case GestureRecognizerState.Cancelled:
                    interactionState = InteractionState.Cancelled;
                    break;
            }
            value && value(interactionState, panGesture.locationInView.bind(panGesture), absLocation, panGesture.velocity, panGesture.translation);
        };
        this.gestureRecongnizers.push(panGesture);
    }

    // Mark: View Animation
    static animationWithDuration(duration: number, animations: () => void, completion?: () => void) {
        _XTUIView.xtr_animationWithDuration(duration, animations, completion || function () { });
    }

    static animationWithBouncinessAndSpeed(bounciness: number, speed: number, animations: () => void, completion?: () => void) {
        _XTUIView.xtr_animationWithBouncinessAndSpeed(bounciness, speed, animations, completion || function () { })
    }

}
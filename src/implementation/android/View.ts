import { Rect, RectMake, Point, PointMake, Size, RectZero } from '../../interface/Rect'
import { Color } from '../../interface/Color'
import { Window } from './Window'
import { TransformMatrix } from '../../interface/TransformMatrix'
import { LayoutConstraint } from "../../interface/LayoutConstraint";
import { Touchable, Touch, Event } from '../libraries/touch/TouchManager';
import { CoordinateOwner, isPointInside, convertPointToChildView } from '../libraries/coordinate/CoordinateManager';
import { GestureOwner, GestureRecongnizer, GestureManager, GestureRecognizerState } from '../libraries/touch/GestureManager';
import { TapGestureRecognizer } from '../libraries/touch/TapGestureRecognizer';
import { asArray } from "./utils"
import { LongPressGestureRecognizer } from '../libraries/touch/LongPressGestureRecognizer';
import { PanGestureRecognizer } from '../libraries/touch/PanGestureRecognizer';
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

export class View implements Touchable, CoordinateOwner, GestureOwner {

    nativeObject: any;

    public get objectUUID(): string {
        return "" + this.nativeObject.objectUUID
    }

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        if (_isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.nativeObject = XTRView.createScriptObject(rect || RectZero, this);
            (window as any).XTRObjCreater.store(this);
            this.init();
        }
    }

    init() { }

    // Mark: View Geometry

    public get frame(): Rect {
        return this.nativeObject.xtr_frame();
    }

    public set frame(value: Rect) {
        this.nativeObject.xtr_setFrame(value);
    }

    public get bounds(): Rect {
        return this.nativeObject.xtr_bounds();
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

    public get transform(): TransformMatrix {
        return this.nativeObject.xtr_transform()
    }

    public set transform(value: TransformMatrix) {
        this.nativeObject.xtr_setTransform(value)
    }

    // Mark: View Rendering

    public get clipsToBounds(): boolean {
        return this.nativeObject.xtr_clipsToBounds();
    }

    public set clipsToBounds(value: boolean) {
        this.nativeObject.xtr_setClipsToBounds(value);
    }

    public get backgroundColor(): Color {
        return this.nativeObject.xtr_backgroundColor();
    }

    public set backgroundColor(value: Color) {
        this.nativeObject.xtr_setBackgroundColor(value);
    }

    public get alpha(): number {
        return this.nativeObject.xtr_alpha();
    }

    public set alpha(value: number) {
        this.nativeObject.xtr_setAlpha(value);
    }


    public get opaque(): boolean {
        return this.nativeObject.xtr_opaque();
    }

    public set opaque(value: boolean) {
        this.nativeObject.xtr_setOpaque(value);
    }

    public get hidden(): boolean {
        return this.nativeObject.xtr_hidden();
    }

    public set hidden(value: boolean) {
        this.nativeObject.xtr_setHidden(value);
    }

    contentMode?: any; // todo
    maskView?: View // todo

    public get tintColor(): Color {
        return this.nativeObject.xtr_tintColor();
    }

    public set tintColor(value: Color) {
        this.nativeObject.xtr_setTintColor(value);
    }

    tintColorDidChange() { }

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

    public get borderColor(): Color {
        return this.nativeObject.xtr_borderColor();
    }

    public set borderColor(value: Color) {
        this.nativeObject.xtr_setBorderColor(value);
    }

    shadowColor?: Color; // todo
    shadowOpacity: number; // todo
    shadowOffset?: Size; // todo
    shadowRadius: number; // todo

    // Mark: View Hierarchy

    public get tag(): number {
        return this.nativeObject.xtr_tag;
    }

    public set tag(value: number) {
        this.nativeObject.xtr_tag = value;
    }

    public get superview(): View | undefined {
        return this.nativeObject.xtr_superview()
    }

    public get subviews(): View[] {
        return asArray(this.nativeObject.xtr_subviews())
    }

    public get window(): Window | undefined {
        return this.nativeObject.xtr_window()
    }

    removeFromSuperview() {
        this.nativeObject.xtr_removeFromSuperview();
    }

    insertSubviewAtIndex(subview: View, atIndex: number) {
        this.nativeObject.xtr_insertSubviewAtIndex(subview, atIndex)
    }

    exchangeSubviewAtIndex(index1: number, index2: number) {
        this.nativeObject.exchangeSubviewAtIndex(index1, index2)
    }

    addSubview(subview: View) {
        this.nativeObject.xtr_addSubview(subview)
    }

    insertSubviewBelow(subview: View, siblingSubview: View) {
        this.nativeObject.xtr_insertSubviewBelow(subview, siblingSubview);
    }

    insertSubviewAbove(subview: View, siblingSubview: View) {
        this.nativeObject.xtr_insertSubviewAbove(subview, siblingSubview);
    }

    bringSubviewToFront(subview: View) {
        this.nativeObject.xtr_bringSubviewToFront(subview)
    }

    sendSubviewToBack(subview: View) {
        this.nativeObject.xtr_sendSubviewToBack(subview)
    }

    didAddSubview(subview: View) { }
    willRemoveSubview(subview: View) { }
    willMoveToSuperview(newSuperview?: View) { }
    didMoveToSuperview() { }
    willMoveToWindow(newWindow?: Window) { }
    didMoveToWindow() { }

    isDescendantOfView(view: View) { return this.nativeObject.xtr_isDescendantOfView(view) }
    viewWithTag(tag: number): View | undefined { return this.nativeObject.xtr_viewWithTag(tag) }

    setNeedsLayout() { this.nativeObject.xtr_setNeedsLayout() }

    protected recursiveSetNeedLayout() {
        let current: View | undefined = this
        while (current) {
            current.setNeedsLayout()
            current = current.superview
        }
    }

    layoutIfNeeded() { this.nativeObject.xtr_layoutIfNeeded() }
    layoutSubviews() {
        if (this._constraints.length > 0) {
            let viewMapping: { [key: string]: View } = {}
            this._constraints.forEach(item => {
                if (item.firstItem !== undefined) { viewMapping[(item.firstItem as any).objectUUID] = item.firstItem as any }
                if (item.secondItem !== undefined) { viewMapping[(item.secondItem as any).objectUUID] = item.secondItem as any }
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
        return this.nativeObject.xtr_intrinsicContentSize(width || Infinity);
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
        return this.nativeObject.xtr_userInteractionEnabled();
    }

    public set userInteractionEnabled(value: boolean) {
        this.nativeObject.xtr_setUserInteractionEnabled(value);
    }

    hitTest(point: { x: number; y: number; }): Touchable | undefined {
        let target = undefined;
        if (this.alpha > 0.0 && this.userInteractionEnabled == true && isPointInside(point, this)) {
            target = this
            let subviews = this.subviews;
            for (let index = subviews.length - 1; index >= 0; index--) {
                let subview = subviews[index];
                let subTarget = subview.hitTest(convertPointToChildView(point, this, subview))
                if (subTarget) {
                    target = subTarget;
                    break;
                }
            }
        }
        return target
    }

    private touchingSuperview?: View = undefined

    touchesBegan(touches: Touch[], event: Event): void {
        GestureManager.onTouchesBegan(this, touches, event)
        this.touchingSuperview = undefined;
        if (this.superview) {
            this.touchingSuperview = this.superview
            this.touchingSuperview.touchesBegan(touches, event);
        }
    }

    touchesMoved(touches: Touch[], event: Event): void {
        GestureManager.onTouchesMoved(this, touches, event)
        if (this.touchingSuperview) {
            this.touchingSuperview.touchesMoved(touches, event);
        }
    }

    touchesEnded(touches: Touch[], event: Event): void {
        GestureManager.onTouchesEnded(this, touches, event)
        if (this.touchingSuperview) {
            this.touchingSuperview.touchesEnded(touches, event);
        }
    }

    touchesCancelled(touches: Touch[], event: Event): void {
        GestureManager.onTouchesCancelled(this, touches, event)
        if (this.touchingSuperview) {
            this.touchingSuperview.touchesCancelled(touches, event);
        }
    }

    private _longPressDuration = 0.5
    private _existsSingleTap = false
    private _existsDoubleTap = false
    private _validDoubleTap = false

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

    public set onLongPress(value: ((state: InteractionState, viewLocation?: Point, absLocation?: Point) => void) | undefined) {
        const longPressGesture = new LongPressGestureRecognizer();
        longPressGesture.owner = this
        longPressGesture.minimumPressDuration = this._longPressDuration
        longPressGesture.fire = (state, viewLocation, absLocation) => {
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
            value && value(interactionState, viewLocation, absLocation);
        };
        this.gestureRecongnizers.push(longPressGesture);
    }

    public set onPan(value: ((state: InteractionState, viewLocation?: Point, absLocation?: Point, velocity?: Point) => void) | undefined) {
        const panGesture = new PanGestureRecognizer();
        panGesture.owner = this
        panGesture.fire = (state, viewLocation, absLocation) => {
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
            value && value(interactionState, viewLocation, absLocation, panGesture.velocity);
        };
        this.gestureRecongnizers.push(panGesture);
    }

    // Mark: View Animation
    static animationWithDuration(duration: number, animations: () => void, completion?: () => void) {
        XTRView.animationWithDuration(duration, animations, completion || function () { });
    }

    static animationWithTensionAndFriction(tension: number, friction: number, animations: () => void, completion?: () => void) {
        XTRView.animationWithTensionAndFriction(tension, friction, animations, completion || function () { })
    }

    static animationWithBouncinessAndSpeed(bounciness: number, speed: number, animations: () => void, completion?: () => void) {
        XTRView.animationWithBouncinessAndSpeed(bounciness, speed, animations, completion || function () { })
    }

    static animationWithDurationDampingVelocity(duration: number, damping: number, velocity: number, animations: () => void, completion?: () => void) { } // iOS Only

}

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.toString().indexOf("com.opensource.xtruntime.XTRView$InnerObject") === 0) {
        return new View(undefined, view);
    }
    return undefined;
})
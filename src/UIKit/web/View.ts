/// <reference path="xtr.d.ts" />
import * as Rebound from 'rebound'
import { Window } from '../interface/Window'
import { Rect, Point, Size, RectZero } from "../interface/Rect";
import { Color } from "../interface/Color";
import { TransformMatrix } from "../interface/TransformMatrix";
import { LayoutConstraint } from "../interface/LayoutConstraint";
import { Touchable, Touch, Event } from '../libraries/touch/TouchManager';
import { CoordinateOwner, isPointInside, convertPointToChildView } from '../libraries/coordinate/CoordinateManager';
import { GestureOwner, GestureRecongnizer, GestureManager, GestureRecognizerState } from '../libraries/touch/GestureManager';
import { TapGestureRecognizer } from '../libraries/touch/TapGestureRecognizer';
import { LongPressGestureRecognizer } from '../libraries/touch/LongPressGestureRecognizer';
import { PanGestureRecognizer } from '../libraries/touch/PanGestureRecognizer';
import { ViewElement } from './element/View';
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

export class View extends XT.BaseObject implements Touchable, CoordinateOwner, GestureOwner {

    nativeObject: any;
    viewDelegate: any;

    constructor(nativeClazz: any = ViewElement, arg0?: any, arg1?: any, arg2?: any) {
        super()
        this.nativeObject = new nativeClazz(this, arg0, arg1, arg2)
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

    public get frame(): Rect {
        return this.nativeObject.xtr_frame();
    }

    public set frame(value: Rect) {
        if (View._animationEnabled) {
            if (this.frame.x != value.x) { View.addAnimation(this, "frameX", this.frame.x, value.x); }
            if (this.frame.y != value.y) { View.addAnimation(this, "frameY", this.frame.y, value.y); }
            if (this.frame.width != value.width) { View.addAnimation(this, "frameWidth", this.frame.width, value.width); }
            if (this.frame.height != value.height) { View.addAnimation(this, "frameHeight", this.frame.height, value.height); }
            return;
        }
        const field = this.nativeObject.xtr_frame()
        if (field.x === value.x && field.y === value.y && field.width === value.width && field.height === value.height) {
            return;
        }
        this.nativeObject.xtr_setFrame(value);
        if (field.width !== value.width || field.height !== value.height) {
            this.layoutSubviews();
        }
    }

    public get bounds(): Rect {
        return this.nativeObject.xtr_bounds();
    }

    public set bounds(value: Rect) {
        this.nativeObject.xtr_setBounds(value);
    }

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
        if (View._animationEnabled) {
            const oldValue = TransformMatrix.unmatrix(this.transform)
            const newValue = TransformMatrix.unmatrix(value)
            if (oldValue.scale.x != newValue.scale.x) { View.addAnimation(this, "transformScaleX", oldValue.scale.x, newValue.scale.x); }
            if (oldValue.scale.y != newValue.scale.y) { View.addAnimation(this, "transformScaleY", oldValue.scale.y, newValue.scale.y); }
            if (oldValue.degree != newValue.degree) { View.addAnimation(this, "transformDegree", oldValue.degree, newValue.degree); }
            if (oldValue.translate.x != newValue.translate.x) { View.addAnimation(this, "transformTranslateX", oldValue.translate.x, newValue.translate.x); }
            if (oldValue.translate.y != newValue.translate.y) { View.addAnimation(this, "transformTranslateY", oldValue.translate.y, newValue.translate.y); }
            return;
        }
        this.nativeObject.xtr_setTransform(value);
    }

    private set transformScaleX(value: number) {
        this.transform = TransformMatrix.setScale(this.transform, value, undefined)
    }

    private set transformScaleY(value: number) {
        this.transform = TransformMatrix.setScale(this.transform, undefined, value)
    }

    private set transformDegree(value: number) {
        this.transform = TransformMatrix.setRotate(this.transform, value * Math.PI / 180)
    }

    private set transformTranslateX(value: number) {
        this.transform = TransformMatrix.setTranslate(this.transform, value, undefined)
    }

    private set transformTranslateY(value: number) {
        this.transform = TransformMatrix.setTranslate(this.transform, undefined, value)
    }

    // Mark: View Rendering

    public get clipsToBounds(): boolean {
        return this.nativeObject.xtr_clipsToBounds();
    }

    public set clipsToBounds(value: boolean) {
        this.nativeObject.xtr_setClipsToBounds(value);
    }

    public get backgroundColor(): Color {
        return this.nativeObject.xtr_backgroundColor()
    }

    public set backgroundColor(value: Color) {
        if (View._animationEnabled && this.backgroundColor) {
            if (this.backgroundColor.a != value.a) { View.addAnimation(this, "backgroundColorA", this.backgroundColor.a, value.a); }
            if (this.backgroundColor.r != value.r) { View.addAnimation(this, "backgroundColorR", this.backgroundColor.r, value.r); }
            if (this.backgroundColor.g != value.g) { View.addAnimation(this, "backgroundColorG", this.backgroundColor.g, value.g); }
            if (this.backgroundColor.b != value.b) { View.addAnimation(this, "backgroundColorB", this.backgroundColor.b, value.b); }
            return;
        }
        this.nativeObject.xtr_setBackgroundColor(value);
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

    public get alpha(): number {
        return this.nativeObject.xtr_alpha();
    }

    public set alpha(value: number) {
        if (View._animationEnabled) {
            View.addAnimation(this, "alpha", this.nativeObject.alpha, value);
            return;
        }
        this.nativeObject.xtr_setAlpha(value);
    }

    opaque: boolean = false;

    public get hidden(): boolean {
        return this.nativeObject.xtr_hidden();
    }

    public set hidden(value: boolean) {
        this.nativeObject.xtr_setHidden(value);
    }

    public get contentMode(): number {
        return this.nativeObject.xtr_contentMode();
    }

    public set contentMode(value: number) {
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
        this.nativeObject.xtr_tintColorDidChange();
    }

    setNeedsDisplay() { }

    // Mark: View Layer-Back Rendering

    public get cornerRadius(): number {
        return this.nativeObject.xtr_cornerRadius();
    }

    public set cornerRadius(value: number) {
        if (View._animationEnabled) {
            View.addAnimation(this, "cornerRadius", this.cornerRadius, value);
            return;
        }
        this.nativeObject.xtr_setCornerRadius(value);
    }

    public get borderWidth(): number {
        return this.nativeObject.xtr_borderWidth();
    }

    public set borderWidth(value: number) {
        if (View._animationEnabled) {
            View.addAnimation(this, "borderWidth", this.borderWidth, value);
            return;
        }
        this.nativeObject.xtr_setBorderWidth(value);
    }

    public get borderColor(): Color {
        return this.nativeObject.xtr_borderColor()
    }

    public set borderColor(value: Color) {
        if (View._animationEnabled && this.borderColor) {
            if (this.borderColor.a != value.a) { View.addAnimation(this, "borderColorA", this.borderColor.a, value.a); }
            if (this.borderColor.r != value.r) { View.addAnimation(this, "borderColorR", this.borderColor.r, value.r); }
            if (this.borderColor.g != value.g) { View.addAnimation(this, "borderColorG", this.borderColor.g, value.g); }
            if (this.borderColor.b != value.b) { View.addAnimation(this, "borderColorB", this.borderColor.b, value.b); }
            return;
        }
        this.nativeObject.xtr_setBorderColor(value);
    }

    private set borderColorA(value: number) {
        this.borderColor = new Color(this.borderColor.r, this.borderColor.g, this.borderColor.b, value);
    }

    private set borderColorR(value: number) {
        this.borderColor = new Color(value, this.borderColor.g, this.borderColor.b, this.borderColor.a);
    }

    private set borderColorG(value: number) {
        this.borderColor = new Color(this.borderColor.r, value, this.borderColor.b, this.borderColor.a);
    }

    private set borderColorB(value: number) {
        this.borderColor = new Color(this.borderColor.r, this.borderColor.g, value, this.borderColor.a);
    }

    public get shadowColor(): Color {
        return this.nativeObject.xtr_shadowColor()
    }

    public set shadowColor(value: Color) {
        this.nativeObject.xtr_setShadowColor(value);
    }

    public get shadowOpacity(): number {
        return this.nativeObject.xtr_shadowOpacity();
    }

    public set shadowOpacity(value: number) {
        this.nativeObject.xtr_setShadowOpacity(value);
    }

    public get shadowOffset(): Size | undefined {
        return this.nativeObject.xtr_shadowOffset();
    }

    public set shadowOffset(value: Size | undefined) {
        this.nativeObject.xtr_setShadowOffset(value);
    }

    public get shadowRadius(): number {
        return this.nativeObject.xtr_shadowRadius();
    }

    public set shadowRadius(value: number) {
        this.nativeObject.xtr_setShadowRadius(value);
    }

    // Mark: View Hierarchy

    public get tag(): number {
        return this.nativeObject.xtr_tag();
    }

    public set tag(value: number) {
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
        if ((this as any).className === "_XTUIWindow") {
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
        if ((this as any).className === "_XTUIWindow") {
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
        if ((this as any).className === "_XTUIWindow") {
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
    didMoveToSuperview() { this.tintColorDidChange() }
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

    private autoLayoutViewCache?: any = undefined

    layoutSubviews() {
        if (this.viewDelegate && this.viewDelegate.viewWillLayoutSubviews) {
            this.viewDelegate.viewWillLayoutSubviews()
        }
        if (this._constraints.length > 0) {
            let viewMapping: { [key: string]: View } = {}
            this._constraints.forEach(item => {
                if (item.firstItem !== undefined) { viewMapping[(item.firstItem as any).nativeObject.objectUUID] = item.firstItem as any }
                if (item.secondItem !== undefined) { viewMapping[(item.secondItem as any).nativeObject.objectUUID] = item.secondItem as any }
            })
            const view = this.autoLayoutViewCache || (() => {
                let constraints = this._constraints.map(item => (item as any).toALObject())
                AutoLayout.VisualFormat.parse("HV:|[_]|", { extended: true }).forEach((it: any) => constraints.push(it))
                this.autoLayoutViewCache = new AutoLayout.View({
                    constraints,
                })
                return this.autoLayoutViewCache
            })();
            view.setSize(this.bounds.width, this.bounds.height)
            for (const layoutID in view.subViews) {
                const value = view.subViews[layoutID];
                if (viewMapping[layoutID] !== undefined && (value.width == 0 || value.height == 0)) {
                    const intrinsticSize = viewMapping[layoutID].intrinsicContentSize(value.width != 0 ? value.width : undefined);
                    if (intrinsticSize !== undefined && intrinsticSize !== null) {
                        value.intrinsicWidth = value.width != 0 ? undefined : intrinsticSize.width;
                        value.intrinsicHeight = value.height != 0 ? undefined : intrinsticSize.height;
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
        if (this.viewDelegate && this.viewDelegate.viewDidLayoutSubviews) {
            this.viewDelegate.viewDidLayoutSubviews()
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
        this.autoLayoutViewCache = undefined
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
    userInteractionEnabled: boolean = true
    multipleTouchEnabled: boolean = false

    hitTest(point: { x: number; y: number; }): Touchable | undefined {
        let target = undefined;
        if (this.hidden !== true && this.alpha > 0.0 && !this.hidden && this.userInteractionEnabled === true && isPointInside(point, this)) {
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

    wheelScroll(deltaPoint: { x: number, y: number }): void {
        if (this.superview) {
            (this.superview as any).wheelScroll(deltaPoint);
        }
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
        this.gestureRecongnizers = this.gestureRecongnizers.filter(t => !(t instanceof TapGestureRecognizer && t.tapsRequired == 1))
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
        this.gestureRecongnizers = this.gestureRecongnizers.filter(t => !(t instanceof TapGestureRecognizer && t.tapsRequired == 2))
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
        this.gestureRecongnizers.unshift(tapGesture);
    }

    public set onLongPress(value: ((state: InteractionState, viewLocation: () => Point, absLocation: Point) => void) | undefined) {
        this.gestureRecongnizers = this.gestureRecongnizers.filter(t => !(t instanceof LongPressGestureRecognizer))
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
        this.gestureRecongnizers = this.gestureRecongnizers.filter(t => !(t instanceof PanGestureRecognizer))
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
            if (!runAnimation(startTime, animationViewProps)) {
                requestAnimationFrame(runnable);
            }
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
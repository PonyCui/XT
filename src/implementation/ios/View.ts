/// <reference path="xtr.d.ts" />
import { SwipeDirection, InteractionState } from '../../interface/View';
import { Rect, Point, Size, RectZero } from "../../interface/Rect";
import { Color } from "../../interface/Color";
import { TransformMatrix } from "../../interface/TransformMatrix";
import { LayoutConstraint } from "../../interface/LayoutConstraint";

export class View {

    nativeObject: any;

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        if (_isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
        }
        else {
            this.nativeObject = XTRView.createScriptObject(rect || RectZero, this);
        }
    }

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

    private _transform: TransformMatrix | undefined;

    public get transform(): TransformMatrix | undefined {
        const value = this.nativeObject.xtr_transform();
        if (value instanceof Object) {
            return new TransformMatrix(value.a, value.b, value.c, value.d, value.tx, value.ty)
        }
        return undefined
    }

    public set transform(value: TransformMatrix | undefined) {
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

    constraints: LayoutConstraint[]
    addConstraint(constraint: LayoutConstraint) { }
    addConstraints(constraints: LayoutConstraint[]) { }
    removeConstraint(constraint: LayoutConstraint) { }
    removeAllConstraints() { }

    // Mark: View Interactive
    static InteractionState = InteractionState
    static SwipeDirection = SwipeDirection
    userInteractionEnabled: boolean;
    longPressDuration: number;
    onTap?: () => void
    onDoubleTap?: () => void
    onLongPress?: (state: InteractionState, viewLocation?: Point, absLocation?: Point) => void
    onPan?: (state: InteractionState, viewLocation?: Point, absLocation?: Point) => void

    // Mark: View Animation
    animationWithDuration(duration: number, animations: () => void, completion?: () => void) { }
    animationWithBouncinessAndSpeed(damping: number, velocity: number, animations: () => void, completion?: () => void) { }

}

if ((window as any).viewClasses === undefined) {
    (window as any).viewClasses = [];
}
(window as any).viewClasses.push((view: any) => {
    if (view.constructor.toString() === "[object XTRViewConstructor]") {
        return new View(undefined, view);
    }
    return undefined;
})
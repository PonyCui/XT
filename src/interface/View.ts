import { Rect, RectMake, Point, PointMake, Size } from './Rect'
import { Color } from './Color'
import { Window } from './Window'
import { TransformMatrix } from './TransformMatrix'
import { LayoutConstraint } from "./LayoutConstraint";

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

export class View {

    constructor(rect?: Rect) { }

    init() { }

    // Mark: View Geometry
    frame: Rect;
    bounds: Rect;
    center: Point;
    transform?: TransformMatrix;

    // Mark: View Rendering
    clipsToBounds: boolean;
    backgroundColor?: Color;
    alpha: number;
    opaque: boolean;
    hidden: boolean;
    contentMode?: any; // todo
    maskView?: View
    tintColor: Color
    tintColorDidChange() { }

    // Mark: View Layer-Back Rendering
    cornerRadius: number;
    borderWidth: number;
    borderColor?: Color;
    shadowColor?: Color;
    shadowOpacity: number;
    shadowOffset?: Size;
    shadowRadius: number;

    // Mark: View Hierarchy
    tag?: number;
    superview?: View
    subviews: View[]
    window?: Window

    removeFromSuperview() { }
    insertSubviewAtIndex(subview: View, atIndex: number) { }
    exchangeSubviewAtIndex(index1: number, index2: number) { }

    addSubview(subview: View) { }
    insertSubviewBelow(subview: View, siblingSubview: View) { }
    insertSubviewAbove(subview: View, siblingSubview: View) { }

    bringSubviewToFront(subview: View) { }
    sendSubviewToBack(subview: View) { }

    didAddSubview(subview: View) { }
    willRemoveSubview(subview: View) { }

    willMoveToSuperview(newSuperview?: View) { }
    didMoveToSuperview() { }
    willMoveToWindow(newWindow?: Window) { }
    didMoveToWindow() { }

    isDescendantOfView(view: View) { return false }
    viewWithTag(tag: number): View | undefined { return undefined }

    setNeedsLayout() { }
    layoutIfNeeded() { }
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
    static animationWithDuration(duration: number, animations: () => void, completion?: () => void) { }
    static animationWithBouncinessAndSpeed(bounciness: number, speed: number, animations: () => void, completion?: () => void) { } // iOS NOT Support
    static animationWithDurationDampingVelocity(duration: number, damping: number, velocity: number, animations: () => void, completion?: () => void) { } // iOS Only

}
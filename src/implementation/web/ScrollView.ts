import { InteractionState } from '../../main.web';
import { View } from "./View";
import { Size, Point, Rect, RectZero, SizeZero } from "../../interface/Rect";
import { ScrollViewElement } from "./element/ScrollView";
import { Touchable, Touch, Event } from '../libraries/touch/TouchManager';
import { PanGestureRecognizer } from '../libraries/touch/PanGestureRecognizer';
import { Color } from '../../interface/Color';
import { LayoutConstraint } from './LayoutConstraint';
import { isPointInside, convertPointToChildView } from '../libraries/coordinate/CoordinateManager';
declare function require(name: string): any;
import { Scroller, ScrollerDelegate } from '../libraries/scroller/scroller'
import { Animation } from '../libraries/scroller/animation';

export class ScrollView extends View implements ScrollerDelegate {

    private readonly innerView: View = new View();
    private readonly horizonalScrollIndicator: View = new View();;
    private readonly verticalScrollIndicator: View = new View();;
    private scroller: Scroller;

    constructor() {
        super(ScrollViewElement)
        this.userInteractionEnabled = true;
        this.clipsToBounds = true;
        this.innerView.userInteractionEnabled = true;
        super.addSubview(this.innerView);
        this.horizonalScrollIndicator.backgroundColor = new Color(0x8f / 0xff, 0x8f / 0xff, 0x90 / 0xff)
        this.horizonalScrollIndicator.cornerRadius = 1.0;
        this.horizonalScrollIndicator.alpha = 0.0;
        super.addSubview(this.horizonalScrollIndicator);
        this.verticalScrollIndicator.backgroundColor = new Color(0x8f / 0xff, 0x8f / 0xff, 0x90 / 0xff)
        this.verticalScrollIndicator.cornerRadius = 1.0;
        this.verticalScrollIndicator.alpha = 0.0;
        super.addSubview(this.verticalScrollIndicator);
        this.resetScroller();
        this.setupTouches();
    }

    hitTest(point: { x: number; y: number; }): Touchable | undefined {
        let target = undefined;
        if (this.alpha > 0.0 && this.userInteractionEnabled == true && isPointInside(point, this)) {
            target = this
            let subviews = this.innerView.subviews;
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

    private previousAbsLocation: { x: number, y: number } = { x: 0, y: 0 }

    private setupTouches() {
        this.onPan = (state, viewLocation, absLocation, velocity, translation) => {
            if (absLocation) {
                const delta = { x: -(absLocation.x - this.previousAbsLocation.x), y: -(absLocation.y - this.previousAbsLocation.y) }
                this.previousAbsLocation = absLocation
                if (state == InteractionState.Began) {
                    this.scroller._beginDragging()
                }
                else if (state == InteractionState.Changed) {
                    this.scroller._dragBy(delta)
                }
                else if (state == InteractionState.Ended || state == InteractionState.Cancelled) {
                    velocity && this.scroller._endDraggingWithDecelerationVelocity({
                        x: -(velocity.x / 1),
                        y: -(velocity.y / 1),
                    })
                }
            }
        }
    }

    private _decelarating: boolean = false

    private get decelarating(): boolean {
        return this._decelarating
    }

    private set decelarating(value: boolean) {
        this._decelarating = value;
        if (value) {
            this.gestureRecongnizers.forEach(it => {
                if (it instanceof PanGestureRecognizer) {
                    it.deceteMovement = -1
                }
            })
        }
        else {
            this.gestureRecongnizers.forEach(it => {
                if (it instanceof PanGestureRecognizer) {
                    it.deceteMovement = 10
                }
            })
        }
    }

    public get contentOffset() {
        return this.nativeObject.xtr_contentOffset();
    }

    public set contentOffset(value: Point) {
        this.nativeObject.xtr_setContentOffset(value);
        this.resetIndicator();
    }

    setContentOffset(value: Point, animated: boolean): void {
        this.contentOffset = value;
    }

    private _contentSize: Size = SizeZero

    public get contentSize() {
        return this._contentSize;
    }

    public set contentSize(value: Size) {
        this._contentSize = value;
        const oldFrame = this.innerView.frame
        this.innerView.frame = { x: oldFrame.x, y: oldFrame.y, width: Math.max(this.frame.width, value.width), height: Math.max(this.frame.height, value.height) }
        this.resetScroller();
    }

    private _isDirectionalLockEnabled: boolean = true

    public get isDirectionalLockEnabled() {
        return this._isDirectionalLockEnabled;
    }

    public set isDirectionalLockEnabled(value: boolean) {
        this._isDirectionalLockEnabled = value;
        this.resetScroller();
    }

    private _isScrollEnabled: boolean = true

    public get isScrollEnabled() {
        return this._isScrollEnabled;
    }

    public set isScrollEnabled(value: boolean) {
        this._isScrollEnabled = value;
        this.resetScroller();
    }

    private _bounces: boolean = true

    public get bounces() {
        return this._bounces;
    }

    public set bounces(value: boolean) {
        this._bounces = value;
        this.resetScroller();
    }

    showsHorizontalScrollIndicator: boolean = true
    showsVerticalScrollIndicator: boolean = true

    private _alwaysBounceVertical: boolean = false

    public get alwaysBounceVertical() {
        return this._alwaysBounceVertical;
    }

    public set alwaysBounceVertical(value: boolean) {
        this._alwaysBounceVertical = value;
        this.resetScroller();
    }

    private _alwaysBounceHorizontal: boolean = false

    public get alwaysBounceHorizontal() {
        return this._alwaysBounceHorizontal;
    }

    public set alwaysBounceHorizontal(value: boolean) {
        this._alwaysBounceHorizontal = value;
        this.resetScroller();
    }

    layoutSubviews() {
        super.layoutSubviews();
        this.resetScroller();
    }

    onScroll?: (scrollView: ScrollView) => void

    // Touches

    private resetScroller() {
        if (this.scroller === undefined) {
            this.scroller = new Scroller(this)
        }
        this.scroller.bounds = this.bounds
        this.scroller.contentSize = this.contentSize
    }

    scrollerDidScroll(): void {
        this.contentOffset = this.scroller.contentOffset
        this.resetIndicator()
    }

    scrollerDidZoom(): void {

    }

    scrollerWillBeginDragging(): void {
        View.animationWithDuration(0.15, () => {
            this.verticalScrollIndicator.alpha = 1.0;
            this.horizonalScrollIndicator.alpha = 1.0;
        })
        this.verticalScrollIndicator.alpha = 1.0;
        this.horizonalScrollIndicator.alpha = 1.0;
    }

    scrollerWillEndDragging(): void {

    }

    scrollerDidEndDragging(animation: Animation | undefined): void {
        if (animation === undefined) {
            View.animationWithDuration(0.15, () => {
                this.verticalScrollIndicator.alpha = 0.0;
                this.horizonalScrollIndicator.alpha = 0.0;
            })
        }
    }

    scrollerWillBeginDecelerating(): void {
        this.innerView.userInteractionEnabled = false
        this.gestureRecongnizers.forEach(it => {
            if (it instanceof PanGestureRecognizer) {
                it.deceteMovement = -1
            }
        })
    }

    scrollerDidEndDecelerating(): void {
        this.innerView.userInteractionEnabled = true
        this.gestureRecongnizers.forEach(it => {
            if (it instanceof PanGestureRecognizer) {
                it.deceteMovement = 10
            }
        })
        View.animationWithDuration(0.15, () => {
            this.verticalScrollIndicator.alpha = 0.0;
            this.horizonalScrollIndicator.alpha = 0.0;
        })
    }

    // protected handleScroll(x: number, y: number) {
    //     this.contentOffset = { x, y }
    //     this.onScroll && this.onScroll(this);
    //     clearTimeout(this._indicatorHidingTimer);
    //     this._indicatorHidingTimer = setTimeout(this.hideIndicator.bind(this), 250)
    //     clearTimeout(this._restoreInteractiveChildrenTimer);
    //     this._restoreInteractiveChildrenTimer = setTimeout(() => { this.decelarating = false; this.innerView.userInteractionEnabled = true; }, 32);
    // }

    wheelScroll(deltaPoint: { x: number, y: number }): void {
        // if (this.userInteractionEnabled && this.alpha > 0.0 && !this.hidden) {
        //     this.verticalScrollIndicator.alpha = 1.0;
        //     this.horizonalScrollIndicator.alpha = 1.0;
        //     this.handleScroll(
        //         Math.max(0.0, Math.min(this.contentSize.width - this.bounds.width, this.contentOffset.x + deltaPoint.x)),
        //         Math.max(0.0, Math.min(this.contentSize.height - this.bounds.height, this.contentOffset.y + deltaPoint.y))
        //     )
        // }
        // else {
        //     if (this.superview) {
        //         (this.superview as any).wheelScroll(deltaPoint);
        //     }
        // }
    }

    // Indicators

    private _tracking = false;
    private _indicatorHidingTimer: number = 0
    private _restoreInteractiveChildrenTimer: any = 0
    private _indicatorShowed = false;

    private resetIndicator() {
        const contentOffset = this.contentOffset
        const contentSize = this.contentSize
        const bounds = this.bounds
        if (contentSize.height > bounds.height) {
            const yProgress = contentOffset.y / (contentSize.height - bounds.height);
            const yHeight = Math.max(36.0, bounds.height / (contentSize.height / bounds.height))
            this.verticalScrollIndicator.frame = { x: bounds.width - 4, y: yProgress * (bounds.height - yHeight), width: 2, height: yHeight }
        }
        else {
            this.verticalScrollIndicator.frame = { x: bounds.width - 4, y: 0, width: 2, height: 0 }
        }
        if (contentSize.width > bounds.width) {
            const xProgress = contentOffset.x / (contentSize.width - bounds.width);
            const xWidth = Math.max(36.0, bounds.width / (contentSize.width / bounds.width))
            this.horizonalScrollIndicator.frame = { x: xProgress * (bounds.width - xWidth), y: bounds.height - 4, width: xWidth, height: 2 }
        }
        else {
            this.horizonalScrollIndicator.frame = { x: 0, y: bounds.height - 4, width: 0, height: 2 }
        }
    }

    // Proxy method call to innerView

    public get subviews(): View[] {
        return this.innerView.subviews;
    }

    insertSubviewAtIndex(subview: View, atIndex: number) {
        this.innerView.insertSubviewAtIndex(subview, atIndex);
    }

    exchangeSubviewAtIndex(index1: number, index2: number) {
        this.innerView.exchangeSubviewAtIndex(index1, index2)
    }

    addSubview(subview: View) {
        this.innerView.addSubview(subview)
    }

    insertSubviewBelow(subview: View, siblingSubview: View) {
        this.innerView.insertSubviewBelow(subview, siblingSubview)
    }

    insertSubviewAbove(subview: View, siblingSubview: View) {
        this.innerView.insertSubviewAbove(subview, siblingSubview)
    }

    bringSubviewToFront(subview: View) {
        this.innerView.bringSubviewToFront(subview)
    }

    sendSubviewToBack(subview: View) {
        this.innerView.sendSubviewToBack(subview)
    }

    get constraints() {
        return this.innerView.constraints;
    }

    addConstraint(constraint: LayoutConstraint) {
        this.innerView.addConstraint(constraint);
    }

    addConstraints(constraints: LayoutConstraint[]) {
        this.innerView.addConstraints(constraints);
    }

    removeConstraint(constraint: LayoutConstraint) {
        this.innerView.removeConstraint(constraint);
    }

    removeAllConstraints() {
        this.innerView.removeAllConstraints()
    }

}
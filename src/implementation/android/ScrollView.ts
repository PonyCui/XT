import { InteractionState } from '../../main.android';
import { View } from "./View";
import { Size, Point, Rect, RectZero, SizeZero, PointZero, RectMake } from "../../interface/Rect";
import { Color } from "../../interface/Color";
import { LayoutConstraint } from "./LayoutConstraint";
import { Touchable, Touch, Event } from '../libraries/touch/TouchManager';
import { PanGestureRecognizer } from '../libraries/touch/PanGestureRecognizer';
import { Scroller, ScrollerDelegate } from '../libraries/scroller/scroller'
import { Animation } from '../libraries/scroller/animation';

export class ScrollView extends View implements ScrollerDelegate {

    onScroll?: (scrollView: ScrollView) => void

    private readonly innerView: View
    private readonly horizontalScrollIndicator: View
    private readonly verticalScrollIndicator: View
    private scroller: Scroller;

    constructor(ref?: any) {
        super(ref || XTRScrollView);
        this.innerView = new View(XTRScrollView.xtr_innerView(this.objectRef))
        this.horizontalScrollIndicator = new View(XTRScrollView.xtr_horizontalScrollIndicator(this.objectRef))
        this.horizontalScrollIndicator.backgroundColor = new Color(0x8f / 0xff, 0x8f / 0xff, 0x90 / 0xff)
        this.horizontalScrollIndicator.cornerRadius = 1.0;
        this.horizontalScrollIndicator.alpha = 0.0;
        this.verticalScrollIndicator = new View(XTRScrollView.xtr_verticalScrollIndicator(this.objectRef))
        this.verticalScrollIndicator.backgroundColor = new Color(0x8f / 0xff, 0x8f / 0xff, 0x90 / 0xff)
        this.verticalScrollIndicator.cornerRadius = 1.0;
        this.verticalScrollIndicator.alpha = 0.0;
        this.resetScroller();
        this.setupTouches();
    }

    private previousAbsLocation: { x: number, y: number } = { x: 0, y: 0 }

    private setupTouches() {
        this.onPan = (state, viewLocation, absLocation, velocity) => {
            if (absLocation) {
                const delta = { x: -(absLocation.x - this.previousAbsLocation.x), y: -(absLocation.y - this.previousAbsLocation.y) }
                this.previousAbsLocation = { ...absLocation }
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

    private decelarating: boolean = false

    private _contentSize: Size = SizeZero

    public get contentSize() {
        return this._contentSize;
    }

    public set contentSize(value: Size) {
        this._contentSize = value;
        this.resetScroller();
    }

    public get contentOffset() {
        return XTRScrollView.xtr_contentOffset(this.objectRef);
    }

    public set contentOffset(value: Point) {
        XTRScrollView.xtr_setContentOffset(value, this.objectRef);
        (this.innerView as any)._originOffset = value;
        this.resetIndicator();
        this.scrollerDidScroll()
    }

    setContentOffset(value: Point, animated: boolean): void {
        this.contentOffset = value;
    }

    private _isDirectionalLockEnabled: boolean = true

    public get isDirectionalLockEnabled() {
        return this._isDirectionalLockEnabled;
    }

    public set isDirectionalLockEnabled(value: boolean) {
        this._isDirectionalLockEnabled = value;
        this.resetScroller();
    }

    private _isPagingEnabled: boolean = false

    public get isPagingEnabled() {
        return this._isPagingEnabled;
    }

    public set isPagingEnabled(value: boolean) {
        this._isPagingEnabled = value;
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

    private _showsHorizontalScrollIndicator: boolean = true

    public get showsHorizontalScrollIndicator() {
        return this._showsHorizontalScrollIndicator;
    }

    public set showsHorizontalScrollIndicator(value: boolean) {
        this._showsHorizontalScrollIndicator = value;
        this.horizontalScrollIndicator.hidden = !value;
    }

    private _showsVerticalScrollIndicator: boolean = true

    public get showsVerticalScrollIndicator() {
        return this._showsVerticalScrollIndicator;
    }

    public set showsVerticalScrollIndicator(value: boolean) {
        this._showsVerticalScrollIndicator = value;
        this.verticalScrollIndicator.hidden = !value;
    }

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
        this.innerView.frame = this.bounds;
        this.resetScroller();
    }

    // Touches

    private resetScroller() {
        if (this.scroller === undefined) {
            this.scroller = new Scroller(this)
        }
        this.scroller.contentSize = this.contentSize
        this.scroller.bounds = this.bounds
        this.scroller.directionalLockEnabled = this.isDirectionalLockEnabled
        this.scroller.bounces = this.bounces
        this.scroller.alwaysBounceVertical = this.alwaysBounceVertical
        this.scroller.alwaysBounceHorizontal = this.alwaysBounceHorizontal
        this.scroller.pagingEnabled = this.isPagingEnabled
        this.scroller.scrollEnabled = this.isScrollEnabled
    }

    scrollerDidScroll(): void {
        this.resetIndicator()
    }

    scrollerDidZoom(): void {

    }

    scrollerWillBeginDragging(): void {
        View.animationWithDuration(0.15, () => {
            this.verticalScrollIndicator.alpha = 1.0;
            this.horizontalScrollIndicator.alpha = 1.0;
        })
        this.verticalScrollIndicator.alpha = 1.0;
        this.horizontalScrollIndicator.alpha = 1.0;
    }

    scrollerWillEndDragging(): void {

    }

    scrollerDidEndDragging(animation: Animation | undefined): void {
        if (animation === undefined) {
            View.animationWithDuration(0.15, () => {
                this.verticalScrollIndicator.alpha = 0.0;
                this.horizontalScrollIndicator.alpha = 0.0;
            })
        }
    }

    scrollerWillBeginDecelerating(): void {
        this.decelarating = true
        this.innerView.userInteractionEnabled = false
        this.gestureRecongnizers.forEach(it => {
            if (it instanceof PanGestureRecognizer) {
                it.deceteMovement = -1
            }
        })
    }

    scrollerDidEndDecelerating(): void {
        this.decelarating = false
        this.innerView.userInteractionEnabled = true
        this.gestureRecongnizers.forEach(it => {
            if (it instanceof PanGestureRecognizer) {
                it.deceteMovement = 10
            }
        })
        View.animationWithDuration(0.15, () => {
            this.verticalScrollIndicator.alpha = 0.0;
            this.horizontalScrollIndicator.alpha = 0.0;
        })
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
            this.horizontalScrollIndicator.frame = { x: xProgress * (bounds.width - xWidth), y: bounds.height - 4, width: xWidth, height: 2 }
        }
        else {
            this.horizontalScrollIndicator.frame = { x: 0, y: bounds.height - 4, width: 0, height: 2 }
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
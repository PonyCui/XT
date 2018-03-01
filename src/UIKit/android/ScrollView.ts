import { View, InteractionState } from "./View";
import { Size, Point, Rect, RectZero, SizeZero, PointZero, RectMake, Insets, InsetsMake } from "../interface/Rect";
import { Color } from "../interface/Color";
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
    protected scroller: Scroller;

    constructor(ref?: any) {
        super(ref || _XTUIScrollView);
        this.innerView = new View(_XTUIScrollView.xtr_innerView(this.objectRef))
        this.horizontalScrollIndicator = new View(_XTUIScrollView.xtr_horizontalScrollIndicator(this.objectRef))
        this.horizontalScrollIndicator.backgroundColor = new Color(0x8f / 0xff, 0x8f / 0xff, 0x90 / 0xff)
        this.horizontalScrollIndicator.cornerRadius = 1.0;
        this.horizontalScrollIndicator.alpha = 0.0;
        this.verticalScrollIndicator = new View(_XTUIScrollView.xtr_verticalScrollIndicator(this.objectRef))
        this.verticalScrollIndicator.backgroundColor = new Color(0x8f / 0xff, 0x8f / 0xff, 0x90 / 0xff)
        this.verticalScrollIndicator.cornerRadius = 1.0;
        this.verticalScrollIndicator.alpha = 0.0;
        this.resetScroller();
        this.setupTouches();
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.ScrollView",
            contentOffset: this.contentOffset,
            contentSize: this.contentSize,
            isDirectionalLockEnabled: this.isDirectionalLockEnabled,
            bounces: this.bounces,
            isPagingEnabled: this.isPagingEnabled,
            isScrollEnabled: this.isScrollEnabled,
            showsHorizontalScrollIndicator: this.showsHorizontalScrollIndicator,
            showsVerticalScrollIndicator: this.showsVerticalScrollIndicator,
            alwaysBounceVertical: this.alwaysBounceVertical,
            alwaysBounceHorizontal: this.alwaysBounceHorizontal,
        }
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
                        x: Math.abs(velocity.x) < 160.0 ? 0.0 : -(velocity.x),
                        y: Math.abs(velocity.y) < 160.0 ? 0.0 : -(velocity.y),
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

    private _contentInset: Insets = InsetsMake(0, 0, 0, 0)

    public get contentInset(): Insets {
        return this._contentInset
    }

    public set contentInset(value: Insets) {
        this._contentInset = value
        this.resetScroller()
    }

    public get contentOffset() {
        return _XTUIScrollView.xtr_contentOffset(this.objectRef);
    }

    public set contentOffset(value: Point) {
        _XTUIScrollView.xtr_setContentOffset(value, this.objectRef);
        (this.innerView as any)._originOffset = value;
        this.scrollerDidScroll()
    }

    setContentOffset(value: Point, animated: boolean): void {
        if (animated) {
            View.animationWithBouncinessAndSpeed(0.0, 8.0, () => {
                this.contentOffset = value;
            })
        }
        else {
            this.contentOffset = value;
        }
    }

    scrollRectToVisible(rect: Rect, animated: boolean): void {
        let targetContentOffset = { ...this.contentOffset }
        if (rect.x < this.contentOffset.x) {
            targetContentOffset.x = rect.x
        }
        else if (rect.x + rect.width > this.contentOffset.x + this.bounds.width) {
            targetContentOffset.x = rect.x + rect.width - this.bounds.width
        }
        if (rect.y < this.contentOffset.y) {
            targetContentOffset.y = rect.y
        }
        else if (rect.y + rect.height > this.contentOffset.y + this.bounds.height) {
            targetContentOffset.y = rect.y + rect.height - this.bounds.height
        }
        targetContentOffset.x = Math.max(0, Math.min(this.contentSize.width - this.bounds.width, targetContentOffset.x))
        targetContentOffset.y = Math.max(0, Math.min(this.contentSize.height - this.bounds.height, targetContentOffset.y))
        this.setContentOffset(targetContentOffset, animated)
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

    private _bounces: boolean = false

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
        this.scroller.contentInset = this.contentInset
        this.scroller.bounds = this.bounds
        this.scroller.directionalLockEnabled = this.isDirectionalLockEnabled
        this.scroller.pagingEnabled = this.isPagingEnabled
        this.scroller.scrollEnabled = this.isScrollEnabled
    }

    scrollerWillRefresh(progress: number): void { }

    scrollerRefreshing(): void { }

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
                it.deceteMovement = 4
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

    protected _addSubview(subview: View) {
        super.addSubview(subview)
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
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
// const Scroller = require('scroller');
import { Scroller, ScrollerDelegate } from '../libraries/scroller/scroller'

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

    private setupTouches() {
        this.onPan = () => {}
        // this.userInteractionEnabled = true
        // this.onPan = (state, viewLocation, absLocation, velocity) => {
        //     if (state === InteractionState.Began) {
        //         if (!viewLocation) { return }
        //         this._indicatorShowed = false;
        //         clearTimeout(this._indicatorHidingTimer);
        //         this._tracking = true;
        //         this.decelarating = false;
        //         this.innerView.userInteractionEnabled = false;
        //         let touches = [{
        //             pageX: viewLocation.x,
        //             pageY: viewLocation.y,
        //         }];
        //         this.scroller.doTouchStart(touches, this.touchTimestamp)
        //     }
        //     else if (state === InteractionState.Changed) {
        //         if (!viewLocation) { return }
        //         let touches = [{
        //             pageX: viewLocation.x,
        //             pageY: viewLocation.y,
        //         }];
        //         this.scroller.doTouchMove(touches, this.touchTimestamp)
        //         if (!this._indicatorShowed) {
        //             this._indicatorShowed = true;
        //             View.animationWithDuration(0.15, () => {
        //                 this.verticalScrollIndicator.alpha = 1.0;
        //                 this.horizonalScrollIndicator.alpha = 1.0;
        //             })
        //         }
        //     }
        //     else if (state === InteractionState.Ended || state === InteractionState.Cancelled) {
        //         this._tracking = false;
        //         this.decelarating = true;
        //         clearTimeout(this._indicatorHidingTimer);
        //         this._indicatorHidingTimer = setTimeout(this.hideIndicator.bind(this), 250)
        //         this.scroller.doTouchEnd(this.touchTimestamp)
        //         if (!this.scroller.__isDecelerating) {
        //             this.innerView.userInteractionEnabled = true;
        //         }
        //     }
        // }
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

    touchesBegan(touches: Touch[], event: Event): void {
        super.touchesBegan(touches, event)
        this.scroller.touchesBegan(touches.map(it => it.rawLocation), touches[0].timestamp)
    }

    touchesMoved(touches: Touch[], event: Event): void {
        super.touchesMoved(touches, event)
        this.scroller.touchesMoved(touches.map(it => it.rawLocation), touches[0].timestamp)
    }

    touchesEnded(touches: Touch[], event: Event): void {
        super.touchesEnded(touches, event)
        this.scroller.touchesEnded(touches.map(it => it.rawLocation), touches[0].timestamp)
    }

    touchesCancelled(touches: Touch[], event: Event): void {
        super.touchesCancelled(touches, event)
        this.scroller.touchesCancelled(touches.map(it => it.rawLocation), touches[0].timestamp)
    }

    private resetScroller() {
        if (this.scroller === undefined) {
            this.scroller = new Scroller(this)
        }
        this.scroller.bounds = this.bounds
        this.scroller.contentSize = this.contentSize


        // this.scroller.options.scrollingX = this.isScrollEnabled && (contentSize.width > bounds.width || this.alwaysBounceHorizontal);
        // this.scroller.options.scrollingY = this.isScrollEnabled && (contentSize.height > bounds.height || this.alwaysBounceVertical);
        // this.scroller.options.bouncing = this.bounces;
        // this.scroller.options.locking = this.isDirectionalLockEnabled;
        // this.scroller.setDimensions(bounds.width, bounds.height, contentSize.width, contentSize.height);
    }

    scrollerDidScroll(): void {
        this.contentOffset = this.scroller.contentOffset
    }

    scrollerDidZoom(): void {
        throw new Error("Method not implemented.");
    }

    scrollViewWillBeginDragging(): void {
        throw new Error("Method not implemented.");
    }

    scrollViewWillEndDragging(): void {
        throw new Error("Method not implemented.");
    }

    scrollViewDidEndDragging(): void {
        throw new Error("Method not implemented.");
    }

    scrollViewWillBeginDecelerating(): void {
        throw new Error("Method not implemented.");
    }

    scrollViewDidEndDecelerating(): void {
        throw new Error("Method not implemented.");
    }

    protected handleScroll(x: number, y: number) {
        this.contentOffset = { x, y }
        this.onScroll && this.onScroll(this);
        clearTimeout(this._indicatorHidingTimer);
        this._indicatorHidingTimer = setTimeout(this.hideIndicator.bind(this), 250)
        clearTimeout(this._restoreInteractiveChildrenTimer);
        this._restoreInteractiveChildrenTimer = setTimeout(() => { this.decelarating = false; this.innerView.userInteractionEnabled = true; }, 32);
    }

    wheelScroll(deltaPoint: { x: number, y: number }): void {
        if (this.userInteractionEnabled && this.alpha > 0.0 && !this.hidden) {
            this.verticalScrollIndicator.alpha = 1.0;
            this.horizonalScrollIndicator.alpha = 1.0;
            this.handleScroll(
                Math.max(0.0, Math.min(this.contentSize.width - this.bounds.width, this.contentOffset.x + deltaPoint.x)),
                Math.max(0.0, Math.min(this.contentSize.height - this.bounds.height, this.contentOffset.y + deltaPoint.y))
            )
        }
        else {
            if (this.superview) {
                (this.superview as any).wheelScroll(deltaPoint);
            }
        }
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
    private hideIndicator() {
        if (this._tracking) { return; }
        View.animationWithDuration(0.15, () => {
            this.verticalScrollIndicator.alpha = 0.0;
            this.horizonalScrollIndicator.alpha = 0.0;
        })
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
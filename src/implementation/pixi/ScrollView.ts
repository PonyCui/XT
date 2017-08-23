import { View } from "./View";
import { Point, Size, Insets, SizeZero, RectMake, PointZero, LayoutConstraint, Color } from "../../interface/Abstract";
import { Rect } from "../../interface/Rect";
declare function require(name: string): any;
const Scroller = require('scroller');

export class ScrollView extends View {

    onScroll?: (scrollView: ScrollView) => void

    private readonly innerView: View;
    private readonly horizonalScrollIndicator: View;
    private readonly verticalScrollIndicator: View;
    private scroller: any;

    constructor(rect?: Rect) {
        super(rect)
        this.innerView = new View();
        super.addSubview(this.innerView);
        this.horizonalScrollIndicator = new View();
        this.horizonalScrollIndicator.backgroundColor = new Color(0x8f / 0xff, 0x8f / 0xff, 0x90 / 0xff)
        this.horizonalScrollIndicator.cornerRadius = 1.0;
        this.horizonalScrollIndicator.alpha = 0.0;
        super.addSubview(this.horizonalScrollIndicator);
        this.verticalScrollIndicator = new View();
        this.verticalScrollIndicator.backgroundColor = new Color(0x8f / 0xff, 0x8f / 0xff, 0x90 / 0xff)
        this.verticalScrollIndicator.cornerRadius = 1.0;
        this.verticalScrollIndicator.alpha = 0.0;
        super.addSubview(this.verticalScrollIndicator);
        this.resetScroller();
        this.resetIndicator();
        this.activePanTouch();
    }

    private _contentSize: Size = SizeZero

    public get contentSize() {
        return this._contentSize;
    }

    public set contentSize(value: Size) {
        this._contentSize = value;
        this.innerView.frame = RectMake(this.contentOffset.x, this.contentOffset.y, value.width, value.height);
        this.resetScroller();
    }

    private _contentOffset: Point = PointZero

    public get contentOffset() {
        return this._contentOffset;
    }

    public set contentOffset(value: Point) {
        this._contentOffset = value;
        this.innerView.frame = { x: -value.x, y: -value.y, width: this.innerView.frame.width, height: this.innerView.frame.height };
        this.resetIndicator();
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

    private _isDirectionalLockEnabled: boolean = true

    public get isDirectionalLockEnabled() {
        return this._isDirectionalLockEnabled;
    }

    public set isDirectionalLockEnabled(value: boolean) {
        this._isDirectionalLockEnabled = value;
        this.resetScroller();
    }

    private _showsHorizontalScrollIndicator: boolean = true

    public get showsHorizontalScrollIndicator() {
        return this._showsHorizontalScrollIndicator;
    }

    public set showsHorizontalScrollIndicator(value: boolean) {
        this._showsHorizontalScrollIndicator = value;
        this.horizonalScrollIndicator.hidden = !value;
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
        this.resetScroller();
    }

    // Touches

    private _tracking = false;
    private _indicatorHidingTimer: number = 0
    private _restoreInteractiveChildrenTimer: number = 0
    private _indicatorShowed = false;

    private activePanTouch() {
        this.userInteractionEnabled = true;
        this.nativeObject.on("touchstart", (event: any) => {
            this._indicatorShowed = false;
            clearTimeout(this._indicatorHidingTimer);
            this._tracking = true;
            this.scroller.doTouchStart(event.data.originalEvent.touches, event.data.originalEvent.timeStamp);
            if (event.data.originalEvent.touches.length > 0) {
                this.onTouchStart(event.data.originalEvent.touches[0].pageX, event.data.originalEvent.touches[0].pageY)
            }
        })
        this.nativeObject.on("touchmove", (event: any) => {
            if (!this._indicatorShowed) {
                this._indicatorShowed = true;
                View.animationWithDuration(0.15, () => {
                    this.verticalScrollIndicator.alpha = 1.0;
                    this.horizonalScrollIndicator.alpha = 1.0;
                })
            }
            event.data.originalEvent.preventDefault();
            this.scroller.doTouchMove(event.data.originalEvent.touches, event.data.originalEvent.timeStamp, event.data.originalEvent.scale);
            clearTimeout(this._restoreInteractiveChildrenTimer);
            this.nativeObject.interactiveChildren = false;
            if (event.data.originalEvent.touches.length > 0) {
                this.onTouchMove(event.data.originalEvent.touches[0].pageX, event.data.originalEvent.touches[0].pageY)
            }
        })
        this.nativeObject.on("touchend", (event: any) => {
            this._tracking = false;
            this.scroller.doTouchEnd(event.data.originalEvent.timeStamp);
            clearTimeout(this._indicatorHidingTimer);
            this._indicatorHidingTimer = setTimeout(this.hideIndicator.bind(this), 250)
            this.onTouchEnd();
        })
        this.nativeObject.on("touchendoutside", (event: any) => {
            this._tracking = false;
            this.scroller.doTouchEnd(event.data.originalEvent.timeStamp);
            clearTimeout(this._indicatorHidingTimer);
            this._indicatorHidingTimer = setTimeout(this.hideIndicator.bind(this), 250)
            this.onTouchEnd();
        })
        this.nativeObject.on("touchcancel", (event: any) => {
            this._tracking = false;
            this.scroller.doTouchEnd(event.data.originalEvent.timeStamp);
            clearTimeout(this._indicatorHidingTimer);
            this._indicatorHidingTimer = setTimeout(this.hideIndicator.bind(this), 250)
            this.onTouchEnd();
        })
    }

    protected onTouchStart(absX: number, absY: number) {

    }

    protected onTouchMove(absX: number, absY: number) {

    }

    protected onTouchEnd() {

    }

    private resetScroller() {
        if (this.scroller === undefined) {
            this.scroller = new Scroller(this.handleScroll.bind(this))
        }
        this.scroller.options.scrollingX = this.isScrollEnabled && (this.contentSize.width > this.bounds.width || this.alwaysBounceHorizontal);
        this.scroller.options.scrollingY = this.isScrollEnabled && (this.contentSize.height > this.bounds.height || this.alwaysBounceVertical);
        this.scroller.options.bouncing = this.bounces;
        this.scroller.options.locking = this.isDirectionalLockEnabled;
        this.scroller.setDimensions(this.bounds.width, this.bounds.height, this.contentSize.width, this.contentSize.height);
    }

    protected handleScroll(x: number, y: number) {
        this.contentOffset = { x, y }
        this.onScroll && this.onScroll(this);
        clearTimeout(this._indicatorHidingTimer);
        this._indicatorHidingTimer = setTimeout(this.hideIndicator.bind(this), 250)
        clearTimeout(this._restoreInteractiveChildrenTimer);
        this._restoreInteractiveChildrenTimer = setTimeout(() => { this.nativeObject.interactiveChildren = true }, 150);
    }

    // Indicators

    private resetIndicator() {
        if (this.contentSize.height > this.bounds.height) {
            const yProgress = this.contentOffset.y / (this.contentSize.height - this.bounds.height);
            const yHeight = this.bounds.height / (this.contentSize.height / this.bounds.height)
            this.verticalScrollIndicator.frame = { x: this.bounds.width - 4, y: yProgress * (this.bounds.height - yHeight), width: 2, height: yHeight }
        }
        else {
            this.verticalScrollIndicator.frame = { x: this.bounds.width - 4, y: 0, width: 2, height: 0 }
        }
        if (this.contentSize.width > this.bounds.width) {
            const xProgress = this.contentOffset.x / (this.contentSize.width - this.bounds.width);
            const xWidth = this.bounds.width / (this.contentSize.width / this.bounds.width)
            this.horizonalScrollIndicator.frame = { x: xProgress * (this.bounds.width - xWidth), y: this.bounds.height - 4, width: xWidth, height: 2 }
        }
        else {
            this.horizonalScrollIndicator.frame = { x: 0, y: this.bounds.height - 4, width: 0, height: 2 }
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
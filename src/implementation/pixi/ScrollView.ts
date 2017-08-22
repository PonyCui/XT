import { View } from "./View";
import { Point, Size, Insets, SizeZero, RectMake, PointZero, LayoutConstraint } from "../../interface/Abstract";
import { Rect } from "../../interface/Rect";
declare function require(name: string): any;
const Scroller = require('scroller');

export class ScrollView extends View {

    showsHorizontalScrollIndicator: boolean = true
    showsVerticalScrollIndicator: boolean = true

    private readonly innerView: View;
    private scroller: any;

    constructor(rect?: Rect) {
        super(rect)
        this.innerView = new View();
        super.addSubview(this.innerView);
        this.resetScroller();
        this.activePanTouch();
    }

    private _contentSize: Size = SizeZero

    public get contentSize() {
        return this._contentSize;
    }

    public set contentSize(value: Size) {
        this._contentSize = value;
        this.innerView.frame = RectMake(this.contentOffset.x, this.contentOffset.y, value.width, value.height);
    }

    private _contentOffset: Point = PointZero

    public get contentOffset() {
        return this._contentOffset;
    }

    public set contentOffset(value: Point) {
        this._contentOffset = value;
        this.innerView.frame = { x: -value.x, y: -value.y, width: this.innerView.frame.width, height: this.innerView.frame.height };
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

    layoutSubviews() {
        super.layoutSubviews();
        this.resetScroller();
    }

    // Touches

    private activePanTouch() {
        this.userInteractionEnabled = true;
        this.nativeObject.on("touchstart", (event: any) => {
            this.scroller.doTouchStart(event.data.originalEvent.touches, event.data.originalEvent.timeStamp);
        })
        this.nativeObject.on("touchmove", (event: any) => {
            event.data.originalEvent.preventDefault();
            this.scroller.doTouchMove(event.data.originalEvent.touches, event.data.originalEvent.timeStamp, event.data.originalEvent.scale);
        })
        this.nativeObject.on("touchend", (event: any) => {
            this.scroller.doTouchEnd(event.data.originalEvent.timeStamp);
        })
        this.nativeObject.on("touchendoutside", (event: any) => {
            this.scroller.doTouchEnd(event.data.originalEvent.timeStamp);
        })
        this.nativeObject.on("touchcancel", (event: any) => {
            this.scroller.doTouchEnd(event.data.originalEvent.timeStamp);
        })
    }

    private resetScroller() {
        if (this.scroller === undefined) {
            this.scroller = new Scroller(this.handleScroll.bind(this))
        }
        this.scroller.options.scrollingX = this.isScrollEnabled && this.contentSize.width > this.bounds.width;
        this.scroller.options.scrollingY = this.isScrollEnabled && this.contentSize.height > this.bounds.height;
        this.scroller.options.bouncing = this.bounces;
        this.scroller.options.locking = this.isDirectionalLockEnabled;
        this.scroller.setDimensions(this.bounds.width, this.bounds.height, this.contentSize.width, this.contentSize.height);
    }

    private handleScroll(x: number, y: number) {
        this.contentOffset = { x, y }
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
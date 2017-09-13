import { View } from "./View";
import { Size, Point, Rect, RectZero, SizeZero, PointZero, RectMake } from "../../interface/Rect";
import { Color } from "../../interface/Color";
import { LayoutConstraint } from "./LayoutConstraint";
declare function require(name: string): any;
const Scroller = require('scroller');

export class ScrollView extends View {

    onScroll?: (scrollView: ScrollView) => void

    nativeObject: any;
    private readonly innerView: View;
    private readonly horizonalScrollIndicator: View;
    private readonly verticalScrollIndicator: View;
    private scroller: any;

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        super(undefined, undefined, true);
        if (_isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.innerView = new View();
            this.nativeObject = XTRScrollView.createScriptObject(rect || RectZero, this);
            (window as any).XTRObjCreater.store(this);
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
            this.init();
        }
    }

    private _contentSize: Size = SizeZero

    public get contentSize() {
        return this._contentSize;
    }

    public set contentSize(value: Size) {
        this._contentSize = value;
        this.nativeObject.xtr_setContentSize(value)
        this.resetScroller();
    }

    public get contentOffset() {
        return this.nativeObject.xtr_contentOffset();
    }

    public set contentOffset(value: Point) {
        this.nativeObject.xtr_setContentOffset(value);
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
        this.nativeObject.xtr_setBounce(value)
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
        this.nativeObject.xtr_setAlwaysBounceVertical(value)
        this.resetScroller();
    }

    private _alwaysBounceHorizontal: boolean = false

    public get alwaysBounceHorizontal() {
        return this._alwaysBounceHorizontal;
    }

    public set alwaysBounceHorizontal(value: boolean) {
        this._alwaysBounceHorizontal = value;
        this.nativeObject.xtr_setAlwaysBounceHorizontal(value)
        this.resetScroller();
    }

    layoutSubviews() {
        super.layoutSubviews();
        this.innerView.frame = this.bounds;
        this.resetScroller();
    }

    // Touches

    handleTouchStart(touches: any[], timestamp: number) {
        this._indicatorShowed = false;
        clearTimeout(this._indicatorHidingTimer);
        this._tracking = true;
        let tTouches = [];
        for (let index = 0; index < touches.length; index++) {
            let element = touches[index];
            tTouches.push({ pageX: element.x, pageY: element.y });
        }
        this.scroller.doTouchStart(tTouches, timestamp)
    }

    handleTouchMove(touches: any[], timestamp: number, childInteracting = false) {
        let tTouches = [];
        for (let index = 0; index < touches.length; index++) {
            let element = touches[index];
            tTouches.push({ pageX: element.x, pageY: element.y });
        }
        this.scroller.doTouchMove(tTouches, timestamp)
        if (!childInteracting) {
            this.nativeObject.xtr_disableChildrenInteractive(true)
        }
        if (!this._indicatorShowed) {
            this._indicatorShowed = true;
            View.animationWithDuration(0.15, () => {
                this.verticalScrollIndicator.alpha = 1.0;
                this.horizonalScrollIndicator.alpha = 1.0;
            })
        }
    }

    handleTouchEnd(touches: any[], timestamp: number) {
        this._tracking = false;
        this.nativeObject.xtr_markAsDecelarating(true)
        clearTimeout(this._indicatorHidingTimer);
        this._indicatorHidingTimer = setTimeout(this.hideIndicator.bind(this), 250)
        this.scroller.doTouchEnd(timestamp)
    }

    handleTouchCancel() {
        this._tracking = false;
        clearTimeout(this._indicatorHidingTimer);
        this._indicatorHidingTimer = setTimeout(this.hideIndicator.bind(this), 250)
    }

    private resetScroller() {
        if (this.scroller === undefined) {
            this.scroller = new Scroller(this.handleScroll.bind(this))
        }
        this.scroller.options.scrollingX = this.isScrollEnabled && (this.contentSize.width > this.bounds.width || this.alwaysBounceHorizontal);
        this.scroller.options.scrollingY = this.isScrollEnabled && (this.contentSize.height > this.bounds.height || this.alwaysBounceVertical);
        this.scroller.options.bouncing = this.bounces;
        this.scroller.options.locking = this.isDirectionalLockEnabled;
        // this.scroller.options.penetrationDeceleration = 0.06
        // this.scroller.options.penetrationAcceleration = 0.06
        this.scroller.setDimensions(this.bounds.width, this.bounds.height, this.contentSize.width, this.contentSize.height);
    }

    protected handleScroll(x: number, y: number) {
        this.contentOffset = { x, y }
        this.onScroll && this.onScroll(this);
        clearTimeout(this._indicatorHidingTimer);
        this._indicatorHidingTimer = setTimeout(this.hideIndicator.bind(this), 250)
        clearTimeout(this._restoreInteractiveChildrenTimer);
        this._restoreInteractiveChildrenTimer = setTimeout(() => { this.nativeObject.xtr_disableChildrenInteractive(false); this.nativeObject.xtr_markAsDecelarating(false); }, 150);
    }

    // Indicators

    private _tracking = false;
    private _indicatorHidingTimer: number = 0
    private _restoreInteractiveChildrenTimer: number = 0
    private _indicatorShowed = false;

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

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.toString().indexOf("com.opensource.xtruntime.XTRScrollView$InnerObject") === 0) {
        return new ScrollView(undefined, view);
    }
    return undefined;
})
export interface ScrollerDelegate {

    scrollerDidScroll(): void
    scrollerDidZoom(): void
    scrollerWillBeginDragging(): void
    scrollerWillEndDragging(): void
    scrollerDidEndDragging(): void
    scrollerWillBeginDecelerating(): void
    scrollerDidEndDecelerating(): void

}

export class Scroller {

    contentOffset: { x: number, y: number } = { x: 0, y: 0 }
    contentSize: { width: number, height: number } = { width: 0, height: 0 }
    bounds: { width: number, height: number } = { width: 0, height: 0 }
    directionalLockEnabled: boolean = false
    bounces: boolean = true
    alwaysBounceVertical: boolean = false
    alwaysBounceHorizontal: boolean = false
    pagingEnabled: boolean = false
    scrollEnabled: boolean = true
    decelerationRate: number = 0.997

    private _tracking: boolean = false
    public get tracking(): boolean {
        return this._tracking
    }

    private _dragging: boolean = false
    public get dragging(): boolean {
        return this._dragging
    }

    private _decelerating: boolean = false
    public get decelerating(): boolean {
        return this._decelerating
    }

    constructor(readonly delegate: ScrollerDelegate) { }


    // Private methods

    private startPoint: { x: number, y: number } = { x: 0, y: 0 }
    private startContentOffset: { x: number, y: number } = this.contentOffset
    private lastContentOffset: { x: number, y: number } = this.contentOffset
    private lastVelocity: { x: number, y: number } = { x: 0, y: 0 }
    private lastTimestamp: number = 0
    private deceleratingStartContentOffset: { x: number, y: number } | undefined = undefined
    private deceleratingStartTimestamp: number = 0
    private deceleratingRAFHandler: any = undefined

    touchesBegan(touches: { x: number, y: number }[], timestamp: number): boolean {
        if (this._decelerating) {
            this._decelerating = false
            this.lastVelocity = { x: 0, y: 0 }
            this.stopDecelerating()
        }
        this._tracking = true
        this.startPoint = touches[0]
        this.startContentOffset = this.contentOffset
        return false
    }

    touchesMoved(touches: { x: number, y: number }[], timestamp: number): boolean {
        if (!this._dragging) {
            const currentPoint = touches[0]
            if (Math.abs(currentPoint.x - this.startPoint.x) >= 8.0 || Math.abs(currentPoint.y - this.startPoint.y) >= 8.0) {
                this.delegate.scrollerWillBeginDragging()
                this._dragging = true
                this.lastContentOffset = this.contentOffset
                this.lastTimestamp = timestamp
            }
        }
        else {
            const currentPoint = touches[0]
            const deltaPoint = { x: (currentPoint.x - this.startPoint.x), y: (currentPoint.y - this.startPoint.y) }
            this.contentOffset = { x: this.startContentOffset.x, y: this.startContentOffset.y - deltaPoint.y }
            this.lastVelocity = {
                x: (this.contentOffset.x - this.lastContentOffset.x) / (timestamp - this.lastTimestamp),
                y: (this.contentOffset.y - this.lastContentOffset.y) / (timestamp - this.lastTimestamp),
            }
            this.lastContentOffset = this.contentOffset
            this.lastTimestamp = timestamp
            this.delegate.scrollerDidScroll()
        }
        return false
    }

    touchesEnded(touches: { x: number, y: number }[], timestamp: number): boolean {
        this.delegate.scrollerWillEndDragging()
        this._tracking = false;
        this._dragging = false;
        this.delegate.scrollerDidEndDragging()
        const currentPoint = touches[0]
        const deltaPoint = { x: (currentPoint.x - this.startPoint.x), y: (currentPoint.y - this.startPoint.y) }
        this.contentOffset = { x: this.startContentOffset.x, y: this.startContentOffset.y - deltaPoint.y }
        this.delegate.scrollerDidScroll()
        this.deceleratingStartContentOffset = this.contentOffset
        this.doDecelerating()
        return false
    }

    touchesCancelled(touches: { x: number, y: number }[], timestamp: number): boolean {
        this.touchesEnded(touches, timestamp)
        return false
    }

    private doDecelerating() {
        if (this.deceleratingStartContentOffset && this._decelerating === true) {
            const lastDeltaTimestamp = performance.now() - this.deceleratingStartTimestamp - 16
            const deltaTimestamp = performance.now() - this.deceleratingStartTimestamp
            const lastX = this.deceleratingStartContentOffset.x + (this.lastVelocity.x / (1 - this.decelerationRate)) * (1 - Math.exp(-(1 - this.decelerationRate) * lastDeltaTimestamp));
            const lastY = this.deceleratingStartContentOffset.y + (this.lastVelocity.y / (1 - this.decelerationRate)) * (1 - Math.exp(-(1 - this.decelerationRate) * lastDeltaTimestamp));
            const currentX = this.deceleratingStartContentOffset.x + (this.lastVelocity.x / (1 - this.decelerationRate)) * (1 - Math.exp(-(1 - this.decelerationRate) * deltaTimestamp));
            const currentY = this.deceleratingStartContentOffset.y + (this.lastVelocity.y / (1 - this.decelerationRate)) * (1 - Math.exp(-(1 - this.decelerationRate) * deltaTimestamp));
            this.contentOffset = {
                x: currentX,
                y: currentY
            }
            this.delegate.scrollerDidScroll()
            if (Math.abs(currentX - lastX) < 0.1 && Math.abs(currentY - lastY) < 0.1) {
                this._decelerating = false
                this.delegate.scrollerDidEndDecelerating()
            }
            else {
                this.deceleratingRAFHandler = requestAnimationFrame(() => {
                    this.doDecelerating()
                })
            }
        }
        else if (this.deceleratingStartContentOffset && (Math.abs(this.lastVelocity.x) > 0.1 || Math.abs(this.lastVelocity.y) > 0.1)) {
            this.delegate.scrollerWillBeginDecelerating()
            this.deceleratingStartTimestamp = performance.now()
            this._decelerating = true
            this.doDecelerating()
        }
        else {
            this._decelerating = false
        }
    }

    private stopDecelerating() {
        this.deceleratingStartContentOffset = undefined
        this._decelerating = false
        cancelAnimationFrame(this.deceleratingRAFHandler)
    }

}
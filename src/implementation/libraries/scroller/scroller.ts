export interface ScrollerDelegate {

    scrollerDidScroll(): void
    scrollerDidZoom(): void
    scrollViewWillBeginDragging(): void
    scrollViewWillEndDragging(): void
    scrollViewDidEndDragging(): void
    scrollViewWillBeginDecelerating(): void
    scrollViewDidEndDecelerating(): void

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

    private startPoint: { x: number, y: number } = { x: 0, y: 0 }
    private startContentOffset: { x: number, y: number } = this.contentOffset

    touchesBegan(touches: { x: number, y: number }[], timestamp: number): boolean {
        this._tracking = true
        this.startPoint = touches[0]
        this.startContentOffset = this.contentOffset
        return false
    }

    touchesMoved(touches: { x: number, y: number }[], timestamp: number): boolean {
        if (!this._dragging) {
            const currentPoint = touches[0]
            if (Math.abs(currentPoint.x - this.startPoint.x) >= 8.0 || Math.abs(currentPoint.y - this.startPoint.y) >= 8.0) {
                this._dragging = true
            }
        }
        else {
            const currentPoint = touches[0]
            const deltaPoint = { x: (currentPoint.x - this.startPoint.x), y: (currentPoint.y - this.startPoint.y) }
            this.contentOffset = { x: this.startContentOffset.x, y: this.startContentOffset.y - deltaPoint.y }
            this.delegate.scrollerDidScroll()
        }
        return false
    }

    touchesEnded(touches: { x: number, y: number }[], timestamp: number): boolean {
        return false
    }

    touchesCancelled(touches: { x: number, y: number }[], timestamp: number): boolean {
        return false
    }

}
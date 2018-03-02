import { Animation } from "./animation";
import { AnimationDeceleration } from "./deceleration";
import { Paging } from "./paging";
declare var clearAnimationFrame: any
const cancelAnimationFrame = window.cancelAnimationFrame || clearAnimationFrame

export interface ScrollerDelegate {

    contentOffset: { x: number, y: number }
    scrollerWillRefresh(progress: number): void
    scrollerRefreshing(): void
    scrollerDidScroll(): void
    scrollerDidZoom(): void
    scrollerWillBeginDragging(): void
    scrollerWillEndDragging(): void
    scrollerDidEndDragging(animation: Animation | undefined): void
    scrollerWillBeginDecelerating(): void
    scrollerDidEndDecelerating(): void

}

export class Scroller {

    contentSize: { width: number, height: number } = { width: 0, height: 0 }
    contentInset: { top: number, left: number, bottom: number, right: number } = { top: 0, left: 0, bottom: 0, right: 0 }
    bounds: { width: number, height: number } = { width: 0, height: 0 }
    directionalLockEnabled: boolean = false
    pagingEnabled: boolean = false
    scrollEnabled: boolean = true
    refreshEnabled: boolean = false
    refreshing: boolean = false
    decelerationRate: number = 0.997
    accelerationRate: number = 0.985

    public endRefreshing() {
        this.refreshing = false
        if (this.delegate.contentOffset.y < -this.contentInset.top) {
            this._endDraggingWithDecelerationVelocity({ x: 0, y: 0 })
        }
    }

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

    private scrollTimer: any = undefined
    private scrollAnimation: Animation | undefined = undefined
    private dragStartContentOffset: { x: number, y: number } = { x: 0, y: 0 }

    _beginDragging() {
        if (!this.scrollEnabled) {
            return;
        }
        if (!this._dragging) {
            this.dragStartContentOffset = { ...this.delegate.contentOffset }
            this._dragging = true;
            this._cancelScrollAnimation()
            this.delegate.scrollerWillBeginDragging()
        }
    }

    _dragBy(delta: { x: number, y: number }) {
        if (!this.scrollEnabled) {
            return;
        }
        if (Math.abs(delta.x) < 0.1 && Math.abs(delta.y) < 0.1) {
            return
        }
        if (this._dragging) {
            const originalOffset = this.delegate.contentOffset;
            let proposedOffset = { ...originalOffset };
            if (this.refreshEnabled && proposedOffset.y + delta.y < -this.contentInset.top) {
                this.delegate.contentOffset = {
                    x: Math.min(Math.max(-this.contentInset.left, this.contentSize.width + this.contentInset.right - this.bounds.width), Math.max(-this.contentInset.left, proposedOffset.x + delta.x)),
                    y: proposedOffset.y + delta.y / 3.0,
                }
                const bounceValue = -this.contentInset.top - (proposedOffset.y + delta.y / 3.0)
                const refreshProgress = Math.min(1.0, bounceValue / (120 * 0.66))
                this.delegate.scrollerWillRefresh(refreshProgress)
                if (refreshProgress == 1.0) {
                    this.refreshing = true
                }
            }
            else {
                this.delegate.contentOffset = {
                    x: Math.min(Math.max(-this.contentInset.left, this.contentSize.width + this.contentInset.right - this.bounds.width), Math.max(-this.contentInset.left, proposedOffset.x + delta.x)),
                    y: Math.min(Math.max(-this.contentInset.top, this.contentSize.height + this.contentInset.bottom - this.bounds.height), Math.max(-this.contentInset.top, proposedOffset.y + delta.y)),
                }
            }
        }
    }

    _endDraggingWithDecelerationVelocity(velocity: { x: number, y: number }) {
        if (this.delegate.contentOffset.x < -this.contentInset.left) {
            velocity.x = 0
        }
        if (this.delegate.contentOffset.y < -this.contentInset.top) {
            velocity.y = 0
        }
        if (!this.scrollEnabled) {
            return;
        }
        if (this._dragging) {
            if (this.refreshing) {
                this.delegate.scrollerRefreshing()
            }
            this._dragging = false;
            this.delegate.scrollerWillEndDragging()
            const decelerationAnimation = this._pagingAnimationWithVelocity(velocity) || this._decelerationAnimationWithVelocity(velocity)
            this.delegate.scrollerDidEndDragging(decelerationAnimation)
            if (decelerationAnimation instanceof Animation) {
                this._setScrollAnimation(decelerationAnimation);
                this._decelerating = true;
                this.delegate.scrollerWillBeginDecelerating()
            }
        }
        else {
            const decelerationAnimation = this._decelerationAnimationWithVelocity(velocity)
            if (decelerationAnimation instanceof Animation) {
                this._setScrollAnimation(decelerationAnimation);
            }
        }
    }

    _pagingAnimationWithVelocity(velocity: { x: number, y: number }): Animation | undefined {
        if (this.pagingEnabled) {
            const currentContentOffset = this.delegate.contentOffset
            const deltaContentOffset = { x: currentContentOffset.x - this.dragStartContentOffset.x, y: currentContentOffset.y - this.dragStartContentOffset.y }
            let toX = 0.0
            if (deltaContentOffset.x / this.bounds.width > 0.25 || (velocity.x / 1000) > 0.1) {
                toX = (Math.floor((this.dragStartContentOffset.x + deltaContentOffset.x) / this.bounds.width) + 1) * this.bounds.width
            }
            else if (deltaContentOffset.x / this.bounds.width < -0.25 || (velocity.x / 1000) < -0.1) {
                toX = (Math.floor((this.dragStartContentOffset.x + deltaContentOffset.x) / this.bounds.width)) * this.bounds.width
            }
            else {
                toX = (Math.floor(this.dragStartContentOffset.x / this.bounds.width) + 0) * this.bounds.width
            }
            toX = Math.max(0, Math.min(this.contentSize.width - this.bounds.width, toX))
            let toY = 0.0
            if (deltaContentOffset.y / this.bounds.height > 0.25 || (velocity.y / 1000) > 0.1) {
                toY = (Math.floor((this.dragStartContentOffset.y + deltaContentOffset.y) / this.bounds.height) + 1) * this.bounds.height
            }
            else if (deltaContentOffset.y / this.bounds.height < -0.25 || (velocity.y / 1000) < -0.1) {
                toY = (Math.floor((this.dragStartContentOffset.y + deltaContentOffset.y) / this.bounds.height)) * this.bounds.height
            }
            else {
                toY = (Math.floor(this.dragStartContentOffset.y / this.bounds.height) + 0) * this.bounds.height
            }
            toY = Math.max(0, Math.min(this.contentSize.height - this.bounds.height, toY))
            return new Paging(this, { x: toX, y: toY }, {
                x: velocity.x / 1000,
                y: velocity.y / 1000
            })
        }
        return undefined
    }

    _decelerationAnimationWithVelocity(velocity: { x: number, y: number }): Animation | undefined {
        if (this.contentSize.width <= this.bounds.width) {
            velocity.x = 0.0
        }
        if (this.contentSize.height <= this.bounds.height) {
            velocity.y = 0.0
        }
        return new AnimationDeceleration(this, {
            x: velocity.x / 1000,
            y: velocity.y / 1000
        });
    }

    _setScrollAnimation(animation: Animation) {
        this._cancelScrollAnimation()
        this.scrollAnimation = animation;
        this.scrollTimer = requestAnimationFrame(this._updateScrollAnimation.bind(this))
    }

    _updateScrollAnimation() {        
        if (this.scrollAnimation) {
            const finished = this.scrollAnimation.animate()
            if (finished) {
                this._cancelScrollAnimation()
            }
            else {
                requestAnimationFrame(this._updateScrollAnimation.bind(this))
            }
        }
    }

    _cancelScrollAnimation() {
        cancelAnimationFrame(this.scrollTimer)
        this.scrollTimer = undefined
        this.scrollAnimation = undefined
        if (this._decelerating) {
            this._decelerating = false
            this.delegate.scrollerDidEndDecelerating()
        }
    }

}
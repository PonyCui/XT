import { Animation } from "./animation";
import { AnimationDeceleration } from "./deceleration";

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

    _contentOffset: { x: number, y: number } = { x: 0, y: 0 }
    public get contentOffset(): { x: number, y: number } {
        return this._contentOffset
    }
    public set contentOffset(value: { x: number, y: number }) {
        this._contentOffset = value
        this.delegate.scrollerDidScroll()
    }

    contentSize: { width: number, height: number } = { width: 0, height: 0 }
    bounds: { width: number, height: number } = { width: 0, height: 0 }
    directionalLockEnabled: boolean = false
    bounces: boolean = true
    alwaysBounceVertical: boolean = false
    alwaysBounceHorizontal: boolean = false
    pagingEnabled: boolean = false
    scrollEnabled: boolean = true
    decelerationRate: number = 0.997
    accelerationRate: number = 0.978

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

    _beginDragging() {
        if (!this._dragging) {
            this._dragging = true;
            this._cancelScrollAnimation()
            this.delegate.scrollerWillBeginDragging()
        }
    }

    _dragBy(delta: { x: number, y: number }) {
        if (this.contentSize.width <= this.bounds.width) {
            delta.x = 0.0
        }
        if (this.contentSize.height <= this.bounds.height) {
            delta.y = 0.0
        }
        if (this._dragging) {
            const originalOffset = this.contentOffset;
            let proposedOffset = originalOffset;
            if (this.bounces) {
                if (proposedOffset.x + delta.x < 0.0) {
                    proposedOffset.x = proposedOffset.x + delta.x / 3.0
                }
                if (proposedOffset.y + delta.y < 0.0) {
                    proposedOffset.y = proposedOffset.y + delta.y / 3.0
                }
                this.contentOffset = proposedOffset
            }
            else {
                this.contentOffset = {
                    x: Math.max(0.0, proposedOffset.x + delta.x),
                    y: Math.max(0.0, proposedOffset.x + delta.y),
                }
            }
        }
    }

    _endDraggingWithDecelerationVelocity(velocity: { x: number, y: number }) {
        if (this._dragging) {
            this._dragging = false;
            this.delegate.scrollerDidEndDragging()
            const decelerationAnimation = this._decelerationAnimationWithVelocity(velocity)
            this.delegate.scrollerDidEndDragging()
            if (decelerationAnimation) {
                this._setScrollAnimation(decelerationAnimation);
                this._decelerating = true;
                this.delegate.scrollerWillBeginDecelerating()
            } else {
                this.contentOffset = this._confinedContentOffset(this.contentOffset);
            }
        }
    }

    _decelerationAnimationWithVelocity(velocity: { x: number, y: number }): Animation | undefined {
        const confinedOffset = this._confinedContentOffset(this.contentOffset);
        if (this.contentSize.width <= this.bounds.width) {
            velocity.x = 0.0
        }
        if (this.contentSize.height <= this.bounds.height) {
            velocity.y = 0.0
        }
        if (!(velocity.x == 0.0 && velocity.y == 0.0) || !(confinedOffset.x == this.contentOffset.x && confinedOffset.y == this.contentOffset.y)) {
            return new AnimationDeceleration(this, {
                x: velocity.x / 1000,
                y: velocity.y / 1000
            });
        } else {
            return undefined;
        }
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

    _confinedContentOffset(contentOffset: { x: number, y: number }) {
        const scrollerBounds = this.bounds;
        if ((this.contentSize.width - contentOffset.x) < scrollerBounds.width) {
            contentOffset.x = (this.contentSize.width - scrollerBounds.width);
        }
        if ((this.contentSize.height - contentOffset.y) < scrollerBounds.height) {
            contentOffset.y = (this.contentSize.height - scrollerBounds.height);
        }
        contentOffset.x = Math.max(contentOffset.x, 0);
        contentOffset.y = Math.max(contentOffset.y, 0);
        if (this.contentSize.width <= scrollerBounds.width) {
            contentOffset.x = 0;
        }
        if (this.contentSize.height <= scrollerBounds.height) {
            contentOffset.y = 0;
        }
        return contentOffset;
    }

}
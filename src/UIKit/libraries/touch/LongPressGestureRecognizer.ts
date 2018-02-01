import { GestureRecongnizer, GestureOwner, GestureRecognizerState, GestureManager } from "./GestureManager";
import { Touch, Event } from "./TouchManager"

export class LongPressGestureRecognizer implements GestureRecongnizer {

    owner?: GestureOwner
    enabled: boolean = true
    cancellable: boolean = false
    state: GestureRecognizerState = GestureRecognizerState.Possible
    minimumPressDuration = 0.5;
    allowableMovement = 10;
    fire?: (state: GestureRecognizerState, absLocation: { x: number, y: number }) => void

    private recognized = false
    private lastZeroTouch: Touch | undefined = undefined
    private touchStartPoint?: { x: number, y: number }[]

    touchesBegan(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        this.lastZeroTouch = touches[0]
        this.touchStartPoint = touches.map(t => t.rawLocation)
        this.recognized = false
        this.state = GestureRecognizerState.Possible
        GestureManager.activeTimerHanders.push(setTimeout(() => {
            if (this.touchStartPoint) {
                let invalidPoints = this.touchStartPoint.filter(pt => {
                    return touches.filter(t => Math.abs(pt.x - t.rawLocation.x) > this.allowableMovement || Math.abs(pt.y - t.rawLocation.y) > this.allowableMovement).length > 0
                });
                if (invalidPoints.length > 0) {
                    this.state = GestureRecognizerState.Failed
                    this.touchStartPoint = undefined;
                }
                else {
                    if (triggerBlock && triggerBlock(this)) {
                        this.recognized = true
                        this.state = GestureRecognizerState.Began
                        this.fire && this.fire(this.state, touches[0].rawLocation)
                    }
                }
            }
        }, this.minimumPressDuration * 1000));
        return false
    }

    touchesMoved(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        this.lastZeroTouch = touches[0]
        if (this.recognized) {
            this.state = GestureRecognizerState.Changed
            this.fire && this.fire(this.state, touches[0].rawLocation)
        }
        else if (this.touchStartPoint) {
            let invalidPoints = this.touchStartPoint.filter(pt => {
                return touches.filter(t => Math.abs(pt.x - t.rawLocation.x) > this.allowableMovement || Math.abs(pt.y - t.rawLocation.y) > this.allowableMovement).length > 0
            });
            if (invalidPoints.length > 0) {
                this.state = GestureRecognizerState.Failed
                this.touchStartPoint = undefined;
            }
        }
        return false
    }

    touchesEnded(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        this.lastZeroTouch = touches[0]
        if (this.recognized) {
            if (this.state !== GestureRecognizerState.Ended) {
                this.state = GestureRecognizerState.Ended
                this.fire && this.fire(this.state, touches[0].rawLocation)
                releaseBlock && releaseBlock();
                this.touchStartPoint = undefined;
            }
        }
        else {
            this.state = GestureRecognizerState.Failed
            this.touchStartPoint = undefined;
        }
        return false
    }

    touchesCancelled(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        const lastTouch = touches[0] || this.lastZeroTouch
        this.recognized = false
        this.lastZeroTouch = lastTouch
        this.state = GestureRecognizerState.Cancelled
        this.fire && this.fire(this.state, lastTouch ? lastTouch.rawLocation : { x: 0, y: 0 })
        this.touchStartPoint = undefined;
        return false
    }

    locationInView(): { x: number, y: number } {
        if (this.lastZeroTouch) {
            return this.lastZeroTouch.locationInView(this.owner as any)
        }
        return { x: 0, y: 0 }
    }

}
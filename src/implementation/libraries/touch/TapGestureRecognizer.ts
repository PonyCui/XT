import { GestureRecongnizer, GestureOwner, GestureRecognizerState } from "./GestureManager";
import { Touch, Event } from "./TouchManager"

export class TapGestureRecognizer implements GestureRecongnizer {

    owner?: GestureOwner
    enabled: boolean = true
    cancellable: boolean = false
    state: GestureRecognizerState = GestureRecognizerState.Possible
    tapsRequired = 1
    fire?: (state: GestureRecognizerState, viewLocation?: { x: number, y: number }, absLocation?: { x: number, y: number }) => void

    private touchStartPoint?: { x: number, y: number }[]

    touchesBegan(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        this.touchStartPoint = touches.map(t => t.locationInView(owner as any))
        this.state = GestureRecognizerState.Possible
        return false
    }

    touchesMoved(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        if (this.touchStartPoint) {
            let invalidPoints = this.touchStartPoint.filter(pt => {
                return touches.filter(t => Math.abs(pt.x - t.locationInView(owner as any).x) > 8.0 || Math.abs(pt.y - t.locationInView(owner as any).y) > 8.0).length > 0
            });
            if (invalidPoints.length > 0) {
                this.touchStartPoint = undefined;
            }
            this.state = GestureRecognizerState.Failed
        }
        return false
    }

    touchesEnded(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        if (this.touchStartPoint) {
            let invalidPoints = this.touchStartPoint.filter(pt => {
                return touches.filter(t => Math.abs(pt.x - t.locationInView(owner as any).x) > 8.0 || Math.abs(pt.y - t.locationInView(owner as any).y) > 8.0).length > 0
            });
            if (invalidPoints.length == 0 && touches[0].tapCount == this.tapsRequired) {
                this.state = GestureRecognizerState.Recognized
                this.fire && this.fire(this.state)
                this.touchStartPoint = undefined;
                releaseBlock && setImmediate(() => { releaseBlock() })
                return true
            }
            else {
                this.state = GestureRecognizerState.Failed
            }
            this.touchStartPoint = undefined;
        }
        return false
    }

    touchesCancelled(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        this.state = GestureRecognizerState.Cancelled
        this.fire && this.fire(this.state, undefined, undefined)
        this.touchStartPoint = undefined;
        return false
    }


}
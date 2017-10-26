import { GestureRecongnizer, GestureOwner, GestureRecognizerState } from "./GestureManager";
import { Touch, Event } from "./TouchManager"

export class PanGestureRecognizer implements GestureRecongnizer {

    owner?: GestureOwner
    enabled: boolean = true
    state: GestureRecognizerState = GestureRecognizerState.Possible
    deceteMovement = 10;
    fire?: (state: GestureRecognizerState, viewLocation?: {x: number, y: number}, absLocation?: {x: number, y: number}) => void

    private recognized = false
    private touchStartPoint?: { x: number, y: number }[]

    touchesBegan(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        this.touchStartPoint = touches.map(t => t.locationInView(owner as any))
        this.recognized = false
        this.state = GestureRecognizerState.Possible
        return false
    }

    touchesMoved(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        if (this.recognized) {
            this.state = GestureRecognizerState.Changed
            this.fire && this.fire(this.state, touches[0].locationInView(owner as any), touches[0].rawLocation)
        }
        else if (this.touchStartPoint) {
            let validPoints = this.touchStartPoint.filter(pt => {
                return touches.filter(t => Math.abs(pt.x - t.locationInView(owner as any).x) > this.deceteMovement || Math.abs(pt.y - t.locationInView(owner as any).y) > this.deceteMovement).length > 0
            });
            if (validPoints.length > 0) {
                this.recognized = true;
                this.state = GestureRecognizerState.Began;
                this.fire && this.fire(this.state, touches[0].locationInView(owner as any), touches[0].rawLocation)
                return true
            }
        }
        return false
    }

    touchesEnded(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        if (this.recognized) {            
            if (this.state !== GestureRecognizerState.Ended) {
                this.state = GestureRecognizerState.Ended
                this.fire && this.fire(this.state, touches[0].locationInView(owner as any), touches[0].rawLocation)
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
        this.state = GestureRecognizerState.Cancelled
        this.touchStartPoint = undefined;
        return false
    }

}
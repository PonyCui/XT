import { GestureRecongnizer, GestureOwner, GestureRecognizerState, GestureManager } from "./GestureManager";
import { Touch, Event } from "./TouchManager"

export class PinchGestureRecognizer implements GestureRecongnizer {

    owner?: GestureOwner
    enabled: boolean = true
    cancellable: boolean = false
    state: GestureRecognizerState = GestureRecognizerState.Possible
    fire?: (state: GestureRecognizerState) => void
    currentScale: number

    private recognized = false
    private firstStartPoint = { x: 0, y: 0 }
    private secondStartPoint = { x: 0, y: 0 }
    private currentFirstStartPoint = { x: 0, y: 0 }
    private currentSecondStartPoint = { x: 0, y: 0 }
    private startDistance: number = 0
    private releaseCount = 0

    touchesBegan(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        if (this.recognized) {
            this.releaseCount--
            return true
        }
        this.resetState()
        if (touches.length > 0) {
            if (touches[0].touchID === "0") {
                this.firstStartPoint = { ...touches[0]._startPoint }
                this.currentFirstStartPoint = this.firstStartPoint
            }
            if (touches[0].touchID === "1") {
                this.secondStartPoint = { ...touches[0]._startPoint }
                this.currentSecondStartPoint = this.secondStartPoint
                this.startDistance = Math.sqrt(Math.pow(this.secondStartPoint.x - this.firstStartPoint.x, 2) + Math.pow(this.secondStartPoint.y - this.firstStartPoint.y, 2))
                this.recognized = true
                this.state = GestureRecognizerState.Began
                this.fire && this.fire(GestureRecognizerState.Began)
            }
        }
        return this.recognized
    }

    touchesMoved(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        if (this.recognized) {
            this.state = GestureRecognizerState.Changed
            this.currentScale = this.measureScale(touches)
            this.fire && this.fire(GestureRecognizerState.Changed)
        }
        return this.recognized
    }

    touchesEnded(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        if (this.recognized) {
            if (touches.length > 0) {
                if (touches[0].touchID === "0" || touches[0].touchID === "1") {
                    this.releaseCount++
                }
            }
            if (this.releaseCount >= 2) {
                this.recognized = false
                this.state = GestureRecognizerState.Ended
                this.fire && this.fire(GestureRecognizerState.Ended)
                return true
            }
        }
        return false
    }

    touchesCancelled(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        this.fire && this.fire(GestureRecognizerState.Cancelled)
        return false
    }

    locationInView(): { x: number, y: number } {
        return { x: 0, y: 0 }
    }

    private resetState() {
        this.currentScale = 1.0
        this.recognized = false
        this.releaseCount = 0
    }

    private measureScale(touches: Touch[]): number {
        if (touches.length) {
            if (touches[0] && touches[0].touchID === "0") {
                this.currentFirstStartPoint = touches[0].rawLocation
            }
            if (touches[1] && touches[1].touchID === "1") {
                this.currentSecondStartPoint = touches[1].rawLocation
            }
            const currentDistance = Math.sqrt(Math.pow(this.currentFirstStartPoint.x - this.currentSecondStartPoint.x, 2) + Math.pow(this.currentFirstStartPoint.y - this.currentSecondStartPoint.y, 2))

            const deltaDistance = currentDistance - this.startDistance
            let frameDistance: number
            if (this.owner) {
                frameDistance = Math.sqrt(Math.pow(this.owner.frame.width, 2) + Math.pow(this.owner.frame.height, 2))
                if (deltaDistance / frameDistance < 0.0) {
                    frameDistance = frameDistance / 2.0
                }
                else if (deltaDistance / frameDistance > 0.0) {
                    frameDistance = frameDistance / 4.0
                }
            }
            else {
                frameDistance = 0
            }
            // console.log(Math.max(0.0, 1.0 + deltaDistance / frameDistance));

            return Math.max(0.01, 1.0 + deltaDistance / frameDistance)
        }
        else {
            return 1.0
        }
    }

}
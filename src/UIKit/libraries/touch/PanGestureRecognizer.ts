import { GestureRecongnizer, GestureOwner, GestureRecognizerState } from "./GestureManager";
import { Touch, Event } from "./TouchManager"

export class PanGestureRecognizer implements GestureRecongnizer {

    owner?: GestureOwner
    enabled: boolean = true
    cancellable: boolean = false
    state: GestureRecognizerState = GestureRecognizerState.Possible
    deceteMovement = 4;
    velocity: { x: number, y: number } = { x: 0, y: 0 }
    translation: { x: number, y: number } = { x: 0, y: 0 }
    fire?: (state: GestureRecognizerState, absLocation: { x: number, y: number }) => void

    private recognized = false
    private lastZeroTouch: Touch | undefined = undefined
    private touchStartRawPoint?: { x: number, y: number }
    private touchTranslationOriginPoint?: { x: number, y: number }
    private touchStartPoint?: { x: number, y: number }[]
    private touchPreviousPoint?: { x: number, y: number }
    private touchPreviousTimestamp?: number = undefined

    setTranslation(point: { x: number, y: number }) {
        if (this.touchPreviousPoint) {
            this.touchTranslationOriginPoint = {
                x: this.touchPreviousPoint.x - point.x,
                y: this.touchPreviousPoint.y - point.y,
            }
        }
    }

    touchesBegan(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        this.lastZeroTouch = touches[0]
        this.touchStartRawPoint = touches[0].rawLocation
        this.touchTranslationOriginPoint = touches[0].rawLocation
        this.velocity = { x: 0, y: 0 }
        this.translation = { x: 0, y: 0 }
        this.touchStartPoint = touches.map(t => t.rawLocation)
        this.touchPreviousPoint = { x: this.touchStartPoint[0].x, y: this.touchStartPoint[0].y }
        this.touchPreviousTimestamp = touches[0].timestamp
        this.recognized = false
        this.state = GestureRecognizerState.Possible
        if (this.deceteMovement < 0) {
            return this.touchesMoved(owner, touches, event, triggerBlock, releaseBlock)
        }
        return false
    }

    touchesMoved(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        this.lastZeroTouch = touches[0]
        const rawLocation = touches[0].rawLocation
        if (touches[0].velocity) {
            this.velocity = touches[0].velocity as any
        }
        else {
            if (touches[0].timestamp / 1000 - (this.touchPreviousTimestamp || 0) > 0) {
                this.velocity = {
                    x: (rawLocation.x - (this.touchPreviousPoint ? this.touchPreviousPoint.x : 0.0)) / (touches[0].timestamp / 1000 - (this.touchPreviousTimestamp || 0)),
                    y: (rawLocation.y - (this.touchPreviousPoint ? this.touchPreviousPoint.y : 0.0)) / (touches[0].timestamp / 1000 - (this.touchPreviousTimestamp || 0)),
                }
            }
        }
        if (this.recognized) {
            this.state = GestureRecognizerState.Changed
            this.touchPreviousPoint = { x: rawLocation.x, y: rawLocation.y }
            this.touchPreviousTimestamp = touches[0].timestamp / 1000
            if (this.touchTranslationOriginPoint) {
                this.translation = { x: touches[0].rawLocation.x - this.touchTranslationOriginPoint.x, y: touches[0].rawLocation.y - this.touchTranslationOriginPoint.y }
            }
            this.fire && this.fire(this.state, touches[0].rawLocation)
        }
        else if (this.touchStartPoint) {
            let validPoints = this.touchStartPoint.filter(pt => {
                return touches.filter(t => Math.abs(pt.x - t.rawLocation.x) > this.deceteMovement || Math.abs(pt.y - t.rawLocation.y) > this.deceteMovement).length > 0
            });
            if (validPoints.length > 0) {
                this.recognized = true;
                this.state = GestureRecognizerState.Began;
                this.fire && this.fire(this.state, touches[0].rawLocation)
                return true
            }
            else {
                this.touchPreviousPoint = { x: rawLocation.x, y: rawLocation.y }
                this.touchPreviousTimestamp = touches[0].timestamp / 1000
            }
        }
        return false
    }

    touchesEnded(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        this.lastZeroTouch = touches[0]
        if (this.recognized) {
            if (this.state !== GestureRecognizerState.Ended) {
                this.state = GestureRecognizerState.Ended
                if (this.touchTranslationOriginPoint) {
                    this.translation = { x: touches[0].rawLocation.x - this.touchTranslationOriginPoint.x, y: touches[0].rawLocation.y - this.touchTranslationOriginPoint.y }
                }
                if (touches[0].velocity) {
                    this.velocity = touches[0].velocity as any
                }
                else if (touches[0].timestamp / 1000 - (this.touchPreviousTimestamp || 0) > 0.1) {
                    this.velocity = { x: 0, y: 0 }
                }
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
        this.lastZeroTouch = lastTouch
        this.state = GestureRecognizerState.Cancelled
        if (this.touchTranslationOriginPoint) {
            this.translation = { x: touches[0].rawLocation.x - this.touchTranslationOriginPoint.x, y: touches[0].rawLocation.y - this.touchTranslationOriginPoint.y }
        }
        if (touches[0].velocity) {
            this.velocity = touches[0].velocity as any
        }
        else if (touches[0].timestamp / 1000 - (this.touchPreviousTimestamp || 0) > 0.1) {
            this.velocity = { x: 0, y: 0 }
        }
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
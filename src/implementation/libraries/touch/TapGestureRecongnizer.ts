import { GestureRecongnizer, GestureOwner } from "./GestureManager";
import { Touch, Event } from "./TouchManager"

export class TapGestureRecongnizer implements GestureRecongnizer {

    enabled: boolean = true
    fire?: () => void

    private touchStartPoint?: { x: number, y: number }[]

    touchesBegan(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        this.touchStartPoint = touches.map(t => t.locationInView(owner as any))
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
        }
        return false
    }

    touchesEnded(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        if (this.touchStartPoint) {
            let invalidPoints = this.touchStartPoint.filter(pt => {
                return touches.filter(t => Math.abs(pt.x - t.locationInView(owner as any).x) > 8.0 || Math.abs(pt.y - t.locationInView(owner as any).y) > 8.0).length > 0
            });
            if (invalidPoints.length == 0) {
                this.fire && this.fire()
            }
            this.touchStartPoint = undefined;
        }
        return false
    }

    touchesCancelled(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean {
        this.touchStartPoint = undefined;
        return false
    }


}
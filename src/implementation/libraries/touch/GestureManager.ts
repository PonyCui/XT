import { Touch, Event } from './TouchManager'

export interface GestureRecongnizer {

    enabled: boolean
    fire?: () => void
    touchesBegan(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean;
    touchesMoved(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean;
    touchesEnded(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean;
    touchesCancelled(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean;

}

export interface GestureOwner {

    gestureRecongnizer: GestureRecongnizer[]

}

export class GestureManager {

    static activeGesture: GestureRecongnizer | undefined

    static onTrigger(gestureRecongnizer: GestureRecongnizer): boolean {
        if (this.activeGesture) { return false }
        this.activeGesture = gestureRecongnizer;
        return true;
    }

    static onRelease() {
        this.activeGesture = undefined
    }

    static onTouchesBegan(owner: GestureOwner, touches: Touch[], event: Event): void {
        if (this.activeGesture !== undefined) {
            this.activeGesture.touchesBegan(owner, touches, event, this.onTrigger.bind(this), this.onRelease.bind(this));
            return;
        }
        for (let index = 0; index < owner.gestureRecongnizer.length; index++) {
            let gesture = owner.gestureRecongnizer[index];
            if (gesture.enabled) {
                if (gesture.touchesBegan(owner, touches, event, this.onTrigger.bind(this))) {
                    this.activeGesture = gesture;
                    break;
                }
            }
        }
    }

    static onTouchesMoved(owner: GestureOwner, touches: Touch[], event: Event): void {
        if (this.activeGesture !== undefined) {
            this.activeGesture.touchesMoved(owner, touches, event, this.onTrigger.bind(this), this.onRelease.bind(this));
            return;
        }
        for (let index = 0; index < owner.gestureRecongnizer.length; index++) {
            let gesture = owner.gestureRecongnizer[index];
            if (gesture.enabled) {
                if (gesture.touchesMoved(owner, touches, event, this.onTrigger.bind(this))) {
                    this.activeGesture = gesture;
                    break;
                }
            }
        }
    }

    static onTouchesEnded(owner: GestureOwner, touches: Touch[], event: Event): void {
        if (this.activeGesture !== undefined) {
            this.activeGesture.touchesEnded(owner, touches, event, this.onTrigger.bind(this), this.onRelease.bind(this));
            return;
        }
        for (let index = 0; index < owner.gestureRecongnizer.length; index++) {
            let gesture = owner.gestureRecongnizer[index];
            if (gesture.enabled) {
                if (gesture.touchesEnded(owner, touches, event, this.onTrigger.bind(this))) {
                    this.activeGesture = gesture;
                    break;
                }
            }
        }
    }

    static onTouchesCancelled(owner: GestureOwner, touches: Touch[], event: Event): void {
        if (this.activeGesture !== undefined) {
            this.activeGesture.touchesCancelled(owner, touches, event, this.onTrigger.bind(this), this.onRelease.bind(this));
            return;
        }
        for (let index = 0; index < owner.gestureRecongnizer.length; index++) {
            let gesture = owner.gestureRecongnizer[index];
            if (gesture.enabled) {
                if (gesture.touchesCancelled(owner, touches, event, this.onTrigger.bind(this))) {
                    this.activeGesture = gesture;
                    break;
                }
            }
        }
    }

}
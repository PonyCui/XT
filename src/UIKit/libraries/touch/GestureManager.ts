import { Touch, Event } from './TouchManager'

export enum GestureRecognizerState {
    Possible,
    Began,
    Changed,
    Ended,
    Cancelled,
    Failed,
    Recognized = Ended,
}

export interface GestureRecongnizer {

    owner?: GestureOwner
    enabled: boolean
    cancellable: boolean
    state: GestureRecognizerState
    fire?: (state: GestureRecognizerState, absLocation: { x: number, y: number }) => void
    touchesBegan(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean;
    touchesMoved(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean;
    touchesEnded(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean;
    touchesCancelled(owner: GestureOwner, touches: Touch[], event: Event, triggerBlock?: (gestureRecongnizer: GestureRecongnizer) => boolean, releaseBlock?: () => void): boolean;
    locationInView(): { x: number, y: number }

}

export interface GestureOwner {

    frame: { x: number, y: number, width: number, height: number }
    gestureRecongnizers: GestureRecongnizer[]

}

export class GestureManager {

    static activeGesture: GestureRecongnizer | undefined
    static activeTimerHanders: any[] = []
    static touchCalled = false;

    static onTrigger(gestureRecongnizer: GestureRecongnizer): boolean {
        if (this.activeGesture && !this.activeGesture.cancellable) {
            return false
        }
        if (this.activeGesture && this.activeGesture.cancellable) {
            this.activeGesture.touchesCancelled(this.activeGesture.owner as any, [], {}, undefined, undefined)
        }
        this.activeGesture = gestureRecongnizer;
        return true;
    }

    static onRelease() {
        setImmediate(() => {
            this.activeGesture = undefined
        })
    }

    static onTouchesBegan(owner: GestureOwner, touches: Touch[], event: Event): void {
        if (this.activeGesture !== undefined) {
            if (!this.activeGesture.cancellable) {
                return;
            }
        }
        for (let index = 0; index < owner.gestureRecongnizers.length; index++) {
            let gesture = owner.gestureRecongnizers[index];
            if (gesture.enabled) {
                if (gesture.touchesBegan(owner, touches, event, this.onTrigger.bind(this))) {
                    if (this.activeGesture && this.activeGesture.cancellable) {
                        this.activeGesture.touchesCancelled(this.activeGesture.owner as any, [], {}, undefined, undefined)
                    }
                    this.activeGesture = gesture;
                    break;
                }
            }
        }
    }

    static onTouchesMoved(owner: GestureOwner, touches: Touch[], event: Event): void {
        if (this.activeGesture !== undefined) {
            if (this.isOwnerEqual(this.activeGesture.owner, owner)) {
                this.activeGesture.touchesMoved(owner, touches, event, this.onTrigger.bind(this), this.onRelease.bind(this));
            }
            if (!this.activeGesture.cancellable) {
                return;
            }
        }
        for (let index = 0; index < owner.gestureRecongnizers.length; index++) {
            let gesture = owner.gestureRecongnizers[index];
            if (gesture.enabled) {
                if (gesture.touchesMoved(owner, touches, event, this.onTrigger.bind(this))) {
                    if (this.activeGesture && this.activeGesture.cancellable) {
                        this.activeGesture.touchesCancelled(this.activeGesture.owner as any, [], {}, undefined, undefined)
                    }
                    this.activeGesture = gesture;
                    break;
                }
            }
        }
    }

    static onTouchesEnded(owner: GestureOwner, touches: Touch[], event: Event): void {
        GestureManager.activeTimerHanders.forEach(t => clearTimeout(t));
        GestureManager.activeTimerHanders = [];
        if (this.activeGesture !== undefined) {
            if (this.isOwnerEqual(this.activeGesture.owner, owner)) {
                this.activeGesture.touchesEnded(owner, touches, event, this.onTrigger.bind(this), this.onRelease.bind(this));
            }
            setTimeout(() => {
                this.activeGesture = undefined
            }, 0)
            return;
        }
        for (let index = 0; index < owner.gestureRecongnizers.length; index++) {
            let gesture = owner.gestureRecongnizers[index];
            if (gesture.enabled) {
                if (gesture.touchesEnded(owner, touches, event, this.onTrigger.bind(this), this.onRelease.bind(this))) {
                    this.activeGesture = gesture;
                    break;
                }
            }
        }
    }

    static onTouchesCancelled(owner: GestureOwner, touches: Touch[], event: Event): void {
        if (this.activeGesture !== undefined) {
            if (this.isOwnerEqual(this.activeGesture.owner, owner)) {
                this.activeGesture.touchesCancelled(owner, touches, event, this.onTrigger.bind(this), this.onRelease.bind(this));
            }
            return;
        }
        for (let index = 0; index < owner.gestureRecongnizers.length; index++) {
            let gesture = owner.gestureRecongnizers[index];
            if (gesture.enabled) {
                gesture.touchesCancelled(owner, touches, event, this.onTrigger.bind(this))
            }
        }
    }

    static isOwnerEqual(owner1: any, owner2: any): boolean {
        if (owner1 == owner2) {
            return true
        }
        if (typeof owner1 === "object" &&
            typeof owner2 === "object" &&
            typeof owner1.objectRef === "string" &&
            typeof owner2.objectRef === "string") {
            return owner1.objectRef === owner2.objectRef
        }
        return false
    }

}
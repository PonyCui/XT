import { convertPointToChildView } from "../coordinate/CoordinateManager";


export enum TouchPhase {
    Began,
    Moved,
    Stationary,
    Ended,
    Cancelled,
}

export interface Touch {

    timestamp: number
    phase: TouchPhase
    tapCount: number
    rawLocation: { x: number, y: number }
    locationInView(view: Touchable): { x: number, y: number }

}

export interface Event {

}

export interface Touchable {

    transform?: { a: number, b: number, c: number, d: number, tx: number, ty: number }
    frame: { x: number, y: number, width: number, height: number }
    hitTest(point: { x: number, y: number }): Touchable | undefined
    touchesBegan(touches: Touch[], event: Event): void;
    touchesMoved(touches: Touch[], event: Event): void;
    touchesEnded(touches: Touch[], event: Event): void;
    touchesCancelled(touches: Touch[], event: Event): void;

}

export class TouchManager {

    root: Touchable
    target: Touchable | undefined
    touches: { [key: string]: Touch } = {}

    constructor(root: Touchable) {
        this.root = root;
    }

    handlePointerDown(pid: string, timestamp: number, x: number, y: number) {
        const target = this.target || this.root.hitTest({ x, y })
        if (target) {
            this.target = target;
            this.touches[pid] = {
                timestamp: timestamp,
                phase: TouchPhase.Began,
                tapCount: 1,
                rawLocation: { x, y },
                locationInView: (view: Touchable) => {
                    return convertPointToChildView({ x, y }, this.root as any, view as any)
                }
            }
            target.touchesBegan([this.touches[pid]], {})
        }
    }

    handlePointerMove(pid: string, timestamp: number, x: number, y: number) {
        if (this.target) {
            this.touches[pid] = {
                timestamp: timestamp,
                phase: TouchPhase.Moved,
                tapCount: 1,
                rawLocation: { x, y },
                locationInView: (view: Touchable) => {
                    return convertPointToChildView({ x, y }, this.root as any, view as any)
                }
            }
            this.target.touchesMoved([this.touches[pid]], {})
        }
    }

    handlePointerUp(pid: string, timestamp: number, x: number, y: number) {
        if (this.target) {
            this.touches[pid] = {
                timestamp: timestamp,
                phase: TouchPhase.Ended,
                tapCount: 1,
                rawLocation: { x, y },
                locationInView: (view: Touchable) => {
                    return convertPointToChildView({ x, y }, this.root as any, view as any)
                }
            }
            this.target.touchesEnded([this.touches[pid]], {})
        }
        delete this.touches[pid]
        if (Object.keys(this.touches).length == 0) {
            this.target = undefined
        }
    }

    handlePointerCancelEvent(timestamp: number) {
        let touches = [];
        for (const pointerID in this.touches) {
            this.touches[pointerID].phase = TouchPhase.Cancelled
            this.touches[pointerID].timestamp = timestamp
            touches.push(this.touches[pointerID]);
        }
        if (this.target) {
            this.target.touchesCancelled(touches, {})
            this.target = undefined
            this.touches = {}
        }
    }

}
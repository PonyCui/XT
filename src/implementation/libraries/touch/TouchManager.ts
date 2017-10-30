import { convertPointToChildView } from "../coordinate/CoordinateManager";


export enum TouchPhase {
    Began,
    Moved,
    Stationary,
    Ended,
    Cancelled,
}

export interface Touch {

    _maybeTap: boolean
    _startPoint: { x: number, y: number }
    timestamp: number
    phase: TouchPhase
    tapCount: number
    rawLocation: { x: number, y: number }
    locationInView(view: Touchable): { x: number, y: number }

}

export interface Event {

}

export interface Touchable {

    superview: Touchable | undefined
    multipleTouchEnabled: boolean
    transform?: { a: number, b: number, c: number, d: number, tx: number, ty: number }
    frame: { x: number, y: number, width: number, height: number }
    hitTest(point: { x: number, y: number }): Touchable | undefined
    touchesBegan(touches: Touch[], event: Event): void;
    touchesMoved(touches: Touch[], event: Event): void;
    touchesEnded(touches: Touch[], event: Event): void;
    touchesCancelled(touches: Touch[], event: Event): void;

}

let tapHistory: { x: number, y: number, timestamp: number }[] = []

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
                _maybeTap: true,
                _startPoint: { x, y },
                timestamp: timestamp,
                phase: TouchPhase.Began,
                tapCount: 1,
                rawLocation: { x, y },
                locationInView: (view: Touchable) => {
                    return convertPointToChildView({ x, y }, this.root as any, view as any)
                }
            }
            this.invokeTouchesBeganRecursive(target, [this.touches[pid]], {})
        }
    }

    invokeTouchesBeganRecursive(target: Touchable, touches: Touch[], event: Event) {
        target.touchesBegan(target.multipleTouchEnabled ? touches : [touches[0]], {})
        if (target.superview) {
            this.invokeTouchesBeganRecursive(target.superview, touches, event)
        }
    }

    handlePointersMove(timestamp: number, points: { [key: string]: { x: number, y: number } }) {
        if (this.target) {
            for (const pid in points) {
                this.touches[pid] = {
                    _maybeTap: this.touches[pid]._maybeTap === true && (Math.abs(this.touches[pid]._startPoint.x - points[pid].x) < 8 || Math.abs(this.touches[pid]._startPoint.y - points[pid].y) < 8),
                    _startPoint: this.touches[pid]._startPoint,
                    timestamp: timestamp,
                    phase: TouchPhase.Moved,
                    tapCount: 1,
                    rawLocation: { x: points[pid].x, y: points[pid].y },
                    locationInView: (view: Touchable) => {
                        return convertPointToChildView({ x: points[pid].x, y: points[pid].y }, this.root as any, view as any)
                    }
                }
            }
            this.invokeTouchesMovedRecursive(this.target, Object.keys(this.touches).map(t => this.touches[t]), {})
        }
    }

    invokeTouchesMovedRecursive(target: Touchable, touches: Touch[], event: Event) {
        target.touchesMoved(target.multipleTouchEnabled ? touches : [touches[0]], {})
        if (target.superview) {
            this.invokeTouchesMovedRecursive(target.superview, touches, event)
        }
    }

    handlePointerUp(pid: string, timestamp: number, x: number, y: number) {
        if (this.target) {
            if (this.touches[pid]._maybeTap) {
                tapHistory = tapHistory.filter(t => timestamp - t.timestamp < 350)
                tapHistory.push({ timestamp, x, y })
            }
            this.touches[pid] = {
                _maybeTap: this.touches[pid]._maybeTap,
                _startPoint: this.touches[pid]._startPoint,
                timestamp: timestamp,
                phase: TouchPhase.Ended,
                tapCount: tapHistory.filter(t => Math.abs(t.x - x) < 44 && Math.abs(t.y - y) < 44).length,
                rawLocation: { x, y },
                locationInView: (view: Touchable) => {
                    return convertPointToChildView({ x, y }, this.root as any, view as any)
                }
            }
            this.invokeTouchesEndedRecursive(this.target, [this.touches[pid]], {})
        }
        delete this.touches[pid]
        if (Object.keys(this.touches).length == 0) {
            this.target = undefined
        }
    }

    invokeTouchesEndedRecursive(target: Touchable, touches: Touch[], event: Event) {
        target.touchesEnded(target.multipleTouchEnabled ? touches : [touches[0]], {})
        if (target.superview) {
            this.invokeTouchesEndedRecursive(target.superview, touches, event)
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
            this.invokeTouchesCancelledRecursive(this.target, touches, {})
            this.target = undefined
            this.touches = {}
        }
    }

    invokeTouchesCancelledRecursive(target: Touchable, touches: Touch[], event: Event) {
        target.touchesCancelled(target.multipleTouchEnabled ? touches : [touches[0]], {})
        if (target.superview) {
            this.invokeTouchesCancelledRecursive(target.superview, touches, event)
        }
    }

}
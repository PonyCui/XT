import { Scroller } from "./scroller";

export function LinearInterpolation(t: number, start: number, end: number): number {
    if (t <= 0) {
        return start;
    } else if (t >= 1) {
        return end;
    } else {
        return t * end + (1 - t) * start;
    }
}

export function QuadraticEaseOut(t: number, start: number, end: number): number {
    if (t <= 0) {
        return start;
    } else if (t >= 1) {
        return end;
    } else {
        return LinearInterpolation(2 * t - t * t, start, end);
    }
}

export class Animation {

    static currentTime = () => {
        if (typeof performance === "undefined") {
            return new Date().getTime()
        }
        return performance.now()
    }

    beginTime: number = Animation.currentTime()

    constructor(readonly scroller: Scroller) { }

    animate(): boolean {
        return true
    }

    momentumScrollBy(delta: { x: number, y: number }) {

    }

}
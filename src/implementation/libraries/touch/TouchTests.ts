import { Touch, Event, Touchable, TouchManager } from './TouchManager'
import { TransformMatrix } from '../../../interface/TransformMatrix';
import { CoordinateOwner, convertPointToChildView, isPointInside } from '../coordinate/CoordinateManager';

class View implements Touchable, CoordinateOwner {

    transformMatrix?: { a: number, b: number, c: number, d: number, tx: number, ty: number }
    frame: { x: number, y: number, width: number, height: number } = { x: 0, y: 0, width: 0, height: 0 }
    superview: View | undefined
    subviews: View[] = []

    hitTest(point: { x: number, y: number }): Touchable | undefined {
        let target = undefined;
        if (isPointInside(point, this)) {
            target = this
            let subviews = this.subviews.slice();
            subviews.reverse()
            subviews.forEach(subview => {
                let subTarget = subview.hitTest(convertPointToChildView(point, this, subview))
                if (subTarget) { target = subTarget; }
            })
        }
        return target
    }

    touchesBegan(touches: Touch[], event: Event): void {
        (this as any)._touchesBeganTest = true
        if (this.superview) {
            this.superview.touchesBegan(touches, event);
        }
    }

    touchesMoved(touches: Touch[], event: Event): void {
        (this as any)._touchesMovedTest = true
        if (this.superview) {
            this.superview.touchesMoved(touches, event);
        }
    }

    touchesEnded(touches: Touch[], event: Event): void {
        (this as any)._touchesEndedTest = true
        if (this.superview) {
            this.superview.touchesEnded(touches, event);
        }
    }

    touchesCancelled(touches: Touch[], event: Event): void {
        (this as any)._touchesCancelledTest = true
        if (this.superview) {
            this.superview.touchesCancelled(touches, event);
        }
    }

    touchManager = new TouchManager(this)

    handlePointerDown(pid: string, timestamp: number, point: { x: number, y: number }) {
        this.touchManager.handlePointerDown(pid, timestamp, point.x, point.y)
    }

    handlePointerMove(pid: string, timestamp: number, point: { x: number, y: number }) {
        this.touchManager.handlePointerMove(pid, timestamp, point.x, point.y)
    }

    handlePointerUp(pid: string, timestamp: number, point: { x: number, y: number }) {
        this.touchManager.handlePointerUp(pid, timestamp, point.x, point.y)
    }

}

export function hitTests() {
    const window = new View();
    window.frame = { x: 0, y: 0, width: 500, height: 500 }
    const redView = new View();
    redView.frame = { x: 44, y: 44, width: 44, height: 44 }
    window.subviews = [redView];
    redView.superview = window;
    if (window.hitTest({ x: 22, y: 22 }) !== window) {
        throw "window hitTest Failure";
    }
    if (window.hitTest({ x: 48, y: 48 }) !== redView) {
        throw "redView hitTest Failure";
    }
    redView.transformMatrix = TransformMatrix.postTranslate(TransformMatrix.postRotate(new TransformMatrix(), 45 * Math.PI / 180), 0, 0)
    if (window.hitTest({ x: 48, y: 48 }) === redView) {
        throw "redView transformMatrix hitTest out Failure";
    }
    if (window.hitTest({ x: 66, y: 66 }) !== redView) {
        throw "redView transformMatrix hitTest in Failure";
    }
    redView.transformMatrix = TransformMatrix.postTranslate(TransformMatrix.postRotate(new TransformMatrix(), 45 * Math.PI / 180), 100, 100)
    if (window.hitTest({ x: 148, y: 148 }) === redView) {
        throw "redView transformMatrix hitTest out Failure";
    }
    if (window.hitTest({ x: 166, y: 166 }) !== redView) {
        throw "redView transformMatrix hitTest in Failure";
    }
}

export function touchEventTests() {
    const window = new View();
    window.frame = { x: 0, y: 0, width: 500, height: 500 }
    const redView = new View();
    redView.frame = { x: 44, y: 44, width: 44, height: 44 }
    window.subviews = [redView];
    redView.superview = window;
    window.handlePointerDown("PointerI", new Date().getTime(), { x: 50, y: 50 })
    if (!(redView as any)._touchesBeganTest) {
        throw "redView should receive touchesBegan event."
    }
    if (!(window as any)._touchesBeganTest) {
        throw "window should receive touchesBegan event."
    }
    setTimeout(() => {
        window.handlePointerUp("PointerI", new Date().getTime(), { x: 50, y: 50 })
        if (!(redView as any)._touchesEndedTest) {
            throw "redView should receive touchesEnded event."
        }
        if (!(window as any)._touchesEndedTest) {
            throw "window should receive touchesEnded event."
        }
    }, 1000)
}
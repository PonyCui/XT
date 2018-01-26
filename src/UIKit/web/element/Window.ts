import { ViewElement } from "./View";
import { Rect } from "../../interface/Rect";

export class WindowElement extends ViewElement {

    static _allowDefault = false;

    constructor(scriptObject: any) {
        super(scriptObject)
        this.setupTouches();
    }

    xtr_endEditing() {
        if (document.activeElement) {
            (document.activeElement as any).blur()
        }
    }

    private firstTouchIdentifier: any = undefined

    setupTouches() {
        (document.body as any).onresize = () => {
            this.scriptObject.frame = { ...this.xtr_frame(), width: window.outerWidth, height: window.outerHeight }
        }
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
        document.addEventListener('mousewheel', (e) => {
            this.scriptObject.handleWheelScroll(
                { x: e.clientX, y: e.clientY },
                { x: e.deltaX, y: e.deltaY }
            );
            e.preventDefault();
        });
        document.addEventListener("pointerdown", (e) => {
            this.scriptObject.handlePointerDown("0", e.timeStamp, { x: e.clientX, y: e.clientY })
            if (!WindowElement._allowDefault) { e.preventDefault(); }
            else { WindowElement._allowDefault = false; }
        })
        document.addEventListener("pointermove", (e) => {
            const points: any = {};
            points["0"] = { x: e.clientX, y: e.clientY };
            this.scriptObject.handlePointersMove(e.timeStamp, points)
            if (!WindowElement._allowDefault) { e.preventDefault(); }
            else { WindowElement._allowDefault = false; }
        })
        document.addEventListener("pointerup", (e) => {
            this.scriptObject.handlePointerUp("0", e.timeStamp, { x: e.clientX, y: e.clientY })
            if (!WindowElement._allowDefault) { e.preventDefault(); }
            else { WindowElement._allowDefault = false; }
        })
        document.addEventListener("touchstart", (e) => {
            if (this.firstTouchIdentifier !== undefined) { return }
            let touch: Touch | undefined = undefined
            for (let index = 0; index < e.touches.length; index++) {
                touch = e.touches[index]
                this.firstTouchIdentifier = e.touches[index].identifier
            }
            if (touch) {
                this.scriptObject.handlePointerDown("0", e.timeStamp, { x: touch.clientX, y: touch.clientY })
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            }
        })
        document.addEventListener("touchmove", (e) => {
            let touch: Touch | undefined = undefined
            for (let index = 0; index < e.changedTouches.length; index++) {
                if (e.changedTouches[index].identifier === this.firstTouchIdentifier) {
                    touch = e.changedTouches[index]
                }
            }
            if (touch) {
                const points: any = {};
                points["0"] = { x: touch.clientX, y: touch.clientY };
                this.scriptObject.handlePointersMove(e.timeStamp, points)
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            }
        })
        document.addEventListener("touchend", (e) => {
            let touch: Touch | undefined = undefined
            for (let index = 0; index < e.changedTouches.length; index++) {
                if (e.changedTouches[index].identifier === this.firstTouchIdentifier) {
                    touch = e.changedTouches[index]
                }
            }
            if (touch) {
                this.firstTouchIdentifier = undefined
                this.scriptObject.handlePointerUp("0", e.timeStamp, { x: touch.clientX, y: touch.clientY })
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            }
        })
        document.addEventListener("touchcancel", (e) => {
            let touch: Touch | undefined = undefined
            for (let index = 0; index < e.changedTouches.length; index++) {
                if (e.changedTouches[index].identifier === this.firstTouchIdentifier) {
                    touch = e.changedTouches[index]
                }
            }
            if (touch) {
                this.firstTouchIdentifier = undefined
                this.scriptObject.handlePointerCancel("0", e.timeStamp, { x: touch.clientX, y: touch.clientY })
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            }
        })
    }

}
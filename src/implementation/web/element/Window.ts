import { ViewElement } from "./View";
import { Rect } from "../../../interface/Rect";

export class WindowElement extends ViewElement {

    static _allowDefault = false;

    constructor(scriptObject: any) {
        super(scriptObject)
        this.setupTouches();
    }

    setupTouches() {
        (document.body as any).onresize = () => {
            this.scriptObject.frame = {...this.xtr_frame(), width: window.outerWidth, height: window.outerHeight}
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
            this.scriptObject.handlePointerDown(e.which.toString(), e.timeStamp, { x: e.touches[e.which].clientX, y: e.touches[e.which].clientY })
            if (!WindowElement._allowDefault) { e.preventDefault(); }
            else { WindowElement._allowDefault = false; }
        })
        document.addEventListener("touchmove", (e) => {
            const points: any = {};
            points[e.which.toString()] = { x: e.changedTouches[e.which].clientX, y: e.changedTouches[e.which].clientY };
            this.scriptObject.handlePointersMove(e.timeStamp, points)
            if (!WindowElement._allowDefault) { e.preventDefault(); }
            else { WindowElement._allowDefault = false; }
        })
        document.addEventListener("touchend", (e) => {
            this.scriptObject.handlePointerUp(e.which.toString(), e.timeStamp, { x: e.changedTouches[e.which].clientX, y: e.changedTouches[e.which].clientY })
            if (!WindowElement._allowDefault) { e.preventDefault(); }
            else { WindowElement._allowDefault = false; }
        })
        document.addEventListener("touchcancel", (e) => {
            this.scriptObject.handlePointerCancel(e.timeStamp)
            if (!WindowElement._allowDefault) { e.preventDefault(); }
            else { WindowElement._allowDefault = false; }
        })
    }

}
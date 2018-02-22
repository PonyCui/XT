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
    private mouseClicked = false
    private svgObject: SVGElement

    setupTouches() {
        const svgObject = () => {
            return this.nativeObject.parentElement instanceof SVGElement ? this.nativeObject.parentElement : undefined
        }
        this.nativeObject.addEventListener("touchstart", (e) => {
            if (this.firstTouchIdentifier !== undefined) { return }
            let touch: Touch | undefined = undefined
            for (let index = 0; index < e.touches.length; index++) {
                touch = e.touches[index]
                this.firstTouchIdentifier = e.touches[index].identifier
            }
            if (touch) {
                this.svgObject = svgObject()!
                const windowBounds = this.svgObject.getBoundingClientRect()
                this.scriptObject.handlePointerDown("0", e.timeStamp, { x: touch.clientX - windowBounds.left, y: touch.clientY - windowBounds.top })
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            }
        })
        this.nativeObject.addEventListener("touchmove", (e) => {
            let touch: Touch | undefined = undefined
            for (let index = 0; index < e.changedTouches.length; index++) {
                if (e.changedTouches[index].identifier === this.firstTouchIdentifier) {
                    touch = e.changedTouches[index]
                }
            }
            if (touch) {
                const windowBounds = this.svgObject.getBoundingClientRect()
                const points: any = {};
                points["0"] = { x: touch.clientX - windowBounds.left, y: touch.clientY - windowBounds.top };
                this.scriptObject.handlePointersMove(e.timeStamp, points)
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            }
        })
        this.nativeObject.addEventListener("touchend", (e) => {
            let touch: Touch | undefined = undefined
            for (let index = 0; index < e.changedTouches.length; index++) {
                if (e.changedTouches[index].identifier === this.firstTouchIdentifier) {
                    touch = e.changedTouches[index]
                }
            }
            if (touch) {
                this.firstTouchIdentifier = undefined
                const windowBounds = this.svgObject.getBoundingClientRect()
                this.scriptObject.handlePointerUp("0", e.timeStamp, { x: touch.clientX - windowBounds.left, y: touch.clientY - windowBounds.top })
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
                const windowBounds = this.svgObject.getBoundingClientRect()
                this.scriptObject.handlePointerCancel("0", e.timeStamp, { x: touch.clientX - windowBounds.left, y: touch.clientY - windowBounds.top })
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            }
        })
        this.nativeObject.addEventListener(navigator.vendor === "Apple Computer, Inc." ? "mousedown" : "pointerdown", (e) => {
            if (e.which >= 2) { e.preventDefault(); return; }
            this.mouseClicked = true
            const windowBounds = this.svgObject.getBoundingClientRect()
            this.scriptObject.handlePointerDown("0", e.timeStamp, { x: e.clientX - windowBounds.left, y: e.clientY - windowBounds.top })
            if (!WindowElement._allowDefault) { e.preventDefault(); }
            else { WindowElement._allowDefault = false; }
        })
        this.nativeObject.addEventListener(navigator.vendor === "Apple Computer, Inc." ? "mousemove" : "pointermove", (e) => {
            if (!this.mouseClicked) { return }
            const points: any = {};
            const windowBounds = this.svgObject.getBoundingClientRect()
            points["0"] = { x: e.clientX - windowBounds.left, y: e.clientY - windowBounds.top };
            this.scriptObject.handlePointersMove(e.timeStamp, points)
            if (!WindowElement._allowDefault) { e.preventDefault(); }
            else { WindowElement._allowDefault = false; }
        })
        this.nativeObject.addEventListener(navigator.vendor === "Apple Computer, Inc." ? "mouseup" : "pointerup", (e) => {
            if (!this.mouseClicked) { return }
            const windowBounds = this.svgObject.getBoundingClientRect()
            this.scriptObject.handlePointerUp("0", e.timeStamp, { x: e.clientX - windowBounds.left, y: e.clientY - windowBounds.top })
            if (!WindowElement._allowDefault) { e.preventDefault(); }
            else { WindowElement._allowDefault = false; }
            this.mouseClicked = false
        });
        this.nativeObject.addEventListener("mouseover", (e) => {
            e.preventDefault()
        });
        this.nativeObject.addEventListener('mousewheel', (e: any) => {
            const windowBounds = this.svgObject.getBoundingClientRect()
            this.scriptObject.handleWheelScroll(
                { x: e.clientX - windowBounds.left, y: e.clientY - windowBounds.top },
                { x: e.deltaX, y: e.deltaY }
            );
            e.preventDefault();
        });
        this.nativeObject.addEventListener("contextmenu", (e) => {
            e.preventDefault()
        });
    }

}
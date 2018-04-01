import { ViewElement } from "./View";
import { Rect } from "../../interface/Rect";

export class WindowElement extends ViewElement {

    static _allowDefault = false;

    constructor(scriptObject: any) {
        super(scriptObject);
        this.nativeObject.style.position = "absolute"
        this.nativeObject.style.width = "100%"
        this.nativeObject.style.height = "100%"
        this.nativeObject.style.overflow = "hidden"
        this.setupSizeObserver();
        this.setupTouches();
    }

    xtr_endEditing() {
        if (document.activeElement) {
            (document.activeElement as any).blur()
        }
    }

    private currentSize = { width: 0, height: 0 }

    private setupSizeObserver() {
        window.addEventListener("resize", () => {
            if (this.currentSize.width !== this.nativeObject.clientWidth ||
                this.currentSize.height !== this.nativeObject.clientHeight) {
                this.currentSize.width = this.nativeObject.clientWidth
                this.currentSize.height = this.nativeObject.clientHeight
                this.scriptObject.frame = { x: 0, y: 0, width: this.currentSize.width, height: this.currentSize.height }
            }
        })
    }

    private mouseClicked = false
    private refObject: HTMLElement

    setupTouches() {
        const refObject = () => {
            return this.nativeObject.parentElement instanceof HTMLElement ? this.nativeObject.parentElement : undefined
        }
        if ('ontouchstart' in document.documentElement) {
            let firstTouchID: number = 0
            let allReleased: boolean = false
            const requestTouchIdentifier = (e: TouchEvent, touch: Touch) => {
                if (touch.identifier >= 0) {
                    return touch.identifier.toString()
                }
                else {
                    if (firstTouchID === 0) {
                        firstTouchID = e.touches[0].identifier
                    }
                    let touchID = (touch.identifier - firstTouchID).toString()
                    if (e.touches.length == 0) { allReleased = true }
                    return touchID
                }
            }
            this.nativeObject.addEventListener("touchstart", (e: TouchEvent) => {
                if (allReleased) {
                    firstTouchID = 0
                    allReleased = false
                }
                this.refObject = refObject()!
                const windowBounds = this.refObject.getBoundingClientRect()
                for (let index = 0; index < e.changedTouches.length; index++) {
                    const touch = e.changedTouches[index];
                    this.scriptObject.handlePointerDown(requestTouchIdentifier(e, touch), e.timeStamp, { x: touch.clientX - windowBounds.left, y: touch.clientY - windowBounds.top })
                }
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            })
            this.nativeObject.addEventListener("touchmove", (e: TouchEvent) => {
                const windowBounds = this.refObject.getBoundingClientRect()
                const points: any = {};
                for (let index = 0; index < e.changedTouches.length; index++) {
                    const touch = e.changedTouches[index];
                    points[requestTouchIdentifier(e, touch)] = { x: touch.clientX - windowBounds.left, y: touch.clientY - windowBounds.top };
                }
                this.scriptObject.handlePointersMove(e.timeStamp, points)
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            })
            this.nativeObject.addEventListener("touchend", (e: TouchEvent) => {
                const windowBounds = this.refObject.getBoundingClientRect()
                for (let index = 0; index < e.changedTouches.length; index++) {
                    const touch = e.changedTouches[index];
                    this.scriptObject.handlePointerUp(requestTouchIdentifier(e, touch), e.timeStamp, { x: touch.clientX - windowBounds.left, y: touch.clientY - windowBounds.top })
                }
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            })
            this.nativeObject.addEventListener("touchcancel", (e: TouchEvent) => {
                const windowBounds = this.refObject.getBoundingClientRect()
                for (let index = 0; index < e.changedTouches.length; index++) {
                    const touch = e.changedTouches[index];
                    this.scriptObject.handlePointerCancel(requestTouchIdentifier(e, touch), e.timeStamp, { x: touch.clientX - windowBounds.left, y: touch.clientY - windowBounds.top })
                }
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            })
        }
        else {
            this.nativeObject.addEventListener(navigator.vendor === "Apple Computer, Inc." ? "mousedown" : "pointerdown", (e) => {
                if (e.which >= 2) { e.preventDefault(); return; }
                this.mouseClicked = true
                this.refObject = refObject()!
                const windowBounds = this.refObject.getBoundingClientRect()
                this.scriptObject.handlePointerDown("0", e.timeStamp, { x: e.clientX - windowBounds.left, y: e.clientY - windowBounds.top })
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            })
            this.nativeObject.addEventListener(navigator.vendor === "Apple Computer, Inc." ? "mousemove" : "pointermove", (e) => {
                if (!this.mouseClicked) { return }
                const points: any = {};
                const windowBounds = this.refObject.getBoundingClientRect()
                points["0"] = { x: e.clientX - windowBounds.left, y: e.clientY - windowBounds.top };
                this.scriptObject.handlePointersMove(e.timeStamp, points)
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
            })
            this.nativeObject.addEventListener(navigator.vendor === "Apple Computer, Inc." ? "mouseup" : "pointerup", (e) => {
                if (!this.mouseClicked) { return }
                const windowBounds = this.refObject.getBoundingClientRect()
                this.scriptObject.handlePointerUp("0", e.timeStamp, { x: e.clientX - windowBounds.left, y: e.clientY - windowBounds.top })
                if (!WindowElement._allowDefault) { e.preventDefault(); }
                else { WindowElement._allowDefault = false; }
                this.mouseClicked = false
            });
            this.nativeObject.addEventListener("mouseover", (e) => {
                e.preventDefault()
            });
            this.nativeObject.addEventListener('mousewheel', (e: any) => {
                this.refObject = refObject()!
                const windowBounds = this.refObject.getBoundingClientRect()
                this.scriptObject.handleWheelScroll(
                    { x: e.clientX - windowBounds.left, y: e.clientY - windowBounds.top },
                    { x: e.deltaX, y: e.deltaY }
                );
                e.preventDefault();
            });
        }
        this.nativeObject.addEventListener("contextmenu", (e) => {
            e.preventDefault()
        });
    }

}
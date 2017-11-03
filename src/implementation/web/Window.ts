/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero } from "../../interface/Rect";
import { Application } from './Application';
import { TouchManager } from "../libraries/touch/TouchManager";
import { WindowElement } from './element/Window';
// import { ViewController } from "./ViewController";

export class Window extends View {

    className = "XTRWindow"

    nativeObject: any;

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        super(undefined, undefined, true)
        if (_isChild) { return; }
        this.nativeObject = new WindowElement(rect || RectZero, this);
        this.userInteractionEnabled = true
        setImmediate(() => { this.init(); });
    }

    // public get rootViewController(): ViewController | undefined {
    //     return this.nativeObject.xtr_rootViewController();
    // }

    // public set rootViewController(value: ViewController | undefined) {
    //     this.nativeObject.xtr_setRootViewController(value);
    //     (this as any).rootViewControllerRef = value;
    // }

    makeKeyAndVisible(): void {
        const application = Application.sharedApplication();
        if (application) {
            application.keyWindow = this;
        }
    }

    touchManager = new TouchManager(this)

    handlePointerDown(pid: string, timestamp: number, point: { x: number, y: number }) {
        this.touchManager.handlePointerDown(pid, timestamp, point.x, point.y)
    }

    handlePointersMove(timestamp: number, points: { [key: string]: { x: number, y: number } }) {
        this.touchManager.handlePointersMove(timestamp, points)
    }

    handlePointerUp(pid: string, timestamp: number, point: { x: number, y: number }) {
        this.touchManager.handlePointerUp(pid, timestamp, point.x, point.y)
    }

    // handleKeyboardShow(frame: Rect, duration: number) {
    //     this.rootViewController && this.rootViewController.keyboardWillShow(frame, duration)
    // }

    // handleKeyboardHide(duration: number) {
    //     this.rootViewController && this.rootViewController.keyboardWillHide(duration)
    // }

    // endEditing(): void {
    //     this.nativeObject.xtr_endEditing();
    // }

}
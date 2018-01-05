/// <reference path="xtr.d.ts" />
import { View } from './View'
import { Rect, RectZero } from "../../interface/Rect";
import { Application } from './Application';
import { TouchManager } from "../libraries/touch/TouchManager";
import { WindowElement } from './element/Window';
import { ViewController } from "./ViewController";

export class Window extends View {

    className = "XTRWindow"

    nativeObject: any;

    constructor() {
        super(WindowElement)
        this.userInteractionEnabled = true
    }

    private _rootViewController?: ViewController

    public get rootViewController(): ViewController | undefined {
        return this._rootViewController;
    }

    public set rootViewController(value: ViewController | undefined) {
        if (this._rootViewController) {
            this._rootViewController.view.removeFromSuperview();
        }
        this._rootViewController = value
        if (value) {
            this.addSubview(value.view)
            value.view.frame = this.bounds
        }
    }

    layoutSubviews() {
        super.layoutSubviews()
        if (this._rootViewController) {
            this._rootViewController.view.frame = this.bounds
        }
    }

    makeKeyAndVisible(): void {
        const application = Application.sharedApplication();
        if (application) {
            application.keyWindow = this;
        }
    }

    touchManager = new TouchManager(this)

    handleWheelScroll(point: { x: number, y: number }, deltaPoint: { x: number, y: number }) {
        const target = this.touchManager.root.hitTest(point)
        if (target && (target as any).wheelScroll) {
            (target as any).wheelScroll(deltaPoint);
        }
    }

    handlePointerDown(pid: string, timestamp: number, point: { x: number, y: number }) {
        this.touchManager.handlePointerDown(pid, timestamp, point.x, point.y)
    }

    handlePointersMove(timestamp: number, points: { [key: string]: { x: number, y: number } }) {
        this.touchManager.handlePointersMove(timestamp, points)
    }

    handlePointerUp(pid: string, timestamp: number, point: { x: number, y: number }) {
        this.touchManager.handlePointerUp(pid, timestamp, point.x, point.y)
    }

    handlePointerCancel(timestamp: number) {
        this.touchManager.handlePointerCancelEvent(timestamp)
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
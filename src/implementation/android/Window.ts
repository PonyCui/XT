/// <reference path="xtr.d.ts" />
import { Rect, RectZero } from "../../interface/Rect";
import { View } from "./View";
import { ViewController } from "./ViewController";
import { TouchManager } from "../libraries/touch/TouchManager";

export class Window extends View {

    constructor(ref: any) {
        super(XTRWindow)
    }

    public get rootViewController(): ViewController | undefined {
        const vcRef = XTRWindow.xtr_rootViewController(this.objectRef)
        if (typeof vcRef !== "string") { return undefined }
        return new ViewController(vcRef)
    }

    public set rootViewController(value: ViewController | undefined) {
        if (value) {
            XTRWindow.xtr_setRootViewController(value.objectRef, this.objectRef)
        }
    }

    makeKeyAndVisible(): void {
        XTRWindow.xtr_makeKeyAndVisible(this.objectRef);
    }

    // handleKeyboardShow(frame: Rect, duration: number) {
    //     this.rootViewController && this.rootViewController.keyboardWillShow(frame, duration)
    // }

    // handleKeyboardHide(duration: number) {
    //     this.rootViewController && this.rootViewController.keyboardWillHide(duration)
    // }

    // handleOrientationChange(): void {
    //     this.rootViewController && this.rootViewController.orientationDidChange(this)
    // }

    // handleStatusBarHidden(hidden: boolean) {
    //     this.nativeObject.xtr_setStatusBarHidden(hidden === true)
    // }

    // endEditing(): void {
    //     this.nativeObject.xtr_endEditing();
    // }

    // touchManager = new TouchManager(this)

    // handlePointerDown(pid: string, timestamp: number, point: { x: number, y: number }) {
    //     this.touchManager.handlePointerDown(pid, timestamp, point.x, point.y)
    // }

    // handlePointersMove(timestamp: number, points: { [key: string]: {x: number, y: number} }) {
    //     this.touchManager.handlePointersMove(timestamp, points)
    // }

    // handlePointerUp(pid: string, timestamp: number, point: { x: number, y: number }) {
    //     this.touchManager.handlePointerUp(pid, timestamp, point.x, point.y)
    // }

}
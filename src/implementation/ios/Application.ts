/// <reference path="xtr.d.ts" />
import { Window } from './Window'

let sharedApplication: Application | undefined = undefined;

export class ApplicationDelegate {

    nativeObjectRef: any

    public set nativeObject(value: any) { }

    public get nativeObject(): any {
        return xtrRequestNativeObject(this.nativeObjectRef);
    }

    public resetNativeObject(nativeObjectRef: any) {
        this.nativeObjectRef = nativeObjectRef;
    }

    public get window(): Window | undefined {
        return this.nativeObject.xtr_window()
    }

    public set window(value: Window | undefined) {
        this.nativeObject.xtr_setWindow(value);
    }

    applicationDidFinishLaunchingWithOptions(application: Application, launchOptions: Object): void { }

}

export class Application {

    nativeObjectRef: any

    public set nativeObject(value: any) { }

    public get nativeObject(): any {
        return xtrRequestNativeObject(this.nativeObjectRef);
    }

    delegate: ApplicationDelegate

    public get keyWindow(): Window | undefined {
        return this.nativeObject.xtr_keyWindow;
    }

    constructor(t: any, delegate: ApplicationDelegate) {
        if (sharedApplication === undefined) {
            sharedApplication = this;
        }
        this.nativeObjectRef = XTRApplication.create(this);
        objectRefs[this.nativeObjectRef] = this;
        (window as any)._xtrDelegate = delegate;
        this.delegate = delegate;
    }

    static sharedApplication(): Application | undefined {
        return sharedApplication
    }

    exit(): void {
        this.nativeObject.xtr_exit();
    }

}
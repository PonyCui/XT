/// <reference path="xtr.d.ts" />
import { Window } from './Window'

let sharedApplication: Application | undefined = undefined;

export class ApplicationDelegate {

    nativeObject: any

    public resetNativeObject(nativeObject: any) {
        this.nativeObject = nativeObject;
    }

    public get window(): Window | undefined {
        return this.nativeObject.xtr_window();
    }

    public set window(value: Window | undefined) {
        this.nativeObject.xtr_setWindow(value);
        (this as any).windowRef = value;
    }

    applicationDidFinishLaunchingWithOptions(application: Application, launchOptions: Object): void { }

}

export class Application {

    nativeObject: any;
    delegate: ApplicationDelegate

    public get keyWindow(): Window | undefined {
        return this.nativeObject.xtr_keyWindow;
    }

    constructor(t: any, delegate: ApplicationDelegate) {
        if (sharedApplication === undefined) {
            sharedApplication = this;
        }
        this.nativeObject = XTRApplication.create(this);
        XTRApplicationDelegate.attachDelegate(delegate);
        this.delegate = delegate;
    }

    static sharedApplication(): Application | undefined {
        return sharedApplication
    }

}
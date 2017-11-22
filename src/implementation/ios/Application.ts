/// <reference path="xtr.d.ts" />
import { Window } from './Window'

let sharedApplication: Application | undefined = undefined;

export class ApplicationDelegate {

    nativeObjectUUID: any

    public resetNativeObject(nativeObjectUUID: any) {
        this.nativeObjectUUID = nativeObjectUUID;
    }

    public get window(): Window | undefined {
        const appDelegate = XTRApplicationDelegate.xtr_delegate(this.nativeObjectUUID);
        if (appDelegate) {
            return appDelegate.xtr_window();
        }
        else {
            return undefined;
        }
    }

    public set window(value: Window | undefined) {
        const appDelegate = XTRApplicationDelegate.xtr_delegate(this.nativeObjectUUID);
        if (appDelegate) {
            appDelegate.xtr_setWindow(value);
        }
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
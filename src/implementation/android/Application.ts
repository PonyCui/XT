/// <reference path="xtr.d.ts" />
import { Window } from './Window'

let sharedApplication: Application | undefined = undefined;

export class ApplicationDelegate {

    nativeObject: any

    constructor(nativeObject?: any) {
        this.nativeObject = nativeObject || XTRApplicationDelegate.create(this);
        (window as any).XTRObjCreater.store(this);
    }

    public get window(): Window | undefined {
        return this.nativeObject.xtr_window();
    }

    public set window(value: Window | undefined) {
        this.nativeObject.xtr_setWindow(value);
    }

    applicationDidFinishLaunchingWithOptions(application: Application, launchOptions: Object): void { }

}

export class Application {

    nativeObject: any;
    delegate: ApplicationDelegate

    public get keyWindow(): Window | undefined {
        return this.nativeObject.xtr_keyWindow;
    }

    constructor(t: any, delegate: ApplicationDelegate, nativeObject?: any) {
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
            return;
        }
        if (sharedApplication === undefined) {
            sharedApplication = this;
        }
        this.nativeObject = XTRApplication.create(this);
        XTRAppRef = this;
        (window as any).XTRObjCreater.store(this);
        this.nativeObject.xtr_setDelegate(delegate);
        this.delegate = delegate;
    }

    static sharedApplication?(): Application | undefined {
        return sharedApplication;
    }

}

if ((window as any).XTRObjCreater === undefined) {
    (window as any).XTRObjCreater = {
        create: function (view: any) {
            if (this.objectStore[view.objectUUID.toString()] !== undefined) {
                return this.objectStore[view.objectUUID.toString()];
            }
            for (let index = 0; index < (window as any).XTRObjClasses.length; index++) {
                const element = (window as any).XTRObjClasses[index];
                const instance = element(view);
                if (instance !== undefined) {
                    this.store(instance);
                    return instance;
                }
            }
            return undefined;
        },
        store: function (target: any) {
            if (typeof target.objectUUID === "string") {                
                this.objectStore[target.objectUUID] = target;
            }
        },
        objectStore: {},
    };
}
if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}

(window as any).XTRObjClasses.push((view: any) => {
    if (view.toString().indexOf("com.opensource.xtruntime.XTRApplication$InnerObject") === 0) {
        return new Application(undefined, undefined as any, view);
    }
    else if (view.toString().indexOf("com.opensource.xtruntime.XTRApplicationDelegate$InnerObject") === 0) {
        return new ApplicationDelegate(view);
    }
    return undefined;
})
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
        (window as any)._xtrDelegate = delegate;
        this.delegate = delegate;
    }

    static sharedApplication(): Application | undefined {
        return sharedApplication
    }

}

if ((window as any).XTRObjCreater === undefined) {
    (window as any).XTRObjCreater = {
        create: function (view: any) {
            if (this.objectStore[view.objectUUID] !== undefined) {
                return this.objectStore[view.objectUUID];
            }
            for (let index = 0; index < (window as any).XTRObjClasses.length; index++) {
                const element = (window as any).XTRObjClasses[index];
                const instance = element(view);
                if (instance !== undefined) {
                    this.store(instance);
                    return instance;
                }
            }
            return view;
        },
        store: function (target: any) {
            if (target.nativeObject instanceof Object && typeof target.nativeObject.objectUUID === "string") {
                this.objectStore[target.nativeObject.objectUUID] = target;
            }
        },
        objectStore: {},
    };
}
if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
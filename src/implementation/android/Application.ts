/// <reference path="xtr.d.ts" />
import { Window } from './Window'

let sharedApplication: Application | undefined = undefined;

export class ApplicationDelegate {

    objectRef: any

    constructor() {
        this.objectRef = XTRApplicationDelegate.create()
    }

    applicationDidFinishLaunchingWithOptions(application: Application, launchOptions: Object): void { }

}

export class Application {

    delegate: ApplicationDelegate

    objectRef: any

    constructor(t: any, delegate: ApplicationDelegate) {
        if (sharedApplication === undefined) {
            sharedApplication = this;
        }
        this.objectRef = XTRApplication.create()
        this.delegate = delegate
        this.delegate.applicationDidFinishLaunchingWithOptions(this, new Object())
    }

    public get keyWindow(): Window | undefined {
        return undefined;
    }

    static sharedApplication(): Application | undefined {
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
            return view;
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
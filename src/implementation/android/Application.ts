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
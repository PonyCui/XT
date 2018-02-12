/// <reference path="xtr.d.ts" />
import { Window } from './Window'

let sharedApplication: Application | undefined = undefined;

export class ApplicationDelegate {

    objectRef: any

    constructor() {
        this.objectRef = _XTUIApplicationDelegate.create();
        objectRefs[this.objectRef] = this;
    }

    public get window(): Window | undefined {
        const windowRef = _XTUIApplicationDelegate.xtr_window(this.objectRef)
        if (typeof windowRef !== "string") {
            return undefined
        }
        return new Window(windowRef)
    }

    public set window(value: Window | undefined) {
        if (value) {
            _XTUIApplicationDelegate.xtr_setWindow(value.objectRef, this.objectRef)
        }
    }

    applicationDidFinishLaunchingWithOptions(applicationRef: string, launchOptions: Object): void { }

    private handleApplicationDidFinishLaunchingWithOptions(applicationRef: string, launchOptions: Object): void {
        this.applicationDidFinishLaunchingWithOptions(objectRefs[applicationRef], launchOptions)
    }

}

export class Application {

    delegate: ApplicationDelegate

    objectRef: any

    constructor(t: any, delegate: ApplicationDelegate) {
        if (sharedApplication === undefined) {
            sharedApplication = this;
        }
        this.objectRef = _XTUIApplication.create(delegate.objectRef)
        objectRefs[this.objectRef] = this;
        this.delegate = delegate
    }

    public get keyWindow(): Window | undefined {
        return undefined;
    }

    static sharedApplication(): Application | undefined {
        return sharedApplication;
    }

}
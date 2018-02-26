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
        return Window.findByRef<Window>(windowRef)
    }

    public set window(value: Window | undefined) {
        if (value) {
            _XTUIApplicationDelegate.xtr_setWindowObjectRef(value.objectRef, this.objectRef)
        }
    }

    applicationDidFinishLaunchingWithOptions(application: Application, launchOptions: Object): void { }

    private handleApplicationDidFinishLaunchingWithOptions(applicationRef: string, launchOptions: Object): void {
        this.applicationDidFinishLaunchingWithOptions(objectRefs[applicationRef], launchOptions)
    }

}

export class Application {

    objectRef: any

    delegate: ApplicationDelegate

    public get keyWindow(): Window | undefined {
        const ref = _XTUIApplication.xtr_keyWindow(this.objectRef)
        if (typeof ref !== "string") { return undefined }
        return Window.findByRef<Window>(ref)
    }

    constructor(t: any, delegate: ApplicationDelegate) {
        if (sharedApplication === undefined) {
            sharedApplication = this;
        }
        this.objectRef = _XTUIApplication.create(delegate.objectRef);
        objectRefs[this.objectRef] = this;
        this.delegate = delegate;
    }

    static sharedApplication(): Application | undefined {
        return sharedApplication
    }

    exit(): void {
        _XTUIApplication.xtr_exit(this.objectRef);
    }

}
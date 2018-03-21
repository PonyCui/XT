/// <reference path="xtr.d.ts" />
import { Window } from './Window'
import { RectMake } from '../interface/Rect';

let sharedApplication: Application | undefined = undefined;

export class ApplicationDelegate {

    window: Window | undefined

    applicationDidFinishLaunchingWithOptions(application: Application, launchOptions: Object): void { }

}

export class Application {

    delegate: ApplicationDelegate
    private _keyWindow: Window | undefined

    public get keyWindow(): Window | undefined {
        return this._keyWindow
    }

    public set keyWindow(value: Window | undefined) {
        if (this._keyWindow !== undefined) { return; }
        this._keyWindow = value;
    }

    constructor(t: any, delegate: ApplicationDelegate) {
        (window as any).__XT_CONTEXT__.application = this;
        if (sharedApplication === undefined) {
            sharedApplication = this;
        }
        this.delegate = delegate;
        this.delegate.applicationDidFinishLaunchingWithOptions(this, (window as any).__XT_CONTEXT_OPTIONS__ || {})
    }

    static sharedApplication(): Application | undefined {
        return sharedApplication
    }

}

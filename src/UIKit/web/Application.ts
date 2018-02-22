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
    rootElement: SVGElement
    defsElement: SVGDefsElement
    private _keyWindow: Window | undefined

    public get keyWindow(): Window | undefined {
        return this._keyWindow
    }

    public set keyWindow(value: Window | undefined) {
        if (this._keyWindow !== undefined) { return; }
        this._keyWindow = value;
        if (this.rootElement && value) {
            this.rootElement.appendChild(value.nativeObject.nativeObject)
        }
    }

    constructor(t: any, delegate: ApplicationDelegate) {
        (window as any).__XT_CONTEXT__.application = this;
        if (sharedApplication === undefined) {
            sharedApplication = this;
        }
        if (sharedApplication.defsElement === undefined) {
            const defsRootElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            defsRootElement.style.width = "0"
            defsRootElement.style.height = "0"
            defsRootElement.style.opacity = "0"
            this.defsElement = document.createElementNS("http://www.w3.org/2000/svg", "defs")
            defsRootElement.appendChild(this.defsElement)
            document.body.appendChild(defsRootElement)
        }
        else {
            this.defsElement = sharedApplication.defsElement
        }
        this.rootElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        this.rootElement.setAttribute('width', '100%')
        this.rootElement.setAttribute('height', '100%')
        this.delegate = delegate;
        this.delegate.applicationDidFinishLaunchingWithOptions(this, (window as any).__XT_CONTEXT_OPTIONS__ || {})
    }

    static sharedApplication(): Application | undefined {
        return sharedApplication
    }

}

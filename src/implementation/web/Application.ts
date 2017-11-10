/// <reference path="xtr.d.ts" />
import { Window } from './Window'
import { RectMake } from '../../interface/Rect';

let sharedApplication: Application | undefined = undefined;

export class ApplicationDelegate {

    window: Window | undefined

    applicationDidFinishLaunchingWithOptions(application: Application, launchOptions: Object): void { }

}

export class Application {

    delegate: ApplicationDelegate
    private _keyWindow: Window | undefined
    private _rootElement: SVGElement | null;

    public get keyWindow(): Window | undefined {
        return this._keyWindow
    }

    public set keyWindow(value: Window | undefined) {
        this._keyWindow = value;
        if (this._rootElement && value) {
            value.frame = RectMake(0.0, 0.0, this._rootElement.clientWidth, this._rootElement.clientHeight)
            this._rootElement.appendChild(value.nativeObject.nativeObject)
        }
    }

    constructor(t: any, delegate: ApplicationDelegate) {
        if (sharedApplication === undefined) {
            sharedApplication = this;
            if (typeof t === "string") {
                const element = document.querySelector(t)
                if (element instanceof SVGElement) {
                    this._rootElement = element
                    this._rootElement.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "defs"))
                }
            }
            else if (t instanceof SVGElement) {
                this._rootElement = t
                this._rootElement.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "defs"))
            }
            if (this._rootElement === undefined || this._rootElement === null) {
                this._rootElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
                this._rootElement.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "defs"))
                this._rootElement.setAttribute('width', '100%')
                this._rootElement.setAttribute('height', '100%')
                document.body.appendChild(this._rootElement)
            }
        }
        this.delegate = delegate;
        this.delegate.applicationDidFinishLaunchingWithOptions(this, {})
    }

    static sharedApplication(): Application | undefined {
        return sharedApplication
    }

}

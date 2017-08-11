import * as I from '../../interface/Abstract'
import { UIWindow } from './UIWindow'
const PIXI = (window as any).PIXI

let sharedApplication: UIApplication | undefined = undefined;

export class UIApplication extends I.UIApplication {

    nativeObject: any;
    keyWindow?: UIWindow = undefined;

    constructor(canvas: HTMLCanvasElement, delegate: I.UIApplicationDelegate) {
        super()
        if (sharedApplication === undefined) {
            sharedApplication = this;
            I.UIScreen.mainScreen = () => {                
                return new I.UIScreen(canvas.offsetWidth, canvas.offsetHeight);
            }
        }
        this.nativeObject = new PIXI.Application({ width: canvas.offsetWidth, height: canvas.offsetHeight, view: canvas, antialias: true, transparent: true });
        this.delegate = delegate;
        if (this.delegate as I.UIApplicationDelegate) {
            this.delegate.applicationDidFinishLaunchingWithOptions(this, {});
        }
    }

    static sharedApplication(): UIApplication | undefined {
        return sharedApplication;
    }

}
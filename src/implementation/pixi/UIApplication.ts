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
                return new I.UIScreen(canvas.offsetWidth, canvas.offsetHeight, window.devicePixelRatio);
            }
        }
        UIApplication.resetCanvas(canvas, () => {
            this.nativeObject = new PIXI.Application({ width: I.UIScreen.withScale(canvas.offsetWidth), height: I.UIScreen.withScale(canvas.offsetHeight), view: canvas, antialias: true, transparent: true });
            (window as any).nativeObject = this.nativeObject;
            this.nativeObject.renderer.on("postrender", () => {
                console.log("postrender");
                this.nativeObject.stop();
            });
            this.delegate = delegate;
            if (this.delegate as I.UIApplicationDelegate) {
                this.delegate.applicationDidFinishLaunchingWithOptions(this, {});
            }
        })
    }

    static resetCanvas(canvas: HTMLCanvasElement, callback: () => void) {
        canvas.style.width = "375";
        canvas.style.height = document.body.offsetHeight.toString();
        setTimeout(callback);
    }

    static sharedApplication(): UIApplication | undefined {
        return sharedApplication;
    }

    private isDirty = false

    public setNeedsDisplay() {
        if (this.isDirty) {
            return;
        }
        this.isDirty = true;
        requestAnimationFrame(() => {
            this.nativeObject.start();
            this.isDirty = false;
        })
    }

}

export function setNeedsDisplay() {
    if (sharedApplication !== undefined) {
        sharedApplication.setNeedsDisplay();
    }
}
import * as I from '../../interface/Interfaces'
const PIXI = (window as any).PIXI

export class UIApplication implements I.UIApplication {

    nativeObject: any;
    delegate: I.UIApplicationDelegate;

    constructor(canvas: HTMLCanvasElement, delegate: I.UIApplicationDelegate) {
        this.nativeObject = new PIXI.Application({ view: canvas });
        this.delegate = delegate;
        if (this.delegate as I.UIApplicationDelegate) {
            this.delegate.applicationDidFinishLaunchingWithOptions(this, {});
        }
    }

}
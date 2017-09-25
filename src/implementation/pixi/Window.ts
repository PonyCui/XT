import { Application } from './Application'
import { View } from './View'
import { Rect } from "../../interface/Rect";
import * as PIXI from 'pixi.js'
import { ViewController } from "../../interface/ViewController";

export class Window extends View {

    XTClassName = "Window"

    constructor(rect: Rect) {
        super(rect);
        const application = Application.sharedApplication()
        if (application instanceof Application) {
            application.nativeObject.stage.addChild(this.nativeObject);
        }
        this.hidden = true;
        this.userInteractionEnabled = true;
        this.setupDebuggerGestures();
    }

    makeKeyAndVisible(): void {
        const application = Application.sharedApplication()
        if (application instanceof Application) {
            application.keyWindow = this;
        }
        this.hidden = false;
    }

    private _rootViewController?: ViewController

    public get rootViewController() {
        return this._rootViewController;
    }

    public set rootViewController(value: ViewController | undefined) {
        if (this._rootViewController !== undefined) {
            this._rootViewController.view.removeFromSuperview()
        }
        this._rootViewController = value;
        if (value) {
            value.view.frame = this.bounds;
            this.addSubview(value.view as View);
        }
    }

    layoutSubviews() {
        super.layoutSubviews();
        if (this.rootViewController) {
            this.rootViewController.view.frame = this.bounds;
        }
    }

    private setupDebuggerGestures() {
        var triggerTime = 3;
        var nextTime = performance.now();
        this.nativeObject.on('pointerup', (e: any) => {
            let x = e.data.originalEvent.pageX;
            let y = e.data.originalEvent.pageY;
            if (x > this.bounds.width - 44 && y > this.bounds.height - 44) {
                if (performance.now() > nextTime) { triggerTime = 3 }
                nextTime = performance.now() + 500;
                triggerTime--;
                if (triggerTime <= 0) {
                    triggerTime = 3;
                    (window as any).XTRDebugger()
                }
            }
        })
    }

}
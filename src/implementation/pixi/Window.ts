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

}
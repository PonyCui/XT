import { Application } from './Application'
import { View } from './View'
import { Rect } from "../../interface/Rect";
import * as PIXI from 'pixi.js'

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

}
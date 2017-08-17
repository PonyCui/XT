import * as I from '../../interface/Abstract'
import { Application } from './Application'
import { View } from './View'
const PIXI = (window as any).PIXI

export class Window extends View {

    XTClassName = "Window"

    constructor(rect: I.Rect) {
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
import * as I from '../../interface/Abstract'
import { UIApplication } from './UIApplication'
import { UIView } from './UIView'
const PIXI = (window as any).PIXI

export class UIWindow extends UIView {

    XTClassName = "UIWindow"

    constructor(rect: I.CGRect) {
        super(rect);
        const application = UIApplication.sharedApplication()
        if (application instanceof UIApplication) {
            application.nativeObject.stage.addChild(this.nativeObject);
        }
        this.hidden = true;
    }

    makeKeyAndVisible(): void {
        const application = UIApplication.sharedApplication()
        if (application instanceof UIApplication) {
            application.keyWindow = this;
        }
        this.hidden = false;
    }

}
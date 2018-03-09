/// <reference path="../xt.d.ts" />
import { List } from "./explorer/list";

XT.minSDK = "0.0.5";

class AppDelegate extends UI.ApplicationDelegate {

    testArray = new XT.BaseArray([new XT.BaseObject(), new XT.BaseObject()])

    constructor() {
        super()
        this.testArray.push(new XT.BaseObject)
        setTimeout(() => {
            this.testArray.clear()
            
        }, 1000)
    }

    applicationDidFinishLaunchingWithOptions(application: UI.Application, options: Object) {
        this.window = new UI.Window();
        this.window.rootViewController = new UI.NavigationController(new List());
        this.window.makeKeyAndVisible();
        console.log(JSON.stringify(options));
    }

}

const sampleApplication = new UI.Application('app', new AppDelegate());

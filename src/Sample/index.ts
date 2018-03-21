/// <reference path="../xt.d.ts" />
import { List } from "./explorer/list";

XT.minSDK = "0.0.5";

class AppDelegate extends UI.ApplicationDelegate {

    constructor() {
        super()
    }

    applicationDidFinishLaunchingWithOptions(application: UI.Application, options: Object) {
        this.window = new UI.Window();
        this.window.rootViewController = new UI.NavigationController(new List());
        this.window.makeKeyAndVisible();
        // console.log(JSON.stringify(options));
    }

}

const sampleApplication = new UI.Application('app', new AppDelegate());

let lastFrameTime = performance.now()

const runFPSCounter = () => {
    if (performance.now() - lastFrameTime > 18) {
        console.log(performance.now() - lastFrameTime);
    }
    lastFrameTime = performance.now()
    requestAnimationFrame(runFPSCounter)
}

// runFPSCounter()
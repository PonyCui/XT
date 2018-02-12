/// <reference path="../xt.d.ts" />
import { List } from "./explorer/list";

class AppDelegate extends UI.ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions(application: UI.Application, options: Object) {
        this.window = new UI.Window();
        this.window.backgroundColor = UI.Color.grayColor;
        this.window.rootViewController = new UI.NavigationController(new List());
        this.window.makeKeyAndVisible();
        console.log(JSON.stringify(options));
    }
    
}

const sampleApplication = new UI.Application('app', new AppDelegate());
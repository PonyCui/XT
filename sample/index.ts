/// <reference path="../src/xt.d.ts" />
import { List } from "./explorer/list";

class AppDelegate extends XT.ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new XT.Window();
        this.window.backgroundColor = XT.Color.grayColor
        this.window.rootViewController = new XT.NavigationController(new List())
        // this.window.rootViewController = new XT.NavigationController(new TestViewController())
        this.window.makeKeyAndVisible();
    }

}
const sampleApplication = new XT.Application('app', new AppDelegate());
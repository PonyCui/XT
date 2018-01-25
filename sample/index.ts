/// <reference path="../src/xt.d.ts" />
import { List } from "./explorer/list";

class AppDelegate extends UI.ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new UI.Window();
        this.window.backgroundColor = UI.Color.grayColor
        this.window.rootViewController = new UI.NavigationController(new List())
        // this.window.rootViewController = new UI.NavigationController(new TestViewController())
        // const v = new UI.ViewController()
        // v.title = "Hello"
        // v.showNavigationBar()
        // this.window.rootViewController = v
        this.window.makeKeyAndVisible();
    }

}
const sampleApplication = new UI.Application('app', new AppDelegate());
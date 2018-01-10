/// <reference path="../src/xt.d.ts" />
// import { List } from "./explorer/list";

class TestViewController extends XT.ViewController {

    viewDidLoad() {
        super.viewDidLoad()
        this.view.backgroundColor = XT.Color.yellowColor
        const redView = new XT.View()
        redView.frame = XT.RectMake(44, 44, 44, 44)
        redView.backgroundColor = XT.Color.redColor
        this.view.addSubview(redView)
        setTimeout(() => {
            XT.View.animationWithBouncinessAndSpeed(16, 16, () => {
                redView.frame = XT.RectMake(44, 44, 188, 188)
            })
        }, 1000)
    }

}

class AppDelegate extends XT.ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new XT.Window();
        this.window.backgroundColor = XT.Color.grayColor
        // this.window.rootViewController = new XT.NavigationController(new List())
        this.window.rootViewController = new TestViewController()
        this.window.makeKeyAndVisible();
    }

}
const sampleApplication = new XT.Application('app', new AppDelegate());
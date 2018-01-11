/// <reference path="../src/xt.d.ts" />
// import { List } from "./explorer/list";

class TestViewController extends XT.ViewController {

    viewDidLoad() {
        super.viewDidLoad()
        this.view.backgroundColor = XT.Color.whiteColor
        const redView = new XT.TextView()
        redView.frame = XT.RectMake(44, 44, 200, 44)
        redView.text = "Hello, World"
        setTimeout(() => {
            redView.focus()
        }, 1000)
        // redView.fillStyle = XT.Color.redColor
        // redView.fillRect(0,0,20,20)
        // redView.title = "Hello, World!"
        // redView.backgroundColor = XT.Color.lightGrayColor
        // XT.Image.fromAssets("location", (it) => {
        //     redView.inset = 8
        //     redView.image = it.imageWithImageRenderingMode(XT.ImageRenderingMode.Template)
        // })
        this.view.addSubview(redView)
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
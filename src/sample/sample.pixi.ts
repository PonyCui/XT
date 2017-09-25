import { View, Application, Window, Screen, Color, ViewController, RectMake, NavigationController, CanvasView } from '../main.pixi'

const application = new Application("app", {
    applicationDidFinishLaunchingWithOptions: () => {
        const window = new Window(Screen.mainScreen().bounds())
        window.rootViewController = new NavigationController(new FirstViewController());
        window.makeKeyAndVisible()
    }
})

class MyCanvasView extends CanvasView {

    onDraw(): void {
        super.onDraw();
        const ctx = this
        ctx.rect(20, 20, 150, 100);
        if (ctx.isPointInPath(20, 50)) {
            ctx.stroke();
        };
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        const view = new MyCanvasView(RectMake(44, 44, 300, 300))
        view.backgroundColor = Color.whiteColor
        this.view.addSubview(view);
        this.view.backgroundColor = Color.blackColor
    }

}

class SecondViewController extends ViewController {

    viewDidLoad() {
        this.view.backgroundColor = new Color(0.1, 0.1, 0.1)
        this.view.onTap = () => {
            this.navigationController && this.navigationController.popToRootViewController();
        }
    }

    viewDidAppear() {
        this.view.backgroundColor = new Color(0.5, 0.5, 0.5)
    }

}
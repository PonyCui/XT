import { View, Application, Window, Screen, Color, ViewController, RectMake, NavigationController } from '../main.pixi'

const application = new Application("app", {
    applicationDidFinishLaunchingWithOptions: () => {
        const window = new Window(Screen.mainScreen().bounds())
        window.rootViewController = new NavigationController(new FirstViewController());
        window.makeKeyAndVisible()
    }
})

class FirstViewController extends ViewController {

    viewDidLoad() {
        const view = new View(RectMake(44,44,88,88))
        view.backgroundColor = Color.blueColor
        view.userInteractionEnabled = true
        view.onTap = () => {
            view.backgroundColor = Color.redColor
        }
        this.view.addSubview(view);
        this.view.backgroundColor = new Color(1, 1, 0)
        this.view.onDoubleTap = () => {
            this.view.backgroundColor = Color.blackColor
        }
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
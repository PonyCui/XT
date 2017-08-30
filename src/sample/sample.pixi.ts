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
        this.view.backgroundColor = new Color(1, 1, 0)
        this.view.onTap = () => {
            this.navigationController && this.navigationController.pushViewController(new SecondViewController())
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
import { View, Application, Window, Screen, Color, ViewController } from '../main.pixi'

const application = new Application(document.getElementById("app"), {
    applicationDidFinishLaunchingWithOptions: () => {
        const window = new Window(Screen.mainScreen().bounds())
        window.rootViewController = new FirstViewController();
        window.makeKeyAndVisible()
    }
})

class FirstViewController extends ViewController {

    viewDidLoad() {
        this.view.backgroundColor = new Color(1, 1, 0)
    }

}
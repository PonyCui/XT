import { View, Application, Window, Screen, Color } from '../main.pixi'

const application = new Application(document.getElementById("app"), {
    applicationDidFinishLaunchingWithOptions: () => {
        const window = new Window(Screen.mainScreen().bounds())
        window.makeKeyAndVisible()
    }
})
import { View, Application, Window, Screen, Color, ViewController, RectMake, NavigationController, CanvasView } from '../main.pixi'

const application = new Application("app", {
    applicationDidFinishLaunchingWithOptions: () => {
        const window = new Window(Screen.mainScreen().bounds())
        window.rootViewController = new NavigationController(new FirstViewController());
        window.makeKeyAndVisible()
    }
})

class MyCanvasView extends CanvasView {

    init(): void {
        const ctx = this
        ctx.fillRect(0, 0, 150, 150);

        //  Save the default state
        ctx.save();

        // Make changes to the settings
        ctx.fillStyle = new Color(0x66 / 255.0, 1.0, 1.0)
        ctx.fillRect(15, 15, 120, 120);

        // Save the current state
        ctx.save();

        // Make the new changes to the settings
        ctx.fillStyle = new Color(0x99 / 255.0, 0x33 / 255.0, 0x33 / 255.0)
        ctx.globalAlpha = 0.5;
        ctx.fillRect(30, 30, 90, 90);

        // Restore previous state
        ctx.restore();

        // Draw a rectangle with restored settings
        ctx.fillRect(45, 45, 60, 60);

        // Restore original state
        ctx.restore();

        // Draw a rectangle with restored settings
        ctx.fillRect(40, 40, 90, 90);
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        const view = new MyCanvasView(RectMake(44, 44, 300, 300))
        view.clipsToBounds = true
        view.backgroundColor = Color.whiteColor
        setTimeout(() => {
            view.clear();
            view.fillStyle = Color.redColor
            view.fillRect(20, 20, 20, 20)
        }, 2000)
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
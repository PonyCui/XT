import { View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint } from '../main.ios'
import { InteractionState } from "../interface/View";

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        // this.window.backgroundColor = new Color(1, 1, 0)
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

const application = new Application('app', new AppDelegate());

class FirstViewController extends ViewController {

    viewDidLoad() {
        this.view.backgroundColor = new Color(1.0, 1.0, 0.0)
        const sView = new View(RectMake(0, 0, 20, 20));
        sView.backgroundColor = Color.whiteColor;
        this.view.addSubview(sView);
        this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("|-20-[sView]-80-|", { sView }))
        this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("V:|-20-[sView]-80-|", { sView }))

        // this.view.addConstraints()

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
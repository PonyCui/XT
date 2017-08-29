import { View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button } from '../main.ios'
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
        const sView = new Button(RectMake(60, 80, 200, 88));
        sView.backgroundColor = Color.whiteColor;
        sView.title = "Test"
        sView.inset = 8;
        sView.vertical = true;
        Image.fromAssets("location", (img) => {
            sView.image = img;
        }, () => {})
        this.view.addSubview(sView);

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
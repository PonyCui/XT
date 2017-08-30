import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView } from '../main.ios'

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
        const sView = new ScrollView(RectMake(0, 0, 0, 0));
        sView.backgroundColor = Color.whiteColor
        sView.addSubview(((): any => {
            const view = new Button(RectMake(0, 0, 200, 200));
            view.title = "Hello"
            view.backgroundColor = Color.greenColor;
            return view;
        })())
        this.view.addSubview(sView);
        this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("|-0-[sView]-0-|", { sView }));
        this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("V:|-0-[sView]-0-|", { sView }));
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
import { TransformMatrix, InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell } from '../main.ios'

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        // this.window.backgroundColor = new Color(1, 1, 0)
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

const application = new Application('app', new AppDelegate());

class SCell extends ListCell {

    viewController?: ViewController

    init() {
        this.backgroundColor = Color.yellowColor;
        this.onSelected = () => {
            console.log(this.currentItem);
            this.viewController && this.viewController.navigationController && this.viewController.navigationController.pushViewController(new SecondViewController())
        }
    }

}

class S2Cell extends ListCell {

    viewController?: ViewController

    init() {
        this.backgroundColor = Color.greenColor;
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {

        const view = new View();
        view.frame = RectMake(80, 80, 40, 40)
        view.backgroundColor = Color.redColor;
        view.transform = new TransformMatrix(2.0, 0.0, 0.0, 1.0, 0.0, 0.0)
        this.view.addSubview(view);
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
import { View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font } from '../main.ios'
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
        sView.font = Font.boldSystemFontOfSize(24);
        Image.fromAssets("location", (img) => {
            sView.image = img.imageWithImageRenderingMode(ImageRenderingMode.Original);
        }, () => { })
        this.view.addSubview(sView);

        // const nView = new Label(RectMake(60,60,200,88))
        // nView.text = "Hello, World!";
        // nView.font = Font.italicSystemFontOfSize(24)
        // this.view.addSubview(nView);
        // console.log(nView.font.fontStyle);

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
import { View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode } from '../main.ios'
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
        const sView = new ImageView(RectMake(60, 60, 120, 78));
        sView.contentMode = ContentMode.ScaleAspectFit;
        this.view.addSubview(sView);
        Image.fromAssets("success", (image) => {
            sView.image = image;
            console.log(image);
        }, () => { })
        this.view.onTap = () => {
            this.view.backgroundColor = new Color(1.0, 1.0, 1.0)
            // View.animationWithDurationDampingVelocity(1.0, 0.5, 16.0, () => {
            //     sView.frame = RectMake(60, 60, 88, 88);
            // });
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
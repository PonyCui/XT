declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake } from '../main.android'

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        this.window.rootViewController = new FirstViewController();
        this.window.makeKeyAndVisible();
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        const view = new View();
        view.frame = RectMake(80, 80, 40, 40)
        view.backgroundColor = Color.redColor;
        view.userInteractionEnabled = true;
        view.onTap = () => {
            view.backgroundColor = Color.greenColor
        }
        this.view.addSubview(view);
        this.view.backgroundColor = Color.yellowColor
        const sv = new SecondViewController()
        this.addChildViewController(sv);
        this.view.addSubview(sv.view);
        sv.view.frame = RectMake(120, 120, 300, 300)
    }

}

class SecondViewController extends ViewController {

    viewDidLoad() {
        const view = new View();
        view.frame = RectMake(80, 80, 88, 88)
        view.backgroundColor = Color.greenColor;
        view.userInteractionEnabled = true;
        view.onTap = () => {
            view.backgroundColor = Color.blackColor
        }
        this.view.addSubview(view);
        this.view.backgroundColor = Color.blueColor
    }

}

const application = new Application('app', new AppDelegate());

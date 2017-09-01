declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake } from '../main.android'

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        this.window.backgroundColor = Color.yellowColor

        const view = new View();
        view.frame = RectMake(80, 80, 40, 40)
        view.backgroundColor = Color.redColor;
        this.window.addSubview(view);

        const sView = new View();
        sView.frame = RectMake(30, 30, 44, 44)
        sView.backgroundColor = Color.greenColor;
        view.addSubview(sView)

        const eView = new View();
        eView.frame = RectMake(40, 40, 88, 88)
        eView.backgroundColor = Color.blackColor;
        view.addSubview(eView)

        const gView = new View();
        gView.frame = RectMake(50, 50, 99, 99)
        gView.backgroundColor = Color.blueColor;
        view.addSubview(gView)

        view.sendSubviewToBack(gView)

        // console.log(sView.window);

        // this.window.backgroundColor = new Color(1, 1, 0)
        // this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

const application = new Application('app', new AppDelegate());

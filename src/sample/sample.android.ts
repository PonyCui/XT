declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake } from '../main.android'

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new NWindow();
        this.window.backgroundColor = Color.yellowColor

        const view = new NView();
        view.frame = RectMake(80, 80, 40, 40)
        view.backgroundColor = Color.redColor;
        this.window.addSubview(view);
        view.tag = 1000;

        // console.log(sView.window);

        // this.window.backgroundColor = new Color(1, 1, 0)
        // this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

class NWindow extends Window {

    layoutSubviews() {
        super.layoutSubviews();
        console.log(this.frame)
    }

}

class NView extends View {

    willMoveToSuperview(newSuperview: View) {
        console.log("willMoveToSuperview" + newSuperview);
    }

    didMoveToSuperview() {
        console.log("didMoveToSuperview")
    }

}

const application = new Application('app', new AppDelegate());

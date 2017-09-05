declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake } from '../main.android'

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new NWindow();
        this.window.backgroundColor = Color.yellowColor

        const view = new NView();
        view.clipsToBounds = true
        view.frame = RectMake(80, 80, 60, 60)
        view.cornerRadius = 30
        view.borderWidth = 4
        view.borderColor = Color.blackColor
        view.backgroundColor = Color.redColor;
        this.window.addSubview(view);

        // this.window.addConstraints(LayoutConstraint.constraintsWithVisualFormat("|-20-[view]-20-|", { view }));
        // this.window.addConstraints(LayoutConstraint.constraintsWithVisualFormat("V:|-20-[view]-20-|", { view }));

        view.userInteractionEnabled = true
        view.onTap = () => {
            View.animationWithTensionAndFriction(40.0, 3.0, () => {
                view.frame = RectMake(120, 120, 200, 200)
                view.cornerRadius = 5.0
            }, () => {
                view.backgroundColor = Color.greenColor
            })
        }
        this.window.makeKeyAndVisible();
    }

}

class NWindow extends Window {

    layoutSubviews() {
        super.layoutSubviews();
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

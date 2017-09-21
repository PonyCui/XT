declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, TextField, TextFieldViewMode, TextView } from '../main.ios'
import { Rect } from '../interface/Rect';

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        const imageView = new ImageView(RectMake(44, 44, 78, 78))
        imageView.userInteractionEnabled = true
        Image.fromAssetsWithScales("success", [2], (it) => {
            imageView.image = it
        })
        imageView.backgroundColor = Color.yellowColor
        imageView.onTap = () => {
            XTRBreakpoint("Test Breakpoint", function (code: string) { return JSON.stringify(eval(code)) }.bind(this));
            imageView.backgroundColor = Color.whiteColor
            View.animationWithDuration(0.3, () => {
                imageView.backgroundColor = Color.clearColor
            })
        }
        this.view.addSubview(imageView)
    }

}

const application = new Application('app', new AppDelegate());

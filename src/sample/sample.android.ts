declare const XTRTest: any
declare const FOOPlugin: any

import { DeviceOrientation, InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, SizeMake, TextField, TextFieldViewMode, KeyboardType, ReturnKeyType, TextView, CanvasView, CustomView, Device, TransformMatrix } from '../main.android'

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        // this.window.backgroundColor = Color.yellowColor
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        const fooView = new ScrollView(RectMake(0.0, 0.0, Screen.mainScreen().bounds().width, Screen.mainScreen().bounds().height))
        fooView.backgroundColor = Color.whiteColor
        fooView.contentSize = SizeMake(0, 3000)
        this.view.addSubview(fooView)
        const redView = new View(RectMake(0, 0, 44, 44))
        redView.userInteractionEnabled = true
        redView.backgroundColor = Color.redColor
        redView.onTap = () => {
            redView.backgroundColor = Color.purpleColor
        }
        fooView.addSubview(redView)
    }

}

const application = new Application('app', new AppDelegate());
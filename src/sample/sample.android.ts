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
        // this.supportOrientations = [DeviceOrientation.Portrait, DeviceOrientation.LandscapeLeft, DeviceOrientation.LandscapeRight]
        const redView = new View(RectMake(0, 0, 44, 44))
        redView.backgroundColor = Color.redColor
        redView.userInteractionEnabled = true
        redView.onTap = () => {
            redView.backgroundColor = Color.grayColor
            // this.navigationController && this.navigationController.pushViewController(new SecondViewController())
        }
        this.view.addSubview(redView)
    }

}

class SecondViewController extends ViewController {

    viewDidLoad() {
        this.view.backgroundColor = Color.grayColor
    }

}

const application = new Application('app', new AppDelegate());
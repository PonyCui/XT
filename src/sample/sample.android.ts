declare const XTRTest: any
declare const FOOPlugin: any

import { DeviceOrientation, InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, SizeMake, TextField, TextFieldViewMode, KeyboardType, ReturnKeyType, TextView, CanvasView, CustomView, Device, TransformMatrix } from '../main.android'

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        this.supportOrientations = [DeviceOrientation.Portrait, DeviceOrientation.LandscapeLeft, DeviceOrientation.LandscapeRight]
        const redView = new View(RectMake(0, 0, 44, 44))
        redView.transform = new TransformMatrix(1.0, 0.0, 0.0, 1.0, 44.0, 44.0)
        redView.backgroundColor = Color.redColor
        redView.userInteractionEnabled = true
        redView.onTap = () => {
            redView.backgroundColor = Color.blueColor
        }
        this.view.backgroundColor = Color.yellowColor
        this.view.addSubview(redView)
    }

}

const application = new Application('app', new AppDelegate());

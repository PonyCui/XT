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
        const redView = new View(RectMake(88, 88, 44, 44))
        redView.backgroundColor = Color.redColor
        this.view.addSubview(redView)
        setTimeout(() => {
            View.animationWithTensionAndFriction(40.0, 3.0, () => {
                redView.transform = TransformMatrix.scale(redView.transform, 2.0, 2.0)
                redView.transform = TransformMatrix.rotate(redView.transform, 45 * Math.PI / 180)
            })
        }, 2000)
        redView.userInteractionEnabled = true
        redView.onTap = () => {
            redView.backgroundColor = Color.yellowColor
        }
    }

}

const application = new Application('app', new AppDelegate());

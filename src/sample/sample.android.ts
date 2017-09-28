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
        const redView = new View(RectMake(44, 44, 44, 44))
        redView.backgroundColor = Color.redColor
        this.view.addSubview(redView)
        setTimeout(() => {
            View.animationWithTensionAndFriction(40.0, 3.0, () => {
                redView.transform = TransformMatrix.scale(redView.transform, 2.0, 2.0)
                redView.transform = TransformMatrix.rotate(redView.transform, 20 * Math.PI / 180)
                redView.transform = TransformMatrix.translate(redView.transform, 100, 100)
                // redView.transform = TransformMatrix.concat(redView.transform, new TransformMatrix(2.0, 0.0, 0.0, 2.0, 20.0, 20.0))
                // redView.transform = new TransformMatrix(2.0, 0.0, 0.0, 2.0, 80.0, 80.0)
            })
        }, 2000)
        redView.userInteractionEnabled = true
        redView.onTap = () => {
            redView.backgroundColor = Color.yellowColor
        }
        // const yellowView = new View(RectMake(44, 44, 44, 44))
        // yellowView.backgroundColor = Color.yellowColor
        // this.view.addSubview(yellowView)
        // yellowView.transform = TransformMatrix.scale(yellowView.transform, 2.0, 2.0)
        // yellowView.transform = TransformMatrix.rotate(yellowView.transform, 20 * Math.PI / 180)
        // yellowView.transform = TransformMatrix.translate(yellowView.transform, 100, 100)
    }

}

const application = new Application('app', new AppDelegate());

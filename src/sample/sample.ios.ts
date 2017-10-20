declare const XTRTest: any
declare const FOOPlugin: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, TextField, TextFieldViewMode, TextView, CanvasView, CustomView, Device, DeviceOrientation, TransformMatrix } from '../main.ios'
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
        this.supportOrientations = [DeviceOrientation.Portrait, DeviceOrientation.LandscapeLeft, DeviceOrientation.LandscapeRight]
        const redView = new View(RectMake(44, 44, 44, 44))
        redView.backgroundColor = Color.redColor
        this.view.addSubview(redView)
        setTimeout(() => {
            View.animationWithDuration(0.25, () => {
                // redView.transform = TransformMatrix.scale(redView.transform, 2.0, 2.0)
                redView.transform = TransformMatrix.postTranslate(TransformMatrix.postRotate(new TransformMatrix(), 45 * Math.PI / 180), 100, 100)
                // redView.transform = TransformMatrix.postRotate(redView.transform, 45 * Math.PI / 180)
                // redView.transform = TransformMatrix.concat(redView.transform, new TransformMatrix(2.0, 0.0, 0.0, 2.0, 20.0, 20.0))
                // redView.transform = new TransformMatrix(2.0, 0.0, 0.0, 2.0, 80.0, 80.0)
            })
        }, 2000)
        redView.userInteractionEnabled = true
        redView.onTap = () => {
            redView.backgroundColor = Color.yellowColor
        }
    }

    testPlugin() {
        if (FOOPlugin) {
            console.log(FOOPlugin.sayHello());
        }
    }

}

const application = new Application('app', new AppDelegate());

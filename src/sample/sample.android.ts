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
        const fooView = new ImageView(RectMake(0, 0, 300, 300))
        fooView.cornerRadius = 150
        fooView.clipsToBounds = true
        Image.fromURL("http://img.hb.aicdn.com/0e4cde02c706dcdc4e62948d7c524d399ef40f28275c7b-T5LDsK_fw658", (it) => {
            fooView.image = it
        })
        this.view.addSubview(fooView)
    }

}

const application = new Application('app', new AppDelegate());
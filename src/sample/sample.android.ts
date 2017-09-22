declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, SizeMake, TextField, TextFieldViewMode, KeyboardType, ReturnKeyType, TextView, CanvasView } from '../main.android'
import { Rect } from '../interface/Rect';

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

class MyCanvasView extends CanvasView {

    onDraw() {
        super.onDraw();
        let ctx = this
        ctx.rect(20,20,150,100);
        if (ctx.isPointInPath(20,50))
           {
           ctx.stroke();
           };
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        const canvasView = new MyCanvasView(RectMake(44, 44, 300, 300))
        canvasView.backgroundColor = Color.whiteColor
        this.view.addSubview(canvasView)
        this.view.backgroundColor = Color.yellowColor
    }

}

const application = new Application('app', new AppDelegate());

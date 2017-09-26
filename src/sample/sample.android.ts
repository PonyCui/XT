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

    init() {
        super.init();
        let ctx = this
        ctx.fillStyle=Color.yellowColor;
        ctx.fillRect(0,0,250,100)
        
        ctx.setTransform(1,0.5,-0.5,1,30,10);
        ctx.fillStyle=Color.redColor;
        ctx.fillRect(0,0,250,100);
        
        ctx.setTransform(1,0.5,-0.5,1,30,10);
        ctx.fillStyle=Color.blueColor;
        ctx.fillRect(0,0,250,100);
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        const canvasView = new MyCanvasView(RectMake(44, 44, 300, 300))
        canvasView.backgroundColor = Color.yellowColor
        this.view.addSubview(canvasView)
        setTimeout(() => {
            canvasView.fillStyle = Color.blackColor
            canvasView.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
            canvasView.fillRect(20,20,20,20)
        }, 2000)
        this.view.backgroundColor = Color.whiteColor
    }

}

const application = new Application('app', new AppDelegate());

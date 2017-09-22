declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, TextField, TextFieldViewMode, TextView, CanvasView } from '../main.ios'
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
        var ctx = this;

        ctx.fillRect(0, 0, 150, 150);

        //  Save the default state
        ctx.save();

        // Make changes to the settings
        ctx.fillStyle = new Color(0x66 / 255.0, 1.0, 1.0)
        ctx.fillRect(15, 15, 120, 120);

        // Save the current state
        ctx.save();

        // Make the new changes to the settings
        ctx.fillStyle = new Color(0x99 / 255.0, 0x33 / 255.0, 0x33 / 255.0)
        ctx.globalAlpha = 0.5;
        ctx.fillRect(30, 30, 90, 90);

        // Restore previous state
        ctx.restore();

        // Draw a rectangle with restored settings
        ctx.fillRect(45, 45, 60, 60);

        // Restore original state
        ctx.restore();

        // Draw a rectangle with restored settings
        ctx.fillRect(40, 40, 90, 90);
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        const canvasView = new MyCanvasView(RectMake(44, 44, 300, 300));
        canvasView.backgroundColor = Color.whiteColor
        this.view.addSubview(canvasView);
        // this.view.backgroundColor = Color.blueColor
        // const imageView = new ImageView(RectMake(44, 44, 78, 78))
        // imageView.userInteractionEnabled = true
        // Image.fromAssetsWithScales("success", [2], (it) => {
        //     imageView.image = it
        // })
        // imageView.backgroundColor = Color.yellowColor
        // imageView.onTap = () => {
        //     XTRBreakpoint("Test Breakpoint", function (code: string) { return "" + eval(code) }.bind(this));
        //     imageView.backgroundColor = Color.whiteColor
        //     View.animationWithDuration(0.3, () => {
        //         imageView.backgroundColor = Color.clearColor
        //     })
        // }
        // this.view.addSubview(imageView)
    }

}

const application = new Application('app', new AppDelegate());

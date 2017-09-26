declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, TextField, TextFieldViewMode, TextView, CanvasView, CustomView } from '../main.ios'
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
        const fooView = new CustomView("FOOView", RectMake(44, 44, 44, 44))
        fooView.onMessage = (obj: any) => {
            if (typeof obj.alpha === "number") {
                fooView.alpha = obj.alpha
            }
        }
        setTimeout(() => {
            fooView.emitMessage({ on: true });
        }, 2000)
        setTimeout(() => {
            fooView.emitMessage({ on: false });
        }, 4000)
        this.view.addSubview(fooView);
    }

}

const application = new Application('app', new AppDelegate());

declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, TextField, TextFieldViewMode, TextView } from '../main.ios'
import { Rect } from '../interface/Rect';

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

class FirstViewController extends ViewController {

    textField: TextField

    viewDidLoad() {
        const view = new TextView();
        view.frame = RectMake(44, 44, 200, 200)
        this.view.addSubview(view);
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.textField.frame = RectMake(20, this.view.bounds.height - 44, 200, 44)
    }


    keyboardWillShow(frame: Rect, duration: number) {
        View.animationWithDuration(duration, () => {
            this.textField.frame = RectMake(20, this.view.bounds.height - frame.height - 44, 200, 44)
        })
    }

    keyboardWillHide(duration: number) {
        View.animationWithDuration(duration, () => {
            this.textField.frame = RectMake(20, this.view.bounds.height - 44, 200, 44)
        })
    }

}

const application = new Application('app', new AppDelegate());

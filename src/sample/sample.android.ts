declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, SizeMake, TextField, TextFieldViewMode, KeyboardType, ReturnKeyType, TextView } from '../main.android'
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
        const view = new TextField();
        this.textField = view;
        view.frame = RectMake(44, 44, 200, 44)
        view.backgroundColor = Color.yellowColor
        this.view.addSubview(view)
        this.view.onTap = () => {
            application.delegate.window && application.delegate.window.endEditing()
        }
        // this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("|-0-[view]-0-|", { view }))
        // this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("V:|-0-[view]-0-|", { view }))
        // this.view.setNeedsLayout()
        // this.view.addConstraint(new LayoutConstraint(view, LayoutAttribute.CenterX, LayoutRelation.Equal, undefined, LayoutAttribute.CenterX, 0.0, 1.0))
        // this.view.addConstraint(new LayoutConstraint(view, LayoutAttribute.CenterY, LayoutRelation.Equal, undefined, LayoutAttribute.CenterY, 0.0, 1.0))
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews();
        this.textField.frame = RectMake(44, this.view.bounds.height - 44, 200, 44)
    }

    keyboardWillShow(rect: Rect, duration: number) {
        super.keyboardWillShow(rect, duration)
        View.animationWithDuration(duration, () => {
            this.textField.frame = RectMake(44, this.view.bounds.height - 44 - rect.height, 200, 44)
        })
    }

    keyboardWillHide(duration: number) {
        super.keyboardWillHide(duration);
        View.animationWithDuration(duration, () => {
            this.textField.frame = RectMake(44, this.view.bounds.height - 44, 200, 44)
        })
    }

}

class SecondViewController extends ViewController {

    viewDidLoad() {
        const view = new View();
        view.frame = RectMake(80, 80, 88, 88)
        view.backgroundColor = Color.whiteColor;
        view.userInteractionEnabled = true;
        view.onTap = () => {
            this.navigationController && this.navigationController.pushViewController(new ThirdViewController(), true)
        }
        this.view.addSubview(view);
        this.view.backgroundColor = Color.greenColor
    }



}

class ThirdViewController extends ViewController {

    viewDidLoad() {
        const view = new View();
        view.frame = RectMake(80, 80, 88, 88)
        view.backgroundColor = Color.whiteColor;
        view.userInteractionEnabled = true;
        view.onTap = () => {
            this.navigationController && this.navigationController.popToViewController(this.navigationController.childViewControllers[0]);
        }
        this.view.addSubview(view);
        this.view.backgroundColor = Color.blueColor
    }

}

const application = new Application('app', new AppDelegate());

declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, TextField, TextFieldViewMode } from '../main.ios'

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        const view = new TextField();
        view.frame = RectMake(20, 20, 200, 44)
        // view.text = "Hello, World!"
        view.placeholder = "输入用户名"
        view.placeholderColor = Color.colorWithWhite(0.5, 1.0)
        view.leftView = new View(RectMake(0, 0, 22, 0))
        view.leftViewMode = TextFieldViewMode.Always
        view.clearButtonMode = TextFieldViewMode.WhileEditing
        view.borderWidth = 1
        view.borderColor = Color.blackColor
        view.cornerRadius = 22.0
        // view.backgroundColor = Color.yellowColor
        // view.contentMode = ContentMode.ScaleAspectFill
        // Image.fromAssetsWithScales('success', [2], (image) => {
        //     view.image = image
        // })
        // view.backgroundColor = Color.yellowColor
        this.view.addSubview(view);
        this.view.onTap = () => {
            view.blur()
        }
        // this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("|-0-[view]", { view }))
        // this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("V:|-0-[view]", { view }))
        // this.view.addConstraint(new LayoutConstraint(view, LayoutAttribute.CenterX, LayoutRelation.Equal, undefined, LayoutAttribute.CenterX, 0.0, 1.0))
        // this.view.addConstraint(new LayoutConstraint(view, LayoutAttribute.CenterY, LayoutRelation.Equal, undefined, LayoutAttribute.CenterY, 0.0, 1.0))
    }

    keyboardWillShow() {
        this.view.alpha = 0.5
    }

    keyboardWillHide() {
        this.view.alpha = 1.0
    }

}

const application = new Application('app', new AppDelegate());

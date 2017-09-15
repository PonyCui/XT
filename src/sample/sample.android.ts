declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, SizeMake, TextField, TextFieldViewMode } from '../main.android'

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
        view.backgroundColor = Color.yellowColor
        view.frame = RectMake(44, 44, 200, 44)
        this.textField = view;
        // view.text = "Hello"
        view.font = Font.boldSystemFontOfSize(17)
        view.textColor = Color.blueColor
        // view.textAlignment = TextAlignment.Center
        view.placeholder = "请输入你的密码"
        view.placeholderColor = Color.colorWithWhite(0.7, 1.0)
        view.clearsOnBeginEditing = true
        const leftView = new View(RectMake(0, 0, 22, 0))
        leftView.backgroundColor = Color.greenColor
        view.leftView = leftView
        view.leftViewMode = TextFieldViewMode.WhileEditing
        const rightView = new View(RectMake(0, 0, 22, 0))
        rightView.backgroundColor = Color.greenColor
        // view.rightView = rightView
        view.rightViewMode = TextFieldViewMode.WhileEditing
        view.clearButtonMode = TextFieldViewMode.WhileEditing
        this.view.addSubview(view);
        setTimeout(() => {
            console.log(view.editing)
        }, 5000)
        // view.register(TestCell, "Cell")
        // let items = [];
        // for (let index = 0; index < 100; index++) {
        //     items.push({
        //         reuseIdentifier: "Cell",
        //         rowHeight: () => 44.0,
        //         alpha: 0.01 * index,
        //     })
        // }
        // view.items = items
        // view.backgroundColor = Color.yellowColor
        // this.view.addSubview(view)
        // this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("|-0-[view]-0-|", { view }))
        // this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("V:|-0-[view]-0-|", { view }))
        // this.view.setNeedsLayout()
        // this.view.addConstraint(new LayoutConstraint(view, LayoutAttribute.CenterX, LayoutRelation.Equal, undefined, LayoutAttribute.CenterX, 0.0, 1.0))
        // this.view.addConstraint(new LayoutConstraint(view, LayoutAttribute.CenterY, LayoutRelation.Equal, undefined, LayoutAttribute.CenterY, 0.0, 1.0))
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

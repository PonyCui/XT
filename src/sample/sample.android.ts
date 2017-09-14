declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, SizeMake } from '../main.android'
import { Rect } from '../interface/Rect';

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

class TestCell extends ListCell {

    label: Label

    init() {
        super.init()
        this.label = new Label()
        this.label.frame = RectMake(0, 0, 200, 44)
        this.contentView.addSubview(this.label);
    }

    didSelected() {
        if (application.delegate && application.delegate.window && application.delegate.window.rootViewController) {
            if (application.delegate.window.rootViewController instanceof NavigationController) {
                application.delegate.window.rootViewController.pushViewController(new SecondViewController());
            }
        }
        // this.contentView.backgroundColor = Color.redColor
    }

    didRender() {
        this.label.text = (this.currentItem as any).alpha.toString()
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        const view = new ListView();
        view.register(TestCell, "Cell")
        let items = [];
        for (let index = 0; index < 100; index++) {
            items.push({
                reuseIdentifier: "Cell",
                rowHeight: () => 44.0,
                alpha: 0.01 * index,
            })
        }
        view.items = items
        view.backgroundColor = Color.yellowColor
        this.view.addSubview(view)
        this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("|-0-[view]-0-|", { view }))
        this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("V:|-0-[view]-0-|", { view }))
        this.view.setNeedsLayout()
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

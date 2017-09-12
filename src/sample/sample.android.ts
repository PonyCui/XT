declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, SizeMake } from '../main.android'

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        const view = new ScrollView();

        for (let index = 0; index < 100; index++) {
            const redView = new View(RectMake(60, 66 * index, 44, 44))
            redView.backgroundColor = new Color(1, 0, 0, index / 100)
            redView.userInteractionEnabled = true
            redView.onTap = () => {
                redView.backgroundColor = Color.yellowColor
            }
            view.addSubview(redView)
        }
        view.contentSize = SizeMake(0, 6600)
        view.alwaysBounceVertical = true
        this.view.addSubview(view);

        const horiView = new ScrollView()
        horiView.frame = RectMake(0, 0, 375, 200)
        for (let index = 0; index < 100; index++) {
            const yellowView = new View(RectMake(66 * index, 0, 44, 44))
            yellowView.backgroundColor = new Color(0, 0, 0, index / 100)
            yellowView.userInteractionEnabled = true
            yellowView.onTap = () => {
                yellowView.backgroundColor = Color.yellowColor
            }
            horiView.addSubview(yellowView)
        }
        view.addSubview(horiView);
        horiView.contentSize = SizeMake(4000, 0)

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

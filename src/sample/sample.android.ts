declare const XTRTest: any

import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation } from '../main.android'

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        const view = new ImageView();
        // view.frame = RectMake(0, 0, 0, 0)
        // view.backgroundColor = Color.yellowColor
        view.userInteractionEnabled = true
        view.alpha = 1.0
        view.cornerRadius = 20.0
        view.clipsToBounds = true
        // view.contentMode = ContentMode.ScaleAspectFill
        view.onTap = () => {
            View.animationWithDuration(0.3, () => {
                view.alpha = 0.0
            })
        }

        // Image.fromURL("http://img.hb.aicdn.com/47a9c27bc5c45c7de196cdc0e1a13f2b9212bf611bb94-da2LzC_sq140sf", (image) => {
        //     view.image = image.imageWithImageRenderingMode(ImageRenderingMode.Template)
        // })

        Image.fromAssetsWithScales('success', [2], (image) => {
            view.image = image.imageWithImageRenderingMode(ImageRenderingMode.Template)
        })
        // Image.fromAssetsWithScales('location', [2], (image) => {
        //     setTimeout(() => {
        //         view.image = image
        //     }, 5000)
        // })
        // view.backgroundColor = Color.yellowColor
        this.view.addSubview(view);
        // this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("|-0-[view]", { view }))
        // this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("V:|-0-[view]", { view }))
        this.view.addConstraint(new LayoutConstraint(view, LayoutAttribute.CenterX, LayoutRelation.Equal, undefined, LayoutAttribute.CenterX, 0.0, 1.0))
        this.view.addConstraint(new LayoutConstraint(view, LayoutAttribute.CenterY, LayoutRelation.Equal, undefined, LayoutAttribute.CenterY, 0.0, 1.0))
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

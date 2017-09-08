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
        const view = new Label();
        view.frame = RectMake(20, 20, 200, 200)
        view.font = Font.boldSystemFontOfSize(18)
        view.backgroundColor = Color.yellowColor
        view.textAlignment = TextAlignment.Left
        view.text = "据“印度报业托拉斯”报道，印度军队高级官员称，巴基斯坦军队于当天11:45向印度安全部队开火，同时使用了小型武器以及自动化武器，随后，两方军队爆发激烈冲突。最后，枪战于11:55时结束，共持续了10分钟。该军官称，有两名印度人员在交火中受伤，并被送入最近的医院，目前伤势已稳定。"
        view.numberOfLines = 2
        setTimeout(() => {
            view.numberOfLines = 0
        }, 3000)
        // view.lineSpace = 8
        view.textColor = Color.blueColor
        view.lineBreakMode = LineBreakMode.TruncatingTail
        // console.log(view.textRectForBounds(RectMake(0, 0, 30, 400)))
        this.view.addSubview(view);
        // this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("|-0-[view]", { view }))
        // this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("V:|-0-[view]", { view }))
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

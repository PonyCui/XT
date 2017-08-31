import { InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell } from '../main.ios'

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        // this.window.backgroundColor = new Color(1, 1, 0)
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

const application = new Application('app', new AppDelegate());

class SCell extends ListCell {

    viewController?: ViewController

    init() {
        this.backgroundColor = Color.yellowColor;
        this.onSelected = () => {
            console.log(this.currentItem);
            this.viewController && this.viewController.navigationController && this.viewController.navigationController.pushViewController(new SecondViewController())
        }
    }

}

class S2Cell extends ListCell {

    viewController?: ViewController

    init() {
        this.backgroundColor = Color.greenColor;
    }

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        this.view.backgroundColor = new Color(1.0, 1.0, 0.0)
        const sView = new ListView(RectMake(0, 0, 0, 0));
        sView.register(SCell, "Test")
        sView.items = [{
            reuseIdentifier: "Test",
            rowHeight: () => { return 88.0 },
            ttt: "1",
        },]
        sView.renderItem = (cell, item) => {
            (cell as SCell).viewController = this;
        }
        setTimeout(() => {
            sView.items = [{
                reuseIdentifier: "Test",
                rowHeight: () => { return 88.0 },
                ttt: "1",
            }, {
                reuseIdentifier: "Test",
                rowHeight: () => { return 88.0 },
                ttt: "2",
            }, {
                reuseIdentifier: "Test",
                rowHeight: () => { return 88.0 },
                ttt: "3",
            }, {
                reuseIdentifier: "Test",
                rowHeight: () => { return 88.0 },
                ttt: "4",
            }, {
                reuseIdentifier: "Test",
                rowHeight: () => { return 88.0 },
                ttt: "5",
            }]
            sView.reloadData();
        }, 5000)
        sView.reloadData();
        sView.backgroundColor = Color.whiteColor
        this.view.addSubview(sView);
        this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("|-0-[sView]-0-|", { sView }));
        this.view.addConstraints(LayoutConstraint.constraintsWithVisualFormat("V:|-0-[sView]-0-|", { sView }));
    }

}

class SecondViewController extends ViewController {

    viewDidLoad() {
        this.view.backgroundColor = new Color(0.1, 0.1, 0.1)
        this.view.onTap = () => {
            this.navigationController && this.navigationController.popToRootViewController();
        }
    }

    viewDidAppear() {
        this.view.backgroundColor = new Color(0.5, 0.5, 0.5)
    }

}
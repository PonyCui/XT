declare const XTRTest: any
declare const FOOPlugin: any

import { DeviceOrientation, InteractionState, View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController, Image, ImageView, ContentMode, Label, TextAlignment, LineBreakMode, LayoutConstraint, Button, ImageRenderingMode, Font, ScrollView, ListView, ListCell, PointMake, LayoutAttribute, LayoutRelation, SizeMake, TextField, TextFieldViewMode, KeyboardType, ReturnKeyType, TextView, CanvasView, CustomView, Device, TransformMatrix } from '../main.android'
import { ListItem } from '../interface/ListView';

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        console.log(FOOPlugin.sayHello())
        this.window = new Window();
        this.window.rootViewController = new NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    }

}

class FirstListCell extends ListCell {

    owner?: FirstViewController
    myLabel: Label = new Label(RectMake(0.0, 0.0, Screen.mainScreen().bounds().width, 44))
    myFoo: CustomView = new CustomView("FOOView", RectMake(300, 0, 75, 44))

    init() {
        super.init();
        this.contentView.addSubview(this.myLabel)
        this.myFoo.userInteractionEnabled = true
        this.myFoo.onTap = () => {
            this.myFoo.props = {
                on: !this.myFoo.props.on
            }
        }
        this.contentView.addSubview(this.myFoo)
        this.contentView.userInteractionEnabled = true
    }

    didSelected() {
        if (this.owner && this.owner.navigationController) {
            this.owner.navigationController.pushViewController(new SecondViewController())
        }
    }

}

class FirstItem implements ListItem {

    [key: string]: any;
    reuseIdentifier: string = "Cell"
    rowHeight: (width: number) => number = () => {
        return 44
    }
    name: string = "Pony"

    constructor(name: string) {
        this.name = name;
    }

}

class FirstViewController extends ViewController {

    private fooView: ListView;

    viewDidLoad() {
        const fooView = new ListView(RectMake(0.0, 0.0, 0.0, 0.0))
        this.fooView = fooView
        fooView.register(FirstListCell, "Cell")
        fooView.renderItem = (cell: FirstListCell, item: FirstItem) => {
            cell.owner = this
            cell.myLabel.text = item.name
        }
        let items = []
        for (var index = 0; index < 100; index++) {
            items.push(new FirstItem("Index >>> " + index))
        }
        fooView.items = items
        fooView.reloadData()
        this.view.addSubview(fooView);
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews();
        this.fooView.frame = this.view.bounds
    }

}

class SecondViewController extends ViewController {

    viewDidLoad() {
        const fooView = new CustomView("FOOView", RectMake(44, 44, 200, 88))
        fooView.userInteractionEnabled = true;
        fooView.onTap = () => {
            fooView.props = {
                on: !fooView.props.on
            }
        }
        this.view.addSubview(fooView)
        const redView = new View(RectMake(88, 44, 88, 88))
        redView.alpha = 0.5
        redView.userInteractionEnabled = true
        redView.backgroundColor = Color.redColor
        redView.onTap = () => {
            redView.alpha = 0.0
        }
        this.view.addSubview(redView)
    }

}

const application = new Application('app', new AppDelegate());
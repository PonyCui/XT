/// <reference path="../src/xt.d.ts" />

// declare const FOOPlugin: any

XT.CustomViewFactory.register("FOO", class _ extends XT.CustomViewFactory {

    requestInnerHTML() {
        return '<video src="http://www.sample-videos.com/video/mp4/360/big_buck_bunny_360p_1mb.mp4" style="width: 100%; height: 100%; display: block; background-color: black" playsinline></video>'
    }

    _props: any;

    requestProps() {
        return this._props || {
            play: false
        };
    }

    setProps(node: HTMLVideoElement, value) {
        this._props = value
        if (value.play === true) {
            node.play()
        }
        else if (value.play === false) {
            node.pause()
        }
    }

    handleMessage(node, message) {
        console.log(message)
    }

})

class AppDelegate extends XT.ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new XT.Window();
        this.window.rootViewController = new XT.NavigationController(new FirstViewController())
        this.window.makeKeyAndVisible();
    }

}

class FirstListCell extends XT.ListCell {

    owner?: FirstViewController
    myLabel: XT.Label = new XT.Label(XT.RectMake(0.0, 0.0, 300, 200))
    // myFoo: XT.CustomView = new XT.CustomView("FOOView", XT.RectMake(300, 0, 75, 44))

    init() {
        super.init();
        this.myLabel.lineBreakMode = XT.LineBreakMode.TruncatingTail
        this.myLabel.numberOfLines = 0
        this.myLabel.lineSpace = 10
        // this.myLabel.font = XT.Font.systemFontOfSize(24)
        // this.myLabel.letterSpace = 5
        // this.myLabel.textAlignment = XT.TextAlignment.Right

        // const redView = new XT.View(XT.RectMake(0, 0, 22, 22))
        // redView.backgroundColor = XT.Color.redColor
        // redView.alpha = Math.random()
        // this.contentView.addSubview(redView)
        this.contentView.addSubview(this.myLabel)
        // this.myFoo.userInteractionEnabled = true
        // this.myFoo.onTap = () => {
        //     this.myFoo.props = {
        //         on: !this.myFoo.props.on
        //     }
        // }
        // this.contentView.addSubview(this.myFoo)
        this.contentView.userInteractionEnabled = true
    }

    didSelected() {
        if (this.owner && this.owner.navigationController) {
            this.owner.navigationController.pushViewController(new SecondViewController())
        }
    }

}

class FirstItem implements XT.ListItem {

    [key: string]: any;
    reuseIdentifier: string = "Cell"
    rowHeight: (width: number) => number = () => {
        return 200
    }
    name: string = "Pony"

    constructor(name: string) {
        this.name = name;
    }

}

class FirstViewController extends XT.ViewController {

    title = "First"
    // private fooView: XT.ListView;

    viewDidLoad() {
        const fooView = new XT.CustomView("FOO", XT.RectMake(0, 0, 200, 200))
        fooView.onTap = () => {
            // fooView.emitMessage("123123")
            // fooView.props = { play: !fooView.props.play }
            // setTimeout(() => {
            //     XT.View.animationWithDuration(0.35, () => {
            //         fooView.frame = XT.RectMake(0, 0, 400, 400)
            //     })
            // }, 2000)
        }
        // fooView.backgroundColor = XT.Color.yellowColor
        this.view.addSubview(fooView);
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews();
        // this.fooView.frame = this.view.bounds
    }

}

class SecondViewController extends XT.ViewController {

    title = "Second"

    viewDidLoad() {
        // const fooView = new XT.CustomView("FOOView", XT.RectMake(44, 44, 200, 88))
        // fooView.userInteractionEnabled = true;
        // fooView.onTap = () => {
        //     fooView.props = {
        //         on: !fooView.props.on
        //     }
        // }
        // this.view.addSubview(fooView)
        const redView = new XT.View(XT.RectMake(88, 44, 88, 88))
        redView.alpha = 0.5
        redView.userInteractionEnabled = true
        redView.backgroundColor = XT.Color.redColor
        redView.onTap = () => {
            redView.alpha = 0.0
        }
        this.view.addSubview(redView)
    }

}

const application = new XT.Application('app', new AppDelegate());
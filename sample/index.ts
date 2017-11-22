/// <reference path="../src/xt.d.ts" />

// declare const FOOPlugin: any

// if (XT.CustomViewFactory) {
//     XT.CustomViewFactory.register("FOO", class _ extends XT.CustomViewFactory {

//             requestInnerHTML() {
//                 return '<video src="http://www.sample-videos.com/video/mp4/360/big_buck_bunny_360p_1mb.mp4" style="width: 100%; height: 100%; display: block; background-color: black" playsinline></video>'
//             }

//             _props: any;

//             requestProps() {
//                 return this._props || {
//                     play: false
//                 };
//             }

//             setProps(node: HTMLVideoElement, value) {
//                 this._props = value
//                 if (value.play === true) {
//                     node.play()
//                 }
//                 else if (value.play === false) {
//                     node.pause()
//                 }
//             }

//             handleMessage(node, message) {
//                 console.log(message)
//             }

//         })
// }

class AppDelegate extends XT.ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        // const view = new XT.View();
        // view.backgroundColor = XT.Color.redColor
        this.window = new XT.Window();
        this.window.rootViewController = new XT.NavigationController(new FirstViewController())
        this.window.makeKeyAndVisible();
        // setTimeout(() => {
        //     XT.Application.sharedApplication().exit();
        // })
    }

}

class FirstViewController extends XT.ViewController {

    title = "First"

    viewDidLoad() {
        const view = new XT.ImageView(XT.RectMake(44, 44, 78, 78))
        XT.Image.fromAssets("success", (it) => {
            view.image = it
        })
        view.backgroundColor = XT.Color.yellowColor
        this.view.addSubview(view)
    }

}

class SecondViewController extends XT.ViewController {

    title = "Second"
    sm = new XT.View().addOwner(this)

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
        // redView.alpha = 0.5
        // redView.userInteractionEnabled = true
        redView.backgroundColor = XT.Color.redColor
        // redView.onTap = () => {
        //     redView.alpha = 0.0
        // }
        this.view.addSubview(redView)
    }

}

const application = new XT.Application('app', new AppDelegate());

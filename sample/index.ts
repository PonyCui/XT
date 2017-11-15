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
        this.window = new XT.Window();
        this.window.rootViewController = new XT.NavigationController(new FirstViewController())
        this.window.makeKeyAndVisible();
    }

}

class FirstViewController extends XT.ViewController {

    // title = "First"
    // private fooView: XT.ListView;

    viewDidLoad() {

        const bounds = XT.TextMeasurer.measureText("Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!", {
            inRect: {x:0, y: 0, width: 200, height: 200},
            font: XT.Font.systemFontOfSize(17),
            // numberOfLines: 0,
        })
        console.log(JSON.stringify(bounds));

        // const fooView = new XT.CustomView("FOO", XT.RectMake(0, 0, 200, 200))
        // fooView.onTap = () => {
        //     // fooView.emitMessage("123123")
        //     // fooView.props = { play: !fooView.props.play }
        //     // setTimeout(() => {
        //     //     XT.View.animationWithDuration(0.35, () => {
        //     //         fooView.frame = XT.RectMake(0, 0, 400, 400)
        //     //     })
        //     // }, 2000)
        // }
        // // fooView.backgroundColor = XT.Color.yellowColor
        // this.view.addSubview(fooView);
    }

    // viewWillLayoutSubviews() {
    //     super.viewWillLayoutSubviews();
    //     // this.fooView.frame = this.view.bounds
    // }

}

// class SecondViewController extends XT.ViewController {

//     title = "Second"

//     viewDidLoad() {
//         // const fooView = new XT.CustomView("FOOView", XT.RectMake(44, 44, 200, 88))
//         // fooView.userInteractionEnabled = true;
//         // fooView.onTap = () => {
//         //     fooView.props = {
//         //         on: !fooView.props.on
//         //     }
//         // }
//         // this.view.addSubview(fooView)
//         const redView = new XT.View(XT.RectMake(88, 44, 88, 88))
//         redView.alpha = 0.5
//         redView.userInteractionEnabled = true
//         redView.backgroundColor = XT.Color.redColor
//         redView.onTap = () => {
//             redView.alpha = 0.0
//         }
//         this.view.addSubview(redView)
//     }

// }

const application = new XT.Application('app', new AppDelegate());
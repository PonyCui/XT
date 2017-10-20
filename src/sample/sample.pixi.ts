import { View, Application, Window, Screen, Color, ViewController, RectMake, NavigationController, CanvasView, CustomView, Device, TransformMatrix } from '../main.pixi'
import * as PIXI from 'pixi.js'

const application = new Application("app", {
    applicationDidFinishLaunchingWithOptions: () => {
        const window = new Window(Screen.mainScreen().bounds())
        window.rootViewController = new NavigationController(new FirstViewController());
        window.makeKeyAndVisible()
    }
})

if (CustomView.registerClass) {

    class FOOView {

        innerView = new PIXI.Graphics()

        init() {
            this.innerView.beginFill(0xff3300);
            this.innerView.drawCircle(44, 44, 44);
            this.innerView.endFill();
        }

        handleMessage(message: any, sender: CustomView) {
            if (message instanceof Object) {
                if (message.on === true) {
                    this.innerView.clear()
                    this.innerView.beginFill(0xff00ff);
                    this.innerView.drawCircle(44, 44, 44);
                    this.innerView.endFill();
                    sender.setNeedsDisplay()
                }
                else {
                    this.innerView.clear()
                    this.innerView.beginFill(0xff3300);
                    this.innerView.drawCircle(44, 44, 44);
                    this.innerView.endFill();
                    sender.setNeedsDisplay()
                }
                return "Hello, World!";
            }
        }

    }

    (CustomView as any).registerClass((owner: CustomView) => {
        const obj = new FOOView();
        obj.init();
        return obj;
    }, "FOOView")

}

class FirstViewController extends ViewController {

    viewDidLoad() {
        // this.supportOrientations = [DeviceOrientation.Portrait, DeviceOrientation.LandscapeLeft, DeviceOrientation.LandscapeRight]
        const redView = new View(RectMake(88, 88, 44, 44))
        redView.backgroundColor = Color.redColor
        const yellowView = new View(RectMake(0,0,22,22))
        yellowView.backgroundColor = Color.yellowColor
        redView.addSubview(yellowView)
        this.view.addSubview(redView)
        setTimeout(() => {
            View.animationWithDuration(0.25, () => {
                // redView.transform = TransformMatrix.scale(redView.transform, 2.0, 2.0)
                redView.transform = TransformMatrix.postRotate(redView.transform, 45 * Math.PI / 180)
            })
        }, 2000)
        redView.userInteractionEnabled = true
        redView.onTap = () => {
            redView.backgroundColor = Color.yellowColor
        }
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
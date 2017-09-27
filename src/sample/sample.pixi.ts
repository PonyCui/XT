import { View, Application, Window, Screen, Color, ViewController, RectMake, NavigationController, CanvasView, CustomView } from '../main.pixi'
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
        const aView = new CustomView("FOOView", RectMake(44, 44, 44, 44))
        aView.backgroundColor = Color.yellowColor
        this.view.addSubview(aView);
        setTimeout(() => {
            aView.emitMessage({on: true})
        }, 2000)
        setTimeout(() => {
            aView.emitMessage({on: false})
        }, 4000)
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
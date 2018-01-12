/// <reference path="../src/xt.d.ts" />
// import { List } from "./explorer/list";

class SecondViewController extends XT.ViewController {

    viewDidLoad() {
        super.viewDidLoad()
        {
            const redView = new XT.View()
            redView.frame = XT.RectMake(44, 44, 44, 44)
            redView.backgroundColor = XT.Color.redColor
            redView.onTap = () => {
                if (this.navigationController) {
                    this.navigationController.pushViewController(new SecondViewController())
                }
            }
            this.view.addSubview(redView)
        }
        {
            const redView = new XT.View()
            redView.frame = XT.RectMake(100, 100, 44, 44)
            redView.backgroundColor = XT.Color.grayColor
            redView.onTap = () => {
                if (this.navigationController) {
                    this.navigationController.popViewController(false)
                }
            }
            this.view.addSubview(redView)
        }
        {
            const redView = new XT.View()
            redView.frame = XT.RectMake(200, 200, 44, 44)
            redView.backgroundColor = XT.Color.greenColor
            redView.onTap = () => {
                if (this.navigationController) {
                    this.navigationController.popToViewController(this.navigationController.childViewControllers[0], false)
                }
            }
            this.view.addSubview(redView)
        }

        {
            const redView = new XT.View()
            redView.frame = XT.RectMake(300, 300, 44, 44)
            redView.backgroundColor = XT.Color.greenColor
            redView.onTap = () => {
                if (this.navigationController) {
                    this.navigationController.popToRootViewController(true)
                }
            }
            this.view.addSubview(redView)
        }
    }

}

class TestViewController extends XT.ViewController {

    viewDidLoad() {
        super.viewDidLoad()
        this.view.backgroundColor = XT.Color.whiteColor
        const redView = new XT.View()
        redView.frame = XT.RectMake(44, 44, 44, 44)
        redView.backgroundColor = XT.Color.redColor
        redView.onTap = () => {
            // XT.View.animationWithBouncinessAndSpeed(16, 16, () => {
            //     redView.frame = XT.RectMake(44, 44, 88, 88)
            // })
            if (this.navigationController) {
                this.navigationController.pushViewController(new SecondViewController())
            }
        }
        this.view.addSubview(redView)
    }

}

class AppDelegate extends XT.ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new XT.Window();
        this.window.backgroundColor = XT.Color.grayColor
        // this.window.rootViewController = new XT.NavigationController(new List())
        this.window.rootViewController = new XT.NavigationController(new TestViewController())
        this.window.makeKeyAndVisible();
    }

}
const sampleApplication = new XT.Application('app', new AppDelegate());
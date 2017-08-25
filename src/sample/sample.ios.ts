import { View, Application, ApplicationDelegate, Window, Screen, Color, ViewController, RectMake, NavigationController } from '../main.ios'

class AppDelegate extends ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new Window();
        this.window.backgroundColor = new Color(1, 1, 0)
        this.window.rootViewController = new FirstViewController();
        this.window.makeKeyAndVisible();
    }

}

const application = new Application('app', new AppDelegate());

class FirstViewController extends ViewController {

    viewDidLoad() {
        this.view.backgroundColor = new Color(1.0, 1.0, 0.0)
        console.log(this.view);
        this.view.onTap = () => {
            this.view.backgroundColor = new Color(1.0, 1.0, 1.0)
            // this.navigationController && this.navigationController.pushViewController(new SecondViewController())
        }
    }

}

// class SecondViewController extends ViewController {

//     viewDidLoad() {
//         this.view.backgroundColor = new Color(0.1, 0.1, 0.1)
//         this.view.onTap = () => {
//             this.navigationController && this.navigationController.popToRootViewController();
//         }
//     }

//     viewDidAppear() {
//         this.view.backgroundColor = new Color(0.5, 0.5, 0.5)
//     }

// }
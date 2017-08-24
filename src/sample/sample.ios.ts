import { View, Application, Window, Screen, Color, ViewController, RectMake, NavigationController } from '../main.ios'

const application = new Application('app', {
    applicationDidFinishLaunchingWithOptions: () => {
        const view = new View({ x: 0, y: 0, width: 20, height: 20 });
        view.alpha = 0.5;
        const view2 = new View({ x: 0, y: 0, width: 10, height: 10 });
        view.addSubview(view2);
        console.log(view.subviews);
        // console.log(view.frame);
        // view.alpha = 0.5;
        // console.log("Launched.")
        // const window = new Window(Screen.mainScreen().bounds())
        // window.backgroundColor = new Color(1, 1, 0)
        // // window.rootViewController = new NavigationController(new FirstViewController());
        // window.makeKeyAndVisible()
    }
})

// class FirstViewController extends ViewController {

//     viewDidLoad() {
//         this.view.backgroundColor = new Color(1, 1, 0)
//         this.view.onTap = () => {
//             this.navigationController && this.navigationController.pushViewController(new SecondViewController())
//         }
//     }

// }

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
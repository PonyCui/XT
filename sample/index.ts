/// <reference path="../src/xt.d.ts" />

// declare const FOOPlugin: any

class AppDelegate extends XT.ApplicationDelegate {

    applicationDidFinishLaunchingWithOptions() {
        this.window = new XT.Window();
        this.window.rootViewController = new XT.NavigationController(new TestViewController())
        this.window.makeKeyAndVisible();
    }

}

// class FirstListCell extends XT.ListCell {

//     owner?: FirstViewController
//     myLabel: XT.Label = new XT.Label(XT.RectMake(0.0, 0.0, XT.Screen.mainScreen().bounds().width, 44))
//     myFoo: XT.CustomView = new XT.CustomView("FOOView", XT.RectMake(300, 0, 75, 44))

//     init() {
//         super.init();
//         this.contentView.addSubview(this.myLabel)
//         this.myFoo.userInteractionEnabled = true
//         this.myFoo.onTap = () => {
//             this.myFoo.props = {
//                 on: !this.myFoo.props.on
//             }
//         }
//         this.contentView.addSubview(this.myFoo)
//         this.contentView.userInteractionEnabled = true
//     }

//     didSelected() {
//         if (this.owner && this.owner.navigationController) {
//             this.owner.navigationController.pushViewController(new SecondViewController())
//         }
//     }

// }

// class FirstItem implements XT.ListItem {

//     [key: string]: any;
//     reuseIdentifier: string = "Cell"
//     rowHeight: (width: number) => number = () => {
//         return 44
//     }
//     name: string = "Pony"

//     constructor(name: string) {
//         this.name = name;
//     }

// }

class TestViewController extends XT.ViewController {

    title = "Test"

    viewDidLoad() {
        super.viewDidLoad();
        const textField = new XT.TextField(XT.RectMake(44, 44, 200, 44))
        textField.font = XT.Font.systemFontOfSize(17);
        textField.textAlignment = XT.TextAlignment.Left
        textField.placeholder = "请输入用户名"
        textField.keyboardType = XT.KeyboardType.NumbersAndPunctuation
        // textField.clearButtonMode = XT.TextFieldViewMode.WhileEditing
        // const leftView = new XT.View(XT.RectMake(0, 0, 44, 44))
        // leftView.backgroundColor = new XT.Color(1.0, 0.0, 1.0, 0.5)
        // textField.leftView = leftView
        // textField.leftViewMode = XT.TextFieldViewMode.WhileEditing

        // const rightView = new XT.View(XT.RectMake(0, 0, 44, 22))
        // rightView.backgroundColor = XT.Color.redColor
        // textField.rightView = rightView
        // textField.rightViewMode = XT.TextFieldViewMode.WhileEditing

        // textField.secureTextEntry = true;
        // textField.textAlignment = XT.TextAlignment.Center
        // textField.text = "123123fgdskjfgalskhdflahdsfklajhkjdsafh"
        // setTimeout(() => {
        //     textField.font = XT.Font.boldSystemFontOfSize(24);
        //     // console.log(typeof textField.text)
        // }, 4000)
        // textField.textColor = XT.Color.redColor
        // textField.onTap = () => {
        //     console.log(textField.text)
        //     alert("123")
        // }
        // textField.transform = XT.TransformMatrix.postRotate(new XT.TransformMatrix(), 90.0 * Math.PI / 180.0)
        textField.backgroundColor = XT.Color.yellowColor
        this.view.addSubview(textField);
        this.view.onTap = () => {
            textField.blur()
        }

        // const redView = new XT.View(XT.RectMake(44, 44, 44, 44))
        // redView.backgroundColor = XT.Color.redColor
        // redView.userInteractionEnabled = true
        // redView.onTap = () => {
        //     this.navigationController && this.navigationController.pushViewController(new Test2ViewController(), true)
        //     // XT.View.animationWithBouncinessAndSpeed(20, 1.0, () => {
        //     //     redView.frame = XT.RectMake(44, 44, redView.frame.width * 2, redView.frame.height * 2)
        //     // })
        // }
        // this.view.addSubview(redView)
    }

}

class Test2ViewController extends XT.ViewController {

    title = "Test2"

    viewDidLoad() {
        super.viewDidLoad();
        this.view.backgroundColor = XT.Color.grayColor
        this.view.onTap = () => {
            this.navigationController && this.navigationController.popToRootViewController();
        }
    }

}

// class FirstViewController extends XT.ViewController {

//     private fooView: XT.ListView;

//     viewDidLoad() {
//         const fooView = new XT.ListView(XT.RectMake(0.0, 0.0, 0.0, 0.0))
//         this.fooView = fooView
//         fooView.register(FirstListCell, "Cell")
//         fooView.renderItem = (cell: FirstListCell, item: FirstItem) => {
//             cell.owner = this
//             cell.myLabel.text = item.name
//         }
//         let items = []
//         for (var index = 0; index < 100; index++) {
//             items.push(new FirstItem("Index >>> " + index))
//         }
//         fooView.items = items
//         fooView.reloadData()
//         this.view.addSubview(fooView);
//     }

//     viewWillLayoutSubviews() {
//         super.viewWillLayoutSubviews();
//         this.fooView.frame = this.view.bounds
//     }

// }

// class SecondViewController extends XT.ViewController {

//     viewDidLoad() {
//         const fooView = new XT.CustomView("FOOView", XT.RectMake(44, 44, 200, 88))
//         fooView.userInteractionEnabled = true;
//         fooView.onTap = () => {
//             fooView.props = {
//                 on: !fooView.props.on
//             }
//         }
//         this.view.addSubview(fooView)
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
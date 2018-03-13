/// <reference path="../../xt.d.ts" />

class FooView extends UI.ExtView {

    static className = "FooView"
    fooColor: string = this.defineProperty("fooColor", "gray")

}


export class ExtViewSample extends UI.ViewController {

    contentView = new UI.View()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "ExtView"
        this.showNavigationBar()
        this.view.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.view.addSubview(this.contentView)
        this.addTestCases()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.contentView.frame = this.view.bounds
    }

    addTestCases() {
        this.addFooView()
    }

    addFooView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "FooView created by Native. \nTap to change color."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new FooView()
        view.frame = UI.RectMake(0, 60, 88, 88)
        view.onTap = () => {
            view.fooColor = view.fooColor == "gray" ? "green" : "gray"
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
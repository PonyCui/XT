/// <reference path="../../src/xt.d.ts" />

class FooView extends UI.View {

    leftView = new UI.View()
    middleView = new UI.View()
    rightView = new UI.View()

    constructor() {
        super()
        this.leftView.backgroundColor = UI.Color.greenColor
        this.middleView.backgroundColor = UI.Color.yellowColor
        this.rightView.backgroundColor = UI.Color.grayColor
        this.addSubview(this.leftView)
        this.addSubview(this.middleView)
        this.addSubview(this.rightView)
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.leftView.frame = UI.RectMake(0, 0, this.bounds.width / 3.0, this.bounds.height)
        this.middleView.frame = UI.RectMake(this.bounds.width / 3.0, 0, this.bounds.width / 3.0, this.bounds.height)
        this.rightView.frame = UI.RectMake(this.bounds.width / 3.0 * 2.0, 0, this.bounds.width / 3.0, this.bounds.height)
    }

}

export class FrameLayoutSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "FrameLayout"
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
        summary.text = "Use layoutSubviews layout mannally. \nChange subviews frame by yourself."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new FooView()
        view.frame = UI.RectMake(0, 66, 300, 100)
        view.backgroundColor = UI.Color.whiteColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
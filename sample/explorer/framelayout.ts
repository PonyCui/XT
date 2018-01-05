/// <reference path="../../src/xt.d.ts" />

class FooView extends XT.View {

    leftView = new XT.View()
    middleView = new XT.View()
    rightView = new XT.View()

    constructor() {
        super()
        this.leftView.backgroundColor = XT.Color.greenColor
        this.middleView.backgroundColor = XT.Color.yellowColor
        this.rightView.backgroundColor = XT.Color.grayColor
        this.addSubview(this.leftView)
        this.addSubview(this.middleView)
        this.addSubview(this.rightView)
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.leftView.frame = XT.RectMake(0, 0, this.bounds.width / 3.0, this.bounds.height)
        this.middleView.frame = XT.RectMake(this.bounds.width / 3.0, 0, this.bounds.width / 3.0, this.bounds.height)
        this.rightView.frame = XT.RectMake(this.bounds.width / 3.0 * 2.0, 0, this.bounds.width / 3.0, this.bounds.height)
    }

}

export class FrameLayoutSample extends XT.ViewController {

    contentView = new XT.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.navigationBar.title = "FrameLayout"
        this.showNavigationBar()
        this.view.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
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
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 0, 999, 120)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Use layoutSubviews layout mannally. \nChange subviews frame by yourself."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new FooView()
        view.frame = XT.RectMake(0, 66, 300, 100)
        view.backgroundColor = XT.Color.whiteColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
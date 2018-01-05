/// <reference path="../../src/xt.d.ts" />

class FooView extends XT.View {

    barView = new XT.View()

    constructor() {
        super()
        this.barView.backgroundColor = XT.Color.greenColor
        this.addSubview(this.barView)
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("H:|-0-[barView]-0-|", { barView: this.barView }))
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[barView]-0-|", { barView: this.barView }))
    }

}

export class AutoLayoutSample extends XT.ViewController {

    contentView = new XT.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.navigationBar.title = "AutoLayout"
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
        summary.text = "subview equals to superview"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new FooView()
        view.frame = XT.RectMake(0, 66, 300, 100)
        view.backgroundColor = XT.Color.yellowColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
/// <reference path="../../src/xt.d.ts" />

class FullView extends UI.View {

    barView = new UI.View()

    constructor() {
        super()
        this.barView.backgroundColor = UI.Color.greenColor
        this.addSubview(this.barView)
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("HV:|[barView]|", { barView: this.barView }))
        this.layoutIfNeeded()
    }

}

class StackView extends UI.View {

    fooView = new UI.View()
    barView = new UI.View()
    lastView = new UI.View()

    constructor() {
        super()
        this.fooView.backgroundColor = UI.Color.yellowColor
        this.barView.backgroundColor = UI.Color.greenColor
        this.lastView.backgroundColor = UI.Color.grayColor
        this.addSubview(this.fooView)
        this.addSubview(this.barView)
        this.addSubview(this.lastView)
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("H:|[fooView(barView,lastView)]-[barView]-[lastView]|", this))
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("V:|[fooView,barView,lastView]|", this))
        this.layoutIfNeeded()
    }

}

class ColumnView extends UI.View {

    fooView = new UI.View()
    barView = new UI.View()
    lastView = new UI.View()

    constructor() {
        super()
        this.fooView.backgroundColor = UI.Color.yellowColor
        this.barView.backgroundColor = UI.Color.greenColor
        this.lastView.backgroundColor = UI.Color.grayColor
        this.addSubview(this.fooView)
        this.addSubview(this.barView)
        this.addSubview(this.lastView)
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("H:|[column:[fooView(44)][barView][lastView(==20%)]]|", this))
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("V:|[fooView,barView,lastView]|", this))
        this.layoutIfNeeded()
    }

}

class CenterView extends UI.View {

    fooView = new UI.View()

    constructor() {
        super()
        this.backgroundColor = UI.Color.yellowColor
        this.fooView.backgroundColor = UI.Color.greenColor
        this.addSubview(this.fooView)
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("H:[fooView(100)]", this))
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("V:[fooView(50)]", this))
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("C:fooView.centerX(_)", this))
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("C:fooView.centerY(_)", this))
        this.layoutIfNeeded()
    }

}

export class AutoLayoutSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "AutoLayout"
        this.showNavigationBar()
        this.view.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.view.addSubview(this.contentView)
        this.contentView.alwaysBounceVertical = true
        this.addTestCases()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.contentView.frame = this.view.bounds
    }

    addTestCases() {
        this.addFullView()
        this.addStackView()
        this.addColumnView()
        this.addCenterView()
        this.contentView.contentSize = UI.SizeMake(0, 720)
    }

    addFullView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 180)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "subview equals width & height to parent"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new FullView()
        view.frame = UI.RectMake(0, 44, 300, 100)
        view.backgroundColor = UI.Color.whiteColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addStackView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 180, 999, 180)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View stacks"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new StackView()
        view.frame = UI.RectMake(0, 44, 300, 100)
        view.backgroundColor = UI.Color.whiteColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addColumnView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 360, 999, 180)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View columns"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new ColumnView()
        view.frame = UI.RectMake(0, 44, 300, 100)
        view.backgroundColor = UI.Color.whiteColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addCenterView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 540, 999, 180)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Align View on Center"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new CenterView()
        view.frame = UI.RectMake(0, 44, 300, 100)
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
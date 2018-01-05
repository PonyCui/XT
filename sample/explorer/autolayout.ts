/// <reference path="../../src/xt.d.ts" />

class FullView extends XT.View {

    barView = new XT.View()

    constructor() {
        super()
        this.barView.backgroundColor = XT.Color.greenColor
        this.addSubview(this.barView)
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("HV:|[barView]|", { barView: this.barView }))
        this.layoutIfNeeded()
    }

}

class StackView extends XT.View {

    fooView = new XT.View()
    barView = new XT.View()
    lastView = new XT.View()

    constructor() {
        super()
        this.fooView.backgroundColor = XT.Color.yellowColor
        this.barView.backgroundColor = XT.Color.greenColor
        this.lastView.backgroundColor = XT.Color.grayColor
        this.addSubview(this.fooView)
        this.addSubview(this.barView)
        this.addSubview(this.lastView)
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("H:|[fooView(barView,lastView)]-[barView]-[lastView]|", this))
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|[fooView,barView,lastView]|", this))
        this.layoutIfNeeded()
    }

}

class ColumnView extends XT.View {

    fooView = new XT.View()
    barView = new XT.View()
    lastView = new XT.View()

    constructor() {
        super()
        this.fooView.backgroundColor = XT.Color.yellowColor
        this.barView.backgroundColor = XT.Color.greenColor
        this.lastView.backgroundColor = XT.Color.grayColor
        this.addSubview(this.fooView)
        this.addSubview(this.barView)
        this.addSubview(this.lastView)
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("H:|[column:[fooView(44)][barView][lastView(==20%)]]|", this))
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|[fooView,barView,lastView]|", this))
        this.layoutIfNeeded()
    }

}

class CenterView extends XT.View {

    fooView = new XT.View()

    constructor() {
        super()
        this.backgroundColor = XT.Color.yellowColor
        this.fooView.backgroundColor = XT.Color.greenColor
        this.addSubview(this.fooView)
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("H:[fooView(100)]", this))
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:[fooView(50)]", this))
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("C:fooView.centerX(_)", this))
        this.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("C:fooView.centerY(_)", this))
        this.layoutIfNeeded()
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
        this.contentView.contentSize = XT.SizeMake(0, 720)
    }

    addFullView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 0, 999, 180)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "subview equals width & height to parent"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new FullView()
        view.frame = XT.RectMake(0, 44, 300, 100)
        view.backgroundColor = XT.Color.whiteColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addStackView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 180, 999, 180)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View stacks"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new StackView()
        view.frame = XT.RectMake(0, 44, 300, 100)
        view.backgroundColor = XT.Color.whiteColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addColumnView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 360, 999, 180)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View columns"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new ColumnView()
        view.frame = XT.RectMake(0, 44, 300, 100)
        view.backgroundColor = XT.Color.whiteColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addCenterView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 540, 999, 180)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Align View on Center"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new CenterView()
        view.frame = XT.RectMake(0, 44, 300, 100)
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
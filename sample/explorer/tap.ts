/// <reference path="../../src/xt.d.ts" />

export class TapSample extends XT.ViewController {

    contentView = new XT.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.navigationBar.title = "Tap & Double Tap"
        this.showNavigationBar()
        this.view.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.contentView.alwaysBounceVertical = true
        this.view.addSubview(this.contentView)
        this.addTestCases()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.contentView.frame = this.view.bounds
    }

    addTestCases() {
        this.addTapView()
        this.addDoubleTapView()
        this.addBothTapView()
        this.contentView.contentSize = XT.SizeMake(0, 480)
    }

    addTapView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 0, 999, 160)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View - Single Tap \nTry to tap it."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.View()
        view.frame = XT.RectMake(0, 66, 66, 66)
        view.backgroundColor = XT.Color.grayColor
        view.userInteractionEnabled = true
        view.onTap = () => {
            view.backgroundColor = XT.Color.greenColor
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addDoubleTapView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 160, 999, 160)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View - Double Tap \nTry to tap it."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.View()
        view.frame = XT.RectMake(0, 66, 66, 66)
        view.backgroundColor = XT.Color.grayColor
        view.userInteractionEnabled = true
        view.onDoubleTap = () => {
            view.backgroundColor = XT.Color.greenColor
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addBothTapView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 320, 999, 160)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View - Single Tap & Double Tap \nTry to tap it."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.View()
        view.frame = XT.RectMake(0, 66, 66, 66)
        view.backgroundColor = XT.Color.grayColor
        view.userInteractionEnabled = true
        view.onTap = () => {
            view.backgroundColor = XT.Color.redColor
        }
        view.onDoubleTap = () => {
            view.backgroundColor = XT.Color.greenColor
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
/// <reference path="../../xt.d.ts" />
declare var XTRDebug: any

export class TapSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "Tap & Double Tap"
        this.showNavigationBar()
        this.view.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
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
        this.contentView.contentSize = UI.SizeMake(0, 480)
    }

    addTapView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 160)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View - Single Tap \nTry to tap it."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 66, 66, 66)
        view.backgroundColor = UI.Color.grayColor
        view.userInteractionEnabled = true
        view.onTap = () => {
            console.log("on tap");
            view.backgroundColor = UI.Color.greenColor
            view.backgroundColor = UI.Color.yellowColor
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addDoubleTapView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 160, 999, 160)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View - Double Tap \nTry to tap it."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 66, 66, 66)
        view.backgroundColor = UI.Color.grayColor
        view.userInteractionEnabled = true
        view.onDoubleTap = () => {
            view.backgroundColor = UI.Color.greenColor
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addBothTapView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 320, 999, 160)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View - Single Tap & Double Tap \nTry to tap it."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 66, 66, 66)
        view.backgroundColor = UI.Color.grayColor
        view.userInteractionEnabled = true
        view.onTap = () => {
            view.backgroundColor = UI.Color.redColor
        }
        view.onDoubleTap = () => {
            view.backgroundColor = UI.Color.greenColor
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
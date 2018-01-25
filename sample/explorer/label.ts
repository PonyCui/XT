/// <reference path="../../src/xt.d.ts" />

export class LabelSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "Label"
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
        this.addRegularLabel()
        this.addTruncatingTailLabel()
        this.addMultipleLineLabel()
        this.contentView.contentSize = UI.SizeMake(0, 480)
    }

    addRegularLabel() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Regular Label \nframe = {0, 66, 200, 44} \nbackgroundColor = whiteColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.Label()
        view.frame = UI.RectMake(0, 66, 200, 44)
        view.backgroundColor = UI.Color.whiteColor
        view.numberOfLines = 1
        view.textAlignment = UI.TextAlignment.Center
        view.font = UI.Font.systemFontOfSize(14)
        view.text = "Hello, World!"
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addTruncatingTailLabel() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 120, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "TruncatingTail Label \nframe = {0, 66, 66, 44} \nbackgroundColor = whiteColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.Label()
        view.frame = UI.RectMake(0, 66, 66, 44)
        view.backgroundColor = UI.Color.whiteColor
        view.numberOfLines = 1
        view.font = UI.Font.systemFontOfSize(14)
        view.text = "Hello, World!"
        view.lineBreakMode = UI.LineBreakMode.TruncatingTail
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addMultipleLineLabel() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 240, 999, 240)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "MultipleLine Label \nframe = {0, 66, 200, 120} \nlineSpace = 2"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.Label()
        view.frame = UI.RectMake(0, 66, 200, 120)
        view.backgroundColor = UI.Color.whiteColor
        view.numberOfLines = 0
        view.font = UI.Font.systemFontOfSize(14)
        view.lineSpace = 2
        view.text = "We’re supporting a community where more than 26 million people learn, share, and work together to build software."
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
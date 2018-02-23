/// <reference path="../../xt.d.ts" />

export class CanvasSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = UI.Color.blackColor
        this.navigationBar.lightContent = true
        this.title = "Canvas"
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
        this.addFillStyleTest()
        this.addStrokeStyleTest()
        this.contentView.contentSize = UI.SizeMake(0, 800)
    }

    addFillStyleTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "fillStyle & fillRect Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 200, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.fillStyle = UI.Color.blueColor;
        view.fillRect(20, 20, 150, 100);
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addStrokeStyleTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "strokeStyle & strokeRect Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 200, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.strokeStyle = UI.Color.blueColor;
        view.strokeRect(20, 20, 150, 100);
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
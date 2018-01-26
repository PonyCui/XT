/// <reference path="../../xt.d.ts" />

export class ScrollViewSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "ScrollView"
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
        this.addRegularView()
        this.addHorizonalScrollView()
        this.contentView.contentSize = UI.SizeMake(0, 540)
    }

    addRegularView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 260)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Regular ScrollView (Drag it!) \ncontentSize = {0, 600} \nbackgroundColor = yellowColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.ScrollView()
        view.frame = UI.RectMake(0, 66, 200, 200)
        view.contentSize = UI.SizeMake(0, 600)
        view.backgroundColor = UI.Color.yellowColor
        {
            const childView = new UI.View()
            childView.frame = UI.RectMake(0, 0, 200, 200)
            childView.backgroundColor = UI.Color.grayColor
            view.addSubview(childView)
        }
        {
            const childView = new UI.View()
            childView.frame = UI.RectMake(0, 200, 200, 200)
            childView.backgroundColor = UI.Color.redColor
            view.addSubview(childView)
        }
        {
            const childView = new UI.View()
            childView.frame = UI.RectMake(0, 400, 200, 200)
            childView.backgroundColor = UI.Color.greenColor
            view.addSubview(childView)
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addHorizonalScrollView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280, 999, 260)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Horizonal ScrollView (Drag it!) \ncontentSize = {600, 0}, pagingEnabled = true \nbackgroundColor = yellowColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.ScrollView()
        view.frame = UI.RectMake(0, 66, 200, 200)
        view.contentSize = UI.SizeMake(600, 0)
        view.bounces = false
        view.isPagingEnabled = true
        view.showsHorizontalScrollIndicator = false
        view.backgroundColor = UI.Color.yellowColor
        {
            const childView = new UI.View()
            childView.frame = UI.RectMake(0, 0, 200, 200)
            childView.backgroundColor = UI.Color.grayColor
            view.addSubview(childView)
        }
        {
            const childView = new UI.View()
            childView.frame = UI.RectMake(200, 0, 200, 200)
            childView.backgroundColor = UI.Color.redColor
            view.addSubview(childView)
        }
        {
            const childView = new UI.View()
            childView.frame = UI.RectMake(400, 0, 200, 200)
            childView.backgroundColor = UI.Color.greenColor
            view.addSubview(childView)
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
/// <reference path="../../src/xt.d.ts" />

export class ScrollViewSample extends XT.ViewController {

    contentView = new XT.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "ScrollView"
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
        this.addRegularView()
        this.addHorizonalScrollView()
        this.contentView.contentSize = XT.SizeMake(0, 540)
    }

    addRegularView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 0, 999, 260)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Regular ScrollView (Drag it!) \ncontentSize = {0, 600} \nbackgroundColor = yellowColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.ScrollView()
        view.frame = XT.RectMake(0, 66, 200, 200)
        view.contentSize = XT.SizeMake(0, 600)
        view.backgroundColor = XT.Color.yellowColor
        {
            const childView = new XT.View()
            childView.frame = XT.RectMake(0, 0, 200, 200)
            childView.backgroundColor = XT.Color.grayColor
            view.addSubview(childView)
        }
        {
            const childView = new XT.View()
            childView.frame = XT.RectMake(0, 200, 200, 200)
            childView.backgroundColor = XT.Color.redColor
            view.addSubview(childView)
        }
        {
            const childView = new XT.View()
            childView.frame = XT.RectMake(0, 400, 200, 200)
            childView.backgroundColor = XT.Color.greenColor
            view.addSubview(childView)
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addHorizonalScrollView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 280, 999, 260)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Horizonal ScrollView (Drag it!) \ncontentSize = {600, 0}, pagingEnabled = true \nbackgroundColor = yellowColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.ScrollView()
        view.frame = XT.RectMake(0, 66, 200, 200)
        view.contentSize = XT.SizeMake(600, 0)
        view.bounces = false
        view.isPagingEnabled = true
        view.showsHorizontalScrollIndicator = false
        view.backgroundColor = XT.Color.yellowColor
        {
            const childView = new XT.View()
            childView.frame = XT.RectMake(0, 0, 200, 200)
            childView.backgroundColor = XT.Color.grayColor
            view.addSubview(childView)
        }
        {
            const childView = new XT.View()
            childView.frame = XT.RectMake(200, 0, 200, 200)
            childView.backgroundColor = XT.Color.redColor
            view.addSubview(childView)
        }
        {
            const childView = new XT.View()
            childView.frame = XT.RectMake(400, 0, 200, 200)
            childView.backgroundColor = XT.Color.greenColor
            view.addSubview(childView)
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
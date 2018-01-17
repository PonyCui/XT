/// <reference path="../../src/xt.d.ts" />

export class ViewSample extends XT.ViewController {

    contentView = new XT.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "View"
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
        this.addRegularView()
        this.addRoundView()
        this.addHierarchyView()
        this.addHierarchyViewWithClips()
        this.addBorderView()
        this.contentView.contentSize = XT.SizeMake(0, 800)
    }

    addRegularView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 0, 999, 120)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Regular View \nframe = {0, 66, 44, 44} \nbackgroundColor = grayColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.View()
        view.frame = XT.RectMake(0, 66, 44, 44)
        view.backgroundColor = XT.Color.grayColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addRoundView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 120, 999, 120)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Round View \nframe = {0, 66, 44, 44}, cornerRadius = 22 \nbackgroundColor = redColor, alpha = 0.5"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.View()
        view.frame = XT.RectMake(0, 66, 44, 44)
        view.cornerRadius = 22
        view.alpha = 0.5
        view.backgroundColor = XT.Color.redColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addHierarchyView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 240, 999, 120)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 56)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Hierarchy View With Clips - 层级 \nclipsToBounds = false \nview(red).frame = {0, 78, 44, 44} \nview(green).frame = {22, 22, 44, 44}"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.View()
        view.frame = XT.RectMake(0, 78, 44, 44)
        view.clipsToBounds = false
        view.backgroundColor = XT.Color.redColor
        const childView = new XT.View()
        childView.frame = XT.RectMake(22, 22, 44, 44)
        childView.backgroundColor = XT.Color.greenColor
        view.addSubview(childView)
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addHierarchyViewWithClips() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 400, 999, 120)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 56)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Hierarchy View - 层级 \nclipsToBounds = true \nview(red).frame = {0, 78, 44, 44} \nview(green).frame = {22, 22, 44, 44}"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.View()
        view.frame = XT.RectMake(0, 78, 44, 44)
        view.clipsToBounds = true
        view.backgroundColor = XT.Color.redColor
        const childView = new XT.View()
        childView.frame = XT.RectMake(22, 22, 44, 44)
        childView.backgroundColor = XT.Color.greenColor
        view.addSubview(childView)
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addBorderView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 540, 999, 120)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Round Border Shadow View \nframe = {0, 66, 44, 44}, cornerRadius = 22 \nbackgroundColor = yellowColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.View()
        view.frame = XT.RectMake(0, 66, 44, 44)
        view.cornerRadius = 22
        view.backgroundColor = XT.Color.yellowColor
        view.borderColor = XT.Color.blackColor
        view.borderWidth = 4
        view.shadowColor = XT.Color.blackColor
        view.shadowRadius = 8.0
        view.shadowOpacity = 0.5
        view.shadowOffset = XT.SizeMake(4.0, 4.0)
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
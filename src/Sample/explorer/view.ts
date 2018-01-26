/// <reference path="../../xt.d.ts" />

export class ViewSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()        
        this.navigationBar.backgroundColor = UI.Color.blackColor
        this.navigationBar.lightContent = true
        this.title = "View"
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
        this.addRegularView()
        this.addRoundView()
        this.addHierarchyView()
        this.addHierarchyViewWithClips()
        this.addBorderView()
        this.contentView.contentSize = UI.SizeMake(0, 800)
    }

    addRegularView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Regular View \nframe = {0, 66, 44, 44} \nbackgroundColor = grayColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 66, 44, 44)
        view.backgroundColor = UI.Color.grayColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addRoundView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 120, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Round View \nframe = {0, 66, 44, 44}, cornerRadius = 22 \nbackgroundColor = redColor, alpha = 0.5"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 66, 44, 44)
        view.cornerRadius = 22
        view.alpha = 0.5
        view.backgroundColor = UI.Color.redColor
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addHierarchyView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 240, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 56)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Hierarchy View With Clips - 层级 \nclipsToBounds = false \nview(red).frame = {0, 78, 44, 44} \nview(green).frame = {22, 22, 44, 44}"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 78, 44, 44)
        view.clipsToBounds = false
        view.backgroundColor = UI.Color.redColor
        const childView = new UI.View()
        childView.frame = UI.RectMake(22, 22, 44, 44)
        childView.backgroundColor = UI.Color.greenColor
        view.addSubview(childView)
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addHierarchyViewWithClips() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 400, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 56)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Hierarchy View - 层级 \nclipsToBounds = true \nview(red).frame = {0, 78, 44, 44} \nview(green).frame = {22, 22, 44, 44}"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 78, 44, 44)
        view.clipsToBounds = true
        view.backgroundColor = UI.Color.redColor
        const childView = new UI.View()
        childView.frame = UI.RectMake(22, 22, 44, 44)
        childView.backgroundColor = UI.Color.greenColor
        view.addSubview(childView)
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addBorderView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 540, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Round Border Shadow View \nframe = {0, 66, 44, 44}, cornerRadius = 22 \nbackgroundColor = yellowColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 66, 44, 44)
        view.cornerRadius = 22
        view.backgroundColor = UI.Color.yellowColor
        view.borderColor = UI.Color.blackColor
        view.borderWidth = 4
        view.shadowColor = UI.Color.blackColor
        view.shadowRadius = 8.0
        view.shadowOpacity = 0.5
        view.shadowOffset = UI.SizeMake(4.0, 4.0)
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
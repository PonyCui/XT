/// <reference path="../../xt.d.ts" />

export class ButtonSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "Button"
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
        this.addRegularButton()
        this.addImageButton()
        this.addRegularSwitch()
        this.addRegularSlider()
        this.addSmallActivityIndicatorView()
        this.addLargeActivityIndicatorView()
        this.contentView.contentSize = UI.SizeMake(0, 1000)
    }

    addRegularButton() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Regular Button \nframe = {0, 66, 200, 44} \nbackgroundColor = whiteColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.Button()
        view.frame = UI.RectMake(0, 66, 200, 44)
        view.backgroundColor = UI.Color.whiteColor
        view.title = "Tap me!"
        view.onTouchUpInside = () => {
            view.title = "Hello, World!"
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addImageButton() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 120, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Image Button \nframe = {0, 66, 200, 44} \nbackgroundColor = whiteColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.Button()
        view.frame = UI.RectMake(0, 66, 200, 44)
        view.backgroundColor = UI.Color.whiteColor
        view.inset = 8
        view.image = require('../assets/location@2x.png')
        view.font = UI.Font.systemFontOfSize(12)
        view.title = "Find Location"
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addRegularSwitch() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 240, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Regular Switch \nframe = {0, 66, 200, 44} \ntintColor = blackColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.Switch()
        view.frame = UI.RectMake(0, 66, 200, 44)
        view.tintColor = UI.Color.blackColor
        view.onValueChanged = () => {
            summary.text = "Regular Switch \nframe = {0, 66, 200, 44} \ntintColor = blackColor, on = " + (view.on ? "true" : "false")
        }
        view.setOn(true, false)
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addRegularSlider() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 360, 999, 160)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.text = "Regular Slider \nframe = {100, 66, 200, 66} \ntintColor = blackColor"
        summary.numberOfLines = 0
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.Slider()
        view.frame = UI.RectMake(44, 66, 200, 66)
        view.tintColor = UI.Color.blackColor
        view.setValue(0.5, false)
        view.onValueChanged = () => {
            summary.text = "Regular Slider \nframe = {44, 66, 200, 66} \ntintColor = blackColor, value = " + (view.value.toFixed(2))
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addSmallActivityIndicatorView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 520, 999, 160)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.text = "Small ActivityIndicatorView \nframe = {0, 66, 200, 66} \ntintColor = grayColor, style = Small"
        summary.numberOfLines = 0
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.ActivityIndicatorView()
        view.frame = UI.RectMake(0, 66, 200, 66)
        view.tintColor = UI.Color.grayColor
        view.startAnimating()
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addLargeActivityIndicatorView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 680, 999, 160)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.text = "Large ActivityIndicatorView \nframe = {0, 66, 200, 66} \ntintColor = grayColor, style = Large"
        summary.numberOfLines = 0
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.ActivityIndicatorView()
        view.frame = UI.RectMake(0, 66, 200, 66)
        view.tintColor = UI.Color.grayColor
        view.style = UI.ActivityIndicatorViewStyle.Large
        view.startAnimating()
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
/// <reference path="../../src/xt.d.ts" />

export class ButtonSample extends XT.ViewController {

    contentView = new XT.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "Button"
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
        this.addRegularButton()
        this.addImageButton()
        this.addRegularSwitch()
        this.addRegularSlider()
        this.addSmallActivityIndicatorView()
        this.addLargeActivityIndicatorView()
        this.contentView.contentSize = XT.SizeMake(0, 1000)
    }

    addRegularButton() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 0, 999, 120)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Regular Button \nframe = {0, 66, 200, 44} \nbackgroundColor = whiteColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.Button()
        view.frame = XT.RectMake(0, 66, 200, 44)
        view.backgroundColor = XT.Color.whiteColor
        view.title = "Tap me!"
        view.onTouchUpInside = () => {
            view.title = "Hello, World!"
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addImageButton() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 120, 999, 120)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Image Button \nframe = {0, 66, 200, 44} \nbackgroundColor = whiteColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.Button()
        view.frame = XT.RectMake(0, 66, 200, 44)
        view.backgroundColor = XT.Color.whiteColor
        view.inset = 8
        view.image = require('../assets/location@2x.png')
        view.font = XT.Font.systemFontOfSize(12)
        view.title = "Find Location"
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addRegularSwitch() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 240, 999, 120)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Regular Switch \nframe = {0, 66, 200, 44} \ntintColor = blackColor"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.Switch()
        view.frame = XT.RectMake(0, 66, 200, 44)
        view.tintColor = XT.Color.blackColor
        view.onValueChanged = () => {
            summary.text = "Regular Switch \nframe = {0, 66, 200, 44} \ntintColor = blackColor, on = " + (view.on ? "true" : "false")
        }
        view.setOn(true, false)
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addRegularSlider() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 360, 999, 160)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.text = "Regular Slider \nframe = {100, 66, 200, 66} \ntintColor = blackColor"
        summary.numberOfLines = 0
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.Slider()
        view.frame = XT.RectMake(44, 66, 200, 66)
        view.tintColor = XT.Color.blackColor
        view.setValue(0.5, false)
        view.onValueChanged = () => {
            summary.text = "Regular Slider \nframe = {44, 66, 200, 66} \ntintColor = blackColor, value = " + (view.value.toFixed(2))
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addSmallActivityIndicatorView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 520, 999, 160)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.text = "Small ActivityIndicatorView \nframe = {0, 66, 200, 66} \ntintColor = grayColor, style = Small"
        summary.numberOfLines = 0
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.ActivityIndicatorView()
        view.frame = XT.RectMake(0, 66, 200, 66)
        view.tintColor = XT.Color.grayColor
        view.startAnimating()
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addLargeActivityIndicatorView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 680, 999, 160)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.text = "Large ActivityIndicatorView \nframe = {0, 66, 200, 66} \ntintColor = grayColor, style = Large"
        summary.numberOfLines = 0
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.ActivityIndicatorView()
        view.frame = XT.RectMake(0, 66, 200, 66)
        view.tintColor = XT.Color.grayColor
        view.style = XT.ActivityIndicatorViewStyle.Large
        view.startAnimating()
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
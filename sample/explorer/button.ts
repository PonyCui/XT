/// <reference path="../../src/xt.d.ts" />

export class ButtonSample extends XT.ViewController {

    contentView = new XT.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.navigationBar.title = "Button"
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
        this.contentView.contentSize = XT.SizeMake(0, 480)
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
        XT.Image.fromAssets("location", (it) => {
            view.image = it
        })
        view.font = XT.Font.systemFontOfSize(12)
        view.title = "Find Location"
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
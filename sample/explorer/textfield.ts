/// <reference path="../../src/xt.d.ts" />

export class TextFieldSample extends XT.ViewController {

    contentView = new XT.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.navigationBar.title = "TextField"
        this.showNavigationBar()
        this.view.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.view.addSubview(this.contentView)
        this.view.onTap = () => {
            this.view.window.endEditing()
        }
        this.addTestCases()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.contentView.frame = this.view.bounds
    }

    addTestCases() {
        this.addRegularTextField()
    }

    addRegularTextField() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 0, 999, 240)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Regular TextField \nframe = {0, 66, 200, 36}"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.TextField()
        view.frame = XT.RectMake(0, 66, 200, 36)
        view.backgroundColor = XT.Color.whiteColor
        view.font = XT.Font.systemFontOfSize(14)
        view.placeholder = "Tap to input text."
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
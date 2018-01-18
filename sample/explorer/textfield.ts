/// <reference path="../../src/xt.d.ts" />

export class TextFieldSample extends XT.ViewController {

    contentView = new XT.View()
    textFields: XT.TextField[] = []

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "TextField"
        this.showNavigationBar()
        this.view.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.view.addSubview(this.contentView)
        this.view.onTap = () => {
            if (this.view.window) {
                this.view.window.endEditing()
            }
        }
        this.addTestCases()
    }

    keyboardAvoidingMode() {
        return XT.KeyboardAvoidingMode.Pan
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.contentView.frame = this.view.bounds
    }

    addTestCases() {
        this.addRegularTextField()
        this.addAdditionalViewTextField()
        this.addPasswordTextField()
        // this.contentView.contentSize = XT.SizeMake(0, 1000)
    }

    addRegularTextField() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 0, 999, 120)
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
        view.textAlignment = XT.TextAlignment.Center
        view.clearButtonMode = XT.TextFieldViewMode.WhileEditing
        view.returnKeyType = XT.ReturnKeyType.Next
        view.placeholder = "Tap to input text."
        view.shouldReturn = () => {
            this.textFields[1].focus()
            return true
        }
        this.textFields.push(view)
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addAdditionalViewTextField() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 160, 999, 120)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Additional View TextField \nframe = {0, 66, 200, 36}"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.TextField()
        view.returnKeyType = XT.ReturnKeyType.Next
        view.frame = XT.RectMake(0, 66, 200, 36)
        view.backgroundColor = XT.Color.whiteColor
        view.font = XT.Font.systemFontOfSize(14)
        view.placeholder = "Input with additional view."
        const leftView = new XT.View()
        leftView.backgroundColor = XT.Color.grayColor
        leftView.frame = XT.RectMake(0, 0, 15, 36)
        view.leftView = leftView
        view.leftViewMode = XT.TextFieldViewMode.Always
        this.textFields.push(view)
        view.shouldReturn = () => {
            this.textFields[2].focus()
            return true
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addPasswordTextField() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 320, 999, 120)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Password TextField, Return Key = Go \nframe = {0, 66, 200, 36}"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.TextField()
        view.frame = XT.RectMake(0, 66, 200, 36)
        view.backgroundColor = XT.Color.whiteColor
        view.font = XT.Font.systemFontOfSize(14)
        view.textAlignment = XT.TextAlignment.Center
        view.placeholder = "Input Password Here."
        view.secureTextEntry = true
        view.returnKeyType = XT.ReturnKeyType.Go
        this.textFields.push(view)
        view.shouldReturn = () => {
            this.textFields[0].focus()
            return true
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
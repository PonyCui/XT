/// <reference path="../../src/xt.d.ts" />

export class TextFieldSample extends UI.ViewController {

    contentView = new UI.ScrollView()
    textFields: UI.TextField[] = []

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "TextField"
        this.showNavigationBar()
        this.view.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.view.addSubview(this.contentView)
        this.view.onTap = () => {
            if (this.view.window) {
                this.view.window.endEditing()
            }
        }
        this.addTestCases()
    }

    keyboardAvoidingMode() {
        return UI.KeyboardAvoidingMode.Pan
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.contentView.frame = this.view.bounds
    }

    addTestCases() {
        this.addRegularTextField()
        this.addAdditionalViewTextField()
        this.addPasswordTextField()
        this.contentView.contentSize = UI.SizeMake(0, 1000)
    }

    addRegularTextField() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Regular TextField \nframe = {0, 66, 200, 36}"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.TextField()
        view.frame = UI.RectMake(0, 66, 200, 36)
        view.backgroundColor = UI.Color.whiteColor
        view.font = UI.Font.systemFontOfSize(14)
        view.textAlignment = UI.TextAlignment.Center
        view.clearButtonMode = UI.TextFieldViewMode.WhileEditing
        view.returnKeyType = UI.ReturnKeyType.Next
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
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 160, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Additional View TextField \nframe = {0, 66, 200, 36}"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.TextField()
        view.returnKeyType = UI.ReturnKeyType.Next
        view.frame = UI.RectMake(0, 66, 200, 36)
        view.backgroundColor = UI.Color.whiteColor
        view.font = UI.Font.systemFontOfSize(14)
        view.placeholder = "Input with additional view."
        const leftView = new UI.View()
        leftView.backgroundColor = UI.Color.grayColor
        leftView.frame = UI.RectMake(0, 0, 15, 36)
        view.leftView = leftView
        view.leftViewMode = UI.TextFieldViewMode.Always
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
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 320, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Password TextField, Return Key = Go \nframe = {0, 66, 200, 36}"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.TextField()
        view.frame = UI.RectMake(0, 66, 200, 36)
        view.backgroundColor = UI.Color.whiteColor
        view.font = UI.Font.systemFontOfSize(14)
        view.textAlignment = UI.TextAlignment.Center
        view.placeholder = "Input Password Here."
        view.secureTextEntry = true
        view.returnKeyType = UI.ReturnKeyType.Go
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
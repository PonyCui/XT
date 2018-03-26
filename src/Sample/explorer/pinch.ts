/// <reference path="../../xt.d.ts" />

export class PinchSample extends UI.ViewController {

    contentView = new UI.View()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "Pinch"
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
        this.addPinchView()
    }

    addPinchView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 400)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View - Pinch \nTry to pinch it."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(15, 100, 300, 300)
        view.backgroundColor = UI.Color.grayColor
        view.userInteractionEnabled = true
        view.onPinch = (state, scale) => {
            if (state == UI.InteractionState.Began) { }
            else if (state == UI.InteractionState.Changed) {
                view.transform = new UI.TransformMatrix().postScale(scale, scale)
            }
            else if (state == UI.InteractionState.Ended) {
                UI.View.animationWithBouncinessAndSpeed(8.0, 8.0, () => {
                    view.transform = new UI.TransformMatrix()
                })
            }
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
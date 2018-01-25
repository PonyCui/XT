/// <reference path="../../src/xt.d.ts" />

export class LongPressSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "LongPress"
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
        this.addLongPressView()
        this.contentView.contentSize = UI.SizeMake(0, 480)
    }

    addLongPressView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View - LongPress \nTry to long press it."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 66, 66, 66)
        view.backgroundColor = UI.Color.grayColor
        view.userInteractionEnabled = true
        view.onLongPress = (state) => {
            if (state == UI.InteractionState.Began) {
                view.backgroundColor = UI.Color.greenColor
            }
            else if (state == UI.InteractionState.Ended) {
                view.backgroundColor = UI.Color.grayColor
            }
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
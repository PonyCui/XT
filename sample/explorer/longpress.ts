/// <reference path="../../src/xt.d.ts" />

export class LongPressSample extends XT.ViewController {

    contentView = new XT.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "LongPress"
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
        this.addLongPressView()
        this.contentView.contentSize = XT.SizeMake(0, 480)
    }

    addLongPressView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 0, 999, 120)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View - LongPress \nTry to long press it."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.View()
        view.frame = XT.RectMake(0, 66, 66, 66)
        view.backgroundColor = XT.Color.grayColor
        view.userInteractionEnabled = true
        view.onLongPress = (state) => {
            if (state == XT.InteractionState.Began) {
                view.backgroundColor = XT.Color.greenColor
            }
            else if (state == XT.InteractionState.Ended) {
                view.backgroundColor = XT.Color.grayColor
            }
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
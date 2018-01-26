/// <reference path="../../xt.d.ts" />

export class PanSample extends UI.ViewController {

    contentView = new UI.View()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "Pan"
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
        this.addPanView()
    }

    addPanView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 400)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View - Pan \nTry to drag it."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(120, 120, 66, 66)
        view.backgroundColor = UI.Color.grayColor
        view.cornerRadius = 22
        view.userInteractionEnabled = true
        view.transform = new UI.TransformMatrix(1.5, 0.0, 0.0, 1.5, 1.0, 1.0)
        view.onPan = (state, viewLocation, absLocation, velocity, translation) => {
            if (state == UI.InteractionState.Began) {
                view.backgroundColor = UI.Color.greenColor
            }
            else if (state == UI.InteractionState.Changed) {
                if (translation) {
                    view.transform = new UI.TransformMatrix(1.5, 0.0, 0.0, 1.5, translation.x, translation.y)
                }
            }
            else if (state == UI.InteractionState.Ended) {
                UI.View.animationWithDuration(0.35, () => {
                    view.backgroundColor = UI.Color.grayColor
                })
                UI.View.animationWithBouncinessAndSpeed(8, 16.0, () => {
                    view.transform = new UI.TransformMatrix(1.5, 0.0, 0.0, 1.5, 1.0, 1.0)
                })
            }
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
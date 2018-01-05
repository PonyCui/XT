/// <reference path="../../src/xt.d.ts" />

export class PanSample extends XT.ViewController {

    contentView = new XT.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.navigationBar.title = "Pan"
        this.showNavigationBar()
        this.view.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
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
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 0, 999, 400)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "View - Pan \nTry to drag it."
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.View()
        view.frame = XT.RectMake(120, 120, 44, 44)
        view.backgroundColor = XT.Color.grayColor
        view.cornerRadius = 22
        view.userInteractionEnabled = true
        view.onPan = (state, viewLocation, absLocation, velocity, translation) => {
            if (state == XT.InteractionState.Began) {
                view.backgroundColor = XT.Color.greenColor
            }
            else if (state == XT.InteractionState.Changed) {
                if (translation) {
                    view.transform = new XT.TransformMatrix(1.25, 0.0, 0.0, 1.25, translation.x, translation.y)
                }
            }
            else if (state == XT.InteractionState.Ended) {
                XT.View.animationWithBouncinessAndSpeed(0.80, 16.0, () => {
                    view.backgroundColor = XT.Color.grayColor
                    view.transform = new XT.TransformMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
                })
            }
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
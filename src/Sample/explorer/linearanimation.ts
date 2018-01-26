/// <reference path="../../xt.d.ts" />

export class LinearAnimationSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "Linear Animation"
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
        this.addFrameAnimation()
        this.addAlphaAnimation()
        this.addTransformAnimation()
        this.addColorAnimation()
        this.contentView.contentSize = UI.SizeMake(0, 660)
    }

    addFrameAnimation() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Frame Animation"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 44, 44, 44)
        view.backgroundColor = UI.Color.grayColor
        view.onTap = () => {
            UI.View.animationWithDuration(0.30, () => {
                view.frame = UI.RectMake(200, 44, 66, 66)
            })
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addAlphaAnimation() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 120, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Alpha Animation"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 44, 44, 44)
        view.backgroundColor = UI.Color.grayColor
        view.onTap = () => {
            UI.View.animationWithDuration(0.30, () => {
                view.alpha = 0
            })
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addTransformAnimation() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 240, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Transform Animation"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 44, 44, 44)
        view.backgroundColor = UI.Color.grayColor
        view.onTap = () => {
            UI.View.animationWithDuration(0.30, () => {
                view.transform = new UI.TransformMatrix().postScale(1.5, 1.5).postRotate(45.0 * Math.PI / 180.0)
            })
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addColorAnimation() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 360, 999, 120)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Color Animation"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.View()
        view.frame = UI.RectMake(0, 44, 44, 44)
        view.backgroundColor = UI.Color.grayColor
        view.onTap = () => {
            UI.View.animationWithDuration(0.30, () => {
                view.backgroundColor = UI.Color.greenColor
            })
        }
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
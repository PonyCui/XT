/// <reference path="../../xt.d.ts" />

export class StackViewSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "StackView"
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
        this.addDistributionFillView()
        this.addDistributionFillEquallyView()
        this.addDistributionFillProportionallyView()
        this.addDistributionEqualSpacingView()
        this.addAxisVerticalDistributionFillView()
        this.addAxisVerticalDistributionFillEquallyView()
        this.addAxisVerticalDistributionFillProportionallyView()
        this.addAxisVerticalDistributionEqualSpacingView()
        this.contentView.contentSize = UI.SizeMake(0, 3300)
    }

    addDistributionFillView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 300)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Distribution = Fill \nspacing = 10"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.StackView()
        view.axis = UI.LayoutConstraintAxis.Horizontal
        view.distribution = UI.StackViewDistribution.Fill
        view.alignment = UI.StackViewAlignment.Fill
        view.frame = UI.RectMake(0, 66, 300, 100)
        let item0 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.yellowColor
            let item = new UI.StackItem(view)
            item.minWidth = 50
            item.minHeight = 60
            return item
        })();
        let item1 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.redColor
            let item = new UI.StackItem(view)
            item.minHeight = 80
            return item
        })();
        let item2 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.blueColor
            let item = new UI.StackItem(view)
            item.minWidth = 100
            item.minHeight = 70
            return item
        })();
        view.spacing = 10
        view.setItems([item0, item1, item2])
        view.backgroundColor = UI.Color.whiteColor
        // } Sample Code 

        const changeAligmentButton = new UI.Button()
        changeAligmentButton.tag = UI.StackViewAlignment.Fill
        changeAligmentButton.title = "StackViewAlignment.Fill"
        changeAligmentButton.onTouchUpInside = () => {
            switch (changeAligmentButton.tag) {
                case UI.StackViewAlignment.Fill:
                    view.alignment = UI.StackViewAlignment.Center
                    changeAligmentButton.title = "StackViewAlignment.Center"
                    break
                case UI.StackViewAlignment.Center:
                    view.alignment = UI.StackViewAlignment.Leading
                    changeAligmentButton.title = "StackViewAlignment.Leading"
                    break
                case UI.StackViewAlignment.Leading:
                    view.alignment = UI.StackViewAlignment.Trailing
                    changeAligmentButton.title = "StackViewAlignment.Trailing"
                    break
                case UI.StackViewAlignment.Trailing:
                    view.alignment = UI.StackViewAlignment.Fill
                    changeAligmentButton.title = "StackViewAlignment.Fill"
                    break
            }
            changeAligmentButton.tag = view.alignment
        }
        changeAligmentButton.frame = UI.RectMake(0, 200, 300, 44)
        wrapper.addSubview(changeAligmentButton)

        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addDistributionFillEquallyView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 300, 999, 300)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Distribution = FillEqually \nspacing = 10"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.StackView()
        view.axis = UI.LayoutConstraintAxis.Horizontal
        view.distribution = UI.StackViewDistribution.FillEqually
        view.alignment = UI.StackViewAlignment.Fill
        view.frame = UI.RectMake(0, 66, 300, 100)
        let item0 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.yellowColor
            let item = new UI.StackItem(view)
            item.minHeight = 60
            return item
        })();
        let item1 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.redColor
            let item = new UI.StackItem(view)
            item.minHeight = 80
            return item
        })();
        let item2 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.blueColor
            let item = new UI.StackItem(view)
            item.minHeight = 70
            return item
        })();
        view.spacing = 10
        view.setItems([item0, item1, item2])
        view.backgroundColor = UI.Color.whiteColor
        // } Sample Code 

        const changeAligmentButton = new UI.Button()
        changeAligmentButton.tag = UI.StackViewAlignment.Fill
        changeAligmentButton.title = "StackViewAlignment.Fill"
        changeAligmentButton.onTouchUpInside = () => {
            switch (changeAligmentButton.tag) {
                case UI.StackViewAlignment.Fill:
                    view.alignment = UI.StackViewAlignment.Center
                    changeAligmentButton.title = "StackViewAlignment.Center"
                    break
                case UI.StackViewAlignment.Center:
                    view.alignment = UI.StackViewAlignment.Leading
                    changeAligmentButton.title = "StackViewAlignment.Leading"
                    break
                case UI.StackViewAlignment.Leading:
                    view.alignment = UI.StackViewAlignment.Trailing
                    changeAligmentButton.title = "StackViewAlignment.Trailing"
                    break
                case UI.StackViewAlignment.Trailing:
                    view.alignment = UI.StackViewAlignment.Fill
                    changeAligmentButton.title = "StackViewAlignment.Fill"
                    break
            }
            changeAligmentButton.tag = view.alignment
        }
        changeAligmentButton.frame = UI.RectMake(0, 200, 300, 44)
        wrapper.addSubview(changeAligmentButton)

        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addDistributionFillProportionallyView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 600, 999, 300)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Distribution = FillProportionally \nspacing = 10"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.StackView()
        view.axis = UI.LayoutConstraintAxis.Horizontal
        view.distribution = UI.StackViewDistribution.FillProportionally
        view.alignment = UI.StackViewAlignment.Fill
        view.frame = UI.RectMake(0, 66, 300, 100)
        let item0 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.yellowColor
            let item = new UI.StackItem(view)
            item.minWidth = 50
            item.minHeight = 60
            return item
        })();
        let item1 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.redColor
            let item = new UI.StackItem(view)
            item.minWidth = 100
            item.minHeight = 80
            return item
        })();
        let item2 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.blueColor
            let item = new UI.StackItem(view)
            item.minWidth = 25
            item.minHeight = 70
            return item
        })();
        view.spacing = 10
        view.setItems([item0, item1, item2])
        view.backgroundColor = UI.Color.whiteColor
        // } Sample Code 

        const changeAligmentButton = new UI.Button()
        changeAligmentButton.tag = UI.StackViewAlignment.Fill
        changeAligmentButton.title = "StackViewAlignment.Fill"
        changeAligmentButton.onTouchUpInside = () => {
            switch (changeAligmentButton.tag) {
                case UI.StackViewAlignment.Fill:
                    view.alignment = UI.StackViewAlignment.Center
                    changeAligmentButton.title = "StackViewAlignment.Center"
                    break
                case UI.StackViewAlignment.Center:
                    view.alignment = UI.StackViewAlignment.Leading
                    changeAligmentButton.title = "StackViewAlignment.Leading"
                    break
                case UI.StackViewAlignment.Leading:
                    view.alignment = UI.StackViewAlignment.Trailing
                    changeAligmentButton.title = "StackViewAlignment.Trailing"
                    break
                case UI.StackViewAlignment.Trailing:
                    view.alignment = UI.StackViewAlignment.Fill
                    changeAligmentButton.title = "StackViewAlignment.Fill"
                    break
            }
            changeAligmentButton.tag = view.alignment
        }
        changeAligmentButton.frame = UI.RectMake(0, 200, 300, 44)
        wrapper.addSubview(changeAligmentButton)

        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addDistributionEqualSpacingView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 900, 999, 300)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Distribution = EqualSpacing \nspacing = 10"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.StackView()
        view.axis = UI.LayoutConstraintAxis.Horizontal
        view.distribution = UI.StackViewDistribution.EqualSpacing
        view.alignment = UI.StackViewAlignment.Fill
        view.frame = UI.RectMake(0, 66, 300, 100)
        let item0 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.yellowColor
            let item = new UI.StackItem(view)
            item.minWidth = 50
            item.minHeight = 60
            return item
        })();
        let item1 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.redColor
            let item = new UI.StackItem(view)
            item.minWidth = 100
            item.minHeight = 80
            return item
        })();
        let item2 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.blueColor
            let item = new UI.StackItem(view)
            item.minWidth = 25
            item.minHeight = 70
            return item
        })();
        view.spacing = 10
        view.setItems([item0, item1, item2])
        view.backgroundColor = UI.Color.whiteColor
        // } Sample Code 

        const changeAligmentButton = new UI.Button()
        changeAligmentButton.tag = UI.StackViewAlignment.Fill
        changeAligmentButton.title = "StackViewAlignment.Fill"
        changeAligmentButton.onTouchUpInside = () => {
            switch (changeAligmentButton.tag) {
                case UI.StackViewAlignment.Fill:
                    view.alignment = UI.StackViewAlignment.Center
                    changeAligmentButton.title = "StackViewAlignment.Center"
                    break
                case UI.StackViewAlignment.Center:
                    view.alignment = UI.StackViewAlignment.Leading
                    changeAligmentButton.title = "StackViewAlignment.Leading"
                    break
                case UI.StackViewAlignment.Leading:
                    view.alignment = UI.StackViewAlignment.Trailing
                    changeAligmentButton.title = "StackViewAlignment.Trailing"
                    break
                case UI.StackViewAlignment.Trailing:
                    view.alignment = UI.StackViewAlignment.Fill
                    changeAligmentButton.title = "StackViewAlignment.Fill"
                    break
            }
            changeAligmentButton.tag = view.alignment
        }
        changeAligmentButton.frame = UI.RectMake(0, 200, 300, 44)
        wrapper.addSubview(changeAligmentButton)

        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addAxisVerticalDistributionFillView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 1200, 999, 500)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Axis = Vertical Distribution = Fill \nspacing = 10"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.StackView()
        view.axis = UI.LayoutConstraintAxis.Vertical
        view.distribution = UI.StackViewDistribution.Fill
        view.alignment = UI.StackViewAlignment.Fill
        view.frame = UI.RectMake(0, 66, 300, 300)
        let item0 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.yellowColor
            let item = new UI.StackItem(view)
            item.minWidth = 50
            item.minHeight = 60
            return item
        })();
        let item1 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.redColor
            let item = new UI.StackItem(view)
            item.minWidth = 80
            return item
        })();
        let item2 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.blueColor
            let item = new UI.StackItem(view)
            item.minWidth = 100
            item.minHeight = 70
            return item
        })();
        view.spacing = 10
        view.setItems([item0, item1, item2])
        view.backgroundColor = UI.Color.whiteColor
        // } Sample Code 

        const changeAligmentButton = new UI.Button()
        changeAligmentButton.tag = UI.StackViewAlignment.Fill
        changeAligmentButton.title = "StackViewAlignment.Fill"
        changeAligmentButton.onTouchUpInside = () => {
            switch (changeAligmentButton.tag) {
                case UI.StackViewAlignment.Fill:
                    view.alignment = UI.StackViewAlignment.Center
                    changeAligmentButton.title = "StackViewAlignment.Center"
                    break
                case UI.StackViewAlignment.Center:
                    view.alignment = UI.StackViewAlignment.Leading
                    changeAligmentButton.title = "StackViewAlignment.Leading"
                    break
                case UI.StackViewAlignment.Leading:
                    view.alignment = UI.StackViewAlignment.Trailing
                    changeAligmentButton.title = "StackViewAlignment.Trailing"
                    break
                case UI.StackViewAlignment.Trailing:
                    view.alignment = UI.StackViewAlignment.Fill
                    changeAligmentButton.title = "StackViewAlignment.Fill"
                    break
            }
            changeAligmentButton.tag = view.alignment
        }
        changeAligmentButton.frame = UI.RectMake(0, 400, 300, 44)
        wrapper.addSubview(changeAligmentButton)

        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addAxisVerticalDistributionFillEquallyView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 1700, 999, 500)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Axis = Vertical Distribution = FillEqually \nspacing = 10"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.StackView()
        view.axis = UI.LayoutConstraintAxis.Vertical
        view.distribution = UI.StackViewDistribution.FillEqually
        view.alignment = UI.StackViewAlignment.Fill
        view.frame = UI.RectMake(0, 66, 300, 300)
        let item0 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.yellowColor
            let item = new UI.StackItem(view)
            item.minHeight = 60
            return item
        })();
        let item1 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.redColor
            let item = new UI.StackItem(view)
            item.minHeight = 80
            return item
        })();
        let item2 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.blueColor
            let item = new UI.StackItem(view)
            item.minHeight = 70
            return item
        })();
        view.spacing = 10
        view.setItems([item0, item1, item2])
        view.backgroundColor = UI.Color.whiteColor
        // } Sample Code 

        const changeAligmentButton = new UI.Button()
        changeAligmentButton.tag = UI.StackViewAlignment.Fill
        changeAligmentButton.title = "StackViewAlignment.Fill"
        changeAligmentButton.onTouchUpInside = () => {
            switch (changeAligmentButton.tag) {
                case UI.StackViewAlignment.Fill:
                    view.alignment = UI.StackViewAlignment.Center
                    changeAligmentButton.title = "StackViewAlignment.Center"
                    break
                case UI.StackViewAlignment.Center:
                    view.alignment = UI.StackViewAlignment.Leading
                    changeAligmentButton.title = "StackViewAlignment.Leading"
                    break
                case UI.StackViewAlignment.Leading:
                    view.alignment = UI.StackViewAlignment.Trailing
                    changeAligmentButton.title = "StackViewAlignment.Trailing"
                    break
                case UI.StackViewAlignment.Trailing:
                    view.alignment = UI.StackViewAlignment.Fill
                    changeAligmentButton.title = "StackViewAlignment.Fill"
                    break
            }
            changeAligmentButton.tag = view.alignment
        }
        changeAligmentButton.frame = UI.RectMake(0, 400, 300, 44)
        wrapper.addSubview(changeAligmentButton)

        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addAxisVerticalDistributionFillProportionallyView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 2200, 999, 500)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Axis = Vertical Distribution = FillProportionally \nspacing = 10"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.StackView()
        view.axis = UI.LayoutConstraintAxis.Vertical
        view.distribution = UI.StackViewDistribution.FillProportionally
        view.alignment = UI.StackViewAlignment.Fill
        view.frame = UI.RectMake(0, 66, 300, 300)
        let item0 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.yellowColor
            let item = new UI.StackItem(view)
            item.minWidth = 50
            item.minHeight = 60
            return item
        })();
        let item1 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.redColor
            let item = new UI.StackItem(view)
            item.minWidth = 100
            item.minHeight = 80
            return item
        })();
        let item2 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.blueColor
            let item = new UI.StackItem(view)
            item.minWidth = 25
            item.minHeight = 70
            return item
        })();
        view.spacing = 10
        view.setItems([item0, item1, item2])
        view.backgroundColor = UI.Color.whiteColor
        // } Sample Code 

        const changeAligmentButton = new UI.Button()
        changeAligmentButton.tag = UI.StackViewAlignment.Fill
        changeAligmentButton.title = "StackViewAlignment.Fill"
        changeAligmentButton.onTouchUpInside = () => {
            switch (changeAligmentButton.tag) {
                case UI.StackViewAlignment.Fill:
                    view.alignment = UI.StackViewAlignment.Center
                    changeAligmentButton.title = "StackViewAlignment.Center"
                    break
                case UI.StackViewAlignment.Center:
                    view.alignment = UI.StackViewAlignment.Leading
                    changeAligmentButton.title = "StackViewAlignment.Leading"
                    break
                case UI.StackViewAlignment.Leading:
                    view.alignment = UI.StackViewAlignment.Trailing
                    changeAligmentButton.title = "StackViewAlignment.Trailing"
                    break
                case UI.StackViewAlignment.Trailing:
                    view.alignment = UI.StackViewAlignment.Fill
                    changeAligmentButton.title = "StackViewAlignment.Fill"
                    break
            }
            changeAligmentButton.tag = view.alignment
        }
        changeAligmentButton.frame = UI.RectMake(0, 400, 300, 44)
        wrapper.addSubview(changeAligmentButton)

        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addAxisVerticalDistributionEqualSpacingView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 2700, 999, 500)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Axis = Vertical Distribution = EqualSpacing \nspacing = 10"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.StackView()
        view.axis = UI.LayoutConstraintAxis.Vertical
        view.distribution = UI.StackViewDistribution.EqualSpacing
        view.alignment = UI.StackViewAlignment.Fill
        view.frame = UI.RectMake(0, 66, 300, 300)
        let item0 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.yellowColor
            let item = new UI.StackItem(view)
            item.minWidth = 50
            item.minHeight = 60
            return item
        })();
        let item1 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.redColor
            let item = new UI.StackItem(view)
            item.minWidth = 100
            item.minHeight = 80
            return item
        })();
        let item2 = (() => {
            let view = new UI.View
            view.backgroundColor = UI.Color.blueColor
            let item = new UI.StackItem(view)
            item.minWidth = 25
            item.minHeight = 70
            return item
        })();
        view.spacing = 10
        view.setItems([item0, item1, item2])
        view.backgroundColor = UI.Color.whiteColor
        // } Sample Code 

        const changeAligmentButton = new UI.Button()
        changeAligmentButton.tag = UI.StackViewAlignment.Fill
        changeAligmentButton.title = "StackViewAlignment.Fill"
        changeAligmentButton.onTouchUpInside = () => {
            switch (changeAligmentButton.tag) {
                case UI.StackViewAlignment.Fill:
                    view.alignment = UI.StackViewAlignment.Center
                    changeAligmentButton.title = "StackViewAlignment.Center"
                    break
                case UI.StackViewAlignment.Center:
                    view.alignment = UI.StackViewAlignment.Leading
                    changeAligmentButton.title = "StackViewAlignment.Leading"
                    break
                case UI.StackViewAlignment.Leading:
                    view.alignment = UI.StackViewAlignment.Trailing
                    changeAligmentButton.title = "StackViewAlignment.Trailing"
                    break
                case UI.StackViewAlignment.Trailing:
                    view.alignment = UI.StackViewAlignment.Fill
                    changeAligmentButton.title = "StackViewAlignment.Fill"
                    break
            }
            changeAligmentButton.tag = view.alignment
        }
        changeAligmentButton.frame = UI.RectMake(0, 400, 300, 44)
        wrapper.addSubview(changeAligmentButton)

        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}
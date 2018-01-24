/// <reference path="../../src/xt.d.ts" />

class ListCellSample extends XT.ListCell {

    titleLabel = new XT.Label()

    constructor() {
        super()
        this.titleLabel.textAlignment = XT.TextAlignment.Left
        this.addSubview(this.titleLabel)
    }

    didRender() {
        if (this.currentItem) {
            this.titleLabel.text = this.currentItem.name
        }
    }

    didHighlighted(value: boolean) {
        this.backgroundColor = value ? new XT.Color(0xe2/0xff, 0xe2/0xff, 0xe2/0xff) : XT.Color.clearColor
    }

    didSelected() {
        if (this.context instanceof XT.ViewController) {
            if (this.context.navigationController) {
                const nextViewController = new XT.ViewController()
                if (this.currentItem) {
                    nextViewController.navigationBar.title = this.currentItem.name
                    nextViewController.showNavigationBar()
                }
                this.context.navigationController.pushViewController(nextViewController)
            }
        }
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.titleLabel.frame = this.bounds
    }

}

export class ListViewSample extends XT.ViewController {

    contentView = new XT.ListView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "ListView"
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
        this.contentView.register(ListCellSample, "Cell", this)
        let mockDatas: XT.ListItem[] = []
        for (let index = 0; index < 10000; index++) {
            mockDatas.push({
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "  Current Cell Index = " + index.toString()
            })
        }
        this.contentView.items = mockDatas
        this.contentView.reloadData()
    }

}
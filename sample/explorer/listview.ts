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
        this.navigationBar.title = "ListView"
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
        this.contentView.register(ListCellSample, "Cell")
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
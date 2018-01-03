/// <reference path="../../src/xt.d.ts" />

class Cell extends XT.ListCell {

    titleLabel = new XT.Label()

    constructor() {
        super()
        this.setupLabel()
    }

    setupLabel() {
        this.addSubview(this.titleLabel)
        this.onRender = () => {
            if (this.currentItem) {
                this.titleLabel.text = this.currentItem.name       
            }
        }
        this.onSelected = () => {
            if (this.currentItem) {
                this.currentItem.action()
            }
        }
    }

    layoutSubviews() {
        this.titleLabel.frame = {...this.bounds, x: 15}
    }

}

export class List extends XT.ViewController {

    listView = new XT.ListView()

    viewDidLoad() {
        this.navigationBar.translucent = true
        this.navigationBar.title = "UI Explorer"
        this.showNavigationBar()    
        this.view.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.setupListView()
        this.loadData()
        this.setupRightButtons()
    }

    setupListView() {
        this.listView.clipsToBounds = false
        this.listView.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.listView.register(Cell, "Cell", this)
        this.view.addSubview(this.listView)
    }

    setupRightButtons() {
        const aboutBtn = new XT.NavigationBarButtonItem()
        aboutBtn.title = "About"
        aboutBtn.onTouchUpInside = () => {
            console.log("12312312312")
        }
        this.navigationBar.setRightBarButtonItems([
            aboutBtn,
        ])
    }

    loadData() {
        this.listView.items = [
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                title: "XT.Button",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new List())
                    }
                },
            }
        ]
        this.listView.reloadData()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.listView.frame = XT.RectMake(0, this.safeAreaInsets.top, this.view.bounds.width, this.view.bounds.height - this.safeAreaInsets.top)
    }

}
/// <reference path="../../src/xt.d.ts" />
import { ViewSample } from "./view";
import { ScrollViewSample } from "./scrollview";
import { ListViewSample } from "./listview";


class Header extends XT.ListCell {

    logoImageView = new XT.ImageView()
    textLabel = new XT.Label()

    constructor() {
        super()
        this.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.setupLogoImageView()
        this.setupLabel();
    }

    setupLogoImageView() {
        XT.Image.fromAssets("logo", it => { this.logoImageView.image = it })
        this.addSubview(this.logoImageView)
    }

    setupLabel() {
        this.textLabel.font = XT.Font.systemFontOfSize(14)
        this.textLabel.textAlignment = XT.TextAlignment.Center
        this.textLabel.textColor = new XT.Color(0x6b / 0xff, 0x6b / 0xff, 0x6b / 0xff)
        this.textLabel.numberOfLines = 0
        this.textLabel.text = "以下将展示 XT 组件能力，组件样式仅供参考，开发者可根据自身需求自定义组件样式，具体属性参数详见 XT 开发文档。"
        this.addSubview(this.textLabel);
    }

    layoutSubviews() {
        this.logoImageView.frame = XT.RectMake((this.bounds.width - 43) / 2, 22, 43, 43)
        this.textLabel.frame = XT.RectMake(44, 64, this.bounds.width - 88, this.bounds.height - 66 - 22)
    }

}

class SectionHeader extends XT.ListCell {

    content = new XT.View()
    titleLabel = new XT.Label()

    constructor() {
        super()
        this.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.content.backgroundColor = XT.Color.whiteColor
        this.addSubview(this.content)
        this.titleLabel.font = XT.Font.boldSystemFontOfSize(14)
        this.content.addSubview(this.titleLabel)
    }

    didRender() {
        if (this.currentItem) {
            this.titleLabel.text = this.currentItem.name
        }
    }

    layoutSubviews() {
        this.content.frame = XT.RectMake(15, 8, this.bounds.width - 30, 44)
        this.titleLabel.frame = {...this.content.bounds, x: 15}
    }

}

class Cell extends XT.ListCell {

    content = new XT.View()
    titleLabel = new XT.Label()
    bottomLine = new XT.HRView()

    constructor() {
        super()
        this.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.content.backgroundColor = XT.Color.whiteColor
        this.addSubview(this.content)
        this.titleLabel.textColor = XT.Color.grayColor
        this.titleLabel.font = XT.Font.systemFontOfSize(13)
        this.content.addSubview(this.titleLabel)
        this.bottomLine.color = new XT.Color(0xda / 0xff, 0xda / 0xff, 0xda / 0xff)
        this.content.addSubview(this.bottomLine)
    }

    didHighlighted(value) {
        if (value) {
            this.content.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        }
        else {
            this.content.backgroundColor = XT.Color.whiteColor
        }
    }

    didRender() {
        if (this.currentItem) {
            this.titleLabel.text = this.currentItem.name
            this.bottomLine.hidden = this.currentItem.isSectionLast === true
        }
    }

    didSelected() {
        if (this.currentItem) {
            this.currentItem.action()
        }
    }

    layoutSubviews() {
        this.content.frame = XT.RectMake(15, 0, this.bounds.width - 30, 44)
        this.titleLabel.frame = {...this.content.bounds, x: 15}
        this.bottomLine.frame = XT.RectMake(15, this.bounds.height - 1, this.content.bounds.width - 30, 1)
    }

}

export class List extends XT.ViewController {

    listView = new XT.ListView()

    viewDidLoad() {
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
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
        this.listView.register(Header, "Header", this)
        this.listView.register(SectionHeader, "SectionHeader", this)
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
                reuseIdentifier: "Header",
                rowHeight: () => 160,
            },
            {
                reuseIdentifier: "SectionHeader",
                rowHeight: () => 52,
                name: "视图容器",
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "View",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new ViewSample())
                    }
                },
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "ScrollView",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new ScrollViewSample())
                    }
                },
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "ListView",
                isSectionLast: true,
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new ListViewSample())
                    }
                },
            },
        ]
        this.listView.reloadData()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.listView.frame = XT.RectMake(0, this.safeAreaInsets.top, this.view.bounds.width, this.view.bounds.height - this.safeAreaInsets.top)
    }

}
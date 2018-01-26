/// <reference path="../../xt.d.ts" />
import { ClassLoaderSample } from "./classloader";



class Header extends UI.ListCell {

    logoImageView = new UI.ImageView()
    textLabel = new UI.Label()

    constructor() {
        super()
        this.setupLogoImageView()
        this.setupLabel();
    }

    setupLogoImageView() {
        this.logoImageView.image = require('../assets/logo@2x.png')
        this.addSubview(this.logoImageView)
    }

    setupLabel() {
        this.textLabel.font = UI.Font.systemFontOfSize(14)
        this.textLabel.textAlignment = UI.TextAlignment.Center
        this.textLabel.textColor = new UI.Color(0x6b / 0xff, 0x6b / 0xff, 0x6b / 0xff)
        this.textLabel.numberOfLines = 0
        this.textLabel.text = "以下将展示 XT Core Framework 能力，具体属性参数详见 XT 开发文档。"
        this.addSubview(this.textLabel);
    }

    layoutSubviews() {
        this.logoImageView.frame = UI.RectMake((this.bounds.width - 43) / 2, 22, 43, 43)
        this.textLabel.frame = UI.RectMake(44, 64, this.bounds.width - 88, this.bounds.height - 66 - 22)
    }

}

class SectionHeader extends UI.ListCell {

    content = new UI.View()
    titleLabel = new UI.Label()

    constructor() {
        super()
        this.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.content.backgroundColor = UI.Color.whiteColor
        this.addSubview(this.content)
        this.titleLabel.font = UI.Font.boldSystemFontOfSize(14)
        this.content.addSubview(this.titleLabel)
    }

    didRender() {
        if (this.currentItem) {
            this.titleLabel.text = this.currentItem.name
        }
    }

    layoutSubviews() {
        this.content.frame = UI.RectMake(15, 8, this.bounds.width - 30, 44)
        this.titleLabel.frame = { ...this.content.bounds, x: 15 }
    }

}

class Cell extends UI.ListCell {

    content = new UI.View()
    titleLabel = new UI.Label()
    bottomLine = new UI.HRView()

    constructor() {
        super()
        this.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.content.backgroundColor = UI.Color.whiteColor
        this.addSubview(this.content)
        this.titleLabel.textColor = UI.Color.grayColor
        this.titleLabel.font = UI.Font.systemFontOfSize(13)
        this.content.addSubview(this.titleLabel)
        this.bottomLine.color = new UI.Color(0xda / 0xff, 0xda / 0xff, 0xda / 0xff)
        this.content.addSubview(this.bottomLine)
    }

    didHighlighted(value: boolean) {
        if (value) {
            this.content.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        }
        else {
            this.content.backgroundColor = UI.Color.whiteColor
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
        this.content.frame = UI.RectMake(15, 0, this.bounds.width - 30, 44)
        this.titleLabel.frame = { ...this.content.bounds, x: 15 }
        this.bottomLine.frame = UI.RectMake(15, this.bounds.height - 1, this.content.bounds.width - 30, 1)
    }

}

class Footer extends UI.ListCell {

    titleLabel = new UI.Label()

    constructor() {
        super()
        this.titleLabel.font = UI.Font.systemFontOfSize(12)
        this.titleLabel.textAlignment = UI.TextAlignment.Center
        this.titleLabel.textColor = new UI.Color(0x6b / 0xff, 0x6b / 0xff, 0x6b / 0xff)
        this.titleLabel.numberOfLines = 1
        this.titleLabel.text = "UED Opensource"
        this.addSubview(this.titleLabel)
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.titleLabel.frame = this.bounds
    }

}

export class CoreList extends UI.ViewController {

    listView = new UI.ListView()

    viewDidLoad() {
        this.title = "Core Framework"
        this.view.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.setupNavigationBar()
        this.setupListView()
        this.loadData()
    }

    setupNavigationBar() {
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.showNavigationBar()
    }

    setupListView() {
        this.listView.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.listView.register(Header, "Header", this)
        this.listView.register(SectionHeader, "SectionHeader", this)
        this.listView.register(Cell, "Cell", this)
        this.listView.register(Footer, "Footer", this)
        this.view.addSubview(this.listView)
    }

    loadData() {
        this.listView.items = [
            {
                reuseIdentifier: "Header",
                rowHeight: () => 160,
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "Class Loader",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new ClassLoaderSample())
                    }
                },
            },
            {
                reuseIdentifier: "Footer",
                rowHeight: () => 66,
            },
        ]
        this.listView.reloadData()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.listView.frame = UI.RectMake(0, this.safeAreaInsets.top, this.view.bounds.width, this.view.bounds.height - this.safeAreaInsets.top)
    }

}
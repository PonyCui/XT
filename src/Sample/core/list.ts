/// <reference path="../../xt.d.ts" />
import { ClassLoaderSample } from "./classloader";



class Header extends UI.View {

    logoImageView = new UI.ImageView()
    textLabel = new UI.Label()

    constructor() {
        super()
        this.setupLogoImageView()
        this.setupLabel();
        this.frame = UI.RectMake(0, 0, 0, 160)
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

class Cell extends UI.ListCell {

    content = new UI.View()
    titleLabel = new UI.Label()

    constructor() {
        super()
        this.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.selectionStyle = UI.ListSelectionStyle.None
        this.bottomLineInsets = UI.InsetsMake(0, 25, 0, 25)
        this.content.backgroundColor = UI.Color.whiteColor
        this.addSubview(this.content)
        this.titleLabel.textColor = UI.Color.grayColor
        this.titleLabel.font = UI.Font.systemFontOfSize(13)
        this.content.addSubview(this.titleLabel)
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
    }

}

class Footer extends UI.View {

    titleLabel = new UI.Label()

    constructor() {
        super()
        this.titleLabel.font = UI.Font.systemFontOfSize(12)
        this.titleLabel.textAlignment = UI.TextAlignment.Center
        this.titleLabel.textColor = new UI.Color(0x6b / 0xff, 0x6b / 0xff, 0x6b / 0xff)
        this.titleLabel.numberOfLines = 1
        this.titleLabel.text = "UED Opensource"
        this.addSubview(this.titleLabel)
        this.frame = UI.RectMake(0, 0, 0, 66)
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
        this.listView.listHeaderView = new Header()
        this.listView.listFooterView = new Footer()
        this.listView.register(Cell, "Cell", this)
        this.view.addSubview(this.listView)
    }

    loadData() {
        this.listView.items = [
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
        ]
        this.listView.reloadData()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.listView.frame = UI.RectMake(0, this.safeAreaInsets.top, this.view.bounds.width, this.view.bounds.height - this.safeAreaInsets.top)
    }

}
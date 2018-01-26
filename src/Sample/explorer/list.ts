/// <reference path="../../xt.d.ts" />
import { ViewSample } from "./view";
import { ScrollViewSample } from "./scrollview";
import { ListViewSample } from "./listview";
import { ImageViewSample } from "./imageview";
import { LabelSample } from "./label";
import { TextViewSample } from "./textview";
import { ButtonSample } from "./button";
import { TextFieldSample } from "./textfield";
import { TapSample } from "./tap";
import { LongPressSample } from "./longpress";
import { PanSample } from "./pan";
import { FrameLayoutSample } from "./framelayout";
import { AutoLayoutSample } from "./autolayout";
import { LinearAnimationSample } from "./linearanimation";
import { SpringAnimationSample } from "./springanimation";
import { WebViewSample } from "./webview";
import { FoundationList } from "../foundation/list";

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
        this.textLabel.text = "以下将展示 XT 组件能力，组件样式仅供参考，开发者可根据自身需求自定义组件样式，具体属性参数详见 XT 开发文档。"
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

export class List extends UI.ViewController {

    listView = new UI.ListView()

    viewDidLoad() {
        this.title = "UI Explorer"
        this.view.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.setupNavigationBar()
        this.setupListView()
        this.loadData()
    }

    setupNavigationBar() {
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        const infoItem = new UI.NavigationBarButtonItem()
        infoItem.image = require('../assets/info@3x.png')
        infoItem.onTouchUpInside = () => {
            const alertView = new UI.Alert("You Just Touch Info Button.")
            alertView.buttonTitle = "知道了"
            alertView.show(() => {
                console.log("on info");
            })
        }
        const voiceItem = new UI.NavigationBarButtonItem()
        voiceItem.image = require('../assets/voice@3x.png')
        voiceItem.onTouchUpInside = () => {
            const confirmView = new UI.Confirm("Want To Input Something?")
            confirmView.confirmTitle = "Yes"
            confirmView.cancelTitle = "No"
            confirmView.show(() => {
                console.log("Yes");
                const prompt = new UI.Prompt("Title")
                prompt.confirmTitle = "Go"
                prompt.cancelTitle = "Cancel"
                prompt.placeholder = "Input title here."
                prompt.defaultValue = this.title
                prompt.show((value: string) => {
                    this.title = value
                }, () => { })
            }, () => {
                console.log("No");
            })
        }
        this.navigationBar.setRightBarButtonItems([infoItem, voiceItem])
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

    setupRightButtons() {
        const aboutBtn = new UI.NavigationBarButtonItem()
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
                name: "Frameworks",
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "Core",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new FoundationList())
                    }
                },
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "Foundation",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new FoundationList())
                    }
                },
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
            {
                reuseIdentifier: "SectionHeader",
                rowHeight: () => 52,
                name: "内容组件",
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "ImageView",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new ImageViewSample())
                    }
                },
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "Label",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new LabelSample())
                    }
                },
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "TextView",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new TextViewSample())
                    }
                },
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "WebView",
                isSectionLast: true,
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new WebViewSample())
                    }
                },
            },
            {
                reuseIdentifier: "SectionHeader",
                rowHeight: () => 52,
                name: "交互组件",
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "Button & Switch & Slider & ActivityIndicator",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new ButtonSample())
                    }
                },
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "TextField",
                isSectionLast: true,
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new TextFieldSample())
                    }
                },
            },
            {
                reuseIdentifier: "SectionHeader",
                rowHeight: () => 52,
                name: "手势",
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "Tap & Double Tap",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new TapSample())
                    }
                },
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "LongPress",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new LongPressSample())
                    }
                },
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "Pan",
                isSectionLast: true,
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new PanSample())
                    }
                },
            },
            {
                reuseIdentifier: "SectionHeader",
                rowHeight: () => 52,
                name: "布局",
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "FrameLayout",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new FrameLayoutSample())
                    }
                },
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "AutoLayout",
                isSectionLast: true,
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new AutoLayoutSample())
                    }
                },
            },
            {
                reuseIdentifier: "SectionHeader",
                rowHeight: () => 52,
                name: "动画",
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "Linear Animation",
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new LinearAnimationSample())
                    }
                },
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: () => 44,
                name: "Spring Animation",
                isSectionLast: true,
                action: () => {
                    if (this.navigationController) {
                        this.navigationController.pushViewController(new SpringAnimationSample())
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
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
import { CoreList } from "../core/list";
import { CanvasSample } from "./canvas";
import { ExtViewSample } from "./extview";
import { CollectionViewSample } from "./collectionview";
import { RotateSample } from "./rotate";
import { PinchSample } from "./pinch";
import { StackViewSample } from "./stackview";

class ListHeader extends UI.View {

    logoImageView = new UI.ImageView()
    textLabel = new UI.Label()

    constructor() {
        super()
        this.setupLogoImageView()
        this.setupLabel();
        this.frame = UI.RectMake(0, 0, 0, 160)
    }

    setupLogoImageView() {
        this.logoImageView.image = UI.Image.fromSource('../assets/logo@2x.png')
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

class SectionHeader extends UI.View {

    content = new UI.View()
    titleLabel = new UI.Label()

    constructor(title: string) {
        super()
        this.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.content.backgroundColor = UI.Color.whiteColor
        this.addSubview(this.content)
        this.titleLabel.font = UI.Font.boldSystemFontOfSize(14)
        this.titleLabel.text = title
        this.content.addSubview(this.titleLabel)
        this.frame = UI.RectMake(0, 0, 0, 52)
    }

    layoutSubviews() {
        this.content.frame = UI.RectMake(15, 8, this.bounds.width - 30, 44)
        this.titleLabel.frame = { ...this.content.bounds, x: 15 }
    }

}

class Cell extends UI.ListCell {

    innerContentView = new UI.View()
    titleLabel = new UI.Label()

    constructor() {
        super()
        this.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.selectionStyle = UI.ListSelectionStyle.None
        this.bottomLineInsets = UI.InsetsMake(0, 25, 0, 25)
        this.innerContentView.backgroundColor = UI.Color.whiteColor
        this.contentView.addSubview(this.innerContentView)
        this.titleLabel.textColor = UI.Color.grayColor
        this.titleLabel.font = UI.Font.systemFontOfSize(13)
        this.innerContentView.addSubview(this.titleLabel)
    }

    didHighlighted(value: boolean) {
        if (value) {
            this.innerContentView.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        }
        else {
            this.innerContentView.backgroundColor = UI.Color.whiteColor
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
        super.layoutSubviews()
        this.innerContentView.frame = UI.RectMake(15, 0, this.bounds.width - 30, 44)
        this.titleLabel.frame = { ...this.innerContentView.bounds, x: 15 }
    }

}

class ListFooter extends UI.View {

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

export class List extends UI.ViewController {

    supportOrientations = [UI.DeviceOrientation.Portrait, UI.DeviceOrientation.LandscapeLeft, UI.DeviceOrientation.LandscapeRight]

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
        this.listView.listHeaderView = new ListHeader()
        this.listView.listFooterView = new ListFooter()
        this.listView.register(Cell, "Cell", this)
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
            (() => {
                const section = new UI.ListSection()
                section.headerView = new SectionHeader("Frameworks")
                section.items = [
                    {
                        reuseIdentifier: "Cell",
                        rowHeight: () => 44,
                        name: "Core",
                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new CoreList())
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
                ]
                return section
            })(),
            (() => {
                const section = new UI.ListSection()
                section.headerView = new SectionHeader("上下文")
                section.items = [
                    {
                        reuseIdentifier: "Cell",
                        rowHeight: () => 44,
                        name: "Create UI Context",
                        action: () => {
                            UI.Context.bundleURL = '/dist/Sample/'
                            UI.Context.startWithNamed('sample.min.js', undefined, (rootViewController) => {
                                if (this.navigationController) {
                                    this.navigationController.pushViewController(rootViewController)
                                }
                            }).retain(this)
                        },
                    },
                ]
                return section
            })(),
            (() => {

                const section = new UI.ListSection()
                section.headerView = new SectionHeader("视图容器")
                section.items = [
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
                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new ListViewSample())
                            }
                        },
                    },
                    {
                        reuseIdentifier: "Cell",
                        rowHeight: () => 44,
                        name: "CollectionView",
                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new CollectionViewSample())
                            }
                        },
                    },
                    {
                        reuseIdentifier: "Cell",
                        rowHeight: () => 44,
                        name: "ExtView",
                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new ExtViewSample())
                            }
                        },
                    },
                ]
                return section
            })(),
            (() => {
                const section = new UI.ListSection()
                section.headerView = new SectionHeader("内容组件")
                section.items = [
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
                        name: "CanvasView",
                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new CanvasSample())
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

                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new WebViewSample())
                            }
                        },
                    },
                ]
                return section
            })(),
            (() => {
                const section = new UI.ListSection()
                section.headerView = new SectionHeader("交互组件")
                section.items = [
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

                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new TextFieldSample())
                            }
                        },
                    },
                ]
                return section
            })(),
            (() => {
                const section = new UI.ListSection()
                section.headerView = new SectionHeader("手势")
                section.items = [
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

                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new PanSample())
                            }
                        },
                    },
                    {
                        reuseIdentifier: "Cell",
                        rowHeight: () => 44,
                        name: "Rotate",
                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new RotateSample())
                            }
                        },
                    },
                    {
                        reuseIdentifier: "Cell",
                        rowHeight: () => 44,
                        name: "Pinch",
                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new PinchSample())
                            }
                        },
                    },
                ]
                return section
            })(),
            (() => {
                const section = new UI.ListSection()
                section.headerView = new SectionHeader("布局")
                section.items = [
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

                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new AutoLayoutSample())
                            }
                        },
                    },
                    {
                        reuseIdentifier: "Cell",
                        rowHeight: () => 44,
                        name: "StackView",

                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new StackViewSample())
                            }
                        },
                    },
                ]
                return section
            })(),
            (() => {
                const section = new UI.ListSection()
                section.headerView = new SectionHeader("动画")
                section.items = [
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

                        action: () => {
                            if (this.navigationController) {
                                this.navigationController.pushViewController(new SpringAnimationSample())
                            }
                        },
                    },
                ]
                return section
            })(),
        ]
        this.listView.reloadData()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.listView.contentInset = UI.InsetsMake(0, 0, this.safeAreaInsets.bottom, 0)
        this.listView.frame = UI.RectMake(0, this.safeAreaInsets.top, this.view.bounds.width, this.view.bounds.height - this.safeAreaInsets.top)
    }

}
class Cell extends UI.CollectionCell {

    iconImageView = new UI.ImageView
    titleLabel = new UI.Label

    constructor() {
        super()
        this.iconImageView.contentMode = UI.ContentMode.ScaleAspectFit
        this.addSubview(this.iconImageView)
        this.titleLabel.font = UI.Font.systemFontOfSize(12)
        this.titleLabel.textColor = UI.Color.colorWithHex('#565656')
        this.titleLabel.textAlignment = UI.TextAlignment.Center
        this.addSubview(this.titleLabel)
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.iconImageView.frame = UI.RectMake((this.bounds.width - 30) / 2, (this.bounds.height - 30) / 2.0 - 15, 30, 30)
        this.titleLabel.frame = UI.RectMake(0, this.bounds.height / 2.0 + 10, this.bounds.width, 18)
    }

    didRender() {
        super.didRender()
        if (this.currentItem) {
            this.iconImageView.image = this.currentItem.icon
            this.titleLabel.text = this.currentItem.title || ""
        }
    }

}

export class CollectionViewSample extends UI.ViewController {

    collectionView = new UI.CollectionView

    viewDidLoad() {
        super.viewDidLoad()
        this.collectionView.register(Cell, "Cell", this)
		this.collectionView.sectionInsets = UI.InsetsMake(0, 15, 0, 15)
		this.collectionView.scrollDirection = UI.CollectionViewScrollDirection.Horizontal
        this.view.addSubview(this.collectionView)
        this.loadData()
    }

    loadData() {
        let creativeCenter = (() => {
            let section = new UI.CollectionSection
            let headerView = new UI.View
            headerView.frame = UI.RectMake(0, 0, 0, 44)
            let headerTitleView = new UI.Label
            headerTitleView.frame = UI.RectMake(15, 0, 44, 44)
            headerTitleView.font = UI.Font.boldSystemFontOfSize(14)
            headerTitleView.textColor = UI.Color.colorWithHex('#2c2c2c')
            headerTitleView.text = "创作中心"
            headerView.addSubview(headerTitleView)
            section.headerView = headerView
            section.items = [
                {
                    reuseIdentifier: "Cell",
                    itemSize: (width, height) => {
                        return UI.SizeMake((width - 30) / 4.0, (width - 30) / 4.0)
                    },
                    //icon: UI.Image.fromSource('./res/icon_my_post@2x.png'),
                    title: "我的投稿",
                },
                {
                    reuseIdentifier: "Cell",
                    itemSize: (width, height) => {
                        return UI.SizeMake((width - 30) / 4.0, (width - 30) / 4.0)
                    },
                    // icon: UI.Image.fromSource('./res/icon_my_draft@2x.png'),
                    title: "我的草稿",
                },
            ]
            return section
        })()
        let subscribeCenter = (() => {
            let section = new UI.CollectionSection
			let headerView = new UI.View
			headerView.backgroundColor
            headerView.frame = UI.RectMake(0, 0, 0, 44)
            let headerTitleView = new UI.Label
            headerTitleView.frame = UI.RectMake(15, 0, 44, 44)
            headerTitleView.font = UI.Font.boldSystemFontOfSize(14)
            headerTitleView.textColor = UI.Color.colorWithHex('#2c2c2c')
            headerTitleView.text = "订阅"
            headerView.addSubview(headerTitleView)
            section.headerView = headerView
            section.items = [
                {
                    reuseIdentifier: "Cell",
                    itemSize: (width, height) => {
                        return UI.SizeMake((width - 30) / 4.0, (width - 30) / 4.0)
                    },
                    //icon: UI.Image.fromSource('./res/icon_my_post@2x.png'),
                    title: "关注的作者",
                },
                {
                    reuseIdentifier: "Cell",
                    itemSize: (width, height) => {
                        return UI.SizeMake((width - 30) / 4.0, (width - 30) / 4.0)
                    },
                    //icon: UI.Image.fromSource('./res/icon_my_post@2x.png'),
                    title: "关注的角色",
                },
                {
                    reuseIdentifier: "Cell",
                    itemSize: (width, height) => {
                        return UI.SizeMake((width - 30) / 4.0, (width - 30) / 4.0)
                    },
                    //icon: UI.Image.fromSource('./res/icon_my_post@2x.png'),
                    title: "我的收藏",
                },
                {
                    reuseIdentifier: "Cell",
                    itemSize: (width, height) => {
                        return UI.SizeMake((width - 30) / 4.0, (width - 30) / 4.0)
					},
					title: "我的收藏",
                },
            ]
            return section
        })()
        let othersCenter = (() => {
            let section = new UI.CollectionSection
            let headerView = new UI.View
            headerView.frame = UI.RectMake(0, 0, 0, 44)
            let headerTitleView = new UI.Label
            headerTitleView.frame = UI.RectMake(15, 0, 44, 44)
            headerTitleView.font = UI.Font.boldSystemFontOfSize(14)
            headerTitleView.textColor = UI.Color.colorWithHex('#2c2c2c')
            headerTitleView.text = "其他"
            headerView.addSubview(headerTitleView)
            section.headerView = headerView
            section.items = [
                {
                    reuseIdentifier: "Cell",
                    itemSize: (width, height) => {
                        return UI.SizeMake((width - 30) / 4.0, (width - 30) / 4.0)
                    },
                    //icon: UI.Image.fromSource('./res/icon_my_post@2x.png'),
                    title: "我的积分",
                },
                {
                    reuseIdentifier: "Cell",
                    itemSize: (width, height) => {
                        return UI.SizeMake((width - 30) / 4.0, (width - 30) / 4.0)
                    },
                    //icon: UI.Image.fromSource('./res/icon_my_post@2x.png'),
                    title: "我的消息",
                },
                {
                    reuseIdentifier: "Cell",
                    itemSize: (width, height) => {
                        return UI.SizeMake((width - 30) / 4.0, (width - 30) / 4.0)
                    },
                    //icon: UI.Image.fromSource('./res/icon_my_post@2x.png'),
                    title: "个人资料",
                },
                {
                    reuseIdentifier: "Cell",
                    itemSize: (width, height) => {
                        return UI.SizeMake((width - 30) / 4.0, (width - 30) / 4.0)
                    },
                },
            ]
            return section
        })()
        this.collectionView.items = [
            creativeCenter,
            subscribeCenter,
            othersCenter,
        ]
        this.collectionView.reloadData()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.collectionView.frame = this.view.bounds
    }

}
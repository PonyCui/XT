/// <reference path="../../xt.d.ts" />

class UserCell extends UI.CollectionCell {

	iconImageView = new UI.ImageView
	nicknameLabel = new UI.Label

	constructor() {
		super()
		this.iconImageView.clipsToBounds = true
		this.iconImageView.backgroundColor = UI.Color.lightGrayColor
		this.addSubview(this.iconImageView)
		this.nicknameLabel.font = UI.Font.systemFontOfSize(15)
		this.nicknameLabel.text = "#nickname"
		this.nicknameLabel.textAlignment = UI.TextAlignment.Center
		this.addSubview(this.nicknameLabel)
	}

	layoutSubviews() {
		super.layoutSubviews()
		this.iconImageView.cornerRadius = this.bounds.width / 2
		this.iconImageView.frame = UI.RectMake(0, 0, this.bounds.width, this.bounds.width)
		this.nicknameLabel.frame = UI.RectMake(0, this.bounds.width, this.bounds.width, 32)
	}

	didHighlighted(value: boolean) {

	}

	didRender() {
		super.didRender()
		if (this.currentItem) {
			this.iconImageView.loadImage(this.currentItem.avatar_url)
			this.nicknameLabel.text = this.currentItem.login
		}
	}

}

export class CollectionViewSample extends UI.ViewController {

	collectionView = new UI.CollectionView

	viewDidLoad() {
		super.viewDidLoad()
		this.title = "CollectionView"
		this.showNavigationBar()
		this.view.addSubview(this.collectionView)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"HV:|-0-[collectionView]-0-|", this
		))
		this.setupCollectionView()
	}

	private since = 0
	private dataItems: any[] = []

	setupCollectionView() {
		this.collectionView.register(UserCell, "Cell")
		this.collectionView.scrollDirection = UI.CollectionViewScrollDirection.Vertical
		this.collectionView.sectionInsets = UI.InsetsMake(20, 20, 20, 20)
		this.collectionView.lineSpacing = 20
		this.collectionView.itemSpacing = 20
		this.collectionView.alpha = 0.0
		this.setupRefreshControl()
		this.setupLoadMoreControl()
		this.loadData(() => {
			UI.View.animationWithDuration(0.3, () => {
				this.collectionView.alpha = 1.0
			})
		})
	}

	setupRefreshControl() {
		this.collectionView.refreshControl = new UI.RefreshControl()
		this.collectionView.refreshControl.onRefresh = () => {
			this.since = 0
			this.dataItems = []
			this.loadData(() => {
				this.collectionView.refreshControl && this.collectionView.refreshControl.endRefreshing()
				if (this.collectionView.loadMoreControl) {
					this.collectionView.loadMoreControl.enabled = true
				}
			})
		}
	}

	setupLoadMoreControl() {
		this.collectionView.loadMoreControl = new UI.LoadMoreControl()
		this.collectionView.loadMoreControl.enabled = true
		this.collectionView.loadMoreControl.onLoad = () => {
			this.loadData(() => {
				if (this.collectionView.loadMoreControl) {
					this.collectionView.loadMoreControl.enabled = this.since < 300
					this.collectionView.loadMoreControl.endLoading()
				}
			})
		}
	}

	loadData(complete: () => void) {
		NS.URLSession.sharedSession.dataTaskWithURL("http://xt-studio.com/GHUser/" + this.since.toString() + ".json", (data) => {
			if (data) {
				try {
					const json: any[] = JSON.parse(data.utf8String()!)
					json.forEach(it => {
						this.dataItems.push({
							...it,
							reuseIdentifier: "Cell",
							itemSize: (width: number) => UI.SizeMake((width - 80) / 3.0, (width - 80) / 3.0 + 32)
						})
						this.since = it["id"]
					})
					this.collectionView.items = this.dataItems
					this.collectionView.reloadData()
					complete()
				} catch (e) { console.log(e.message) }
			}
		}).resume()
	}

}
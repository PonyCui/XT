/// <reference path="../../xt.d.ts" />

class UserCell extends UI.ListCell {

	iconImageView = new UI.ImageView
	nicknameLabel = new UI.Label

	constructor() {
		super()
		this.iconImageView.cornerRadius = 4
		this.iconImageView.clipsToBounds = true
		this.iconImageView.backgroundColor = UI.Color.lightGrayColor
		this.addSubview(this.iconImageView)
		this.nicknameLabel.font = UI.Font.systemFontOfSize(15)
		this.nicknameLabel.text = "#nickname"
		this.addSubview(this.nicknameLabel)
		this.setupLayout()
	}

	setupLayout() {
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:|-15-[iconImageView(44)]-8-[nicknameLabel]-15-|", this
		))
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:[iconImageView(44)]", this
		))
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:iconImageView.centerY(_)", this
		))
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:[nicknameLabel(44)]", this
		))
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:nicknameLabel.centerY(_)", this
		))
		this.layoutIfNeeded()
	}

	didRender() {
		super.didRender()
		if (this.currentItem) {
			this.iconImageView.loadImage(this.currentItem.avatar_url)
			this.nicknameLabel.text = this.currentItem.login
		}
	}

}

export class ListViewSample extends UI.ViewController {

	listView = new UI.ListView
	loadingIndicator = (() => {
		const value = new UI.ActivityIndicatorView()
		value.tintColor = UI.Color.blackColor
		value.style = UI.ActivityIndicatorViewStyle.Large
		return value
	})()

	viewDidLoad() {
		super.viewDidLoad()
		this.navigationBar.backgroundColor = UI.Color.blackColor
		this.navigationBar.lightContent = true
		this.title = "ListView"
		this.showNavigationBar()
		this.listView.register(UserCell, "Cell", this)
		this.setupRefreshControl()
		this.setupLoadMoreControl()
		this.view.addSubview(this.listView)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"HV:|-0-[listView]-0-|", this
		))
		this.view.addSubview(this.loadingIndicator)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"HV:|-0-[loadingIndicator]-0-|", this
		))
		this.view.layoutIfNeeded()
		this.listView.alpha = 0.0
		this.loadingIndicator.startAnimating(0.3)
		this.loadData(() => {
			this.loadingIndicator.stopAnimating()
			UI.View.animationWithDuration(0.3, () => {
				this.listView.alpha = 1.0
			})
		})
	}

	private since = 0
	private dataItems: any[] = []

	setupRefreshControl() {
		this.listView.refreshControl = new UI.RefreshControl()
		this.listView.refreshControl.onRefresh = () => {
			this.since = 0
			this.dataItems = []
			this.loadData(() => {
				this.listView.refreshControl && this.listView.refreshControl.endRefreshing()
				if (this.listView.loadMoreControl) {
					this.listView.loadMoreControl.enabled = true
				}
			})
		}
	}

	setupLoadMoreControl() {
		this.listView.loadMoreControl = new UI.LoadMoreControl()
		this.listView.loadMoreControl.enabled = true
		this.listView.loadMoreControl.onLoad = () => {
			this.loadData(() => {
				if (this.listView.loadMoreControl) {
					this.listView.loadMoreControl.enabled = this.since < 300
					this.listView.loadMoreControl.endLoading()
				}
			})
		}
	}

	loadData(complete: () => void) {
		NS.URLSession.sharedSession.dataTaskWithURL("https://api.github.com/users?since=" + this.since.toString(), (data) => {
			if (data) {
				try {
					const json: any[] = JSON.parse(data.utf8String()!)
					json.forEach(it => {
						this.dataItems.push({
							...it,
							reuseIdentifier: "Cell",
							rowHeight: () => 70,
						})
						this.since = it["id"]
					})
					this.listView.items = this.dataItems
					this.listView.reloadData()
					complete()
				} catch (e) { console.log(e.message) }
			}
		}).resume()
	}

}
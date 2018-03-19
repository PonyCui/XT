/// <reference path="../../xt.d.ts" />

class SampleCell extends UI.CollectionCell {

	constructor() {
		super()
		this.contentView.backgroundColor = UI.Color.greenColor
	}

	didHighlighted(value: boolean) {
		value ? this.contentView.alpha = 0.5 : this.contentView.alpha = 1.0
	}

	didRender() {
		this.contentView.backgroundColor = UI.Color.grayColor
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

	setupCollectionView() {
		this.collectionView.register(SampleCell, "Cell")
		this.collectionView.scrollDirection = UI.CollectionViewScrollDirection.Horizontal
		this.collectionView.sectionInsets = UI.InsetsMake(20, 10, 20, 10)
		this.collectionView.lineSpacing = 20
		this.collectionView.itemSpacing = 20
		let items = [];
		for (let index = 0; index < 200; index++) {
			items.push({
				reuseIdentifier: "Cell",
				itemSize: (width: number, height: number) => UI.SizeMake(44, 44),
			})
		}
		const firstSection = new UI.CollectionSection()
		firstSection.headerView = new UI.View()
		firstSection.headerView.frame = UI.RectMake(0, 0, 44, 44)
		firstSection.headerView.backgroundColor = UI.Color.yellowColor
		firstSection.footerView = new UI.View()
		firstSection.footerView.frame = UI.RectMake(0, 0, 44, 66)
		firstSection.footerView.backgroundColor = UI.Color.greenColor
		firstSection.items = items
		this.collectionView.items = [firstSection, {
			reuseIdentifier: "Cell",
			itemSize: (width: number, height: number) => UI.SizeMake(44, 44),
		}]
		this.collectionView.reloadData()
	}

}
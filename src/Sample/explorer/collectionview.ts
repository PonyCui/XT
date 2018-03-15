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
		this.contentView.backgroundColor = UI.Color.redColor
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
		// this.collectionView.scrollDirection = UI.CollectionViewScrollDirection.Horizontal
		this.collectionView.edgeInsets = UI.InsetsMake(20, 10, 20, 10)
		this.collectionView.lineSpacing = 20
		this.collectionView.itemSpacing = 20
		this.collectionView.items = [
			{
				reuseIdentifier: "Cell",
				itemSize: (width: number, height: number) => UI.SizeMake(44, 44),
			},
			{
				reuseIdentifier: "Cell",
				itemSize: (width: number, height: number) => UI.SizeMake(100, 44),
			},
			{
				reuseIdentifier: "Cell",
				itemSize: (width: number, height: number) => UI.SizeMake(60, 44),
			},
			{
				reuseIdentifier: "Cell",
				itemSize: (width: number, height: number) => UI.SizeMake(44, 44),
			},
			{
				reuseIdentifier: "Cell",
				itemSize: (width: number, height: number) => UI.SizeMake(44, 44),
			},
			{
				reuseIdentifier: "Cell",
				itemSize: (width: number, height: number) => UI.SizeMake(44, 44),
			},
		]
		this.collectionView.reloadData()
	}

}
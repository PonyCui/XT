import { ScrollView } from "./ScrollView";
import { Size, SizeMake, Insets, InsetsMake, Rect, RectMake, RectEqual, Point } from "../interface/Rect";
import { View } from "./View";
import { CollectionItem } from "../interface/CollectionView";

export class CollectionCell extends View {

    reuseIdentifier: string
    currentItem?: CollectionItem
    selectionView: View = new View();
    contentView: View = new View();
    context?: any
    didHighlighted(highlighted: boolean) { }
    didSelected() { }
    didRender() { }

    constructor(ref: any = undefined) {
        super(ref)
        this.selectionView.alpha = 0.0;
        this.addSubview(this.selectionView);
        this.addSubview(this.contentView);
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.selectionView.frame = this.bounds
        this.contentView.frame = this.bounds
    }

    // Private

    _isBusy = false

}

export enum CollectionViewScrollDirection {
    Vertical,
    Horizontal,
}

class CollectionViewFlowLayout {

    public itemFrames: Rect[] = []
    public contentSize: { width: number, height: number } = { width: 0, height: 0 }

    constructor(readonly collectionView: CollectionView) {

    }

    reload() {
        this.contentSize.width = 0
        this.contentSize.height = 0
        if (this.collectionView.scrollDirection === CollectionViewScrollDirection.Vertical) {
            const wrapWidth = this.collectionView.bounds.width - this.collectionView.edgeInsets.left - this.collectionView.edgeInsets.right
            const itemSizes = this.collectionView.items.map(item => {
                return item.itemSize(this.collectionView.bounds.width, this.collectionView.bounds.height)
            })
            let firstItem = false
            let currentX = 0
            let currentY = 0
            let lineHeight = 0;
            let lineContentWidth = 0;
            let lineStartIndex = 0;
            let lineEndIndex = -1;
            this.itemFrames = itemSizes.map((item, idx) => {
                if (idx > lineEndIndex) {
                    firstItem = true
                    currentX = 0
                    currentY += lineHeight + this.collectionView.lineSpacing
                }
                if (firstItem) {
                    lineHeight = 0;
                    lineStartIndex = idx
                    lineEndIndex = idx
                    let left = 0
                    for (let index = idx; index < itemSizes.length; index++) {
                        const elementSize = itemSizes[index]
                        lineHeight = Math.max(lineHeight, elementSize.height)
                        lineContentWidth += elementSize.width
                        left += this.collectionView.itemSpacing + elementSize.width
                        if (left >= wrapWidth) {
                            lineEndIndex = index;
                            break;
                        }
                        else if (index + 1 < itemSizes.length &&
                            left + this.collectionView.itemSpacing + itemSizes[index + 1].width >= wrapWidth) {
                            lineEndIndex = index;
                            break;
                        }
                        else {
                            lineEndIndex = Infinity;
                        }
                    }
                    firstItem = false
                }
                const frame = RectMake(this.collectionView.edgeInsets.left + currentX, this.collectionView.edgeInsets.top + currentY + (lineHeight - item.height) / 2.0, item.width, item.height)
                this.contentSize.width = Math.max(this.contentSize.width, frame.x + frame.width + this.collectionView.edgeInsets.right)
                this.contentSize.height = Math.max(this.contentSize.height, frame.y + frame.height + this.collectionView.edgeInsets.bottom)
                if (lineEndIndex === Infinity) {
                    currentX += frame.width + this.collectionView.itemSpacing
                }
                else if (lineEndIndex - lineStartIndex > 0) {
                    currentX += frame.width + (wrapWidth - lineContentWidth) / (lineEndIndex - lineStartIndex)
                }
                return frame
            })
        }
    }

}

export class CollectionView extends ScrollView {

    private layout = new CollectionViewFlowLayout(this)

    constructor() {
        super()
        this.alwaysBounceVertical = true;
    }

    private _previousBounds = this.bounds

    layoutSubviews() {
        super.layoutSubviews()
        if (!RectEqual(this._previousBounds, this.bounds)) {
            this._previousBounds = this.bounds
            this.reloadData()
        }
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.CollectionView",
            items: this.items,
            subviews: undefined,
        }
    }

    scrollDirection: CollectionViewScrollDirection = CollectionViewScrollDirection.Vertical

    items: CollectionItem[]

    private reuseMapping: { [key: string]: typeof CollectionCell } = {};
    private reuseContexts: { [key: string]: any } = {};

    register(clazz: typeof CollectionCell, reuseIdentifier: string, context: any = undefined) {
        this.reuseMapping[reuseIdentifier] = clazz;
        this.reuseContexts[reuseIdentifier] = context;
    }

    edgeInsets: Insets = InsetsMake(0, 0, 0, 0)
    lineSpacing: number = 0
    itemSpacing: number = 0

    reloadData() {
        this.layout.reload()
        this.contentSize = SizeMake(this.layout.contentSize.width, this.layout.contentSize.height)
        this.reloadVisibleItems()
    }

    scrollerDidScroll() {
        super.scrollerDidScroll()
        if (this._reusingCells !== undefined) {
            this.reloadVisibleItems()
        }
    }

    private _reusingCells: CollectionCell[] = []

    reloadVisibleItems() {
        let contentOffset = { ...this.contentOffset };
        let contentSize = this.contentSize;
        let bounds = this.bounds;
        contentOffset.y = Math.max(0.0, Math.min(contentSize.height - bounds.height, contentOffset.y))
        this.markInvisibleCellNoBusy(contentOffset, bounds);
        let visibleIndexes: number[] = []
        const visibleRect = RectMake(contentOffset.x, contentOffset.y, bounds.width, bounds.height)
        this.layout.itemFrames.forEach((itemFrame, idx) => {
            if (itemFrame.x > visibleRect.x &&
                itemFrame.x < visibleRect.x + visibleRect.width &&
                itemFrame.y > visibleRect.y &&
                itemFrame.y < visibleRect.y + visibleRect.height) {
                visibleIndexes.push(idx)
            }
        })
        const visibleCells: CollectionCell[] = visibleIndexes.map(index => {
            const dataItem = this.items[index]
            const cell = this._reusingCells.filter(cell => { return !cell._isBusy && cell.reuseIdentifier === dataItem.reuseIdentifier })[0]
                || (this.reuseMapping[dataItem.reuseIdentifier] !== undefined ? new this.reuseMapping[dataItem.reuseIdentifier]() : undefined)
                || new CollectionCell();
            cell.reuseIdentifier = dataItem.reuseIdentifier
            cell.context = this.reuseContexts[dataItem.reuseIdentifier]
            cell.frame = this.layout.itemFrames[index]
            cell._isBusy = true
            cell.currentItem = dataItem
            cell.didRender()
            if (this._reusingCells.indexOf(cell) < 0) {
                this._reusingCells.push(cell)
            }
            return cell
        })
        visibleCells.forEach(cell => {
            if (cell.superview == undefined) {
                this.addSubview(cell)
            }
        })
    }

    private markInvisibleCellNoBusy(contentOffset: Point, bounds: Rect) {
        let contentSize = this.contentSize;
        if (this.scrollDirection == CollectionViewScrollDirection.Horizontal) {
            if (contentOffset.x < 0.0) {
                return;
            }
            if (contentOffset.x > contentSize.width - bounds.width) {
                return;
            }
            this._reusingCells.filter(cell => {
                if (cell._isBusy) {
                    const cellFrame = cell.frame;
                    return cellFrame.x + cellFrame.width < contentOffset.x
                        || cellFrame.x > contentOffset.x + bounds.width
                }
                return false
            }).forEach(cell => {
                cell._isBusy = false;
            });
        }
        else if (this.scrollDirection == CollectionViewScrollDirection.Vertical) {
            if (contentOffset.y < 0.0) {
                return;
            }
            if (contentOffset.y > contentSize.height - bounds.height) {
                return;
            }
            this._reusingCells.filter(cell => {
                if (cell._isBusy) {
                    const cellFrame = cell.frame;
                    return cellFrame.y + cellFrame.height < contentOffset.y
                        || cellFrame.y > contentOffset.y + bounds.height
                }
                return false
            }).forEach(cell => {
                cell._isBusy = false;
            });
        }



    }

}
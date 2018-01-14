import { ScrollView } from "./ScrollView";
import { View } from "./View";
import { ListItem, ListSelectionStyle } from "../../interface/ListView";
import { Color } from "../../interface/Color";
import { Rect, Point } from "../../interface/Rect";
import { InteractionState } from "../../interface/View";
import { LongPressGestureRecognizer } from "../libraries/touch/LongPressGestureRecognizer";

export class ListCell extends View {

    currentItem?: ListItem

    reuseIdentifier: string = ""
    selectionStyle: ListSelectionStyle = ListSelectionStyle.Gray;
    selectionView: View = new View();
    contentView: View = new View();
    _isBusy = false
    context?: any

    constructor() {
        super();
        this.selectionView.backgroundColor = new Color(0xd0 / 0xff, 0xd0 / 0xff, 0xd0 / 0xff);
        this.selectionView.alpha = 0.0;
        this.selectionView.hidden = true;
        this.addSubview(this.selectionView);
        this.addSubview(this.contentView);
        this.contentView.userInteractionEnabled = true
        this.userInteractionEnabled = true
        this.longPressDuration = 0.05
        this.onTap = () => {
            this.highligted = true
            this.selectionView.hidden = false
            this.didSelected();
            setTimeout(() => {
                View.animationWithDuration(0.15, () => {
                    this.highligted = false
                }, () => { this.selectionView.hidden = true })
            }, 250)
        }
        this.onLongPress = (state: InteractionState) => {
            if (state == InteractionState.Began) {
                this.highligted = true
                this.selectionView.hidden = false
            }
            else if (state == InteractionState.Ended) {
                this.didSelected();
                View.animationWithDuration(0.15, () => {
                    this.highligted = false
                }, () => { this.selectionView.hidden = true })
            }
            else if (state == InteractionState.Cancelled) {
                this.highligted = false
                this.selectionView.hidden = true
            }
        }
        this.gestureRecongnizers.forEach(t => {
            if (t instanceof LongPressGestureRecognizer) {
                t.cancellable = true
            }
        })
    }

    layoutSubviews() {
        super.layoutSubviews();
        this.selectionView.frame = this.bounds;
        this.contentView.frame = this.bounds;
    }

    public set highligted(value: boolean) {
        this.didHighlighted(value)
        if (this.selectionStyle == ListSelectionStyle.None) { return }
        this.selectionView.alpha = value ? 1.0 : 0.0;
    }

    didHighlighted(highlighted: boolean) { }
    didSelected() { }
    didRender() { }

}

export class ListView extends ScrollView {

    constructor() {
        super()
        this.alwaysBounceVertical = true;
    }

    private reuseMapping: { [key: string]: typeof ListCell } = {};
    private reuseContexts: { [key: string]: any } = {};

    public renderItem?: (cell: ListCell, item: ListItem) => void

    public register(clazz: typeof ListCell, reuseIdentifier: string, context: any) {
        this.reuseMapping[reuseIdentifier] = clazz;
        this.reuseContexts[reuseIdentifier] = context;
    }

    private _items: ListItem[] = [];

    public get items() {
        return this._items.slice();
    }

    public set items(value: ListItem[]) {
        this._items = value.slice();
    }

    private _cacheRows: {
        minY: number;
        maxY: number;
        item: ListItem;
    }[] = [];

    private _reusingCells: ListCell[] = []

    public reloadData() {
        let currentY = 0;
        this._cacheRows = this.items.map((item) => {
            let minY = currentY;
            let maxY = minY + item.rowHeight(this.bounds.width);
            currentY = maxY;
            return { minY, maxY, item }
        });
        this.contentSize = { width: 0, height: currentY }
        this._nextSetted = false;
        this._nextReloadMinY = undefined;
        this._nextReloadMaxY = undefined;
        this.reloadVisibleRows();
    }

    layoutSubviews() {
        super.layoutSubviews();
        this.reloadData()
    }

    scrollerDidScroll() {
        super.scrollerDidScroll()
        if (this._reusingCells !== undefined) {
            this.reloadVisibleRows();
        }
    }

    private _nextSetted = false;
    private _nextReloadMinY?: number = undefined;
    private _nextReloadMaxY?: number = undefined;

    private reloadVisibleRows() {
        let contentOffset = this.contentOffset;
        let bounds = this.bounds;
        if (this._nextSetted === true &&
            this._nextReloadMinY != this._nextReloadMaxY &&
            (this._nextReloadMinY !== undefined && contentOffset.y > (this._nextReloadMinY || -Infinity)) &&
            (this._nextReloadMaxY !== undefined && contentOffset.y < (this._nextReloadMaxY || Infinity))) {
            return;
        }
        this.markInvisibleCellNoBusy(contentOffset, bounds);
        this._nextSetted = true;
        this._nextReloadMinY = undefined;
        this._nextReloadMaxY = undefined;
        let visibleRows: {
            minY: number;
            maxY: number;
            item: ListItem;
        }[] = [];
        let startIndex = 0;
        let left = 0;
        let right = this._cacheRows.length - 1
        while (true) {
            if (Math.abs(right - left) <= 1) { startIndex = left; break; }
            let mid = Math.ceil((right + left) / 2)
            if (this._cacheRows[mid].minY <= contentOffset.y && this._cacheRows[mid].maxY >= contentOffset.y) {
                startIndex = mid;
                break;
            }
            else if (this._cacheRows[mid].maxY < contentOffset.y) {
                left = mid
            }
            else if (this._cacheRows[mid].minY > contentOffset.y) {
                right = mid
            }
        }
        if (startIndex > 0) {
            this._nextReloadMinY = this._cacheRows[startIndex - 1].maxY;
        }
        else {
            this._nextReloadMinY = 0
        }
        for (let index = startIndex; index < this._cacheRows.length; index++) {
            const item = this._cacheRows[index];
            if (this._nextReloadMaxY === undefined && item.minY >= contentOffset.y + bounds.height) {
                this._nextReloadMaxY = item.minY - bounds.height;
            }
            if (item.maxY > contentOffset.y && item.minY < contentOffset.y + bounds.height) {
                visibleRows.push(item)
            }
            else if (item.minY > contentOffset.y + bounds.height) {
                break;
            }
        }
        let renderingRows: {
            minY: number;
            maxY: number;
            item: ListItem;
        }[] = []
        visibleRows.forEach(row => {
            var found = false
            this._reusingCells.forEach(cell => {
                if (cell.currentItem === row.item) {
                    cell.frame = { x: 0, y: row.minY, width: bounds.width, height: row.maxY - row.minY }
                    found = true
                }
            })
            if (!found) { renderingRows.push(row) }
        })
        const visibleCells: ListCell[] = renderingRows.map(row => {
            const cell = this._reusingCells.filter(cell => {
                return !cell._isBusy && cell.reuseIdentifier === row.item.reuseIdentifier
            })[0] ||
                (this.reuseMapping[row.item.reuseIdentifier] !== undefined ? new this.reuseMapping[row.item.reuseIdentifier]() : undefined) ||
                new ListCell()
            cell.reuseIdentifier = row.item.reuseIdentifier
            cell.context = this.reuseContexts[row.item.reuseIdentifier]
            cell.frame = { x: 0, y: row.minY, width: bounds.width, height: row.maxY - row.minY }
            cell._isBusy = true;
            cell.currentItem = row.item;
            this.renderItem && this.renderItem(cell, row.item);
            cell.didRender();
            if (this._reusingCells.indexOf(cell) < 0) {
                this._reusingCells.push(cell);
            }
            return cell;
        })
        visibleCells.forEach(cell => {
            if (cell.superview === undefined) {
                this.addSubview(cell);
            }
        });
    }

    private markInvisibleCellNoBusy(contentOffset: Point, bounds: Rect) {
        let contentSize = this.contentSize;
        if (contentOffset.y < 0.0) {
            return;
        }
        if (contentOffset.y > contentSize.height - bounds.height) {
            return;
        }
        this._reusingCells.filter(cell => {
            if (cell._isBusy) {
                const cellFrame = cell.frame;
                return cellFrame.y + cellFrame.height < contentOffset.y || cellFrame.y > contentOffset.y + bounds.height
            }
            return false
        }).forEach(cell => {
            cell._isBusy = false;
        });
    }

}
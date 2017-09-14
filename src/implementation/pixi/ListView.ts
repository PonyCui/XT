import { ScrollView } from "./ScrollView";
import { View } from "./View";
import { ListItem, ListSelectionStyle } from "../../interface/ListView";
import { Color } from "../../interface/Color";
import { Rect } from "../../interface/Rect";

export class ListCell extends View {

    currentItem?: ListItem
    reuseIdentifier: string = ""
    selectionStyle: ListSelectionStyle = ListSelectionStyle.Gray;
    onSelected?: () => void
    onRender?: () => void
    selectionView: View
    contentView: View
    _isBusy = false

    init() {
        super.init()
        this.selectionView = new View();
        this.contentView = new View();
        this.selectionView.backgroundColor = new Color(0xd0 / 0xff, 0xd0 / 0xff, 0xd0 / 0xff);
        this.selectionView.alpha = 0.0;
        this.addSubview(this.selectionView);
        this.addSubview(this.contentView);
    }

    layoutSubviews() {
        super.layoutSubviews();
        this.selectionView.frame = this.bounds;
        this.contentView.frame = this.bounds;
    }

    public set highligted(value: boolean) {
        if (this.selectionStyle == ListSelectionStyle.None) { return }
        this.selectionView.alpha = value ? 1.0 : 0.0;
    }

    didSelected() { }
    didRender() { }

}

export class ListView extends ScrollView {

    init() {
        super.init()
        this.alwaysBounceVertical = true;
    }

    private reuseMapping: { [key: string]: typeof ListCell } = {};

    public renderItem?: (cell: ListCell, item: ListItem) => void

    public register(clazz: typeof ListCell, reuseIdentifier: string) {
        this.reuseMapping[reuseIdentifier] = clazz;
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

    protected handleScroll(x: number, y: number) {
        super.handleScroll(x, y);
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
        if (contentOffset.y < 0 || contentOffset.y + bounds.height > this.contentSize.height) {
            return;
        }
        if (this._nextSetted === true &&
            (this._nextReloadMinY !== undefined && this.contentOffset.y > (this._nextReloadMinY || -Infinity)) &&
            (this._nextReloadMaxY !== undefined && this.contentOffset.y < (this._nextReloadMaxY || Infinity))) {
            return;
        }
        this.markInvisibleCellNoBusy();
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
            if (this._nextReloadMaxY === undefined && item.minY >= this.contentOffset.y + this.bounds.height) {
                this._nextReloadMaxY = item.minY - this.bounds.height;
            }
            if (item.maxY > this.contentOffset.y && item.minY < this.contentOffset.y + this.bounds.height) {
                visibleRows.push(item)
            }
            else if (item.minY > this.contentOffset.y + this.bounds.height) {
                break;
            }
        }
        const visibleCells: ListCell[] = visibleRows.filter(row => this._reusingCells.filter(cell => cell.currentItem === row.item).length == 0).map(row => {
            const cell = this._reusingCells.filter(cell => {
                return !cell._isBusy && cell.reuseIdentifier === row.item.reuseIdentifier
            })[0] ||
                (this.reuseMapping[row.item.reuseIdentifier] !== undefined ? new this.reuseMapping[row.item.reuseIdentifier]() : undefined) ||
                new ListCell()
            cell.reuseIdentifier = row.item.reuseIdentifier
            cell.frame = { x: 0, y: row.minY, width: this.bounds.width, height: row.maxY - row.minY }
            cell._isBusy = true;
            cell.currentItem = row.item;
            this.renderItem && this.renderItem(cell, row.item);
            cell.onRender && cell.onRender();
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

    private markInvisibleCellNoBusy() {
        this._reusingCells.filter(cell => {
            return cell._isBusy && (cell.frame.y + cell.frame.height < this.contentOffset.y || cell.frame.y > this.contentOffset.y + this.bounds.height)
        }).forEach(cell => {
            cell._isBusy = false;
        });
    }

    private _selectionTimer: number = 0
    private _selectionCancelled = false;
    private _selectionInitialPoint = { x: 0, y: 0 };
    private _highlightedCell?: ListCell = undefined;

    protected onTouchStart(absX: number, absY: number) {
        if (this.nativeObject.interactiveChildren) {
            super.onTouchStart(absX, absY);
            this._selectionCancelled = false;
            this._selectionInitialPoint = { x: absX, y: absY };
            clearTimeout(this._selectionTimer);
            this._selectionTimer = setTimeout(() => {
                if (!this._selectionCancelled) {
                    let listY = 0;
                    let cur: View | undefined = this;
                    while (cur !== undefined) {
                        listY += cur.frame.y;
                        cur = cur.superview;
                    }
                    let cellY = absY - listY + this.contentOffset.y;
                    this._reusingCells.forEach(cell => {
                        if (cell.frame.y < cellY && cell.frame.y + cell.frame.height > cellY) {
                            this._highlightedCell = cell;
                            cell.highligted = true;
                        }
                    })
                }
            }, 100)
        }
        else {
            super.onTouchStart(absX, absY);
        }
    }

    protected onTouchMove(absX: number, absY: number) {
        super.onTouchMove(absX, absY);
        if (!this._selectionCancelled) {
            if (Math.abs(absX - this._selectionInitialPoint.x) > 4.0 || Math.abs(absY - this._selectionInitialPoint.y) > 4.0) {
                this._selectionCancelled = true;
                if (this._highlightedCell) { this._highlightedCell.highligted = false }
            }
        }
    }

    protected onTouchEnd() {
        super.onTouchEnd();
        if (this._highlightedCell) {
            if (!this._selectionCancelled) { this._highlightedCell.onSelected && this._highlightedCell.onSelected(); this._highlightedCell.didSelected(); }
            this._selectionCancelled = true;
            this._highlightedCell.highligted = false;
        }
    }

}
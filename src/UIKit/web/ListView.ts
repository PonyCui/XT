import { ScrollView } from "./ScrollView";
import { View } from "./View";
import { ListItem, ListSelectionStyle } from "../interface/ListView";
import { Color } from "../interface/Color";
import { Rect, Point, Insets, InsetsMake } from "../interface/Rect";
import { InteractionState } from "../interface/View";
import { LongPressGestureRecognizer } from "../libraries/touch/LongPressGestureRecognizer";
import { HRView } from "./HRView";

export class ListCell extends View {

    currentItem?: ListItem

    reuseIdentifier: string = ""
    selectionStyle: ListSelectionStyle = ListSelectionStyle.Gray;
    selectionView: View = new View();
    contentView: View = new View();
    bottomLine: HRView = new HRView();
    _isBusy = false
    context?: any

    constructor() {
        super();
        this.selectionView.backgroundColor = new Color(0xd0 / 0xff, 0xd0 / 0xff, 0xd0 / 0xff);
        this.selectionView.alpha = 0.0;
        this.selectionView.hidden = true;
        this.addSubview(this.selectionView);
        this.contentView.userInteractionEnabled = true
        this.addSubview(this.contentView);
        this.bottomLine.color = new Color(0xda / 0xff, 0xda / 0xff, 0xda / 0xff)
        this.addSubview(this.bottomLine)
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

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.ListCell",
            reuseIdentifier: this.reuseIdentifier,
            currentItem: this.currentItem,
            contentView: this.contentView,
            selectionStyle: this.selectionStyle,
        }
    }

    layoutSubviews() {
        super.layoutSubviews();
        this.selectionView.frame = this.bounds;
        this.contentView.frame = this.bounds;
        this.resetBottomLine()
    }

    public set highligted(value: boolean) {
        this.didHighlighted(value)
        if (this.selectionStyle == ListSelectionStyle.None) { return }
        this.selectionView.alpha = value ? 1.0 : 0.0;
    }

    didHighlighted(highlighted: boolean) { }
    didSelected() { }
    didRender() { }

    // MARK: BottomLine

    private _bottomVisible: boolean = true

    public get bottomVisible(): boolean {
        return this._bottomVisible;
    }

    public set bottomVisible(value: boolean) {
        this._bottomVisible = value;
        this.resetBottomLine()
    }

    private _isLastCell: boolean = false

    public get isLastCell(): boolean {
        return this._isLastCell;
    }

    public set isLastCell(value: boolean) {
        if (this._isLastCell === value) { return }
        this._isLastCell = value;
        this.resetBottomLine()
    }

    private _bottomLineInsets: Insets = InsetsMake(0, 0, 0, 0)

    public get bottomLineInsets(): Insets {
        return this._bottomLineInsets;
    }

    public set bottomLineInsets(value: Insets) {
        this._bottomLineInsets = value;
        this.resetBottomLine()
    }

    private resetBottomLine() {
        this.bottomLine.hidden = !this.bottomVisible || this.isLastCell
        this.bottomLine.frame = UI.RectMake(this.bottomLineInsets.left, this.bounds.height - 1, this.bounds.width - this.bottomLineInsets.left - this.bottomLineInsets.right, 1)
    }

}

export class ListSection {

    public headerView?: View
    public footerView?: View
    public items: ListItem[] = [];

}

export class ListView extends ScrollView {

    constructor() {
        super()
        this.alwaysBounceVertical = true;
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.ListView",
            items: this.items,
            subviews: undefined,
        }
    }

    private reuseMapping: { [key: string]: typeof ListCell } = {};
    private reuseContexts: { [key: string]: any } = {};

    public renderItem?: (cell: ListCell, item: ListItem) => void

    public register(clazz: typeof ListCell, reuseIdentifier: string, context: any) {
        this.reuseMapping[reuseIdentifier] = clazz;
        this.reuseContexts[reuseIdentifier] = context;
    }

    private _listHeaderView: View | undefined = undefined

    public get listHeaderView(): View | undefined {
        return this._listHeaderView;
    }

    public set listHeaderView(value: View | undefined) {
        if (this._listHeaderView) { this._listHeaderView.removeFromSuperview() }
        this._listHeaderView = value;
        if (this._listHeaderView) {
            this.addSubview(this._listHeaderView)
        }
        this.reloadData()
    }

    private _listFooterView: View | undefined = undefined

    public get listFooterView(): View | undefined {
        return this._listFooterView;
    }

    public set listFooterView(value: View | undefined) {
        if (this._listFooterView) { this._listFooterView.removeFromSuperview() }
        this._listFooterView = value;
        if (this._listFooterView) {
            this.addSubview(this._listFooterView)
        }
        this.reloadData()
    }

    private _items: (ListItem | ListSection)[] = [];

    public get items() {
        return this._items;
    }

    public set items(value: (ListItem | ListSection)[]) {
        this._items = value;
    }

    private _cacheRows: {
        minY: number;
        maxY: number;
        item: ListItem;
    }[] = [];
    private _lastRows: { [key: number]: boolean } = {}

    private _reusingCells: ListCell[] = []

    public reloadData() {
        this.subviews.forEach(it => {
            if ((it as any).__is__header__ === true) { it.removeFromSuperview() }
            if ((it as any).__is__footer__ === true) { it.removeFromSuperview() }
        })
        let currentY = 0;
        this._cacheRows = [];
        this._lastRows = {};
        if (this.listHeaderView) {
            this.listHeaderView.frame = UI.RectMake(0, 0, this.bounds.width, this.listHeaderView.frame.height)
            currentY += this.listHeaderView.frame.height
        }
        this.items.forEach(item => {
            if (item instanceof ListSection) {
                this._lastRows[currentY] = true
                if (item.headerView) {
                    (item.headerView as any).__is__header__ = true
                    this.addSubview(item.headerView)
                    item.headerView.frame = UI.RectMake(0, currentY, this.bounds.width, item.headerView.frame.height)
                    currentY += item.headerView.frame.height
                }
                item.items.forEach(item => {
                    let minY = currentY;
                    let maxY = minY + item.rowHeight(this.bounds.width);
                    currentY = maxY;
                    this._cacheRows.push({ minY, maxY, item })
                })
                this._lastRows[currentY] = true
                if (item.footerView) {
                    (item.footerView as any).__is__footer__ = true
                    this.addSubview(item.footerView)
                    item.footerView.frame = UI.RectMake(0, currentY, this.bounds.width, item.footerView.frame.height)
                    currentY += item.footerView.frame.height
                }
            }
            else {
                let minY = currentY;
                let maxY = minY + item.rowHeight(this.bounds.width);
                currentY = maxY;
                this._cacheRows.push({ minY, maxY, item })
            }
        })
        this._lastRows[currentY] = true
        if (this.listFooterView) {
            this.listFooterView.frame = UI.RectMake(0, currentY, this.bounds.width, this.listFooterView.frame.height)
            currentY += this.listFooterView.frame.height
        }
        this.contentSize = { width: 0, height: currentY }
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

    private reloadVisibleRows() {
        let contentOffset = { ...this.contentOffset };
        let contentSize = this.contentSize;
        let bounds = this.bounds;
        contentOffset.y = Math.max(0.0, Math.min(contentSize.height - bounds.height, contentOffset.y))
        this.markInvisibleCellNoBusy(contentOffset, bounds);
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
        for (let index = startIndex; index < this._cacheRows.length; index++) {
            const item = this._cacheRows[index];
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
            if ((row as any)._cell !== undefined && (row as any)._cell.currentItem === row.item) {
                (row as any)._cell.frame = { x: 0, y: row.minY, width: bounds.width, height: row.maxY - row.minY }
                found = true
            }
            if (!found) {
                for (let index = 0; index < this._reusingCells.length; index++) {
                    const cell = this._reusingCells[index];
                    if (cell.currentItem === row.item) {
                        cell.frame = { x: 0, y: row.minY, width: bounds.width, height: row.maxY - row.minY }
                        found = true
                        break;
                    }
                }
            }
            if (!found) { renderingRows.push(row) }
        })
        const visibleCells: ListCell[] = renderingRows.map(row => {
            const cell = this._reusingCells.filter(cell => {
                return !cell._isBusy && cell.reuseIdentifier === row.item.reuseIdentifier
            })[0] ||
                (this.reuseMapping[row.item.reuseIdentifier] !== undefined ? new this.reuseMapping[row.item.reuseIdentifier]() : undefined) ||
                new ListCell()
            cell.reuseIdentifier = row.item.reuseIdentifier;
            (row as any)._cell = cell;
            cell.context = this.reuseContexts[row.item.reuseIdentifier]
            cell.frame = { x: 0, y: row.minY, width: bounds.width, height: row.maxY - row.minY }
            cell._isBusy = true;
            cell.currentItem = row.item;
            cell.isLastCell = this._lastRows[row.maxY] === true
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
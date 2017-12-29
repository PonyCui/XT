/// <reference path="xtr.d.ts" />
import { ScrollView } from "./ScrollView";
import { View } from "./View";
import { Rect, RectZero } from "../../interface/Rect";
import { ListItem } from "../../interface/ListView";

export enum ListSelectionStyle {
    None,
    Gray,
}

export class ListCell extends View {

    reuseIdentifier: string
    currentItem?: ListItem
    onSelected?: () => void
    onRender?: () => void

    constructor(ref: any) {
        super(ref || XTRListCell)
    }

    public get contentView(): View {
        return this;
    }

    public get selectionStyle(): ListSelectionStyle {
        return XTRListCell.xtr_selectionStyle(this.objectRef);
    }

    public set selectionStyle(value: ListSelectionStyle) {
        XTRListCell.xtr_setSelectionStyleObjectRef(value, this.objectRef);
    }

    handleSelected() {
        this.onSelected && this.onSelected();
        this.didSelected();
    }

    didSelected() { }
    didRender() { }

}

export class ListView extends ScrollView {

    protected registedClasses: { [key: string]: typeof ListCell } = {}

    constructor(ref: any) {
        super(ref || XTRListView)
    }

    private _items: ListItem[];

    public get items(): ListItem[] {
        return this._items;
    }

    public set items(value: ListItem[]) {
        this._items = value;
        XTRListView.xtr_setItemsObjectRef(value, this.objectRef);
    }

    renderItem?: (cell: ListCell, item: ListItem) => void

    register(clazz: typeof ListCell, reuseIdentifier: string) {
        this.registedClasses[reuseIdentifier] = clazz;
    }

    reloadData() {
        XTRListView.xtr_reloadData();
    }

    requestRowHeight(width: number, rowIndex: number): number {
        if (this.items[rowIndex] !== undefined && typeof this.items[rowIndex].rowHeight === "function") {
            return this.items[rowIndex].rowHeight(width);
        }
        return 0.0
    }

    requestRowCell(rowIndex: number): ListCell {
        if (this.items[rowIndex] !== undefined) {
            if (this.registedClasses[this.items[rowIndex].reuseIdentifier] !== undefined) {
                const clazz: typeof ListCell = this.registedClasses[this.items[rowIndex].reuseIdentifier];
                const cell = new clazz(undefined);
                cell.reuseIdentifier = this.items[rowIndex].reuseIdentifier || "Cell";
                return cell;
            }
        }
        return new ListCell(undefined);
    }

    handleRenderItem(rowIndex: number, cell: ListCell): void {
        cell.currentItem = this.items[rowIndex];
        this.renderItem && this.renderItem(cell, this.items[rowIndex]);
        cell.onRender && cell.onRender();
        cell.didRender();
    }

}
/// <reference path="xtr.d.ts" />
import { ScrollView } from "./ScrollView";
import { View } from "./View";
import { Rect, RectZero } from "../interface/Rect";
import { ListItem } from "../interface/ListView";

export enum ListSelectionStyle {
    None,
    Gray,
}

export class ListCell extends View {

    reuseIdentifier: string
    currentItem?: ListItem
    onSelected?: () => void
    onRender?: () => void
    context?: any

    constructor(ref: any) {
        super(ref || _XTUIListCell)
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

    public get contentView(): View {
        return this;
    }

    public get selectionStyle(): ListSelectionStyle {
        return _XTUIListCell.xtr_selectionStyle(this.objectRef);
    }

    public set selectionStyle(value: ListSelectionStyle) {
        _XTUIListCell.xtr_setSelectionStyleObjectRef(value, this.objectRef);
    }

    handleSelected() {
        this.didSelected();
    }

    didHighlighted(highlighted: boolean) { }

    didSelected() { }

    didRender() { }

}

export class ListView extends ScrollView {

    protected registedClasses: { [key: string]: typeof ListCell } = {}
    protected registedContexts: { [key: string]: any } = {}

    constructor(ref: any) {
        super(ref || _XTUIListView)
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.ListView",
            items: this.items,
            subviews: undefined,
        }
    }

    private _items: ListItem[];

    public get items(): ListItem[] {
        return this._items;
    }

    public set items(value: ListItem[]) {
        this._items = value;
        _XTUIListView.xtr_setItemsObjectRef(value, this.objectRef);
    }

    renderItem?: (cell: ListCell, item: ListItem) => void

    register(clazz: typeof ListCell, reuseIdentifier: string, context: any = undefined) {
        this.registedClasses[reuseIdentifier] = clazz;
        this.registedContexts[reuseIdentifier] = context;
    }

    reloadData() {
        _XTUIListView.xtr_reloadData(this.objectRef);
    }

    requestRowHeight(width: number, rowIndex: number): number {
        if (this.items[rowIndex] !== undefined && typeof this.items[rowIndex].rowHeight === "function") {
            return this.items[rowIndex].rowHeight(width);
        }
        return 0.0
    }

    requestRowCell(rowIndex: number): string {
        if (this.items[rowIndex] !== undefined) {
            if (this.registedClasses[this.items[rowIndex].reuseIdentifier] !== undefined) {
                const clazz: typeof ListCell = this.registedClasses[this.items[rowIndex].reuseIdentifier];
                const cell = new clazz(undefined);
                cell.reuseIdentifier = this.items[rowIndex].reuseIdentifier || "Cell";
                cell.context = this.registedContexts[this.items[rowIndex].reuseIdentifier];
                return cell.objectRef;
            }
        }
        return new ListCell(undefined).objectRef;
    }

    handleRenderItem(rowIndex: number, cellRef: string): void {
        if (typeof cellRef !== "string") { return }
        const cell = new ListCell(cellRef)
        cell.currentItem = this.items[rowIndex];
        this.renderItem && this.renderItem(cell, this.items[rowIndex]);
        cell.didRender();
    }

}
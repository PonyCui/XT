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

    constructor(rect?: Rect, _isChild: boolean = false) {
        super(undefined, true);
        if (_isChild) { return; }
        this.nativeObject = XTRListCell.createScriptObject(rect || RectZero, this);
        objectRefs[this.nativeObjectRef] = this;
        setImmediate(() => { this.init(); });
    }

    public get contentView(): View {
        return this;
    }

    public get selectionStyle(): ListSelectionStyle {
        return this.nativeObject._selectionStyle;
    }

    public set selectionStyle(value: ListSelectionStyle) {
        this.nativeObject.xtr_setSelectionStyle(value);
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

    constructor(rect?: Rect, _isChild: boolean = false) {
        super(undefined, true);
        if (_isChild) { return; }
        this.nativeObject = XTRListView.createScriptObject(rect || RectZero, this);
        objectRefs[this.nativeObjectRef] = this;
        setImmediate(() => { this.init(); });
    }

    private _items: ListItem[];

    public get items(): ListItem[] {
        return this._items;
    }

    public set items(value: ListItem[]) {
        this._items = value;
        this.nativeObject.xtr_setItems(value);
    }

    renderItem?: (cell: ListCell, item: ListItem) => void

    register(clazz: typeof ListCell, reuseIdentifier: string) {
        this.registedClasses[reuseIdentifier] = clazz;
    }

    reloadData() {
        this.nativeObject.xtr_reloadData();
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

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.constructor.toString() === "[object XTRListViewConstructor]") {
        return new ListView(undefined, view);
    }
    if (view.constructor.toString() === "[object XTRListCellConstructor]") {
        return new ListCell(undefined, view);
    }
    return undefined;
})
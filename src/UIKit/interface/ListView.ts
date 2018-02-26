import { ScrollView } from "./ScrollView";
import { View } from "./View";
import { ViewController } from "./ViewController";
import { Rect, Insets, InsetsMake } from "./Rect";

export interface ListItem {

    [key: string]: any,
    reuseIdentifier: string
    rowHeight: (width: number) => number

}

export class ListEntity implements ListItem {

    [key: string]: any;
    reuseIdentifier: string = "Cell";
    rowHeight: (width: number) => number = () => 44;

}

export enum ListSelectionStyle {
    None,
    Gray,
}

export class ListCell extends View {

    readonly reuseIdentifier: string
    readonly currentItem?: ListItem
    readonly contentView: View
    selectionStyle: ListSelectionStyle = ListSelectionStyle.Gray;
    bottomVisible: boolean = true
    isLastCell: boolean = false
    bottomLineInsets: Insets = InsetsMake(0, 0, 0, 0)
    didHighlighted(highlighted: boolean) { }
    didSelected() { }
    didRender() { }

}

export class ListSection {

    public headerView?: View
    public footerView?: View
    public items: ListItem[] = [];

}

export class ListView extends ScrollView {

    listHeaderView?: View
    listFooterView?: View
    items: (ListItem | ListSection)[]
    renderItem?: (cell: ListCell, item: ListItem) => void
    register(clazz: typeof ListCell, reuseIdentifier: string) { }
    reloadData() { }

}
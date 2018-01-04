import { ScrollView } from "./ScrollView";
import { View } from "./View";
import { ViewController } from "./ViewController";
import { Rect } from "./Rect";

export interface ListItem {

    [key: string]: any,
    reuseIdentifier: string
    rowHeight: (width: number) => number

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
    didHighlighted(highlighted: boolean) { }
    didSelected() { }
    didRender() { }

}

export class ListView extends ScrollView {

    items: ListItem[]
    renderItem?: (cell: ListCell, item: ListItem) => void
    register(clazz: typeof ListCell, reuseIdentifier: string) { }
    reloadData() { }

}
import { ScrollView } from "./ScrollView";
import { View } from "./View";
import { ViewController } from "./ViewController";
import { Rect, Insets, InsetsMake } from "./Rect";
import { RefreshControl } from "./RefreshControl";
import { LoadMoreControl } from "./LoadMoreControl";

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
    readonly selectionView: View
    readonly contentView: View
    selectionStyle: ListSelectionStyle = ListSelectionStyle.Gray;
    bottomVisible: boolean = true
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

    refreshControl?: RefreshControl
    loadMoreControl?: LoadMoreControl
    listHeaderView?: View
    listFooterView?: View
    items: (ListItem | ListSection)[]
    register(clazz: typeof ListCell, reuseIdentifier: string, context: any = undefined) { }
    reloadData() { }

}
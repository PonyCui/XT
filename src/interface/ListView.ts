import { ScrollView } from "./ScrollView";
import { View } from "./View";

export interface ListItem {

    reuseIdentifier: string
    rowHeight: (width: number) => number

}

export class ListCell extends View {

    readonly reuseIdentifier: string

}

export class ListView extends ScrollView {

    items: ListItem[]

    renderItem?: (cell: ListCell, item: ListItem) => void

    register(clazz: typeof ListCell, reuseIdentifier: string) { }

    reloadData() { }

}
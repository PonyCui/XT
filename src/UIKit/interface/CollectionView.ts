import { ScrollView } from "./ScrollView";
import { Size, SizeMake, Insets, InsetsMake } from "./Rect";
import { View } from "./View";

export interface CollectionItem {

    [key: string]: any,
    reuseIdentifier: string
    itemSize: (width: number, height: number) => Size

}

export class CollectionEntity implements CollectionItem {

    [key: string]: any;
    reuseIdentifier: string = "Cell";
    itemSize: (width: number, height: number) => Size = () => SizeMake(44, 44);

}

export class CollectionCell extends View {

    readonly reuseIdentifier: string
    readonly currentItem?: CollectionItem
    readonly contentView: View
    didHighlighted(highlighted: boolean) { }
    didSelected() { }
    didRender() { }

}

export class CollectionSection {

    public headerView?: View
    public footerView?: View
    public items: CollectionItem[] = [];

}

export enum CollectionViewScrollDirection {
    Vertical,
    Horizontal,
}

export class CollectionView extends ScrollView {

    scrollDirection: CollectionViewScrollDirection
    items: (CollectionItem | CollectionSection)[]
    register(clazz: typeof CollectionCell, reuseIdentifier: string, context: any = undefined) { }
    edgeInsets: Insets = InsetsMake(0, 0, 0, 0)
    lineSpacing: number = 0
    itemSpacing: number = 0
    reloadData() { }

}
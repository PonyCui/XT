import { ScrollView } from "./ScrollView";
import { Size, SizeMake, Insets, InsetsMake } from "../interface/Rect";
import { View } from "./View";
import { CollectionItem } from "../interface/CollectionView";

export class CollectionCell extends View {

    reuseIdentifier: string
    currentItem?: CollectionItem
    selectionView: View = new View();
    contentView: View = new View();
    context?: any
    didHighlighted(highlighted: boolean) { }
    didSelected() { }
    didRender() { }

    constructor(ref: any = undefined) {
        super(ref)
        this.selectionView.alpha = 0.0;
        this.addSubview(this.selectionView);
        this.addSubview(this.contentView);
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.selectionView.frame = this.bounds
        this.contentView.frame = this.bounds
    }

}

export enum CollectionViewScrollDirection {
    Vertical,
    Horizontal,
}

export class CollectionView extends ScrollView {

    protected registedClasses: { [key: string]: typeof CollectionCell } = {}
    protected registedContexts: { [key: string]: any } = {}

    constructor(ref: any = undefined) {
        super(ref || _XTUICollectionView);
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.CollectionView",
            items: this.items,
            subviews: undefined,
        }
    }

    private _scrollDirection: CollectionViewScrollDirection = CollectionViewScrollDirection.Vertical

    public get scrollDirection(): CollectionViewScrollDirection {
        return this._scrollDirection;
    }

    public set scrollDirection(value: CollectionViewScrollDirection) {
        this._scrollDirection = value;
        _XTUICollectionView.xtr_setScrollDirectionObjectRef(value, this.objectRef)
    }

    items: CollectionItem[]

    register(clazz: typeof CollectionCell, reuseIdentifier: string, context: any = undefined) {
        _XTUICollectionView.xtr_registerCellObjectRef(reuseIdentifier, this.objectRef)
        this.registedClasses[reuseIdentifier] = clazz;
        this.registedContexts[reuseIdentifier] = context;
    }

    edgeInsets: Insets = InsetsMake(0, 0, 0, 0)

    lineSpacing: number = 0

    itemSpacing: number = 0

    _edgeInsets(): Insets {
        return this.edgeInsets
    }

    _lineSpacing(): number {
        return this.lineSpacing
    }

    _itemSpacing(): number {
        return this.itemSpacing
    }

    reloadData() {
        _XTUICollectionView.xtr_setItemsObjectRef(this.items, this.objectRef);
        _XTUICollectionView.xtr_reloadData(this.objectRef);
    }

    requestItemSize(width: number, height: number, itemIndex: number): Size {
        if (this.items[itemIndex] && typeof this.items[itemIndex].itemSize === "function") {
            return this.items[itemIndex].itemSize(width, height)
        }
        return SizeMake(0, 0)
    }

    requestItemCell(itemIndex: number): string {
        if (this.items[itemIndex]) {
            if (this.registedClasses[this.items[itemIndex].reuseIdentifier] !== undefined) {
                const clazz: typeof CollectionCell = this.registedClasses[this.items[itemIndex].reuseIdentifier];
                const cell = new clazz(undefined);
                cell.reuseIdentifier = this.items[itemIndex].reuseIdentifier || "Cell";
                cell.context = this.registedContexts[this.items[itemIndex].reuseIdentifier];
                return cell.objectRef;
            }
        }
        return new CollectionCell(undefined).objectRef;
    }

    handleRenderItem(itemIndex: number, cellRef: string): void {
        if (typeof cellRef !== "string") { return }
        if (this.items[itemIndex]) {
            const cell = CollectionCell.findByRef<CollectionCell>(cellRef)
            cell.currentItem = this.items[itemIndex];
            cell.didRender();
        }
    }

    handleSelected(itemIndex: number, cellRef: string): void {
        if (typeof cellRef !== "string") { return }
        if (this.items[itemIndex]) {
            const cell = CollectionCell.findByRef<CollectionCell>(cellRef)
            cell.currentItem = this.items[itemIndex];
            cell.didSelected();
        }
    }

    handleHighlighted(itemIndex: number, highlighted: boolean, cellRef: string): void {
        if (typeof cellRef !== "string") { return }
        if (this.items[itemIndex]) {
            const cell = CollectionCell.findByRef<CollectionCell>(cellRef)
            cell.currentItem = this.items[itemIndex];
            cell.didHighlighted(highlighted);
        }
    }

}
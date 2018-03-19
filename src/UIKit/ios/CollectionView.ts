import { ScrollView } from "./ScrollView";
import { Size, SizeMake, Insets, InsetsMake } from "../interface/Rect";
import { View } from "./View";
import { CollectionItem, CollectionSection } from "../interface/CollectionView";

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

    items: (CollectionItem | CollectionSection)[]
    private _sectionsItems: CollectionSection[]

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
        this._sectionsItems = []
        let defaultSection = new CollectionSection()
        this.items.forEach(item => {
            if (item instanceof CollectionSection) {
                defaultSection = new CollectionSection()
                if (item.headerView) {
                    (item as any).__headerViewObjectRef = item.headerView.objectRef
                }
                if (item.footerView) {
                    (item as any).__footerViewObjectRef = item.footerView.objectRef
                }
                this._sectionsItems.push(item)
            }
            else {
                if (this._sectionsItems.indexOf(defaultSection) < 0) {
                    this._sectionsItems.push(defaultSection)
                }
                defaultSection.items.push(item)
            }
        })
        _XTUICollectionView.xtr_setItemsObjectRef(this._sectionsItems, this.objectRef);
        _XTUICollectionView.xtr_reloadData(this.objectRef);
    }

    requestItemSize(width: number, height: number, sectionIndex: number, rowIndex: number): Size {
        const item = this._sectionsItems[sectionIndex] && this._sectionsItems[sectionIndex].items[rowIndex]
        if (item && typeof item.itemSize === "function") {
            return item.itemSize(width, height);
        }
        return SizeMake(0, 0)
    }

    requestItemCell(sectionIndex: number, rowIndex: number): string {
        const item = this._sectionsItems[sectionIndex] && this._sectionsItems[sectionIndex].items[rowIndex]
        if (item) {
            if (this.registedClasses[item.reuseIdentifier] !== undefined) {
                const clazz: typeof CollectionCell = this.registedClasses[item.reuseIdentifier];
                const cell = new clazz(undefined);
                cell.reuseIdentifier = item.reuseIdentifier || "Cell";
                cell.context = this.registedContexts[item.reuseIdentifier];
                return cell.objectRef;
            }
        }
        return new CollectionCell(undefined).objectRef;
    }

    handleRenderItem(sectionIndex: number, rowIndex: number, cellRef: string): void {
        if (typeof cellRef !== "string") { return }
        const item = this._sectionsItems[sectionIndex] && this._sectionsItems[sectionIndex].items[rowIndex]
        if (item) {
            const cell = CollectionCell.findByRef<CollectionCell>(cellRef)
            cell.currentItem = item;
            cell.didRender();
        }
    }

    handleSelected(sectionIndex: number, rowIndex: number, cellRef: string): void {
        if (typeof cellRef !== "string") { return }
        const item = this._sectionsItems[sectionIndex] && this._sectionsItems[sectionIndex].items[rowIndex]
        if (item) {
            const cell = CollectionCell.findByRef<CollectionCell>(cellRef)
            cell.currentItem = item;
            cell.didSelected();
        }
    }

    handleHighlighted(sectionIndex: number, rowIndex: number, highlighted: boolean, cellRef: string): void {
        if (typeof cellRef !== "string") { return }
        const item = this._sectionsItems[sectionIndex] && this._sectionsItems[sectionIndex].items[rowIndex]
        if (item) {
            const cell = CollectionCell.findByRef<CollectionCell>(cellRef)
            cell.currentItem = item;
            cell.didHighlighted(highlighted);
        }
    }

}
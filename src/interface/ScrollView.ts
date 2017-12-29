import { View } from "./View";
import { Point, Size, Insets, Rect } from "./Rect";

export class ScrollView extends View {

    contentOffset: Point
    contentSize: Size
    isDirectionalLockEnabled: boolean = true
    bounces: boolean = true
    isScrollEnabled: boolean = true
    showsHorizontalScrollIndicator: boolean = true
    showsVerticalScrollIndicator: boolean = true
    alwaysBounceVertical: boolean = false
    alwaysBounceHorizontal: boolean = false
    onScroll?: (scrollView: ScrollView) => void

}
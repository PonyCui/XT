import { View } from "./View";
import { Point, Size, Insets } from "./Rect";

export class ScrollView extends View {

    contentOffset: Point
    contentSize: Size
    isDirectionalLockEnabled: boolean = true
    bounces: boolean = true
    isScrollEnabled: boolean = true
    showsHorizontalScrollIndicator: boolean = true
    showsVerticalScrollIndicator: boolean = true

}
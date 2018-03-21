import { ViewElement } from "./View";
import { Rect, Point, PointZero } from "../../interface/Rect";

export class ScrollViewElement extends ViewElement {

    constructor(scriptObject: any) {
        super(scriptObject)
        this.nativeObject.style.overflow = "hidden"
    }

    private contentOffset: Point = { ...PointZero }

    public xtr_contentOffset() {
        return this.contentOffset
    }

    public xtr_setContentOffset(value: Point) {
        this.contentOffset = value
        const oldFrame = this.scriptObject.innerView.frame
        this.scriptObject.innerView.frame = { x: -value.x, y: -value.y, width: oldFrame.width, height: oldFrame.height }
    }

}
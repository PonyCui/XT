/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { Point, Size, Insets, Rect, RectZero } from "../../interface/Rect";

export class ScrollView extends View {

    constructor(ref: any) {
        super(ref || XTRScrollView)
    }

    public get contentOffset(): Point {
        return XTRScrollView.xtr_contentOffset(this.objectRef);
    }

    public set contentOffset(value: Point) {
        XTRScrollView.xtr_setContentOffsetAnimatedObjectRef(value, false, this.objectRef)
    }

    public setContentOffset(value: Point, animated: boolean): void {
        XTRScrollView.xtr_setContentOffsetAnimatedObjectRef(value, animated, this.objectRef)
    }

    public get contentSize(): Size {
        return XTRScrollView.xtr_contentSize(this.objectRef);
    }

    public set contentSize(value: Size) {
        XTRScrollView.xtr_setContentSizeObjectRef(value, this.objectRef)
    }

    public get isDirectionalLockEnabled(): boolean {
        return XTRScrollView.xtr_isDirectionalLockEnabled(this.objectRef);
    }

    public set isDirectionalLockEnabled(value: boolean) {
        XTRScrollView.xtr_setDirectionalLockEnabledObjectRef(value, this.objectRef);
    }

    public get bounces(): boolean {
        return XTRScrollView.xtr_bounces(this.objectRef);
    }

    public set bounces(value: boolean) {
        XTRScrollView.xtr_setBouncesObjectRef(value, this.objectRef);
    }

    public get isPagingEnabled() {
        return XTRScrollView.xtr_isPagingEnabled(this.objectRef);
    }

    public set isPagingEnabled(value: boolean) {
        XTRScrollView.xtr_setPagingEnabledObjectRef(value, this.objectRef);
    }

    public get isScrollEnabled(): boolean {
        return XTRScrollView.xtr_isScrollEnabled(this.objectRef);
    }

    public set isScrollEnabled(value: boolean) {
        XTRScrollView.xtr_setScrollEnabledObjectRef(value, this.objectRef);
    }

    public get showsHorizontalScrollIndicator(): boolean {
        return XTRScrollView.xtr_showsHorizontalScrollIndicator(this.objectRef);
    }

    public set showsHorizontalScrollIndicator(value: boolean) {
        XTRScrollView.xtr_setShowsHorizontalScrollIndicatorObjectRef(value, this.objectRef);
    }

    public get showsVerticalScrollIndicator(): boolean {
        return XTRScrollView.xtr_showsVerticalScrollIndicator(this.objectRef);
    }

    public set showsVerticalScrollIndicator(value: boolean) {
        XTRScrollView.xtr_setShowsVerticalScrollIndicatorObjectRef(value, this.objectRef);
    }

    public get alwaysBounceVertical(): boolean {
        return XTRScrollView.xtr_alwaysBounceVertical(this.objectRef);
    }

    public set alwaysBounceVertical(value: boolean) {
        XTRScrollView.xtr_setAlwaysBounceVerticalObjectRef(value, this.objectRef);
    }

    public get alwaysBounceHorizontal(): boolean {
        return XTRScrollView.xtr_alwaysBounceHorizontal(this.objectRef);
    }

    public set alwaysBounceHorizontal(value: boolean) {
        XTRScrollView.xtr_setAlwaysBounceHorizontalObjectRef(value, this.objectRef);
    }

    onScroll?: (scrollView: ScrollView) => void

    handleScroll() {
        this.onScroll && this.onScroll(this);
    }

}
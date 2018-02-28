/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { Point, Size, Insets, Rect, RectZero, InsetsMake } from "../interface/Rect";

export class ScrollView extends View {

    constructor(ref: any) {
        super(ref || _XTUIScrollView)
    }

    toObject(): any {
        return {
            ...super.toObject(),
            class: "UI.ScrollView",
            contentOffset: this.contentOffset,
            contentSize: this.contentSize,
            isDirectionalLockEnabled: this.isDirectionalLockEnabled,
            bounces: this.bounces,
            isPagingEnabled: this.isPagingEnabled,
            isScrollEnabled: this.isScrollEnabled,
            showsHorizontalScrollIndicator: this.showsHorizontalScrollIndicator,
            showsVerticalScrollIndicator: this.showsVerticalScrollIndicator,
            alwaysBounceVertical: this.alwaysBounceVertical,
            alwaysBounceHorizontal: this.alwaysBounceHorizontal,
        }
    }

    public get contentOffset(): Point {
        return _XTUIScrollView.xtr_contentOffset(this.objectRef);
    }

    public set contentOffset(value: Point) {
        _XTUIScrollView.xtr_setContentOffsetAnimatedObjectRef(value, false, this.objectRef)
    }

    public get contentInset(): Insets {
        return _XTUIScrollView.xtr_contentInset(this.objectRef);
    }

    public set contentInset(value: Insets) {
        _XTUIScrollView.xtr_setContentInsetObjectRef(value, this.objectRef);
    }

    public setContentOffset(value: Point, animated: boolean): void {
        _XTUIScrollView.xtr_setContentOffsetAnimatedObjectRef(value, animated, this.objectRef)
    }

    public scrollRectToVisible(value: Rect, animated: boolean): void {
        _XTUIScrollView.xtr_scrollRectToVisibleAnimatedObjectRef(value, animated, this.objectRef)
    }

    public get contentSize(): Size {
        return _XTUIScrollView.xtr_contentSize(this.objectRef);
    }

    public set contentSize(value: Size) {
        _XTUIScrollView.xtr_setContentSizeObjectRef(value, this.objectRef)
    }

    public get isDirectionalLockEnabled(): boolean {
        return _XTUIScrollView.xtr_isDirectionalLockEnabled(this.objectRef);
    }

    public set isDirectionalLockEnabled(value: boolean) {
        _XTUIScrollView.xtr_setDirectionalLockEnabledObjectRef(value, this.objectRef);
    }

    public get bounces(): boolean {
        return _XTUIScrollView.xtr_bounces(this.objectRef);
    }

    public set bounces(value: boolean) {
        _XTUIScrollView.xtr_setBouncesObjectRef(value, this.objectRef);
    }

    public get isPagingEnabled() {
        return _XTUIScrollView.xtr_isPagingEnabled(this.objectRef);
    }

    public set isPagingEnabled(value: boolean) {
        _XTUIScrollView.xtr_setPagingEnabledObjectRef(value, this.objectRef);
    }

    public get isScrollEnabled(): boolean {
        return _XTUIScrollView.xtr_isScrollEnabled(this.objectRef);
    }

    public set isScrollEnabled(value: boolean) {
        _XTUIScrollView.xtr_setScrollEnabledObjectRef(value, this.objectRef);
    }

    public get showsHorizontalScrollIndicator(): boolean {
        return _XTUIScrollView.xtr_showsHorizontalScrollIndicator(this.objectRef);
    }

    public set showsHorizontalScrollIndicator(value: boolean) {
        _XTUIScrollView.xtr_setShowsHorizontalScrollIndicatorObjectRef(value, this.objectRef);
    }

    public get showsVerticalScrollIndicator(): boolean {
        return _XTUIScrollView.xtr_showsVerticalScrollIndicator(this.objectRef);
    }

    public set showsVerticalScrollIndicator(value: boolean) {
        _XTUIScrollView.xtr_setShowsVerticalScrollIndicatorObjectRef(value, this.objectRef);
    }

    public get alwaysBounceVertical(): boolean {
        return _XTUIScrollView.xtr_alwaysBounceVertical(this.objectRef);
    }

    public set alwaysBounceVertical(value: boolean) {
        _XTUIScrollView.xtr_setAlwaysBounceVerticalObjectRef(value, this.objectRef);
    }

    public get alwaysBounceHorizontal(): boolean {
        return _XTUIScrollView.xtr_alwaysBounceHorizontal(this.objectRef);
    }

    public set alwaysBounceHorizontal(value: boolean) {
        _XTUIScrollView.xtr_setAlwaysBounceHorizontalObjectRef(value, this.objectRef);
    }

    onScroll?: (scrollView: ScrollView) => void

    handleScroll() {
        this.onScroll && this.onScroll(this);
    }

}
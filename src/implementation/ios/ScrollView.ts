/// <reference path="xtr.d.ts" />
import { View } from "./View";
import { Point, Size, Insets, Rect, RectZero } from "../../interface/Rect";

export class ScrollView extends View {

    nativeObject: any;

    constructor(rect?: Rect, nativeObject?: any, _isChild: boolean = false) {
        super(undefined, undefined, true);
        if (_isChild) { return; }
        if (nativeObject) {
            this.nativeObject = nativeObject;
            (window as any).XTRObjCreater.store(this);
        }
        else {
            this.nativeObject = XTRScrollView.createScriptObject(rect || RectZero, this);
            (window as any).XTRObjCreater.store(this);
            this.init();
        }
    }

    public get isDirectionalLockEnabled(): boolean {
        return this.nativeObject.xtr_isDirectionalLockEnabled();
    }

    public set isDirectionalLockEnabled(value: boolean) {
        this.nativeObject.xtr_setDirectionalLockEnabled(value);
    }

    public get bounces(): boolean {
        return this.nativeObject.xtr_bounces();
    }

    public set bounces(value: boolean) {
        this.nativeObject.xtr_setBounces(value);
    }

    public get isScrollEnabled(): boolean {
        return this.nativeObject.xtr_isScrollEnabled();
    }

    public set isScrollEnabled(value: boolean) {
        this.nativeObject.xtr_setScrollEnabled(value);
    }

    public get showsHorizontalScrollIndicator(): boolean {
        return this.nativeObject.xtr_showsHorizontalScrollIndicator();
    }

    public set showsHorizontalScrollIndicator(value: boolean) {
        this.nativeObject.xtr_setShowsHorizontalScrollIndicator(value);
    }

    public get showsVerticalScrollIndicator(): boolean {
        return this.nativeObject.xtr_showsVerticalScrollIndicator();
    }

    public set showsVerticalScrollIndicator(value: boolean) {
        this.nativeObject.xtr_setShowsVerticalScrollIndicator(value);
    }

    public get alwaysBounceVertical(): boolean {
        return this.nativeObject.xtr_alwaysBounceVertical();
    }

    public set alwaysBounceVertical(value: boolean) {
        this.nativeObject.xtr_setAlwaysBounceVertical(value);
    }

    public get alwaysBounceHorizontal(): boolean {
        return this.nativeObject.xtr_alwaysBounceHorizontal();
    }

    public set alwaysBounceHorizontal(value: boolean) {
        this.nativeObject.xtr_setAlwaysBounceHorizontal(value);
    }

    onScroll?: (scrollView: ScrollView) => void

    handleScroll() {
        this.onScroll && this.onScroll(this);
    }

}

if ((window as any).XTRObjClasses === undefined) {
    (window as any).XTRObjClasses = [];
}
(window as any).XTRObjClasses.push((view: any) => {
    if (view.constructor.toString() === "[object XTRScrollViewConstructor]") {
        return new ScrollView(undefined, view);
    }
    return undefined;
})
import { View } from "./View";
import { ActivityIndicatorViewStyle } from "../interface/ActivityIndicatorView";
import { ActivityIndicatorViewElement } from "./element/ActivityIndicatorView";

export class ActivityIndicatorView extends View {

    constructor() {
        super(ActivityIndicatorViewElement)
    }

    public get style(): ActivityIndicatorViewStyle {
        return this.nativeObject.xtr_style()
    }

    public set style(value: ActivityIndicatorViewStyle) {
        this.nativeObject.xtr_setStyle(value)
    }

    public get animating(): boolean {
        return this.nativeObject.xtr_animating()
    }

    public get hidesWhenStopped(): boolean {
        return true
    }

    public set hidesWhenStopped(value: boolean) { }

    startAnimating(): void {
        this.nativeObject.xtr_startAnimating()
    }

    stopAnimating(): void {
        this.nativeObject.xtr_stopAnimating()
    }

    tintColorDidChange() {
        super.tintColorDidChange()
        this.nativeObject.resetContent()
    }

}
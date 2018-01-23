import { View } from "./View";
import { ActivityIndicatorViewStyle } from "../../interface/ActivityIndicatorView";

export class ActivityIndicatorView extends View {

    constructor(ref: any) {
        super(ref || XTRActivityIndicatorView)
    }

    public get style(): ActivityIndicatorViewStyle {
        return XTRActivityIndicatorView.xtr_style(this.objectRef);
    }

    public set style(value: ActivityIndicatorViewStyle) {
        XTRActivityIndicatorView.xtr_setStyle(value, this.objectRef)
    }

    public get animating(): boolean {
        return XTRActivityIndicatorView.xtr_animating(this.objectRef)
    }

    public get hidesWhenStopped(): boolean {
        return true
    }

    public set hidesWhenStopped(value: boolean) { }

    startAnimating(): void {
        XTRActivityIndicatorView.xtr_startAnimating(this.objectRef)
    }

    stopAnimating(): void {
        XTRActivityIndicatorView.xtr_stopAnimating(this.objectRef)
    }

}
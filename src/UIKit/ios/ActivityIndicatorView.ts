import { View } from "./View";
import { ActivityIndicatorViewStyle } from "../interface/ActivityIndicatorView";

export class ActivityIndicatorView extends View {

    constructor(ref: any) {
        super(ref || _XTUIActivityIndicatorView)
    }

    toObject(): any {
        return {
            ...super.toObject(), 
            class: "UI.ActivityIndicatorView",
            style: this.style,
            animating: this.animating,
            hidesWhenStopped: this.hidesWhenStopped,
        }
    }

    public get style(): ActivityIndicatorViewStyle {
        return _XTUIActivityIndicatorView.xtr_style(this.objectRef);
    }

    public set style(value: ActivityIndicatorViewStyle) {
        _XTUIActivityIndicatorView.xtr_setStyleObjectRef(value, this.objectRef)
    }

    public get animating(): boolean {
        return _XTUIActivityIndicatorView.xtr_animating(this.objectRef)
    }

    public get hidesWhenStopped(): boolean {
        return _XTUIActivityIndicatorView.xtr_hidesWhenStopped(this.objectRef)
    }

    public set hidesWhenStopped(value: boolean) {
        _XTUIActivityIndicatorView.xtr_setHidesWhenStoppedObjectRef(value, this.objectRef)
    }

    startAnimating(): void {
        _XTUIActivityIndicatorView.xtr_startAnimating(this.objectRef)
    }

    stopAnimating(): void {
        _XTUIActivityIndicatorView.xtr_stopAnimating(this.objectRef)
    }

}
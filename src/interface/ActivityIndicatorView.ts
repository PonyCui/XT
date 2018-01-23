import { View } from "./View";

export enum ActivityIndicatorViewStyle {
    Regular,
    Large,
}

export class ActivityIndicatorView extends View {

    style: ActivityIndicatorViewStyle = ActivityIndicatorViewStyle.Regular
    readonly animating: boolean = false
    hidesWhenStopped: boolean = true
    startAnimating(): void { }
    stopAnimating(): void { }

}
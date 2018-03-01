import { View } from "./View";

export enum ActivityIndicatorViewStyle {
    Regular,
    Large,
}

export class ActivityIndicatorView extends View {

    style: ActivityIndicatorViewStyle = ActivityIndicatorViewStyle.Regular
    readonly animating: boolean = false
    hidesWhenStopped: boolean = true
    startAnimating(delay: number = 0): void { }
    stopAnimating(): void { }

}
import { View } from "./View";
import { LayoutConstraintAxis } from "./LayoutConstraintAxis";

export enum StackViewDistribution {
    Fill,
    FillEqually,
    FillProportionally,
    EqualSpacing,
}

export enum StackViewAlignment {
    Fill,
    Leading,
    Center,
    Trailing,
}

export class StackItem {

    minWidth?: number
    minHeight?: number

    constructor(readonly view: View) { }

}

export class StackView extends View {

    axis: LayoutConstraintAxis = LayoutConstraintAxis.Horizontal
    distribution: StackViewDistribution = StackViewDistribution.Fill
    alignment: StackViewAlignment = StackViewAlignment.Fill
    spacing: number = 0.0

    setItems(items: StackItem[]): void { }

}
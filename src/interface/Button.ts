import { View } from "./View";
import { Label } from "./Label";
import { Color } from "./Color";

export class Button extends View {

    readonly titleLabel: Label
    title?: string
    color?: Color

    onHighlighted?: (highligted: boolean) => void
    onTouchUpInisde?: () => void

}
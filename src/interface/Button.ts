import { View } from "./View";
import { Label } from "./Label";

export class Button extends View {

    readonly titleLabel: Label

    onHighlighted?: (highligted: boolean) => void
    onTouchUpInisde?: () => void

}
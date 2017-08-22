import { View } from "./View";
import { Label } from "./Label";
import { Color } from "./Color";
import { ImageView } from "./ImageView";

export class Button extends View {

    readonly imageView: ImageView;
    readonly titleLabel: Label
    vertical: boolean;
    inset: number;
    title?: string
    color?: Color

    onHighlighted?: (highligted: boolean) => void
    onTouchUpInside?: () => void

}
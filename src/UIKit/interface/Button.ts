import { View } from "./View";
import { Label } from "./Label";
import { Color } from "./Color";
import { ImageView, Image } from "./ImageView";
import { Font } from "./Font";
import { Rect } from "./Rect";

export class Button extends View {

    readonly imageView: ImageView;
    readonly titleLabel: Label

    vertical: boolean;
    inset: number;
    title?: string;
    font: Font;
    image?: Image;
    color: Color;

    onTouchDown?: (sender: this) => void
    onTouchDragInside?: (sender: this) => void
    onTouchDragOutside?: (sender: this) => void
    onTouchDragEnter?: (sender: this) => void
    onTouchDragExit?: (sender: this) => void
    onTouchUpInside?: (sender: this) => void
    onTouchUpOutside?: (sender: this) => void
    onTouchCancel?: (sender: this) => void
    onHighlighted?: (sender: this, highligted: boolean) => void
    onHover?: (sender: this, hovered: boolean) => void

}
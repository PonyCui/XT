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

    onHighlighted?: (highligted: boolean) => void
    onTouchUpInside?: () => void

}
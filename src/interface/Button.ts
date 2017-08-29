import { View } from "./View";
import { Label } from "./Label";
import { Color } from "./Color";
import { ImageView, Image } from "./ImageView";

export class Button extends View {

    vertical: boolean;
    inset: number;
    title?: string;
    image?: Image;
    color?: Color;

    onHighlighted?: (highligted: boolean) => void
    onTouchUpInside?: () => void

}
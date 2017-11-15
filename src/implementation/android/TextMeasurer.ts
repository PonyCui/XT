import { Rect, RectZero } from "../../interface/Rect";
import { Font } from "../../interface/Font";

export interface TextMeasureParams {

    font: Font;
    inRect: Rect;
    numberOfLines?: number
    letterSpace?: number
    lineSpace?: number

}

export class TextMeasurer {

    static measureText(text: string, params: TextMeasureParams): Rect {
        return XTRTextMeasurer.measureText(text, params);
    }

}
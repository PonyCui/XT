import { Font } from "./Font";
import { Rect, RectZero } from "../../interface/Rect";

export interface TextMeasureParams {

    font: Font;
    inRect: Rect;
    numberOfLines?: number
    letterSpace?: number
    lineSpace?: number

}

export class TextMeasurer {

    static measureText(text: string, params: TextMeasureParams): Rect {
        return XTRTextMeasurer.measureTextParams(text, params);
    }

}
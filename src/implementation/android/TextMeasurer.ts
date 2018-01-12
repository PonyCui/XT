import { Rect, RectZero } from "../../interface/Rect";
import { Font } from "./Font";

export interface TextMeasureParams {

    font: Font;
    inRect: Rect;
    numberOfLines?: number
    letterSpace?: number
    lineSpace?: number

}

export class TextMeasurer {

    static measureText(text: string, params: TextMeasureParams): Rect {
        if (params.font) {
            params.font = params.font.objectRef
        }
        return XTRTextMeasurer.measureText(text, params);
    }

}
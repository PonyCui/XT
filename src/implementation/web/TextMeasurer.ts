import { Font } from "../../interface/Font";
import { Rect, RectZero, RectMake } from "../../interface/Rect";

let measureSpan: HTMLSpanElement = document.createElement("span")

export interface TextMeasureParams {

    font: Font;
    inRect: Rect;
    numberOfLines?: number
    letterSpace?: number
    lineSpace?: number

}

export class TextMeasurer {

    static measureText(text: string, params: TextMeasureParams): Rect {
        if (measureSpan.parentNode === null) {
            measureSpan.style.opacity = "0.0"
            measureSpan.style.position = "absolute"
            measureSpan.style.left = "-10000000px"
            measureSpan.style.top = "-10000000px"
            document.body.appendChild(measureSpan);
        }
        measureSpan.style.fontSize = params.font.pointSize.toString() + "pt";
        measureSpan.style.fontFamily = params.font.familyName || "Arial";
        measureSpan.style.fontWeight = params.font.fontWeight;
        measureSpan.style.fontStyle = params.font.fontStyle;
        measureSpan.style.letterSpacing = params.letterSpace ? params.letterSpace.toString() : null
        measureSpan.style.lineHeight = params.lineSpace ? (params.font.pointSize + params.lineSpace * 2).toString() : null
        if (params.numberOfLines === 1 || params.numberOfLines === undefined) {
            measureSpan.style.display = "inline-block";
            measureSpan.style.wordWrap = null
            measureSpan.style.wordBreak = null
            measureSpan.style.whiteSpace = "nowrap";
            measureSpan.style.maxWidth = null;
            measureSpan.innerText = text;
            return RectMake(0.0, 0.0, Math.min(params.inRect.width, measureSpan.offsetWidth), measureSpan.offsetHeight)
        }
        else {
            measureSpan.style.display = "block";
            measureSpan.style.wordWrap = "break-word"
            measureSpan.style.wordBreak = "break-all"
            measureSpan.style.whiteSpace = "pre-wrap"
            measureSpan.style.maxWidth = params.inRect.width.toString() + "px";
            measureSpan.innerText = text;
            return RectMake(0.0, 0.0, Math.min(params.inRect.width, measureSpan.offsetWidth), Math.min(params.inRect.height, measureSpan.offsetHeight))
        }
        return RectZero
    }

}
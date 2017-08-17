import * as I from "../../interface/Abstract";
import huozi from 'huozi'

export interface Padding {
    top: number;
    left: number;
    bottom: number;
    right: number;
}

export interface TextLine {
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export class StaticTextLayout {

    readonly text: string;
    readonly font: I.Font;
    readonly bounds: I.Rect = I.RectZero
    readonly padding: Padding = { top: 0, left: 0, bottom: 0, right: 0 }

    constructor(numberOfLines: number, text: string, font: I.Font, bounds: I.Rect, padding: Padding = { top: 0, left: 0, bottom: 0, right: 0 }) {
        this.text = text;
        this.font = font;
        this.bounds = bounds;
        this.padding = padding;
        // measure function
        const textSequence = this.text.split('').map(character => {
            return {
                fontSize: this.font.pointSize,
                character,
            }
        });
        const layoutSequence = huozi(textSequence, {
            gridSize: this.font.pointSize,
            column: Math.floor((this.bounds.width - this.padding.left - this.padding.right) / this.font.pointSize),
            row: numberOfLines <= 0 ? Infinity : numberOfLines,
        });
        const minX = Math.min.apply(null, layoutSequence.map((element: any) => element.x));
        const minY = Math.min.apply(null, layoutSequence.map((element: any) => element.y));
        const maxX = Math.max.apply(null, layoutSequence.map((element: any) => element.x + element.width));
        const maxY = Math.max.apply(null, layoutSequence.map((element: any) => {
            if (element.y + element.height + padding.top + padding.bottom >= bounds.height) {
                return 0;
            }
            return element.y + element.height;
        }));
        this.layoutSequence = layoutSequence;
        this.textRect = I.RectMake(minX + this.padding.left, minY + this.padding.top, maxX - minX, maxY - minY);
    }

    readonly layoutSequence: any[]
    readonly textRect: I.Rect

    textLines(onRect: I.Rect, horizonAlignment: I.TextAlignment, verticalAlignment: I.TextVerticalAlignment, lineBreakMode: I.LineBreakMode): any[] {
        const offset: { x: number, y: number } = { x: this.textRect.x, y: this.textRect.y }
        if (verticalAlignment === I.TextVerticalAlignment.Center) {
            offset.y = Math.max(this.padding.top, ((onRect.y + onRect.height) - this.textRect.height) / 2.0)
        }
        let lines: TextLine[] = [];
        let line: TextLine = { text: "", x: 0, y: 0, width: 0, height: 0 }
        const addLine = (line: TextLine) => {
            if (horizonAlignment === I.TextAlignment.Center) {
                offset.x = Math.max(this.padding.left, ((onRect.x + onRect.width) - line.width) / 2.0)
            }
            lines.push({
                text: line.text,
                x: line.x + offset.x,
                y: line.y + offset.y,
                width: line.width,
                height: line.height
            })
        }
        this.layoutSequence.forEach((element: any) => {
            if (line.y != element.y) {
                if (line.text.length > 0) {
                    addLine(line);
                }
                line = { text: "", x: element.x, y: element.y, width: element.x + element.width, height: element.height };
            }
            line.text += element.character;
            line.width = element.x + element.width;
            line.height = Math.max(line.height, element.height);
        });
        if (line.text.length > 0) {
            addLine(line);
        }
        const breakedLines = lines.filter(line => line.y + line.height < onRect.height);
        if (breakedLines.length != lines.length || breakedLines.map(item => item.text).join("").length < this.text.length) {
            switch (lineBreakMode) {
                case I.LineBreakMode.TruncatingTail:
                    if (breakedLines[breakedLines.length - 1].text.length > 0) {
                        breakedLines[breakedLines.length - 1].text = breakedLines[breakedLines.length - 1].text.slice(0, -1) + "...";
                    }
                    break;
            }
        }
        return breakedLines
    }

}
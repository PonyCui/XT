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
}

export class StaticTextLayout {

    readonly text: string;
    readonly font: I.Font;
    readonly bounds: I.Rect = I.RectZero
    readonly padding: Padding = { top: 0, left: 0, bottom: 0, right: 0 }

    constructor(text: string, font: I.Font, bounds: I.Rect, padding: Padding = { top: 0, left: 0, bottom: 0, right: 0 }) {
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
            row: Infinity,
        });
        const minX = Math.min.apply(null, layoutSequence.map((element: any) => element.x));
        const minY = Math.min.apply(null, layoutSequence.map((element: any) => element.y));
        const maxX = Math.max.apply(null, layoutSequence.map((element: any) => element.x + element.width));
        const maxY = Math.max.apply(null, layoutSequence.map((element: any) => element.y + element.height));
        this.layoutSequence = layoutSequence;
        this.textRect = I.RectMake(minX + this.padding.left, minY + this.padding.top, maxX - minX, maxY - minY);
    }
    readonly layoutSequence: any[]
    readonly textRect: I.Rect

    textLines(onRect: I.Rect, horizonAlignment: I.TextAlignment, verticalAlignment: I.TextVerticalAlignment): any[] {
        const offset: { x: number, y: number } = { x: this.textRect.x, y: this.textRect.y }
        if (horizonAlignment === I.TextAlignment.Center) {
            offset.x = ((onRect.x + onRect.width) - this.textRect.width) / 2.0
        }
        if (verticalAlignment === I.TextVerticalAlignment.Center) {
            offset.y = ((onRect.y + onRect.height) - this.textRect.height) / 2.0
        }
        let lines: TextLine[] = [];
        let line = { text: "", x: 0, y: 0, }
        this.layoutSequence.forEach((element: any) => {
            if (line.y != element.y) {
                if (line.text.length > 0) {
                    lines.push({
                        text: line.text,
                        x: line.x + offset.x,
                        y: line.y + offset.y,
                    })
                }
                line = { text: "", x: element.x, y: element.y, };
            }
            line.text += element.character;
        });
        if (line.text.length > 0) {
            lines.push({
                text: line.text,
                x: line.x + offset.x,
                y: line.y + offset.y,
            })
        }
        return lines;
    }

}
import { ViewElement } from "./View";
import { Color } from "../../interface/Color";
import { Rect } from "../../interface/Rect";

export class HRViewElement extends ViewElement {

    lineObject: SVGLineElement;

    xtr_setFrame(value: Rect) {
        super.xtr_setFrame(value)
        this.resetLine()
    }

    private resetLine() {
        if (this.position <= 2) {
            let yPosition = 0.0;
            if (this.position == 1) {
                yPosition = (1.0 - 1.0 / window.devicePixelRatio) / 2.0
            }
            else if (this.position == 2) {
                yPosition = (1.0 - 1.0 / window.devicePixelRatio)
            }
            this.lineObject.setAttribute("x1", "0")
            this.lineObject.setAttribute("y1", yPosition.toFixed(6))
            this.lineObject.setAttribute("x2", this.xtr_frame().width.toFixed(0))
            this.lineObject.setAttribute("y2", yPosition.toFixed(6))
        }
        else {
            let xPosition = 0.0;
            if (this.position == 4) {
                xPosition = (1.0 - 1.0 / window.devicePixelRatio) / 2.0
            }
            else if (this.position == 5) {
                xPosition = (1.0 - 1.0 / window.devicePixelRatio)
            }
            this.lineObject.setAttribute("x1", xPosition.toFixed(6))
            this.lineObject.setAttribute("y1", "0")
            this.lineObject.setAttribute("x2", xPosition.toFixed(6))
            this.lineObject.setAttribute("y2", this.xtr_frame().height.toFixed(0))
        }
    }

    private position: number = 0

    public xtr_position(): number {
        return this.position
    }

    public xtr_setPosition(value: number) {
        this.position = value
        this.resetLine()
    }

    private color?: Color;

    public xtr_color(): Color | undefined {
        return this.color
    }

    public xtr_setColor(value: Color | undefined) {
        this.color = value;
        if (this.color !== undefined) {
            this.lineObject.setAttribute("style", "stroke:" + 'rgba(' + (this.color.r * 255).toFixed(0) + ', ' + (this.color.g * 255).toFixed(0) + ', ' + (this.color.b * 255).toFixed(0) + ', ' + this.color.a.toString() + ')' + ";stroke-width:" + (1.0 / window.devicePixelRatio).toFixed(6))
        }
    }

    loadContent() {
        super.loadContent()
        this.lineObject = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.contentObject = this.lineObject
    }

}
import { ViewElement } from "./View";
import { Rect } from "../../interface/Rect";

export class ExtViewElement extends ViewElement {

    private foreignObject: SVGForeignObjectElement
    public extObject: any

    public setExtObject(extObject: HTMLElement) {
        this.extObject = extObject
        this.extObject.element.style.width = "100%"
        this.extObject.element.style.height = "100%"
        this.foreignObject.appendChild(this.extObject.element)
    }

    loadContent() {
        this.foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        this.contentObject = this.foreignObject
    }

    public xtr_setFrame(value: Rect) {
        super.xtr_setFrame(value);
        this.foreignObject.setAttribute("width", value.width.toString())
        this.foreignObject.setAttribute("height", value.height.toString())
    }

}
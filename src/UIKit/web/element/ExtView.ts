import { ViewElement } from "./View";
import { Rect } from "../../interface/Rect";

export class ExtViewElement extends ViewElement {

    public extObject: any

    public setExtObject(extObject: HTMLElement) {
        this.extObject = extObject
        this.extObject.element.style.width = "100%"
        this.extObject.element.style.height = "100%"
        this.nativeObject.appendChild(this.extObject.element)
    }

}
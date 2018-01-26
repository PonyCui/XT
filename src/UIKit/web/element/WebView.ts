import { ViewElement } from "./View";
import { Rect } from "../../interface/Rect";

export class WebViewElement extends ViewElement {

    private foreignObject: SVGForeignObjectElement
    private iframeObject: HTMLIFrameElement

    loadContent() {
        this.foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        this.iframeObject = document.createElement("iframe")
        this.iframeObject.style.width = "100%"
        this.iframeObject.style.height = "100%"
        this.iframeObject.style.border = "none"
        this.iframeObject.style.padding = "0"
        this.foreignObject.appendChild(this.iframeObject)
        this.contentObject = this.foreignObject
    }

    public xtr_setFrame(value: Rect) {
        super.xtr_setFrame(value);
        this.foreignObject.setAttribute("width", value.width.toString())
        this.foreignObject.setAttribute("height", value.height.toString())
    }

    public xtr_loadWithURLString(URLString: string) {
        this.iframeObject.src = URLString
    }

}
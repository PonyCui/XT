import { ViewElement } from "./View";
import { Rect } from "../../interface/Rect";

export class WebViewElement extends ViewElement {

    private iframeObject: HTMLIFrameElement

    loadContent() {
        this.iframeObject = document.createElement("iframe")
        this.iframeObject.style.width = "100%"
        this.iframeObject.style.height = "100%"
        this.iframeObject.style.border = "none"
        this.iframeObject.style.padding = "0"
        this.nativeObject.appendChild(this.iframeObject)
    }

    public xtr_loadWithURLString(URLString: string) {
        this.iframeObject.src = URLString
    }

}
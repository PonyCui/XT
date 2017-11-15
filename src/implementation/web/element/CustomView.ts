import { ViewElement } from "./View";
import { Rect } from "../../../interface/Rect";
import { CustomViewFactory } from "./CustomFactory";

export class CustomViewElement extends ViewElement {

    private foreignObject: SVGForeignObjectElement
    private factoryObject?: CustomViewFactory
    private firstElement?: HTMLElement

    constructor(className: string, frame: Rect, scriptObject: any) {
        super(frame, scriptObject)
        this.loadCustomView(className)
    }

    loadContent() {
        this.foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        this.contentObject = this.foreignObject
    }

    loadCustomView(className: string) {
        if (CustomViewFactory.factoryMapping[className]) {
            this.factoryObject = new CustomViewFactory.factoryMapping[className]
            if (this.factoryObject) {
                this.factoryObject.owner = this
                this.foreignObject.innerHTML = this.factoryObject.requestInnerHTML();
                const firstElement = this.foreignObject.children[0]
                if (firstElement instanceof HTMLElement) {
                    this.firstElement = firstElement
                }
            }
        }
    }

    public xtr_setFrame(value: Rect) {
        super.xtr_setFrame(value);
        this.foreignObject.setAttribute("width", value.width.toString())
        this.foreignObject.setAttribute("height", value.height.toString())
    }

    public xtr_props(): any {
        if (this.factoryObject && this.firstElement) {
            return this.factoryObject.requestProps(this.firstElement)
        }
        return {};
    }

    public xtr_setProps(value: any) {
        if (this.factoryObject && this.firstElement) {
            return this.factoryObject.setProps(this.firstElement, value)
        }
    }

    public xtr_handleMessage(message: any) {
        if (this.factoryObject && this.firstElement) {
            return this.factoryObject.handleMessage(this.firstElement, message)
        }
    }

    public handleMessage(message: any) {
        this.scriptObject.handleMessage(message)
    }

}
export class BaseElement {

    objectRef = performance.now().toString() + "-" + Math.random()
    nativeObject: SVGGElement
    scriptObject: any

    constructor(scriptObject: any) {
        this.scriptObject = scriptObject;
    }

}
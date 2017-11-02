export class Element {

    objectUUID = performance.now().toString() + "-" + Math.random()
    nativeObject: SVGGElement
    scriptObject: any

    constructor(scriptObject: any) {
        this.scriptObject = scriptObject;
    }

}
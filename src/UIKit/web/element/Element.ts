
if (typeof performance === "undefined") {
    (window as any).performance = {
        now: function() {
            return new Date().getTime()
        }
    }
}

export class BaseElement {

    objectRef = performance.now().toString() + "-" + Math.random()
    nativeObject: SVGGElement
    scriptObject: any

    constructor(scriptObject: any) {
        this.scriptObject = scriptObject;
    }

}
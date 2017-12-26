import { View } from "./view";

(global as any).viewOutlets = {}

export class Body {

    private children: View[]

    constructor(protected obj: Element) {
        this.children = [];
        for (let index = 0; index < obj.children.length; index++) {
            const element = obj.children[index];
            this.children.push(new View(element))
        }
    }

    toCode() {
        return `
            exports.default = (function(){
                const currentNode = new XT.View();
                const rootElement = currentNode;
                `+ this.children.map(child => {
                return child.toCode()
            }).join(";") + `
                return currentNode;
            })
        `
    }

}
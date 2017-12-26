import { components, View } from "./view";
import { Button } from "./button";
import { ImageView } from "./imageview";
import { Label } from "./label";

(global as any).viewOutlets = {}

export class Body {

    private children: View[]

    constructor(protected obj: Element) {
        this.children = [];
        for (let index = 0; index < obj.children.length; index++) {
            const element = obj.children[index];
            if (components[element.tagName]) {
                this.children.push(new components[element.tagName](element))
            }
        }
    }

    toCode() {
        return `
            exports.default = (function(){
                const currentNode = new XT.View();
                currentNode.userInteractionEnabled = true;
                const rootElement = currentNode;
                `+ this.children.map(child => {
                return child.toCode()
            }).join(";") + `
                return currentNode;
            })
        `
    }

}

console.log(Button, ImageView, Label);
import { components, View } from "./view";
import { Button } from "./button";
import { ImageView } from "./imageview";
import { Label } from "./label";

(global as any).viewOutlets = {}

export class Body {

    private children: View[]
    private layoutCodes: string[]

    constructor(protected obj: Element) {
        this.parseView()
        this.parseLayout()
    }

    parseView() {
        this.children = [];
        for (let index = 0; index < this.obj.children.length; index++) {
            const element = this.obj.children[index];
            if (components[element.tagName]) {
                this.children.push(new components[element.tagName](element))
            }
        }
    }

    parseLayout() {
        this.layoutCodes = [];
        const layoutElements = this.obj.querySelectorAll("Layout");
        for (let index = 0; index < layoutElements.length; index++) {
            const layoutElement = layoutElements[index];
            for (let index = 0; index < layoutElement.children.length; index++) {
                const element = layoutElement.children[index];
                if (element.tagName === "FULLWIDTH" && element.getAttribute("view")) {
                    this.layoutCodes.push(`
                    (function(view){
                        if (!view) {return}
                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("|-0-[view]-0-|", {view: view}));
                        view.superview.setNeedsLayout();
                    })(rootElement['`+ element.getAttribute("view") + `']);
                    `)
                }
                else if (element.tagName === "FULLHEIGHT" && element.getAttribute("view")) {
                    this.layoutCodes.push(`
                    (function(view){
                        if (!view) {return}
                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-0-[view]-0-|", {view: view}));
                        view.superview.setNeedsLayout();
                    })(rootElement['`+ element.getAttribute("view") + `']);
                    `)
                }
                else if (element.tagName === "LEFT" && element.getAttribute("view") && element.getAttribute("value")) {
                    this.layoutCodes.push(`
                    (function(view){
                        if (!view) {return}
                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("|-` + parseFloat(element.getAttribute("value")).toFixed(6) + `-[view]", {view: view}));
                        view.superview.setNeedsLayout();
                    })(rootElement['`+ element.getAttribute("view") + `']);
                    `)
                }
                else if (element.tagName === "CENTERX" && element.getAttribute("view") && element.getAttribute("value")) {
                    // TODO
                    // this.layoutCodes.push(`
                    // (function(view){
                    //     if (!view) {return}
                    //     view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("|-` + parseFloat(element.getAttribute("value")).toFixed(6) + `-[view]", {view: view}));
                    //     view.superview.setNeedsLayout();
                    // })(rootElement['`+ element.getAttribute("view") + `']);
                    // `)
                }
                else if (element.tagName === "RIGHT" && element.getAttribute("view") && element.getAttribute("value")) {
                    this.layoutCodes.push(`
                    (function(view){
                        if (!view) {return}
                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("[view]-` + parseFloat(element.getAttribute("value")).toFixed(6) + `-|", {view: view}));
                        view.superview.setNeedsLayout();
                    })(rootElement['`+ element.getAttribute("view") + `']);
                    `)
                }
                else if (element.tagName === "WIDTH" && element.getAttribute("view") && element.getAttribute("value")) {
                    this.layoutCodes.push(`
                    (function(view){
                        if (!view) {return}
                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("[view(` + parseFloat(element.getAttribute("value")).toFixed(6) + `)]", {view: view}));
                        view.superview.setNeedsLayout();
                    })(rootElement['`+ element.getAttribute("view") + `']);
                    `)
                }
                else if (element.tagName === "TOP" && element.getAttribute("view") && element.getAttribute("value")) {
                    this.layoutCodes.push(`
                    (function(view){
                        if (!view) {return}
                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:|-` + parseFloat(element.getAttribute("value")).toFixed(6) + `-[view]", {view: view}));
                        view.superview.setNeedsLayout();
                    })(rootElement['`+ element.getAttribute("view") + `']);
                    `)
                }
                else if (element.tagName === "CENTERY" && element.getAttribute("view") && element.getAttribute("value")) {
                    // TODO
                    // this.layoutCodes.push(`
                    // (function(view){
                    //     if (!view) {return}
                    //     view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("|-` + parseFloat(element.getAttribute("value")).toFixed(6) + `-[view]", {view: view}));
                    //     view.superview.setNeedsLayout();
                    // })(rootElement['`+ element.getAttribute("view") + `']);
                    // `)
                }
                else if (element.tagName === "BOTTOM" && element.getAttribute("view") && element.getAttribute("value")) {
                    this.layoutCodes.push(`
                    (function(view){
                        if (!view) {return}
                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:[view]-` + parseFloat(element.getAttribute("value")).toFixed(6) + `-|", {view: view}));
                        view.superview.setNeedsLayout();
                    })(rootElement['`+ element.getAttribute("view") + `']);
                    `)
                }
                else if (element.tagName === "HEIGHT" && element.getAttribute("view") && element.getAttribute("value")) {
                    this.layoutCodes.push(`
                    (function(view){
                        if (!view) {return}
                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat("V:[view(` + parseFloat(element.getAttribute("value")).toFixed(6) + `)]", {view: view}));
                        view.superview.setNeedsLayout();
                    })(rootElement['`+ element.getAttribute("view") + `']);
                    `)
                }
                else if (element.tagName === "VF" && element.getAttribute("value")) {
                    this.layoutCodes.push(`
                    (function(view, value){
                        view.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat(value, rootElement))
                        view.setNeedsLayout();
                    })(rootElement, '`+ element.getAttribute("value") + `');
                    `)
                }
            }
        }
    }

    toCode() {
        return `
            exports.default = (function(){
                const currentNode = new XT.View();
                currentNode.userInteractionEnabled = true;
                const rootElement = currentNode;
                `+ this.children.map(child => { return child.toCode() }).join(";") + `
                `+ this.layoutCodes.join(";") + `
                return currentNode;
            })
        `
    }

}

console.log(Button, ImageView, Label);
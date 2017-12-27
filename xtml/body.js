"use strict";
exports.__esModule = true;
var view_1 = require("./view");
var button_1 = require("./button");
var imageview_1 = require("./imageview");
var label_1 = require("./label");
global.viewOutlets = {};
var Body = /** @class */ (function () {
    function Body(obj) {
        this.obj = obj;
        this.parseView();
        this.parseLayout();
    }
    Body.prototype.parseView = function () {
        this.children = [];
        for (var index = 0; index < this.obj.children.length; index++) {
            var element = this.obj.children[index];
            if (view_1.components[element.tagName]) {
                this.children.push(new view_1.components[element.tagName](element));
            }
        }
    };
    Body.prototype.parseLayout = function () {
        this.layoutCodes = [];
        var layoutElements = this.obj.querySelectorAll("Layout");
        for (var index = 0; index < layoutElements.length; index++) {
            var layoutElement = layoutElements[index];
            for (var index_1 = 0; index_1 < layoutElement.children.length; index_1++) {
                var element = layoutElement.children[index_1];
                if (element.tagName === "FULLWIDTH" && element.getAttribute("view")) {
                    this.layoutCodes.push("\n                    (function(view){\n                        if (!view) {return}\n                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat(\"|-0-[view]-0-|\", {view: view}));\n                        view.superview.setNeedsLayout();\n                    })(rootElement['" + element.getAttribute("view") + "']);\n                    ");
                }
                else if (element.tagName === "FULLHEIGHT" && element.getAttribute("view")) {
                    this.layoutCodes.push("\n                    (function(view){\n                        if (!view) {return}\n                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat(\"V:|-0-[view]-0-|\", {view: view}));\n                        view.superview.setNeedsLayout();\n                    })(rootElement['" + element.getAttribute("view") + "']);\n                    ");
                }
                else if (element.tagName === "LEFT" && element.getAttribute("view") && element.getAttribute("value")) {
                    this.layoutCodes.push("\n                    (function(view){\n                        if (!view) {return}\n                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat(\"|-" + parseFloat(element.getAttribute("value")).toFixed(6) + "-[view]\", {view: view}));\n                        view.superview.setNeedsLayout();\n                    })(rootElement['" + element.getAttribute("view") + "']);\n                    ");
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
                    this.layoutCodes.push("\n                    (function(view){\n                        if (!view) {return}\n                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat(\"[view]-" + parseFloat(element.getAttribute("value")).toFixed(6) + "-|\", {view: view}));\n                        view.superview.setNeedsLayout();\n                    })(rootElement['" + element.getAttribute("view") + "']);\n                    ");
                }
                else if (element.tagName === "WIDTH" && element.getAttribute("view") && element.getAttribute("value")) {
                    this.layoutCodes.push("\n                    (function(view){\n                        if (!view) {return}\n                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat(\"[view(" + parseFloat(element.getAttribute("value")).toFixed(6) + ")]\", {view: view}));\n                        view.superview.setNeedsLayout();\n                    })(rootElement['" + element.getAttribute("view") + "']);\n                    ");
                }
                else if (element.tagName === "TOP" && element.getAttribute("view") && element.getAttribute("value")) {
                    this.layoutCodes.push("\n                    (function(view){\n                        if (!view) {return}\n                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat(\"V:|-" + parseFloat(element.getAttribute("value")).toFixed(6) + "-[view]\", {view: view}));\n                        view.superview.setNeedsLayout();\n                    })(rootElement['" + element.getAttribute("view") + "']);\n                    ");
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
                    this.layoutCodes.push("\n                    (function(view){\n                        if (!view) {return}\n                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat(\"V:[view]-" + parseFloat(element.getAttribute("value")).toFixed(6) + "-|\", {view: view}));\n                        view.superview.setNeedsLayout();\n                    })(rootElement['" + element.getAttribute("view") + "']);\n                    ");
                }
                else if (element.tagName === "HEIGHT" && element.getAttribute("view") && element.getAttribute("value")) {
                    this.layoutCodes.push("\n                    (function(view){\n                        if (!view) {return}\n                        view.superview.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat(\"V:[view(" + parseFloat(element.getAttribute("value")).toFixed(6) + ")]\", {view: view}));\n                        view.superview.setNeedsLayout();\n                    })(rootElement['" + element.getAttribute("view") + "']);\n                    ");
                }
                else if (element.tagName === "VF" && element.getAttribute("value")) {
                    this.layoutCodes.push("\n                    (function(view, value){\n                        view.addConstraints(XT.LayoutConstraint.constraintsWithVisualFormat(value, rootElement))\n                        view.setNeedsLayout();\n                    })(rootElement, '" + element.getAttribute("value") + "');\n                    ");
                }
            }
        }
    };
    Body.prototype.toCode = function () {
        return "\n            exports.default = (function(){\n                const currentNode = new XT.View();\n                currentNode.userInteractionEnabled = true;\n                const rootElement = currentNode;\n                " + this.children.map(function (child) { return child.toCode(); }).join(";") + "\n                " + this.layoutCodes.join(";") + "\n                return currentNode;\n            })\n        ";
    };
    return Body;
}());
exports.Body = Body;
console.log(button_1.Button, imageview_1.ImageView, label_1.Label);

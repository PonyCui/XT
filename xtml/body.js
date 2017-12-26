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
        this.children = [];
        for (var index = 0; index < obj.children.length; index++) {
            var element = obj.children[index];
            if (view_1.components[element.tagName]) {
                this.children.push(new view_1.components[element.tagName](element));
            }
        }
    }
    Body.prototype.toCode = function () {
        return "\n            exports.default = (function(){\n                const currentNode = new XT.View();\n                currentNode.userInteractionEnabled = true;\n                const rootElement = currentNode;\n                " + this.children.map(function (child) {
            return child.toCode();
        }).join(";") + "\n                return currentNode;\n            })\n        ";
    };
    return Body;
}());
exports.Body = Body;
console.log(button_1.Button, imageview_1.ImageView, label_1.Label);

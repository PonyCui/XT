"use strict";
exports.__esModule = true;
var view_1 = require("./view");
global.viewOutlets = {};
var Body = /** @class */ (function () {
    function Body(obj) {
        this.obj = obj;
        this.children = [];
        for (var index = 0; index < obj.children.length; index++) {
            var element = obj.children[index];
            this.children.push(new view_1.View(element));
        }
    }
    Body.prototype.toCode = function () {
        return "\n            exports.default = (function(){\n                const currentNode = new XT.View();\n                const rootElement = currentNode;\n                " + this.children.map(function (child) {
            return child.toCode();
        }).join(";") + "\n                return currentNode;\n            })\n        ";
    };
    return Body;
}());
exports.Body = Body;

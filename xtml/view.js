"use strict";
exports.__esModule = true;
var View = /** @class */ (function () {
    function View(obj) {
        this.obj = obj;
        this.codeSnippets = [];
        this.parse();
    }
    View.prototype.parse = function () {
        var _this = this;
        this.attr("name", function (value) {
            _this.codeSnippets.push("rootElement['" + value + "'] = currentNode;");
            global.viewOutlets[value] = 'XT.View';
        });
        this.attr("frame", function (value) {
            var frameValue = value.replace(/ /ig, '').split(",");
            _this.codeSnippets.push("currentNode.frame = XT.RectMake(" + frameValue.join(",") + ")");
        });
        this.attr("backgroundColor", function (colorValue) {
            if (colorValue.startsWith("#")) {
                if (colorValue.length == 7) {
                    _this.codeSnippets.push("currentNode.backgroundColor = new XT.Color(" + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + "," + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + ", 1.0);");
                }
                else if (colorValue.length == 9) {
                    _this.codeSnippets.push("currentNode.backgroundColor = new XT.Color(" + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + "," + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(7, 9)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + ");");
                }
            }
        });
    };
    View.prototype.attr = function (name, exec) {
        if (this.obj.getAttribute(name)) {
            exec(this.obj.getAttribute(name));
        }
    };
    View.prototype.toCode = function () {
        return "(function(parentNode){ \n                    const currentNode = new XT.View();\n                    " + this.codeSnippets.join("\n") + "\n                    parentNode.addSubview(currentNode);\n                    return currentNode;\n                })(currentNode);";
    };
    return View;
}());
exports.View = View;

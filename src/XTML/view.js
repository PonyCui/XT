"use strict";
exports.__esModule = true;
exports.components = {};
var View = /** @class */ (function () {
    function View(obj) {
        this.obj = obj;
        this.className = "XT.View";
        this.codeSnippets = [];
        this.children = [];
        this.init();
        this.parse();
        this.parseChildren();
    }
    View.prototype.init = function () { };
    View.prototype.parse = function () {
        var _this = this;
        this.attr("name", function (value) {
            _this.codeSnippets.push("rootElement['" + value + "'] = currentNode;");
            global.viewOutlets[value] = _this.className;
        });
        this.attr("frame", function (value) {
            var frameValue = value.replace(/ /ig, '').split(",");
            if (frameValue.length < 4) {
                return;
            }
            _this.codeSnippets.push("currentNode.frame = XT.RectMake(" + frameValue.join(",") + ");");
        });
        this.attr("transform", function (value) {
            var transformValue = value.replace(/ /ig, '').split(",");
            if (transformValue.length < 6) {
                return;
            }
            _this.codeSnippets.push("currentNode.transform = new XT.TransformMatrix(" + transformValue.join(",") + ");");
        });
        this.attr("clipsToBounds", function (value) {
            _this.codeSnippets.push("currentNode.clipsToBounds = " + (value === "true" ? "true" : "false") + ";");
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
        this.attr("alpha", function (value) {
            _this.codeSnippets.push("currentNode.alpha = " + parseFloat(value).toFixed(6) + ";");
        });
        this.attr("hidden", function (value) {
            _this.codeSnippets.push("currentNode.hidden = " + (value === "true" ? "true" : "false") + ";");
        });
        this.attr("tintColor", function (colorValue) {
            if (colorValue.startsWith("#")) {
                if (colorValue.length == 7) {
                    _this.codeSnippets.push("currentNode.tintColor = new XT.Color(" + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + "," + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + ", 1.0);");
                }
                else if (colorValue.length == 9) {
                    _this.codeSnippets.push("currentNode.tintColor = new XT.Color(" + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + "," + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(7, 9)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + ");");
                }
            }
        });
        this.attr("cornerRadius", function (value) {
            _this.codeSnippets.push("currentNode.cornerRadius = " + parseFloat(value).toFixed(6) + ";");
        });
        this.attr("borderWidth", function (value) {
            _this.codeSnippets.push("currentNode.borderWidth = " + parseFloat(value).toFixed(6) + ";");
        });
        this.attr("borderColor", function (colorValue) {
            if (colorValue.startsWith("#")) {
                if (colorValue.length == 7) {
                    _this.codeSnippets.push("currentNode.borderColor = new XT.Color(" + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + "," + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + ", 1.0);");
                }
                else if (colorValue.length == 9) {
                    _this.codeSnippets.push("currentNode.borderColor = new XT.Color(" + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + "," + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(7, 9)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + ");");
                }
            }
        });
        this.attr("shadowColor", function (colorValue) {
            if (colorValue.startsWith("#")) {
                if (colorValue.length == 7) {
                    _this.codeSnippets.push("currentNode.shadowColor = new XT.Color(" + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + "," + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + ", 1.0);");
                }
                else if (colorValue.length == 9) {
                    _this.codeSnippets.push("currentNode.shadowColor = new XT.Color(" + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + "," + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(7, 9)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + ");");
                }
            }
        });
        this.attr("shadowOpacity", function (value) {
            _this.codeSnippets.push("currentNode.shadowOpacity = " + parseFloat(value).toFixed(6) + ";");
        });
        this.attr("shadowOffset", function (value) {
            var sizeValue = value.replace(/ /ig, '').split(",");
            if (sizeValue.length < 2) {
                return;
            }
            _this.codeSnippets.push("currentNode.shadowOffset = XT.SizeMake(" + sizeValue.join(",") + ");");
        });
        this.attr("shadowRadius", function (value) {
            _this.codeSnippets.push("currentNode.shadowRadius = " + parseFloat(value).toFixed(6) + ";");
        });
        this.attr("tag", function (value) {
            _this.codeSnippets.push("currentNode.tag = " + parseInt(value) + ";");
        });
        this.attr("userInteractionEnabled", function (value) {
            _this.codeSnippets.push("currentNode.userInteractionEnabled = " + (value === "true" ? "true" : "false") + ";");
        });
    };
    View.prototype.parseChildren = function () {
        this.children = [];
        for (var index = 0; index < this.obj.children.length; index++) {
            var element = this.obj.children[index];
            if (exports.components[element.tagName]) {
                this.children.push(new exports.components[element.tagName](element));
            }
        }
    };
    View.prototype.attr = function (name, exec) {
        if (this.obj.getAttribute(name)) {
            exec(this.obj.getAttribute(name));
        }
    };
    View.prototype.toCode = function () {
        return "(function(parentNode){ \n                    const currentNode = new " + this.className + "();\n                    " + this.codeSnippets.join("\n") + "\n                    parentNode.addSubview(currentNode);\n                    " + this.children.map(function (it) {
            return it.toCode();
        }).join(";") + "\n                    return currentNode;\n                })(currentNode);";
    };
    return View;
}());
exports.View = View;
exports.components["VIEW"] = View;

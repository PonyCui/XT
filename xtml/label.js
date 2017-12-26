"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var view_1 = require("./view");
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.prototype.init = function () {
        _super.prototype.init.call(this);
        this.className = "XT.Label";
    };
    Label.prototype.parse = function () {
        var _this = this;
        _super.prototype.parse.call(this);
        this.attr("text", function (value) {
            _this.codeSnippets.push("currentNode.text = '" + value + "';");
        });
        this.attr("fontSize", function (value) {
            var fontWeight = _this.obj.getAttribute("fontWeight");
            _this.codeSnippets.push("currentNode.font = new XT.Font(" + parseFloat(value) + ", " + (fontWeight || 'undefined') + ");");
        });
        this.attr("textColor", function (colorValue) {
            if (colorValue.startsWith("#")) {
                if (colorValue.length == 7) {
                    _this.codeSnippets.push("currentNode.textColor = new XT.Color(" + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + "," + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + ", 1.0);");
                }
                else if (colorValue.length == 9) {
                    _this.codeSnippets.push("currentNode.textColor = new XT.Color(" + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + "," + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(7, 9)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + ");");
                }
            }
        });
        this.attr("numberOfLines", function (value) {
            _this.codeSnippets.push("currentNode.numberOfLines = " + parseInt(value) + ";");
        });
        this.attr("letterSpace", function (value) {
            _this.codeSnippets.push("currentNode.letterSpace = " + parseFloat(value).toFixed(6) + ";");
        });
        this.attr("lineSpace", function (value) {
            _this.codeSnippets.push("currentNode.lineSpace = " + parseFloat(value).toFixed(6) + ";");
        });
        this.attr("textAlignment", function (value) {
            if (value.toLowerCase() === "left") {
                _this.codeSnippets.push("currentNode.textAlignment = XT.TextAlignment.Left;");
            }
            else if (value.toLowerCase() === "center") {
                _this.codeSnippets.push("currentNode.textAlignment = XT.TextAlignment.Center;");
            }
            else if (value.toLowerCase() === "right") {
                _this.codeSnippets.push("currentNode.textAlignment = XT.TextAlignment.Right;");
            }
        });
        this.attr("lineBreakMode", function (value) {
            if (value.toLowerCase() === "wrap") {
                _this.codeSnippets.push("currentNode.lineBreakMode = XT.LineBreakMode.WordWrapping;");
            }
            else if (value.toLowerCase() === "tail") {
                _this.codeSnippets.push("currentNode.lineBreakMode = XT.LineBreakMode.TruncatingTail;");
            }
        });
    };
    return Label;
}(view_1.View));
exports.Label = Label;
view_1.components['LABEL'] = Label;

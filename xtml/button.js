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
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.init = function () {
        _super.prototype.init.call(this);
        this.className = "XT.Button";
    };
    Button.prototype.parse = function () {
        var _this = this;
        _super.prototype.parse.call(this);
        this.attr("title", function (value) {
            _this.codeSnippets.push("currentNode.title = '" + value + "';");
        });
        this.attr("fontSize", function (value) {
            var fontWeight = _this.obj.getAttribute("fontWeight");
            _this.codeSnippets.push("currentNode.font = new XT.Font(" + parseFloat(value) + ", " + (fontWeight || 'undefined') + ");");
        });
        this.attr("color", function (colorValue) {
            if (colorValue.startsWith("#")) {
                if (colorValue.length == 7) {
                    _this.codeSnippets.push("currentNode.color = new XT.Color(" + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + "," + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + ", 1.0);");
                }
                else if (colorValue.length == 9) {
                    _this.codeSnippets.push("currentNode.color = new XT.Color(" + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + "," + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(7, 9)) / 255.0 + ", " + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + ");");
                }
            }
        });
        this.attr("imgSrc", function (value) {
            var scales = _this.obj.getAttribute("imgScales") ? _this.obj.getAttribute("imgScales").split(",") : [];
            if (value.startsWith("http://") || value.startsWith("https://")) {
                _this.codeSnippets.push("XT.Image.fromURL('" + value + "', function(it) { currentNode.image = it });");
            }
            else {
                _this.codeSnippets.push("XT.Image.fromAssetsWithScales('" + value + "', [" + scales.join(',') + "], function(it) { currentNode.image = it });");
            }
        });
    };
    return Button;
}(view_1.View));
exports.Button = Button;
view_1.components['BUTTON'] = Button;

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
var ImageView = /** @class */ (function (_super) {
    __extends(ImageView, _super);
    function ImageView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.className = "XT.ImageView";
    };
    ImageView.prototype.parse = function () {
        var _this = this;
        _super.prototype.parse.call(this);
        this.attr("src", function (value) {
            var scales = _this.obj.getAttribute("scales") ? _this.obj.getAttribute("scales").split(",") : [];
            if (value.startsWith("http://") || value.startsWith("https://")) {
                _this.codeSnippets.push("XT.Image.fromURL('" + value + "', function(it) { currentNode.image = it });");
            }
            else {
                _this.codeSnippets.push("XT.Image.fromAssetsWithScales('" + value + "', [" + scales.join(',') + "], function(it) { currentNode.image = it });");
            }
        });
    };
    return ImageView;
}(view_1.View));
exports.ImageView = ImageView;
view_1.components['IMAGEVIEW'] = ImageView;

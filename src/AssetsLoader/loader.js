"use strict";
exports.__esModule = true;
var fs = require("fs");
var Jimp = require("jimp");
var imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');
var compressed = [];
function default_1() {
    var callback = this.async();
    var resourcePath = this.resourcePath;
    var baseDir = (function (path) {
        var arr = path.split('/');
        arr.pop();
        return arr.join('/');
    })(resourcePath);
    var readFile = function () {
        Jimp.read(resourcePath, function (err, image) {
            var width = image.bitmap.width;
            var height = image.bitmap.height;
            try {
                var base64EncodedString = new Buffer(fs.readFileSync(resourcePath), 'binary').toString('base64');
                var scale = 1.0;
                if (resourcePath.endsWith('@2x.png')) {
                    scale = 2.0;
                }
                else if (resourcePath.endsWith('@3x.png')) {
                    scale = 3.0;
                }
                else if (resourcePath.endsWith('@2x.jpg')) {
                    scale = 2.0;
                }
                else if (resourcePath.endsWith('@3x.jpg')) {
                    scale = 3.0;
                }
                callback(null, "\n                    module.exports = UI.Image.fromBase64('" + base64EncodedString + "', " + scale.toFixed(0) + ", " + width.toFixed(0) + ", " + height.toFixed(0) + ").retain();\n                ");
            }
            catch (error) {
                console.error(error);
            }
        });
    };
    if (compressed.indexOf(resourcePath) >= 0) {
        readFile();
    }
    else {
        imagemin([this.resourcePath], baseDir, { use: [imageminPngquant()] }).then(function () {
            compressed.push(resourcePath);
            readFile();
        });
    }
}
exports["default"] = default_1;

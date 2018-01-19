"use strict";
exports.__esModule = true;
var fs = require("fs");
var Jimp = require("jimp");
function default_1(source) {
    var callback = this.async();
    var resourcePath = this.resourcePath;
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
            callback(null, "\n                module.exports = XT.Image.fromBase64('" + base64EncodedString + "', " + scale.toFixed(0) + ", " + width.toFixed(0) + ", " + height.toFixed(0) + ");\n            ");
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports["default"] = default_1;

"use strict";
exports.__esModule = true;
var fs = require("fs");
function default_1(source) {
    try {
        var base64EncodedString = new Buffer(fs.readFileSync(this.resourcePath), 'binary').toString('base64');
        var scale = 1.0;
        if (this.resourcePath.endsWith('@2x.png')) {
            scale = 2.0;
        }
        else if (this.resourcePath.endsWith('@3x.png')) {
            scale = 3.0;
        }
        return "\n            module.exports = XT.Image.fromBase64('" + base64EncodedString + "', " + scale.toFixed(0) + ");\n        ";
    }
    catch (error) {
        console.error(error);
    }
    return "//test";
}
exports["default"] = default_1;

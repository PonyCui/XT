"use strict";
exports.__esModule = true;
var jsdom_1 = require("jsdom");
var body_1 = require("./body");
function default_1(source) {
    try {
        var dom = new jsdom_1.JSDOM(source);
        var body = new body_1.Body(dom.window.document.querySelector('body'));
        // console.log(body.toCode());
        return body.toCode();
    }
    catch (error) {
        console.error(error);
    }
    return "";
}
exports["default"] = default_1;

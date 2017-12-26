#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var fs = require("fs");
var jsdom_1 = require("jsdom");
var body_1 = require("./body");
function parse(source) {
    try {
        var dom = new jsdom_1.JSDOM(source);
        var body = new body_1.Body(dom.window.document.querySelector('body'));
    }
    catch (error) {
        console.error(error);
    }
}
function exec(file) {
    global.viewOutlets = {};
    parse(fs.readFileSync(file));
    var propTypes = Object.keys(global.viewOutlets).map(function (it) {
        return it + ":" + global.viewOutlets[it];
    }).join("\n        ");
    var codeTypes = "/**\n * Generate By create-xtml-types Command line tool\n */\ndeclare module \"*/" + file + "\" {\n\n    export default class Body extends XT.View {\n        \n        " + propTypes + "\n\n    }\n\n}\n    ";
    fs.writeFileSync('./' + file.replace(".xtml", ".d.ts"), codeTypes);
}
fs.readdirSync("./").filter(function (file) { return file.endsWith(".xtml"); }).forEach(function (file) {
    exec(file);
});
if (process.argv.indexOf("-w") > 0) {
    fs.watch("./", function (err, file) {
        if (file.endsWith(".xtml")) {
            exec(file);
        }
    });
}

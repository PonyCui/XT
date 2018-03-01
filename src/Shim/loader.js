"use strict";
///<reference types="node" />
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
function isVersion(value) {
    return !(/[^0-9\|.]/.test(value));
}
function needShim(minSDKVersion, currentVersion) {
    var minComponents = minSDKVersion.split(".");
    var curComponents = currentVersion.split(".");
    var needs = false;
    curComponents.forEach(function (value, idx) {
        if (needs) {
            return;
        }
        if (minComponents[idx] === undefined || parseInt(value) > parseInt(minComponents[idx])) {
            needs = true;
        }
    });
    return needs;
}
function default_1(source) {
    if (source.indexOf("XT.minSDK") >= 0) {
        var match = source.match(/XT\.minSDK.*?["|'](.*?)["|']/);
        if (!(match instanceof Array)) {
            return;
        }
        var minSDKVersion_1 = match[1];
        if (isVersion(minSDKVersion_1)) {
            var baseDir = path.resolve(__dirname, './');
            fs.readdirSync(baseDir)
                .filter(function (it) { return isVersion(it) && needShim(minSDKVersion_1, it); })
                .sort(function (a, b) {
                return needShim(a, b) ? -1 : 1;
            })
                .reverse()
                .forEach(function (it) {
                var versionDir = path.resolve(__dirname, './' + it);
                fs.readdirSync(versionDir).filter(function (it) { return it.indexOf(".ts") > 0 && it.indexOf(".d.ts") < 0; }).forEach(function (it) {
                    source = "require('" + versionDir + "/" + it + "');\n" + source;
                });
            });
        }
    }
    return source;
}
exports["default"] = default_1;

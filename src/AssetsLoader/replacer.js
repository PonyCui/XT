"use strict";
exports.__esModule = true;
var ts = require('typescript');
function default_1(source) {
    return source.replace(/UI\.Image\.fromSource\((.*?)\)/, 'require($1)');
}
exports["default"] = default_1;

"use strict";
exports.__esModule = true;
var Factory_1 = require("./implementation/Factory");
Factory_1.SwitchFactory();
exports["default"] = Factory_1.Factory;
if (window !== undefined) {
    window.XT = Factory_1.Factory;
}

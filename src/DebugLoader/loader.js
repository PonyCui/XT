"use strict";
exports.__esModule = true;
var ts = require('typescript');
function default_1(source) {
    var codePath = this.resourcePath;
    var program = ts.createProgram([codePath], {
        noResolve: true,
        target: ts.ScriptTarget.Latest
    });
    var sourceFile = program.getSourceFile(codePath);
    if (sourceFile.isDeclarationFile === true) {
        return source;
    }
    var breakingLines = [];
    var findBreakables = function (node) {
        if (node.kind === ts.SyntaxKind.ExpressionStatement) {
            breakingLines.push(sourceFile.getLineAndCharacterOfPosition(node.pos + 1).line);
        }
        node.forEachChild(function (it) {
            findBreakables(it);
        });
    };
    findBreakables(sourceFile);
    var content = "declare var _XTDebug: any; const __FILE__ = '" + this.resourcePath + "'; \n" + source.split("\n").map(function (content, idx) {
        if (content.indexOf("super(") >= 0) {
            return content;
        }
        else if (breakingLines.indexOf(idx) >= 0 && content.indexOf("{") < 0) {
            return ";_XTDebug.xtr_breakpoint(__FILE__ + ':" + idx + "');" + content;
        }
        return content;
    }).join("\n");
    return content;
}
exports["default"] = default_1;

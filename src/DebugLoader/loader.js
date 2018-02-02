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
    var breakingVariables = {};
    var findBreakables = function (node, currentVariables) {
        if (node.kind === ts.SyntaxKind.ExpressionStatement ||
            node.kind === ts.SyntaxKind.VariableStatement ||
            node.kind === ts.SyntaxKind.ReturnStatement) {
            var lineNum = sourceFile.getLineAndCharacterOfPosition(node.pos + 1).line;
            breakingLines.push(lineNum);
            breakingVariables[lineNum] = Object.keys(currentVariables);
        }
        if (node.kind === ts.SyntaxKind.VariableStatement) {
            node.declarationList.declarations.forEach(function (it) {
                currentVariables[it.name.escapedText] = true;
            });
        }
        var nextScopeVariables = {};
        node.forEachChild(function (it) {
            findBreakables(it, nextScopeVariables);
        });
    };
    findBreakables(sourceFile, {});
    var content = "const __FILE__ = '" + this.resourcePath + "'; \n" + source.split("\n").map(function (content, idx) {
        if (content.indexOf("super(") >= 0) {
            return content;
        }
        else if (breakingLines.indexOf(idx) >= 0 && content.indexOf("{") < 0) {
            return ";XT.Debug.run(__FILE__ + ':" + idx + "', this, {" + (breakingVariables[idx] || []).join(',') + "});" + content;
        }
        return content;
    }).join("\n");
    return content;
}
exports["default"] = default_1;

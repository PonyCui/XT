declare var require: any
var ts = require('typescript');

export default function (source: string) {
    const codePath = this.resourcePath
    const program = ts.createProgram([codePath], {
        noResolve: true,
        target: ts.ScriptTarget.Latest,
    })
    const sourceFile = program.getSourceFile(codePath)
    if (sourceFile.isDeclarationFile === true) {
        return source
    }
    let breakingLines: number[] = []
    const findBreakables = (node: any) => {
        if (node.kind === ts.SyntaxKind.ExpressionStatement) {
            breakingLines.push(sourceFile.getLineAndCharacterOfPosition(node.pos + 1).line)
        }
        node.forEachChild((it: any) => {
            findBreakables(it)
        })
    }
    findBreakables(sourceFile)
    const content = "declare var _XTDebug: any; const __FILE__ = '" + this.resourcePath + "'; \n" + source.split("\n").map((content, idx) => {
        if (content.indexOf("super(") >= 0) {
            return content
        }
        else if (breakingLines.indexOf(idx) >= 0 && content.indexOf("{") < 0) {
            return `;_XTDebug.xtr_breakpoint(__FILE__ + ':` + idx + `');` + content;
        }
        return content
    }).join("\n")
    return content
}
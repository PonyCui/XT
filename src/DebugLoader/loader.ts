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
    let breakingVariables: any = {}
    const findBreakables = (node: any, currentVariables: any) => {
        if (node.kind === ts.SyntaxKind.ExpressionStatement ||
            node.kind === ts.SyntaxKind.VariableStatement ||
            node.kind === ts.SyntaxKind.ReturnStatement) {
            const lineNum = sourceFile.getLineAndCharacterOfPosition(node.pos + 1).line
            breakingLines.push(lineNum)
            breakingVariables[lineNum] = Object.keys(currentVariables)
        }
        if (node.kind === ts.SyntaxKind.VariableStatement) {
            node.declarationList.declarations.forEach((it: any) => {
                currentVariables[it.name.escapedText] = true
            })
        }
        let nextScopeVariables = {}
        node.forEachChild((it: any) => {
            findBreakables(it, nextScopeVariables)
        })
    }
    findBreakables(sourceFile, {})
    const content = "const __FILE__ = '" + this.resourcePath + "'; \n" + source.split("\n").map((content, idx) => {
        if (content.indexOf("super(") >= 0) {
            return content
        }
        else if (breakingLines.indexOf(idx) >= 0 && content.indexOf("{") < 0) {
            return `;XT.Debug.run(__FILE__ + ':` + idx + `', this, {` + (breakingVariables[idx] || []).join(',') + `});` + content;
        }
        return content
    }).join("\n")
    return content
}
export class View {

    codeSnippets: string[] = [];

    constructor(protected obj: Element) {
        this.parse()
    }

    parse() {
        this.attr("name", (value) => {
            this.codeSnippets.push(`rootElement['` + value + `'] = currentNode;`);
            (global as any).viewOutlets[value] = 'XT.View';
        })
        this.attr("frame", (value) => {
            const frameValue = value.replace(/ /ig, '').split(",");
            this.codeSnippets.push(`currentNode.frame = XT.RectMake(` + frameValue.join(",") + `)`);
        })
        this.attr("backgroundColor", (colorValue) => {
            if (colorValue.startsWith("#")) {
                if (colorValue.length == 7) {
                    this.codeSnippets.push(`currentNode.backgroundColor = new XT.Color(` + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + `,` + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + `, 1.0);`)
                }
                else if (colorValue.length == 9) {
                    this.codeSnippets.push(`currentNode.backgroundColor = new XT.Color(` + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + `,` + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(7, 9)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + `);`)
                }
            }
        })
    }

    attr(name, exec) {
        if (this.obj.getAttribute(name)) {
            exec(this.obj.getAttribute(name));
        }
    }

    toCode(): string {
        return `(function(parentNode){ 
                    const currentNode = new XT.View();
                    `+ this.codeSnippets.join("\n") + `
                    parentNode.addSubview(currentNode);
                    return currentNode;
                })(currentNode);`;
    }

}
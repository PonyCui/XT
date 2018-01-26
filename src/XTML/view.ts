declare var global: any
export let components: { [key: string]: typeof View } = {}

export class View {

    className = "XT.View";
    codeSnippets: string[] = [];
    children: View[] = [];

    constructor(protected obj: Element) {
        this.init();
        this.parse()
        this.parseChildren();
    }

    init() { }

    parse() {
        this.attr("name", (value) => {
            this.codeSnippets.push(`rootElement['` + value + `'] = currentNode;`);
            (global as any).viewOutlets[value] = this.className;
        })
        this.attr("frame", (value) => {
            const frameValue = value.replace(/ /ig, '').split(",");
            if (frameValue.length < 4) { return; }
            this.codeSnippets.push(`currentNode.frame = XT.RectMake(` + frameValue.join(",") + `);`);
        })
        this.attr("transform", (value) => {
            const transformValue = value.replace(/ /ig, '').split(",");
            if (transformValue.length < 6) { return; }
            this.codeSnippets.push(`currentNode.transform = new XT.TransformMatrix(` + transformValue.join(",") + `);`);
        })
        this.attr("clipsToBounds", (value) => {
            this.codeSnippets.push(`currentNode.clipsToBounds = ` + (value === "true" ? "true" : "false") + `;`)
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
        this.attr("alpha", (value) => {
            this.codeSnippets.push(`currentNode.alpha = ` + parseFloat(value).toFixed(6) + `;`)
        })
        this.attr("hidden", (value) => {
            this.codeSnippets.push(`currentNode.hidden = ` + (value === "true" ? "true" : "false") + `;`)
        })
        this.attr("tintColor", (colorValue) => {
            if (colorValue.startsWith("#")) {
                if (colorValue.length == 7) {
                    this.codeSnippets.push(`currentNode.tintColor = new XT.Color(` + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + `,` + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + `, 1.0);`)
                }
                else if (colorValue.length == 9) {
                    this.codeSnippets.push(`currentNode.tintColor = new XT.Color(` + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + `,` + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(7, 9)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + `);`)
                }
            }
        })
        this.attr("cornerRadius", (value) => {
            this.codeSnippets.push(`currentNode.cornerRadius = ` + parseFloat(value).toFixed(6) + `;`)
        })
        this.attr("borderWidth", (value) => {
            this.codeSnippets.push(`currentNode.borderWidth = ` + parseFloat(value).toFixed(6) + `;`)
        })
        this.attr("borderColor", (colorValue) => {
            if (colorValue.startsWith("#")) {
                if (colorValue.length == 7) {
                    this.codeSnippets.push(`currentNode.borderColor = new XT.Color(` + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + `,` + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + `, 1.0);`)
                }
                else if (colorValue.length == 9) {
                    this.codeSnippets.push(`currentNode.borderColor = new XT.Color(` + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + `,` + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(7, 9)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + `);`)
                }
            }
        })
        this.attr("shadowColor", (colorValue) => {
            if (colorValue.startsWith("#")) {
                if (colorValue.length == 7) {
                    this.codeSnippets.push(`currentNode.shadowColor = new XT.Color(` + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + `,` + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + `, 1.0);`)
                }
                else if (colorValue.length == 9) {
                    this.codeSnippets.push(`currentNode.shadowColor = new XT.Color(` + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + `,` + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(7, 9)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + `);`)
                }
            }
        })
        this.attr("shadowOpacity", (value) => {
            this.codeSnippets.push(`currentNode.shadowOpacity = ` + parseFloat(value).toFixed(6) + `;`)
        })
        this.attr("shadowOffset", (value) => {
            const sizeValue = value.replace(/ /ig, '').split(",");
            if (sizeValue.length < 2) { return; }
            this.codeSnippets.push(`currentNode.shadowOffset = XT.SizeMake(` + sizeValue.join(",") + `);`);
        })
        this.attr("shadowRadius", (value) => {
            this.codeSnippets.push(`currentNode.shadowRadius = ` + parseFloat(value).toFixed(6) + `;`)
        })
        this.attr("tag", (value) => {
            this.codeSnippets.push(`currentNode.tag = ` + parseInt(value) + `;`)
        })
        this.attr("userInteractionEnabled", (value) => {
            this.codeSnippets.push(`currentNode.userInteractionEnabled = ` + (value === "true" ? "true" : "false") + `;`)
        })
    }

    parseChildren() {
        this.children = [];
        for (let index = 0; index < this.obj.children.length; index++) {
            const element = this.obj.children[index];
            if (components[element.tagName]) {
                this.children.push(new components[element.tagName](element))
            }
        }
    }

    attr(name: string, exec: (value: any) => void) {
        if (this.obj.getAttribute(name)) {
            exec(this.obj.getAttribute(name));
        }
    }

    toCode(): string {
        return `(function(parentNode){ 
                    const currentNode = new `+ this.className + `();
                    `+ this.codeSnippets.join("\n") + `
                    parentNode.addSubview(currentNode);
                    ` + this.children.map(it => {
                return it.toCode();
            }).join(";") + `
                    return currentNode;
                })(currentNode);`;
    }

}

components["VIEW"] = View;
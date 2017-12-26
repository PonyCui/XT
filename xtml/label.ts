import { View, components } from "./view";

export class Label extends View {

    init() {
        super.init();
        this.className = "XT.Label"
    }

    parse() {
        super.parse()
        this.attr("text", (value) => {
            this.codeSnippets.push(`currentNode.text = '` + value + `';`);
        })
        this.attr("fontSize", (value) => {
            const fontWeight = this.obj.getAttribute("fontWeight")
            this.codeSnippets.push(`currentNode.font = new XT.Font(` + parseFloat(value) + `, ` + (fontWeight || 'undefined') + `);`);
        })
        this.attr("textColor", (colorValue) => {
            if (colorValue.startsWith("#")) {
                if (colorValue.length == 7) {
                    this.codeSnippets.push(`currentNode.textColor = new XT.Color(` + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + `,` + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + `, 1.0);`)
                }
                else if (colorValue.length == 9) {
                    this.codeSnippets.push(`currentNode.textColor = new XT.Color(` + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + `,` + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(7, 9)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + `);`)
                }
            }
        })
        this.attr("numberOfLines", (value) => {
            this.codeSnippets.push(`currentNode.numberOfLines = ` + parseInt(value) + `;`);
        })
        this.attr("letterSpace", (value) => {
            this.codeSnippets.push(`currentNode.letterSpace = ` + parseFloat(value).toFixed(6) + `;`);
        })
        this.attr("lineSpace", (value) => {
            this.codeSnippets.push(`currentNode.lineSpace = ` + parseFloat(value).toFixed(6) + `;`);
        })
        this.attr("textAlignment", (value: string) => {
            if (value.toLowerCase() === "left") {
                this.codeSnippets.push(`currentNode.textAlignment = XT.TextAlignment.Left;`);
            }
            else if (value.toLowerCase() === "center") {
                this.codeSnippets.push(`currentNode.textAlignment = XT.TextAlignment.Center;`);
            }
            else if (value.toLowerCase() === "right") {
                this.codeSnippets.push(`currentNode.textAlignment = XT.TextAlignment.Right;`);
            } 
        })
        this.attr("lineBreakMode", (value: string) => {
            if (value.toLowerCase() === "wrap") {
                this.codeSnippets.push(`currentNode.lineBreakMode = XT.LineBreakMode.WordWrapping;`);
            }
            else if (value.toLowerCase() === "tail") {
                this.codeSnippets.push(`currentNode.lineBreakMode = XT.LineBreakMode.TruncatingTail;`);
            }
        })
    }

}

components['LABEL'] = Label
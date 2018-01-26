import { View, components } from "./view";

export class Button extends View {

    init() {
        super.init();
        this.className = "XT.Button"
    }

    parse() {
        super.parse()
        this.attr("title", (value) => {
            this.codeSnippets.push(`currentNode.title = '` + value + `';`);
        })
        this.attr("fontSize", (value) => {
            const fontWeight = this.obj.getAttribute("fontWeight")
            this.codeSnippets.push(`currentNode.font = new XT.Font(` + parseFloat(value) + `, ` + (fontWeight || 'undefined') + `);`);
        })
        this.attr("color", (colorValue) => {
            if (colorValue.startsWith("#")) {
                if (colorValue.length == 7) {
                    this.codeSnippets.push(`currentNode.color = new XT.Color(` + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + `,` + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + `, 1.0);`)
                }
                else if (colorValue.length == 9) {
                    this.codeSnippets.push(`currentNode.color = new XT.Color(` + parseInt("0x" + colorValue.substring(3, 5)) / 255.0 + `,` + parseInt("0x" + colorValue.substring(5, 7)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(7, 9)) / 255.0 + `, ` + parseInt("0x" + colorValue.substring(1, 3)) / 255.0 + `);`)
                }
            }
        })
        this.attr("imgSrc", (value) => {
            const scales = this.obj.getAttribute("imgScales") ? (this.obj.getAttribute("imgScales") || "1").split(",") : [];
            if (value.startsWith("http://") || value.startsWith("https://")) {
                this.codeSnippets.push(`XT.Image.fromURL('` + value + `', function(it) { currentNode.image = it });`);
            }
            else {
                this.codeSnippets.push(`XT.Image.fromAssetsWithScales('` + value + `', [` + scales.join(',') + `], function(it) { currentNode.image = it });`);
            }
        })
    }

}

components['BUTTON'] = Button
import { View, components } from "./view";

export class ImageView extends View {

    init() {
        super.init();
        this.className = "XT.ImageView"
    }

    parse() {
        super.parse()
        this.attr("src", (value) => {
            const scales = this.obj.getAttribute("scales") ? this.obj.getAttribute("scales").split(",") : [];
            if (value.startsWith("http://") || value.startsWith("https://")) {
                this.codeSnippets.push(`XT.Image.fromURL('` + value + `', function(it) { currentNode.image = it });`);
            }
            else {
                this.codeSnippets.push(`XT.Image.fromAssetsWithScales('` + value + `', [` + scales.join(',') + `], function(it) { currentNode.image = it });`);
            }
        })
    }

}

components['IMAGEVIEW'] = ImageView
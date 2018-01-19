var fs = require("fs")

export default function (source) {
    try {
        const base64EncodedString = new Buffer(fs.readFileSync(this.resourcePath), 'binary').toString('base64')
        let scale = 1.0
        if (this.resourcePath.endsWith('@2x.png')) {
            scale = 2.0
        }
        else if (this.resourcePath.endsWith('@3x.png')) {
            scale = 3.0
        }
        return `
            module.exports = XT.Image.fromBase64('`+ base64EncodedString + `', ` + scale.toFixed(0) + `);
        `
    } catch (error) {
        console.error(error)
    }
    return "//test"
}
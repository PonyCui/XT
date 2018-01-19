var fs = require("fs")
var Jimp = require("jimp");

export default function (source) {
    var callback = this.async();
    var resourcePath = this.resourcePath
    Jimp.read(resourcePath, function (err, image) {
        const width = image.bitmap.width
        const height = image.bitmap.height
        try {
            const base64EncodedString = new Buffer(fs.readFileSync(resourcePath), 'binary').toString('base64')
            let scale = 1.0
            if (resourcePath.endsWith('@2x.png')) {
                scale = 2.0
            }
            else if (resourcePath.endsWith('@3x.png')) {
                scale = 3.0
            }
            callback(null, `
                module.exports = XT.Image.fromBase64('`+ base64EncodedString + `', ` + scale.toFixed(0) + `, ` + width.toFixed(0) + `, ` + height.toFixed(0) + `);
            `)
        } catch (error) {
            console.error(error)
        }
    })
}
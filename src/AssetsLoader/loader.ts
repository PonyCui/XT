declare var require: any
declare var Buffer: any
var fs = require("fs")
var Jimp = require("jimp");
var imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');
var compressed: any[] = []

export default function () {
    var callback = this.async();
    var resourcePath = this.resourcePath
    var baseDir = (function (path: string) {
        var arr = path.split('/')
        arr.pop()
        return arr.join('/')
    })(resourcePath)
    const readFile = function () {
        Jimp.read(resourcePath, function (err: Error, image: any) {
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
                    module.exports = UI.Image.fromBase64('`+ base64EncodedString + `', ` + scale.toFixed(0) + `, ` + width.toFixed(0) + `, ` + height.toFixed(0) + `).retain();
                `)
            } catch (error) {
                console.error(error)
            }
        })
    }
    if (compressed.indexOf(resourcePath) >= 0) {
        readFile()
    }
    else {
        imagemin([this.resourcePath], baseDir, { use: [imageminPngquant()] }).then(() => {
            compressed.push(resourcePath)
            readFile()
        });
    }

}
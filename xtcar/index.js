var fs = require("fs")
var globalOptions = {}

function XTCarPlugin(options) {
    globalOptions = options
}

XTCarPlugin.prototype.apply = function (compiler) {
    compiler.plugin('emit', function (complilation, cb) {
        const dist = compiler.options.output.path;
        let contents = {};
        globalOptions.entry.forEach(function (entryPoint) {
            const files = fs.readdirSync(entryPoint)
            files.filter(it => !it.startsWith(".")).forEach(file => {
                contents[file] = new Buffer(fs.readFileSync(entryPoint + "/" + file), 'binary').toString('base64')
            })
        })
        fs.writeFileSync(dist + "/" + globalOptions.filename, JSON.stringify(contents));
        cb()
    })
};

module.exports = XTCarPlugin;
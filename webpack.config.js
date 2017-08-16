var path = require('path')

module.exports = {
    entry: {
        "xt": "./src/main.ts",
        "xt.pixi": "./src/main.pixi.ts",
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: "awesome-typescript-loader" },
            { test: /\.js?$/, include: [path.resolve(__dirname, "node_modules/huozi"),], loader: "babel-loader" },
        ],
    },
    externals: {
    },
};
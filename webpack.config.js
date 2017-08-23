var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        "sample.pixi.min": "./src/sample/sample.pixi.ts",
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
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            output: { comments: false },
        })
    ],
};
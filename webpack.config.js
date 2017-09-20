var path = require('path')
var webpack = require('webpack')
var WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        "sample.pixi.min": "./src/sample/sample.pixi.ts",
        "sample.ios.min": "./src/sample/sample.ios.ts",
        "sample.android.min": "./src/sample/sample.android.ts",
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
        }),
        new WebpackShellPlugin({
            onBuildExit: ['cp dist/sample.android.min.js samples/Android/app/src/main/assets/sample.android.min.js']
        }),
        new CopyWebpackPlugin([
            { from: 'src/sample/assets', to: 'assets' }
        ]),
    ],
};
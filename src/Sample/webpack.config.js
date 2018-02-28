var path = require('path')
var webpack = require('webpack')
var WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var setting = {
    entry: {
        "sample.min": "./src/Sample/index.ts",
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist/Sample"
    },
    resolve: {
        extensions: [".xtml", ".ts", ".js", ".png"]
    },
    module: {
        rules: [
            { test: /\.png?$/, loader: require.resolve('./src/AssetsLoader/loader') },
            { test: /\.ts?$/, loader: require.resolve('./src/Shim/loader') },
            { test: /\.ts?$/, loader: "awesome-typescript-loader" },
            { test: onDebug ? /\.ts?$/ : /\.none?$/, loader: require.resolve('./src/DebugLoader/loader') },
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
            onBuildExit: ['cp dist/Sample/sample.min.js android/app/src/main/assets/sample.min.js']
        }),
    ],
}
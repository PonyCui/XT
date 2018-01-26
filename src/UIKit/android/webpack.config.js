var path = require('path')
var webpack = require('webpack')
var WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var setting = {
    entry: {
        "xt.uikit.android.min": "./src/UIKit/android/main.ts",
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist/UIKit",
        libraryTarget: "umd",
        library: "UI",
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: "awesome-typescript-loader" },
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
            onBuildExit: ['cp dist/UIKit/xt.uikit.android.min.js android/uikit/src/main/assets/xt.uikit.android.min.js']
        }),
    ],
}
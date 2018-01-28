var path = require('path')
var webpack = require('webpack')
var WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var setting = {
    entry: {
        "xt.foundation.android.min": "./src/Foundation/android/main.ts",
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist/Foundation",
        libraryTarget: "umd",
        library: "NS",
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
            onBuildExit: ['cp dist/Foundation/xt.foundation.android.min.js android/foundation/src/main/assets/xt.foundation.android.min.js']
        }),
    ],
}
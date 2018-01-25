var path = require('path')
var webpack = require('webpack')
var WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env) {
    var setting = {
        entry: {
            "sample.min": "./sample/index.ts",
        },
        output: {
            filename: "[name].js",
            path: __dirname + "/dist"
        },
        resolve: {
            extensions: [".xtml", ".ts", ".js", ".png"]
        },
        module: {
            rules: [
                { test: /\.xtml?$/, loader: require.resolve('./xtml/index') },
                { test: /\.png?$/, loader: require.resolve('./xtassets/loader') },
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
                onBuildExit: ['cp dist/sample.min.js android/app/src/main/assets/sample.min.js']
            }),
        ],
    }
    if (env && env.devandroid) {
        setting.entry = { "xt.uikit.android.min": "./src/main.android.ts", };
        setting.output.libraryTarget = 'umd';
        setting.output.library = 'UI';
        setting.plugins = [
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                minimize: true,
                output: { comments: false },
            }),
            new WebpackShellPlugin({
                onBuildExit: ['cp dist/xt.uikit.android.min.js android/xtruntime/src/main/assets/xt.uikit.android.min.js']
            }),
        ];
    }
    if (env && env.devios) {
        setting.entry = { "xt.uikit.ios.min": "./src/main.ios.ts", };
        setting.output.libraryTarget = 'umd';
        setting.output.library = 'UI';
        setting.plugins = [
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                minimize: true,
                output: { comments: false },
            }),
            new WebpackShellPlugin({
                onBuildExit: ['cp dist/xt.uikit.ios.min.js ios/Sources/UIKit/xt.uikit.ios.min.js']
            }),
        ];
    }
    if (env && env.devweb) {
        setting.entry = { "xt.web.min": "./src/main.web.ts", };
        setting.output.libraryTarget = 'umd';
        setting.output.library = 'UI';
        setting.plugins = [
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                minimize: true,
                output: { comments: false },
            }),
            new WebpackShellPlugin({
                onBuildExit: ['cp dist/xt.web.min.js web/runtime/xt.web.min.js']
            }),
        ];
    }
    if (env && env.devxtib) {
        setting.entry = { "xtib.min": "./xtib/src/main.ts", };
        setting.plugins = [
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                minimize: true,
                output: { comments: false },
            }),
        ];
    }
    return setting;
};
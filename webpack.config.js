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
        devtool: "source-map",
        resolve: {
            extensions: [".xtml", ".ts", ".js"]
        },
        module: {
            rules: [
                { test: /\.xtml?$/, loader: require.resolve('./xtml/index') },
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
            new CopyWebpackPlugin([
                { from: 'sample/assets', to: 'assets' }
            ]),
        ],
    }
    if (env && env.devandroid) {
        setting.entry = { "xt.android.min": "./src/main.android.ts", };
        setting.plugins = [
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                minimize: true,
                output: { comments: false },
            }),
            new WebpackShellPlugin({
                onBuildExit: ['cp dist/xt.android.min.js android/xtruntime/src/main/assets/xt.android.min.js']
            }),
        ];
    }
    if (env && env.devios) {
        setting.entry = { "xt.ios.min": "./src/main.ios.ts", };
        setting.plugins = [
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                minimize: true,
                output: { comments: false },
            }),
            new WebpackShellPlugin({
                onBuildExit: ['cp dist/xt.ios.min.js ios/runtime/xt.ios.min.js']
            }),
        ];
    }
    if (env && env.devweb) {
        setting.entry = { "xt.web.min": "./src/main.web.ts", };
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
    if (env && env.test) {
        setting.entry = { "tests": "./src/tests.ts" };
        setting.plugins = undefined;
    }
    return setting;
};
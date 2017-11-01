var path = require('path')
var webpack = require('webpack')
var WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env) {
    var setting = {
        entry: {
            "sample.min": "./src/sample/sample.ts",
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
                onBuildExit: ['cp dist/sample.min.js samples/Android/app/src/main/assets/sample.min.js']
            }),
            new CopyWebpackPlugin([
                { from: 'src/sample/assets', to: 'assets' }
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
                onBuildExit: ['cp dist/xt.android.min.js samples/Android/xtruntime/src/main/assets/xt.android.min.js']
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
                onBuildExit: ['cp dist/xt.ios.min.js samples/iOS/runtime/xt.ios.min.js']
            }),
        ];
    }
    // if (env && env.devPixi) {
    //     setting.entry = { "xt.android.min": "./src/main.android.ts", };
    //     setting.plugins = [
    //         new webpack.optimize.UglifyJsPlugin({
    //             include: /\.min\.js$/,
    //             minimize: true,
    //             output: { comments: false },
    //         }),
    //         new WebpackShellPlugin({
    //             onBuildExit: ['cp dist/xt.android.min.js samples/Android/xtruntime/src/main/assets/xt.android.min.js']
    //         }),
    //     ];
    // }
    if (env && env.test) {
        setting.entry = { "tests": "./src/tests.ts" };
        setting.plugins = undefined;
    }
    return setting;
};
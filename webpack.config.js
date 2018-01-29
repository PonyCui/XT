var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env) {
    if (env === undefined) {
        throw Error("Nothing to build.")
    }
    else {
        let onDebug = false;
        if (env['debug']) {
            onDebug = true;
            delete env['debug'];
        }
        const target = Object.keys(env)[0];
        eval(fs.readFileSync(target.replace(/_/ig, '/') + '/webpack.config.js', 'utf-8'))
        return setting;
    }
};
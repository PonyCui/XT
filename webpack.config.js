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
        extensions: [".ts"]
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: "awesome-typescript-loader" },
        ],
    },
    externals: {
    },
};
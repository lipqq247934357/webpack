const path = require("path");
module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [path.resolve('./loaders2/babel-loader.js')],
                include:path.resolve('src')
            }
        ]
    },
    devServer: {},
};
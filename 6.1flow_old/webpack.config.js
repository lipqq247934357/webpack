const path = require("path");
module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    // 自定义loader目录
    resolveLoader: {
        modules: ['node_modules', path.join(__dirname, '2.loaders')]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'logger-loader', options: {} },
                    { loader: 'babel-loader' }
                ]
            }
        ]
    },
    devServer: {},
};
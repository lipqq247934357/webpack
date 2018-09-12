const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
//引入插件
let extractTextPlugin = require('extract-text-webpack-plugin');
//初始化两个实例用于两处规则分别加载
let extractCSS = new extractTextPlugin('css/[name]-one.css');
let extractLESS = new extractTextPlugin('css/[name]-two.css');
module.exports = {
    entry: {
        app1: './src/app/index.js',
        app2: './src/app2/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: [{loader: 'css-loader', options: {importLoaders: 1}},
                        {loader: 'postcss-loader'}]
                })
            },
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    fallback: "style-loader",
                    use: [{loader: 'css-loader', options: {importLoaders: 1}},
                        {loader: 'postcss-loader'},
                        {loader: "less-loader"}]
                })
            }, {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        require('autoprefixer'),
        extractCSS,
        extractLESS,
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: 'entry/index_touch.html',
            chunks: ['runtime','app1']
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index2.html',
            template: 'entry/index2.html',
            chunks: ['runtime','app2']
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    }
};
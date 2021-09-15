const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = () => {
    return ({
        context: process.cwd(), // http://nodejs.cn/api/process/process_cwd.html
        entry: './src/index.js',
        mode: 'development', // 
        devtool: 'source-map', // 映射方式
        output: {
            path: path.resolve(__dirname, 'dist'), // __dirname 表示文件的绝对路径,一个全局变量
            filename: '[name].[hash:10].js', // 文件名增加hash hash,chunkHash,contentHash
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'eslint-loader', // 先进行代码校验，再编译代码
                    enforce: 'pre', // 强制指定顺序，pre 之前
                    options: { fix: true }, // 启动自动修复
                    include: path.resolve(__dirname, 'src'),
                },
                {
                    test: /\.jsx?$/, use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    "@babel/preset-react" // 将jsx转换成js
                                ],
                                plugins: [
                                    ["@babel/plugin-proposal-decorators", { legacy: true }], //
                                    ["@babel/plugin-proposal-class-properties", { loose: true }]
                                ]
                            }
                        },
                    ]
                },
                { test: /\.txt$/, use: 'raw-loader' },
                // MiniCssExtractPlugin 将css文件拆分出来 postcss-loader css增加前缀等
                { test: /\.css/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] }, // 从右往左执行,需要安装依赖
                { test: /\.less/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] }, //
                { test: /\.scss/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] }, //
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                        loader: 'file-loader', // url-loader limit: 如果文件体积小于8k的话就转成base64字符串内嵌到html中
                        options: {
                            name: '[hash:10].[ext]',
                            //   esModule: false // 是否包装成es6模块，如果包装成es6,需要使用default取值 
                            // publicPath: '/images' // /images是相对于src的绝对路径， 不加'/'相当于是使用位置的相对路径
                        }
                    }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['**/*']
            }),
            // 把收集到的所有的css样式都写入到main.css，然后把此资源插入到html里面
            new MiniCssExtractPlugin({
                filename: 'css/[name].[hash:5].css'
            }),

        ],
        devServer: {
            contentBase: path.resolve(__dirname, 'static'), // 当前目录下的文件夹作为公共资源使用
            writeToDisk: true, // 打包后的文件写到硬盘上
            compress: true, // 是否启动压缩
            port: 8080, // 指定HTTP服务器的端口号
            open: false, // 是否自动打开浏览器
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    pathRewrite: { // 正则匹配，路径重写
                        '^/api': ''
                    }
                }
            }
        },
        watch: true
    })
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
console.log(process.env.mode, 'process.env.mode');
module.exports = env => {
    // console.log(env, 'env.mode');
    return ({
            context: process.cwd(), // http://nodejs.cn/api/process/process_cwd.html 当前工作目录 
            entry: './src/index.js',
            mode: 'development', // production,development
            // devtool: 'source-map', // 映射方式
            output: {
                path: path.resolve(__dirname, 'dist'), // __dirname 表示文件的绝对路径,一个全局变量
                filename: 'bundle.js',
                // publicPath: 'assets' // 打包后的目录前缀 最终文件名为：publicPathfilename
            },
            // 先通过cdn引入，然后再在这里引入
            // externals: {
            //     lodash: '_'
            // },
            module: {
                rules:[
                    // 将模块加到全局对象上，没用过
                    // {
                    //     test: require.resolve('lodash'),
                    //     loader: 'expose-loader',
                    //     options: {
                    //         exposes: {
                    //             globalName: '_',
                    //             override: true,
                    //         },
                    //     },
                    // },
                    {
                        test:/\.jsx?$/,
                        loader:'eslint-loader', // 先进行代码校验，再编译代码
                        enforce: 'pre', // 强制指定顺序，pre 之前
                        options:{fix:true}, // 启动自动修复
                        include:path.resolve(__dirname, 'src'),
                    },
                    {test:/\.jsx?$/, use:[
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ["@babel/preset-env", // 将es6转换成js
                                        {
                                            // useBuiltIns: 'usage', // 按需加载polyfill  3个参数  false:引入所有的polyfill  entry：自己在入口引入                                   corjs
                                            // corejs:{version:3}, // 指定corejs的版本号 2或者3
                                            targets:{ // 指定要兼容的浏览器
                                                // chrome:'60',
                                                // firefox:'60',
                                                // ie:'9',
                                                // safari:'10',
                                                // edge:'17'
                                            }
                                        }
                                    ],
                                    "@babel/preset-react" // 将jsx转换成js
                                ],
                                plugins: [
                                    ["@babel/plugin-proposal-decorators", {legacy: true}], //
                                    ["@babel/plugin-proposal-class-properties", {loose: true}] // 
                                ]
                            }
                        },
                    ]},
                    {test:/\.txt$/, use:'raw-loader'},
                    {test: /\.css/, use:['style-loader','css-loader']}, // 从右往左执行,需要安装依赖
                    {test: /\.less/, use:['style-loader','css-loader','less-loader']}, //
                    {test: /\.scss/, use:['style-loader','css-loader','sass-loader']}, //
                    {
                        test: /\.(png|jpg|gif)$/,
                        use:[{
                            loader: 'file-loader', // url-loader limit: 如果文件体积小于8k的话就转成base64字符串内嵌到html中
                            options: {
                              name:'[hash:10].[ext]',
                            //   esModule: false // 是否包装成es6模块，如果包装成es6,需要使用default取值 
                            }
                        }
                        ]
                    }
                ]
            },
            plugins: [
                // sourceMap
                // new webpack.SourceMapDevToolPlugin({
                //       append: '\n//# sourceMappingURL=http://127.0.0.1:8081/[url]',
                //       filename: '[file].map',
                // }),
                new HtmlWebpackPlugin({
                    template:'./src/index.html'
                }),
                // 引入插件的一种方式
                // new webpack.ProvidePlugin({
                //     _: 'lodash'
                // }),        
                // 引入插件的另一种方式
                // new HtmlWebpackExternalsPlugin({
                //    externals: {
                //      module: 'lodash',
                //      entry: 'http://baidu.com',
                //      global: '_',
                //    }
                // })
            ],
            devServer: {
                contentBase: path.resolve(__dirname, 'static'), // 当前目录下的文件夹作为公共资源使用
                writeToDisk:true, // 打包后的文件写到硬盘上
                compress:true, // 是否启动压缩
                port:8080, // 指定HTTP服务器的端口号
                open:true, // 是否自动打开浏览器
                // publicPath: '/assets' // 指定浏览器访问的地址后缀： 一般是 http://localhost:8080  加上参数之后访问的地址会变成http://localhost:8080/assets
            }
        })
}

// resolve  会把相对路径转换成绝对路径，  join只是连接   参考nodeapi，或者webpack自定的函数
// mode：支持各种模式
// publicPath详解 https://juejin.cn/post/6844903601060446221

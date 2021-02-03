const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
console.log(process.env.mode, 'process.env.mode');
module.exports = env => {
    console.log(env, 'env.mode');
    return ({
            context: process.cwd(), // http://nodejs.cn/api/process/process_cwd.html
            entry: './src/index.js',
            mode: 'development', // 
            devtool: 'source-map', // 映射方式
            output: {
                path: path.resolve(__dirname, 'dist'), // __dirname 表示文件的绝对路径,一个全局变量
                filename: 'bundle.js',
            },
            module: {
                rules:[
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
                                            useBuiltIns: 'usage', // 按需加载polyfill  3个参数  false:手动引入  entry：自己在入口引入 usage：按需引入                             corjs
                                            corejs:{version:3}, // 指定corejs的版本号 2或者3
                                            targets: '>0.25%'
                                        }
                                    ],
                                    "@babel/preset-react" // 将jsx转换成js
                                ],
                                plugins: [
                                    // 自动将polyfill的文件按照runtime的方式引入
                                    [
                                        '@babel/plugin-transform-runtime',
                                        {
                                            corejs:3,
                                            helepers:true, // 是否将公共的代码提取出来
                                            regenerator:true
                                        }
                                    ],
                                    ["@babel/plugin-proposal-decorators", {legacy: true}], //
                                    ["@babel/plugin-proposal-class-properties", {loose: true}]
                                    // 编译出来的对象的属性设置方式不一样  true: p.age = x false:Object.prototype(p,age,{...})
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
                new HtmlWebpackPlugin({
                    template:'./src/index.html'
                }),
            ],
            devServer: {
                contentBase: path.resolve(__dirname, 'static'), // 当前目录下的文件夹作为公共资源使用
                writeToDisk:true, // 打包后的文件写到硬盘上
                compress:true, // 是否启动压缩
                port:8080, // 指定HTTP服务器的端口号
                open:false, // 是否自动打开浏览器
            },
            watch:true, // webpack4,
            watchOptions: { // 监听选项
                ignored: /node_modules/,
                aggregateTimeout:300, // 变化300ms之后再执行，防抖
                poll:1000, // 
            }
        })
}

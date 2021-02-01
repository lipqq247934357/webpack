const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    context: process.cwd(), // http://nodejs.cn/api/process/process_cwd.html
    entry: './src/index.js',
    // mode: 'development', // 
    output: {
        path: path.resolve(__dirname, 'dist'), // __dirname 表示文件的绝对路径,一个全局变量
        filename: 'bundle.js',
        // publicPath: 'assets' // 配置打包后的目录前缀 最终文件名为：publicPath+filename
    },
    module: {
        rules:[
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
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'static'), // 当前目录下的文件夹作为公共资源使用
        writeToDisk:true, // 打包后的文件写到硬盘上
        compress:true, // 是否启动压缩
        port:8080, // 指定HTTP服务器的端口号
        open:true, // 是否自动打开浏览器
        // publicPath: '/assets' // 指定浏览器访问的地址后缀： 一般是 http://localhost:8080  加上参数之后访问的地址会变成http://localhost:8080/assets
    }
}

// resolve  会把相对路径转换成绝对路径，  join只是连接   参考nodeapi，或者webpack自定的函数
// mode：支持各种模式
// publicPath详解 https://juejin.cn/post/6844903601060446221

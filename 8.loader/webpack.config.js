const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    devtool:'source-map',
    entry:'./src/index.js',
    output:{
        path:path.resolve('dist'),
        filename:'[name].js'
    },
    //都是用来指定如何查找模块路径，
    //找模块的
    resolve:{

    },
    //专门用来找loader的
    resolveLoader:{
        alias:{//配置别名
            'babel-loader':path.resolve('loaders','babel-loader.js')
        },//去哪个目录里找loaders
        modules:[path.resolve('loaders'),'node_modules']
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:path.resolve('loaders','babel-loader.js'),
                    options:{
                        presets:[
                            "@babel/preset-env"
                        ]
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}
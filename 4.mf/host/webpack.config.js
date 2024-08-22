const path = require('path');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    devtool:false,
    entry:'./src/index.js',
    output:{
        //当我们把生成后的bundle.js文件写入html的时候，需要添加的前缀
        publicPath:'http://localhost:8000/'
    },
    devServer:{
        port:8000
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:[
                                [
                                    "@babel/preset-react",
                                    //https://babeljs.io/docs/babel-preset-react#both-runtimes
                                    //automatic auto imports the functions that JSX transpiles to. classic does not automatic import anything.
                                    {//如果想引React classic,如果不想引可以使用automatic
                                        "runtime": "classic"
                                    }
                                ]
                               
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new ModuleFederationPlugin({
            filename:'hostRemoteEntry.js',//远程的文件名
            name:'hostYYY',//远程的名称  
            exposes:{//要向外暴露哪些组件
                './Sliders':'./src/Sliders', // remote/Sliders
            },
            remotes:{
                remoteZZZ:'remoteKKK@http://localhost:3000/remoteRemoteEntry.js'
            },
             shared:{
                react: {
                    singleton: true,
                    eager: false,
                    requiredVersion: "18.2.0",
                  },
                'react-dom': {
                    singleton: true,
                    eager: false,
                    requiredVersion: "18.2.0",
                  }
            },
          /*    shared:{
                react:{singleton:false,requiredVersion:'^18.2.0'},
                'react-dom':{singleton:false,requiredVersion:'^18.2.0'}
            }  */
        }) 
    ]
}
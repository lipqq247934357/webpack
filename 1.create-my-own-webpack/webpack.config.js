const path = require('path');
const RunPlugin = require('./my-webpack/plugins/RunPlugin');
const Run1Plugin = require('./my-webpack/plugins/Run1Plugin');
const Run2Plugin = require('./my-webpack/plugins/Run2Plugin');
const DonePlugin = require('./my-webpack/plugins/DonePlugin');
module.exports = {
    mode:'development',
    //context:process.cwd(),//current working directory
    devtool:false,
    //entry:'./src/entry1.js',//{main:'./src/entry1.js'}
    entry:{
        entry1:'./src/entry1.js',
        // entry2:'./src/entry2.js'
    },
    output:{
        path:path.resolve('./dist'),
        filename:'[name].js'
    },
    resolve:{
        //配置查找模块的路径的规则
        //当引入模块的时候，可以不写扩展名
        extensions:['.js','.jsx','.ts','.tsx','.json']
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    path.resolve(__dirname,'my-webpack/loaders/loader1.js'),
                    path.resolve(__dirname,'my-webpack/loaders/loader2.js')
                ]
            }
        ]
    },
    plugins:[
        new RunPlugin(),
        new Run2Plugin(),
        new Run1Plugin(),
        new DonePlugin(),
    ]
}